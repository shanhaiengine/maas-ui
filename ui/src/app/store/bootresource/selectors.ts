import { createSelector } from "@reduxjs/toolkit";

import type { BootResourceState, BootResourceStatuses } from "./types";
import { BootResourceAction, BootResourceMeta } from "./types";
import { splitResourceName } from "./utils";

import type { RootState } from "app/store/root/types";

/**
 * Get the collection of statuses.
 * @param state - The redux state.
 * @returns Boot resource statuses.
 */
const statuses = (state: RootState): BootResourceStatuses =>
  state[BootResourceMeta.MODEL].statuses;

/**
 * Get the list of eventErrors.
 * @param state - The redux state.
 * @returns Boot resource errors.
 */
const eventErrors = (state: RootState): BootResourceState["eventErrors"] =>
  state[BootResourceMeta.MODEL].eventErrors;

/**
 * Get the list of downloaded/downloading boot resources.
 * @param state - The redux state.
 * @returns Downloaded/downloading boot resources.
 */
const resources = (state: RootState): BootResourceState["resources"] =>
  state[BootResourceMeta.MODEL].resources;

/**
 * Get the list of downloaded/downloading Ubuntu boot resources.
 * @param state - The redux state.
 * @returns Downloaded/downloading Ubuntu boot resources.
 */
const ubuntuResources = createSelector([resources], (resources) =>
  resources.filter(
    (resource) => splitResourceName(resource.name).os === "ubuntu"
  )
);

/**
 * Get Ubuntu boot resource metadata, i.e. the list of available Ubuntu
 * releases and architectures from the default source.
 * @param state - The redux state.
 * @returns Ubuntu boot resource metadata.
 */
const ubuntu = (state: RootState): BootResourceState["ubuntu"] =>
  state[BootResourceMeta.MODEL].ubuntu;

/**
 * Whether the delete image action is in progress.
 * @param state - The redux state.
 * @returns Whether an image is being deleted.
 */
const deletingImage = createSelector(
  [statuses],
  (statuses) => statuses.deletingImage
);

/**
 * Whether the fetch action is in progress.
 * @param state - The redux state.
 * @returns Whether a fetch action is in progress.
 */
const fetching = createSelector([statuses], (statuses) => statuses.fetching);

/**
 * Returns the latest fetch error's error message.
 * @param state - The redux state.
 * @returns Fetch error message.
 */
const fetchError = createSelector(
  [eventErrors],
  (eventErrors) =>
    eventErrors.find(
      (eventError) => eventError.event === BootResourceAction.FETCH
    )?.error || null
);

/**
 * Whether the poll event is in progress.
 * @param state - The redux state.
 * @returns Whether a poll is in progress.
 */
const polling = createSelector([statuses], (statuses) => statuses.polling);

/**
 * Whether the save other images action is in progress.
 * @param state - The redux state.
 * @returns Whether other images are being saved.
 */
const savingOther = createSelector(
  [statuses],
  (statuses) => statuses.savingOther
);

/**
 * Whether the save ubuntu images action is in progress.
 * @param state - The redux state.
 * @returns Whether ubuntu images are being saved.
 */
const savingUbuntu = createSelector(
  [statuses],
  (statuses) => statuses.savingUbuntu
);

/**
 * Whether the save ubuntu core action is in progress.
 * @param state - The redux state.
 * @returns Whether ubuntu core images are being saved.
 */
const savingUbuntuCore = createSelector(
  [statuses],
  (statuses) => statuses.savingUbuntuCore
);

/**
 * Whether the stop import action is in progress.
 * @param state - The redux state.
 * @returns Whether imports are being stopped.
 */
const stoppingImport = createSelector(
  [statuses],
  (statuses) => statuses.stoppingImport
);

const selectors = {
  deletingImage,
  eventErrors,
  fetchError,
  fetching,
  polling,
  resources,
  savingOther,
  savingUbuntu,
  savingUbuntuCore,
  statuses,
  stoppingImport,
  ubuntu,
  ubuntuResources,
};

export default selectors;