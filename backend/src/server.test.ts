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

describe("POST /add-todo", () => {
  it("should throw error message if task is empty", async () => {
    const response = await request(app).post("/add-todo").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("You must add a task");
  });

  it("should add todo item", async () => {
    const newTodo = { task: "Test Task" };
    const response = await request(app).post("/add-todo").send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.task).toBe("Test Task");

    const refetchAllTodos = await request(app).get("/all-todos");
    const allTodos = refetchAllTodos.body.todos;
    expect(allTodos.length).toBe(4);
    expect(allTodos[3]).toMatchObject({
      id: 4,
      task: "Test Task",
      completed: false,
    });
  });
});

describe("DELETE /delete-todo/:id", () => {
  it("should delete todo item", async () => {
    const todoId = 3;
    const response = await request(app).delete(`/delete-todo/${todoId}`);
    expect(response.status).toBe(200);

    const refetchAllTodos = await request(app).get("/all-todos");
    const allTodos = refetchAllTodos.body.todos;
    expect(allTodos.length).toBe(3);

    const deletedTodo = allTodos.find(
      (todo: { id: number }) => todo.id === todoId
    );
    expect(deletedTodo).toBeUndefined();
  });
});

describe("PUT /update-status/:id for todo item", () => {
  it("should change the todo status", async () => {
    const todoId = 1;
    const response = await request(app).put(`/update-status/${todoId}`);
    expect(response.status).toBe(200);

    const refetchAllTodos = await request(app).get("/all-todos");
    const allTodos = refetchAllTodos.body.todos;
    expect(allTodos[todoId - 1]).toMatchObject({
      id: 1,
      task: "Complete Heatio technical test",
      completed: true,
    });
  });
});
