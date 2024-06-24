import TableActionsDropdown from "./TableActionsDropdown";

import { render, screen, userEvent } from "@/testing/utils";

describe("TableActionsDropdown", () => {
  it("can be explicitly disabled", () => {
    render(
      <TableActionsDropdown
        actions={[
          { label: "Action 1", type: "action-1" },
          { label: "Action 2", type: "action-2" },
          { label: "Action 3", type: "action-3" },
        ]}
        disabled
        onActionClick={vi.fn()}
      />
    );
    expect(screen.getByRole("button")).toBeAriaDisabled();
  });

  it("is disabled if no actions are provided", () => {
    render(<TableActionsDropdown actions={[]} onActionClick={vi.fn()} />);
    expect(screen.getByRole("button")).toBeAriaDisabled();
  });

  it("can conditionally show actions", async () => {
    render(
      <TableActionsDropdown
        actions={[
          { label: "Action 1", show: true, type: "action-1" },
          { label: "Action 2", type: "action-2" },
          { label: "Action 3", show: false, type: "action-3" },
        ]}
        onActionClick={vi.fn()}
      />
    );
    // Open menu
    await userEvent.click(screen.getByRole("button"));

    expect(
      screen.getByRole("button", { name: "Action 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Action 2" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Action 3" })
    ).not.toBeInTheDocument();
  });

  it("runs click function with action type as argument", async () => {
    const onActionClick = vi.fn();
    render(
      <TableActionsDropdown
        actions={[{ label: "Action 1", type: "action-1" }]}
        onActionClick={onActionClick}
      />
    );
    // Open menu and click the actions
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button", { name: "Action 1" }));
    expect(onActionClick).toHaveBeenCalledWith("action-1", undefined);
  });
});
