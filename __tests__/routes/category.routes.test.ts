import request from "supertest";
const app = "http://localhost:3000";
describe("Categories", () => {
  it("should get category by name", async () => {
    const category = "Java";
    const response = await request(app).get(`/categories/${category}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual(`Category: ${category}!`);
  });

  it("should show unregistered category", async () => {
    const category = "TesteCategory";
    const response = await request(app).get(`/categories/${category}`);
    expect(response.statusCode).toEqual(400);
    expect(response.body.result).not.toBeTruthy();
  });

  it("should get categories", async () => {
    const response = await request(app).get("/categories/");
    expect(response.statusCode).toEqual(200);
  });
});
