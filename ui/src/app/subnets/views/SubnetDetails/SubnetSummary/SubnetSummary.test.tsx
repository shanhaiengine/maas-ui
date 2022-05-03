import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import SubnetSummary from "./SubnetSummary";

import type { RootState } from "app/store/root/types";
import type { Subnet } from "app/store/subnet/types";
import subnetsURLs from "app/subnets/urls";
import {
  rootState as rootStateFactory,
  subnet as subnetFactory,
  subnetState as subnetStateFactory,
  space as spaceFactory,
  spaceState as spaceStateFactory,
  vlan as vlanFactory,
  vlanState as vlanStateFactory,
  fabric as fabricFactory,
  fabricState as fabricStateFactory,
} from "testing/factories";

const mockStore = configureStore();

let state: RootState;
let subnet: Subnet;

beforeEach(() => {
  const spaceId = 1;
  subnet = subnetFactory({
    id: 1,
    name: "Test subnet",
    cidr: "192.168.1.1/32",
    gateway_ip: "192.168.1.1/32",
    dns_servers: "Test DNS",
    description: "Test description",
    managed: true,
    active_discovery: true,
    allow_proxy: true,
    allow_dns: true,
    space: spaceId,
    vlan: 1,
  });
  state = rootStateFactory({
    subnet: subnetStateFactory({
      loaded: true,
      loading: false,
      items: [subnetFactory(subnet)],
    }),
    space: spaceStateFactory({
      loaded: true,
      loading: false,
      items: [spaceFactory({ id: spaceId, name: "Test space" })],
    }),
    vlan: vlanStateFactory({
      loaded: true,
      loading: false,
      items: [
        vlanFactory({
          id: subnet.vlan,
          name: "Test VLAN",
          fabric: 1,
        }),
      ],
    }),
    fabric: fabricStateFactory({
      loaded: true,
      loading: false,
      items: [
        fabricFactory({
          id: 1,
          name: "Test fabric",
          vlan_ids: [subnet.vlan],
        }),
      ],
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("renders correct section heading", async () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: subnetsURLs.subnet.index({ id: 1 }) }]}
      >
        <SubnetSummary id={subnet.id} />
      </MemoryRouter>
    </Provider>
  );
  expect(
    screen.getByRole("heading", { name: "Subnet summary" })
  ).toBeInTheDocument();
});

it("renders current values for static fields", async () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: subnetsURLs.subnet.index({ id: 1 }) }]}
      >
        <SubnetSummary id={subnet.id} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText("Name")).toHaveTextContent(subnet.name);

  expect(screen.getByLabelText("CIDR")).toHaveTextContent(subnet.cidr);

  expect(screen.getByLabelText("Gateway IP")).toHaveTextContent(
    subnet.gateway_ip || ""
  );

  expect(screen.getByLabelText("DNS")).toHaveTextContent(subnet.dns_servers);

  expect(screen.getByLabelText("Description")).toHaveTextContent(
    subnet.description
  );
});

it("renders the correct value for 'VLAN'", async () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: subnetsURLs.subnet.index({ id: 1 }) }]}
      >
        <SubnetSummary id={subnet.id} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText("VLAN")).toHaveTextContent("Test VLAN");
});

it("renders the correct value for 'Fabric'", async () => {
  const store = mockStore(state);
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: subnetsURLs.subnet.index({ id: 1 }) }]}
      >
        <SubnetSummary id={subnet.id} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText("Fabric")).toHaveTextContent("Test fabric");
});
