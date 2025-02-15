"use client";
import { ButtonType } from "@/enums/shared-enums";
import { addTodo, deleteTodo, getAllTodos, updateTodoStatus } from "@/service";
import { Todo } from "@/types/types";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../../components/button/Button";
import styles from "./todo-list.module.scss";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iconSize = 20;

  const fetchTodos = async () => {
    try {
      const data = await getAllTodos();
      setTodos(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await addTodo(newTodo);
      fetchTodos();
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (id: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await updateTodoStatus(id);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Tasks</h1>
        </div>
        <table>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <div className={styles.innerRow}>
                    <div>
                      <Button
                        className={
                          todo.completed
                            ? styles["button--completed"]
                            : styles["button--incomplete"]
                        }
                        onClick={() => handleUpdateTodo(todo.id)}
                        disabled={isLoading}
                      />
                    </div>
                    <p className={todo.completed ? styles.strikethrough : ""}>
                      {todo.task}
                    </p>
                  </div>
                  <Button
                    icon={<AiOutlineDelete size={iconSize} />}
                    onClick={() => handleDelete(todo.id)}
                    type={ButtonType.Danger}
                    disabled={isLoading}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <div className={styles.innerRow}>
                  <input
                    className={styles.input}
                    value={newTodo}
                    placeholder="Add Task"
                    onChange={(e) => onChange(e)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && newTodo && handleAddTodo()
                    }
                  />
                </div>
                <Button
                  icon={<AiOutlinePlusCircle size={iconSize} />}
                  onClick={() => handleAddTodo()}
                  type={ButtonType.Success}
                  disabled={newTodo === ""}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
