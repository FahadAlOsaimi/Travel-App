// Great source: https://zellwk.com/blog/endpoint-testing/
const app = require("../src/server/server");
const supertest = require("supertest");
const request = supertest(app);
// To Solve Runtime error with the test
// Help: https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined
import "regenerator-runtime/runtime";

it("Gets the test endpoint", async (done) => {
  const res = await request.get("/geoNames");
  expect(res).toBeDefined();
  done();
});
