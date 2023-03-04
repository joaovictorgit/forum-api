import request from "supertest";
const app = "http://localhost:3000";
describe("Users", () => {
  it("should login user", async () => {
    const login = {
      email: "teste01@gmail.com",
      password: "12345",
    };
    const response = await request(app).post("/users/login").send(login);
    expect(response.statusCode).toEqual(200);
    expect(response.body.token).not.toBeNull();
  });
  it("should get users", async () => {
    const response = await request(app).get("/users/");
    expect(response.statusCode).toEqual(200);
  });
});
