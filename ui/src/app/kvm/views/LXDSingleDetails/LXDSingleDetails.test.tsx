import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureStore from "redux-mock-store";

import LXDSingleDetails from "./LXDSingleDetails";

import kvmURLs from "app/kvm/urls";
import { PodType } from "app/store/pod/constants";
import {
  pod as podFactory,
  podState as podStateFactory,
  rootState as rootStateFactory,
} from "testing/factories";

const mockStore = configureStore();

describe("LXDSingleDetails", () => {
  it("redirects to KVM list if pods have loaded but pod is not in state", () => {
    const state = rootStateFactory({
      pod: podStateFactory({
        items: [],
        loaded: true,
      }),
    });
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: kvmURLs.lxd.single.index({ id: 1 }), key: "testKey" },
          ]}
        >
          <LXDSingleDetails />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
    expect(wrapper.find("Redirect").props().to).toBe(kvmURLs.kvm);
  });

  it("sets the search filter from the URL", () => {
    const state = rootStateFactory({
      pod: podStateFactory({
        items: [podFactory({ id: 1, type: PodType.LXD })],
        loaded: true,
      }),
    });
    state.pod.items[0] = podFactory({ id: 1, type: PodType.LXD });
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            {
              key: "testKey",
              pathname: kvmURLs.lxd.single.vms({ id: 1 }),
              search: "?q=test+search",
            },
          ]}
        >
          <Route
            exact
            path={kvmURLs.lxd.single.vms(null, true)}
            component={() => <LXDSingleDetails />}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("LxdProject").prop("searchFilter")).toBe("test search");
  });
});