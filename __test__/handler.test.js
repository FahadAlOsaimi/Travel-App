import { handle } from "../src/client/js/handler";
import "regenerator-runtime/runtime";

describe("Testing generate button", () => {
  test("Testing if handle function is defined or not.", () => {
    expect(handle()).toBeDefined();
  });
});
