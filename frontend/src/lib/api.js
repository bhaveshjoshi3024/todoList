const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//  1. Get all todos
export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await res.json();
  return data.todos || data; 
};

// 2. Get single todo by ID
export const getTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todo");
  }

  const data = await res.json();
  return data.todo || data;
};

//  3. Create new todo
export const createTodo = async (todo) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return await res.json();
};

//  4. Update a todo
export const updateTodo = async (id, updatedFields) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return await res.json();
};

//  5. Delete a todo
export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return await res.json();
};
