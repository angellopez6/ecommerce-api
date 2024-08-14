/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import request from "supertest";
import createApp from "../../src/app";
import orm from "../../src/libs/sequelize";

/* eslint-disable no-undef */
describe("suits tests for /users", () => {
  let app = null,
    server: any = null,
    api: any = null;

  // beforeEach(() => {
  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  describe("POST /auth/login", () => {
    test("should return 401", async () => {
      const credentials = {
        email: "angellopezsalazar6@gmail.com",
        password: "----",
      };
      const { statusCode } = await api
        .post("/api/v1/auth/login")
        .send(credentials);
      expect(statusCode).toBe(401);
    });

    it("should return a 200", async () => {
      const user = await orm.models.User.findByPk("2");
      const credentials = {
        // @ts-ignore
        email: user.email,
        password: "Angelpomaspas$1",
      };
      const { statusCode, body } = await api
        .post("/api/v1/auth/login")
        .send(credentials);
      expect(statusCode).toBe(200);
      expect(body.token).toBeTruthy();
      // @ts-ignore
      expect(body.user.email).toEqual(user.email);
    });
  });

  // afterEach(() => {
  afterAll(() => {
    server.close();
  });
});
