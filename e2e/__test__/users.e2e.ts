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
    api: any = null,
    access_token: any = null;

  // beforeEach(() => {
  beforeAll(() => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);
  });

  describe("GET /users/{id}", () => {
    // se hace dentro de cada suit de pruebas porque se podria probar con otros roles de usuarios...
    beforeAll(async () => {
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
      access_token = body.token;
    });

    test("Should return a user", async () => {
      const user = await orm.models.User.findByPk("2", {
        include: ["customer"],
      });
      // @ts-ignore
      const { statusCode, body } = await api
        // @ts-ignore
        .get(`/api/v1/users/${user?.id}`)
        .set({
          Authorization: `Bearer ${access_token}`,
        });
      expect(statusCode).toBe(200);
      // @ts-ignore
      expect(body.id).toBe(user?.id);
      // @ts-ignore
      expect(body.email).toBe(user?.email);
    });

    afterAll(() => {
      access_token = null;
    });
  });

  describe("POST /users", () => {
    beforeAll(async () => {
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
      access_token = body.token;
    });

    test("should return 400 Bad Request", async () => {
      const failedInputsData = [
        {
          email: "",
          password: "123456",
        },
        {
          email: "pruebas@gmail.com",
          password: "",
        },
        {
          email: "",
          password: "",
        },
      ];

      await Promise.all(
        failedInputsData.map(async (inputData) => {
          const response = await api
            .post("/api/v1/users")
            .set({
              Authorization: `Bearer ${access_token}`,
            })
            .send(inputData);
          expect(response.status).toBe(400);
        })
      );
    });

    test("should create a new user", async () => {
      const inputData = {
        email: "lopezangel0252@hotmail.com",
        password: "Angelpomaspas$1",
        role: "admin",
      };
      const { statusCode, body } = await api
        .post("/api/v1/users")
        .set({
          Authorization: `Bearer ${access_token}`,
        })
        .send(inputData);
      expect(statusCode).toBe(201);
      // check DB
      const user = await orm.models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      // @ts-ignore
      expect(user.role).toBe("admin");
      // @ts-ignore
      expect(user.email).toBe(inputData.email);
    });

    afterAll(() => {
      access_token = null;
    });
  });
  describe("PUT /users", () => {});
  describe("DELETE /users", () => {});

  // afterEach(() => {
  afterAll(() => {
    server.close();
  });
});
