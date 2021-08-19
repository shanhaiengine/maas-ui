import { Link } from "@canonical/react-components";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import CloneFormFields from "./CloneFormFields";

import ActionForm from "app/base/components/ActionForm";
import type { ClearSelectedAction } from "app/base/types";
import { actions as machineActions } from "app/store/machine";
import machineSelectors from "app/store/machine/selectors";
import type { Machine } from "app/store/machine/types";
import { NodeActions } from "app/store/types/node";

type Props = {
  actionDisabled?: boolean;
  clearSelectedAction: ClearSelectedAction;
};

export type CloneFormValues = {
  interfaces: boolean;
  source: Machine["system_id"];
  storage: boolean;
};

const CloneFormSchema = Yup.object()
  .shape({
    interfaces: Yup.boolean(),
    source: Yup.string().required("Source machine must be selected."),
    storage: Yup.boolean(),
  })
  .test(
    "networkOrStorage",
    "Neither network nor storage selected",
    (values, context) => {
      if (!(values.interfaces || values.storage)) {
        return context.createError({
          message: "Either networking or storage must be selected.",
          path: "hidden", // we don't surface the error at a particular field
        });
      }
      return true;
    }
  )
  .defined();

export const CloneForm = ({
  actionDisabled,
  clearSelectedAction,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const activeID = useSelector(machineSelectors.activeID);
  const selectedIDs = useSelector(machineSelectors.selectedIDs);
  const processingCount = useSelector(machineSelectors.cloning).length;
  const errors = useSelector(machineSelectors.errors);
  const destinations = activeID ? [activeID] : selectedIDs;

  return (
    <ActionForm<CloneFormValues>
      actionDisabled={actionDisabled}
      actionName={NodeActions.CLONE}
      buttonsBordered
      buttonsHelp={
        <p>
          The clone function allows you to apply storage and/or network
          interface configuration from the source machine to selected
          destination machines.{" "}
          <Link
            external
            href="https://discourse.maas.io/t/cloning-ui/4855"
            rel="noopener noreferrer"
            target="_blank"
          >
            Find out more
          </Link>
        </p>
      }
      cleanup={machineActions.cleanup}
      clearSelectedAction={clearSelectedAction}
      errors={errors}
      initialValues={{
        interfaces: false,
        source: "",
        storage: false,
      }}
      modelName="machine"
      onSaveAnalytics={{
        action: "Submit",
        category: `Machine ${activeID ? "details" : "list"} action form`,
        label: "Clone",
      }}
      onSubmit={(values) => {
        dispatch(machineActions.cleanup());
        dispatch(
          machineActions.clone({
            destinations,
            interfaces: values.interfaces,
            storage: values.storage,
            system_id: values.source,
          })
        );
      }}
      processingCount={processingCount}
      selectedCount={destinations.length}
      validationSchema={CloneFormSchema}
    >
      <CloneFormFields />
    </ActionForm>
  );
};

export default CloneForm;