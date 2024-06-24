import DeviceListHeader from "./DeviceListHeader";

import { DeviceSidePanelViews } from "@/app/devices/constants";
import type { RootState } from "@/app/store/root/types";
import * as factory from "@/testing/factories";
import { renderWithBrowserRouter, screen, userEvent } from "@/testing/utils";

describe("DeviceListHeader", () => {
  let state: RootState;

  beforeEach(() => {
    state = factory.rootState({
      device: factory.deviceState({
        loaded: true,
        items: [
          factory.device({ system_id: "abc123" }),
          factory.device({ system_id: "def456" }),
        ],
      }),
    });
  });

  it("displays a spinner in the header subtitle if devices have not loaded", () => {
    state.device.loaded = false;
    renderWithBrowserRouter(
      <DeviceListHeader
        searchFilter=""
        setSearchFilter={vi.fn()}
        setSidePanelContent={vi.fn()}
      />,
      { state }
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays a devices count if devices have loaded", () => {
    state.device.loaded = true;
    renderWithBrowserRouter(
      <DeviceListHeader
        searchFilter=""
        setSearchFilter={vi.fn()}
        setSidePanelContent={vi.fn()}
      />,
      { state }
    );
    expect(screen.getByText("2 devices available")).toBeInTheDocument();
  });

  it("disables the add device button if any devices are selected", () => {
    state.device.selected = ["abc123"];
    renderWithBrowserRouter(
      <DeviceListHeader
        searchFilter=""
        setSearchFilter={vi.fn()}
        setSidePanelContent={vi.fn()}
      />,
      { state }
    );
    expect(
      screen.getByRole("button", { name: "Add device" })
    ).toBeAriaDisabled();
  });

  it("can open the add device form", async () => {
    const setSidePanelContent = vi.fn();
    renderWithBrowserRouter(
      <DeviceListHeader
        searchFilter=""
        setSearchFilter={vi.fn()}
        setSidePanelContent={setSidePanelContent}
      />,
      { state }
    );
    await userEvent.click(screen.getByRole("button", { name: "Add device" }));
    expect(setSidePanelContent).toHaveBeenCalledWith({
      view: DeviceSidePanelViews.ADD_DEVICE,
    });
  });

  it("changes the search text when the filters change", () => {
    const { rerender } = renderWithBrowserRouter(
      <DeviceListHeader
        searchFilter=""
        setSearchFilter={vi.fn()}
        setSidePanelContent={vi.fn()}
      />,
      { state }
    );

    expect(screen.getByRole("searchbox")).toHaveValue("");

    rerender(
      <DeviceListHeader
        searchFilter="free-text"
        setSearchFilter={vi.fn()}
        setSidePanelContent={vi.fn()}
      />
    );

    expect(screen.getByRole("searchbox")).toHaveValue("free-text");
  });
});
