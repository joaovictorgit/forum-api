import request from "supertest";
const app = "http://localhost:3000";
describe("Comments", () => {
  it("should show comment by category", async () => {
    const response = await request(app).get("/comments/categories/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body.results).not.toBeNull();
  });

  it("should show comment by user", async () => {
    const response = await request(app).get("/comments/users/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body.results).not.toBeNull();
  });
});
