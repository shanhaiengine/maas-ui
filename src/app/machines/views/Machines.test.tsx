import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter, Route, useLocation } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
import configureStore from "redux-mock-store";

import MachineList from "./MachineList";
import MachineListHeader from "./MachineList/MachineListHeader";
import Machines from "./Machines";

import { MachineHeaderViews } from "app/machines/constants";
import machineURLs from "app/machines/urls";
import type { RootState } from "app/store/root/types";
import {
  generalState as generalStateFactory,
  machine as machineFactory,
  machineState as machineStateFactory,
  machineStatus as machineStatusFactory,
  osInfo as osInfoFactory,
  rootState as rootStateFactory,
  routerState as routerStateFactory,
} from "testing/factories";

const mockStore = configureStore();

describe("Machines", () => {
  let state: RootState;

  beforeEach(() => {
    state = rootStateFactory({
      general: generalStateFactory({
        osInfo: {
          data: osInfoFactory({
            osystems: [["ubuntu", "Ubuntu"]],
            releases: [["ubuntu/bionic", 'Ubuntu 18.04 LTS "Bionic Beaver"']],
          }),
          errors: {},
          loaded: true,
          loading: false,
        },
        version: {
          data: "2.8.0",
          errors: null,
          loaded: true,
          loading: false,
        },
      }),
      machine: machineStateFactory({
        loaded: true,
        items: [
          machineFactory({
            system_id: "abc123",
          }),
          machineFactory({
            system_id: "def456",
          }),
        ],
        statuses: {
          abc123: machineStatusFactory(),
          def456: machineStatusFactory(),
        },
      }),
      router: routerStateFactory(),
    });
  });

  [
    {
      component: "MachineList",
      path: machineURLs.machines.index,
    },
    {
      component: "NotFound",
      path: "/not/a/path",
    },
  ].forEach(({ component, path }) => {
    it(`Displays: ${component} at: ${path}`, () => {
      const store = mockStore(state);
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: path }]}>
            <CompatRouter>
              <Machines />
            </CompatRouter>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(component).exists()).toBe(true);
    });
  });

  it("can set the search from the URL", () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: "/machines", search: "?q=test+search", key: "testKey" },
          ]}
        >
          <CompatRouter>
            <Machines />
          </CompatRouter>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("MachineList").prop("searchFilter")).toBe(
      "test search"
    );
  });

  it("changes the URL when the search text changes", () => {
    let search: string | null = null;
    const store = mockStore(state);
    const FetchRoute = () => {
      const location = useLocation();
      search = location.search;
      return null;
    };
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: "/machines", search: "?q=test+search", key: "testKey" },
          ]}
        >
          <CompatRouter>
            <Machines />
            <Route path="*" render={() => <FetchRoute />} />
          </CompatRouter>
        </MemoryRouter>
      </Provider>
    );
    act(() => {
      wrapper.find(MachineList).props().setSearchFilter("status:new");
    });
    expect(search).toBe("?status=new");
  });

  it("adds the selected filter when an action is selected", () => {
    state.machine.selected = ["abc123"];
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines", key: "testKey" }]}
        >
          <CompatRouter>
            <Machines />
          </CompatRouter>
        </MemoryRouter>
      </Provider>
    );
    act(() =>
      wrapper
        .find(MachineListHeader)
        .props()
        .setHeaderContent({ view: MachineHeaderViews.SET_POOL_MACHINE })
    );
    wrapper.update();
    expect(wrapper.find("MachineList").prop("searchFilter")).toBe(
      "in:(selected)"
    );
  });

  it("removes the selected filter when the selected action is cleared", () => {
    state.machine.selected = ["abc123"];
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines", key: "testKey" }]}
        >
          <CompatRouter>
            <Machines />
          </CompatRouter>
        </MemoryRouter>
      </Provider>
    );
    act(() =>
      wrapper
        .find(MachineListHeader)
        .props()
        .setHeaderContent({ view: MachineHeaderViews.SET_POOL_MACHINE })
    );
    wrapper.update();
    expect(wrapper.find("MachineList").prop("searchFilter")).toBe(
      "in:(selected)"
    );
    act(() => wrapper.find(MachineListHeader).props().setHeaderContent(null));
    wrapper.update();
    expect(wrapper.find("MachineList").prop("searchFilter")).toBe("");
  });
});