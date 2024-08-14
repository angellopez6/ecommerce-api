/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// const request = require("supertest");
import request from "supertest";
// const createApp = require("../src/app");
import createApp from "../../src/app";

/* eslint-disable no-undef */
describe("suits tests", () => {
  let app = null,
    server: any = null,
    api: any = null;

  beforeEach(() => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);
  });

  test("GET hello", async () => {
    const response = await api.get("/hello");
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("Angel");
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
  });

  afterEach(() => {
    server.close();
  });
});
