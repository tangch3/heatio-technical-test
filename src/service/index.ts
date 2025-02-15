const baseUrl = "http://localhost:8080";

export const getAllTodos = async () => {
  try {
    const response = await fetch(`${baseUrl}/all-todos`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch todos: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { error: "Unable to fetch todos" };
  }
};

export const addTodo = async (newTask: string) => {
  try {
    const response = await fetch(`${baseUrl}/add-todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to add todo: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding the todo", error);
    return { error: "Unable to add the todo item" };
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/delete-todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete todo ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting the todo", error);
    return { error: "Unable to delete the todo item" };
  }
};

export const updateTodoStatus = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/update-status/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update todo ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating the todo", error);
    return { error: "Unable to update the todo item" };
  }
};
