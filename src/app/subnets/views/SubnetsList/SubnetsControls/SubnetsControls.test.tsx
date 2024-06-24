import SubnetsControls from "./SubnetsControls";

import { userEvent, render, screen, waitFor } from "@/testing/utils";

it("calls handleSearch with a correct value on user input", async () => {
  // As of v14 userEvent always returns a Promise and by default it waits for a
  // setTimeout delay during its execution. Since vi.useFakeTimers() replaces
  // the original timer functions, userEvent waits indefinitely. We overwrite
  // this default delay behaviour by setting it to null during setup.
  vi.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const handleSearch = vi.fn();
  render(<SubnetsControls groupBy="fabric" handleSearch={handleSearch} />);
  await user.type(screen.getByRole("searchbox", { name: "Search" }), "test");

  await waitFor(() => expect(handleSearch).toHaveBeenCalledTimes(1));
  expect(handleSearch).toHaveBeenCalledWith("test");
  vi.useRealTimers();
});
