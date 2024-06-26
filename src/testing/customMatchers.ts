import { expect } from "vitest";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAriaDisabled(): R;
    }
  }
}

function toBeAriaDisabled(received: any) {
  const isDisabled =
    received.disabled || received.getAttribute("aria-disabled") === "true";

  if (isDisabled) {
    return {
      message: () => `expected element not to be disabled, but it is`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected element to be disabled, but it is not`,
      pass: false,
    };
  }
}

expect.extend({
  toBeAriaDisabled,
});
