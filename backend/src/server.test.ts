import request from "supertest";
import { app } from "./server";
import { todos } from "./todos";

describe("GET /all-todos", () => {
  it("should respond with json", async () => {
    const response = await request(app).get("/all-todos");
    expect(response.status).toBe(200);
    expect(response.body.todos).toEqual(todos);
  });
});
