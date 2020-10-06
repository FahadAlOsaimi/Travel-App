const app = require("../src/server/server");
const supertest = require("supertest");
const request = supertest(app);
// To Solve Runtime error with the test
// Help: https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined
import "regenerator-runtime/runtime";

it("Testing geoNames API.", async () => {
  const response = await request.get("http://localhost:3000/geoNames");
  expect(response.body.message).toBe("PASSED.");
});
