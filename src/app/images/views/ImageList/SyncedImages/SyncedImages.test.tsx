import SyncedImages, { Labels as SyncedImagesLabels } from "./SyncedImages";

import * as sidePanelHooks from "@/app/base/side-panel-context";
import { ImageSidePanelViews } from "@/app/images/constants";
import { BootResourceSourceType } from "@/app/store/bootresource/types";
import * as factory from "@/testing/factories";
import {
  userEvent,
  screen,
  within,
  renderWithBrowserRouter,
  expectTooltipOnHover,
} from "@/testing/utils";

describe("SyncedImages", () => {
  const setSidePanelContent = vi.fn();

  beforeEach(() => {
    vi.spyOn(sidePanelHooks, "useSidePanel").mockReturnValue({
      setSidePanelContent,
      sidePanelContent: null,
      setSidePanelSize: vi.fn(),
      sidePanelSize: "regular",
    });
  });

  it("can trigger a side panel form", async () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        ubuntu: factory.bootResourceUbuntu({
          sources: [
            factory.bootResourceUbuntuSource({
              source_type: BootResourceSourceType.MAAS_IO,
            }),
          ],
        }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, {
      state,
    });

    await userEvent.click(
      screen.getByRole("button", { name: SyncedImagesLabels.ChangeSource })
    );

    expect(setSidePanelContent).toHaveBeenCalledWith({
      view: ImageSidePanelViews.CHANGE_SOURCE,
      extras: { hasSources: true },
    });
  });

  it("renders the change source form and disables closing it if no sources are detected", () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        ubuntu: factory.bootResourceUbuntu({ sources: [] }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, { state });

    expect(setSidePanelContent).toHaveBeenCalledWith({
      view: ImageSidePanelViews.CHANGE_SOURCE,
      extras: { hasSources: false },
    });
  });

  it("renders the correct text for a single default source", () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        ubuntu: factory.bootResourceUbuntu({
          sources: [
            factory.bootResourceUbuntuSource({
              source_type: BootResourceSourceType.MAAS_IO,
            }),
          ],
        }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, { state });
    const images_from = screen.getByText(SyncedImagesLabels.SyncedFrom);
    expect(within(images_from).getByText("maas.io")).toBeInTheDocument();
  });

  it("renders the correct text for a single custom source", () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        ubuntu: factory.bootResourceUbuntu({
          sources: [
            factory.bootResourceUbuntuSource({
              source_type: BootResourceSourceType.CUSTOM,
              url: "www.url.com",
            }),
          ],
        }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, { state });
    const images_from = screen.getByText(SyncedImagesLabels.SyncedFrom);
    expect(within(images_from).getByText("www.url.com")).toBeInTheDocument();
  });

  it("renders the correct text for multiple sources", () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        ubuntu: factory.bootResourceUbuntu({
          sources: [
            factory.bootResourceUbuntuSource(),
            factory.bootResourceUbuntuSource(),
          ],
        }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, { state });
    const images_from = screen.getByText(SyncedImagesLabels.SyncedFrom);
    expect(within(images_from).getByText("sources")).toBeInTheDocument();
  });

  it("disables the button to change source if resources are downloading", async () => {
    const state = factory.rootState({
      bootresource: factory.bootResourceState({
        resources: [factory.bootResource({ downloading: true })],
        ubuntu: factory.bootResourceUbuntu({
          sources: [factory.bootResourceUbuntuSource()],
        }),
      }),
    });
    renderWithBrowserRouter(<SyncedImages />, { state });
    expect(
      screen.getByRole("button", { name: SyncedImagesLabels.ChangeSource })
    ).toBeAriaDisabled();

    await expectTooltipOnHover(
      screen.getByRole("button", { name: SyncedImagesLabels.ChangeSource }),
      "Cannot change source while images are downloading."
    );
  });
});
