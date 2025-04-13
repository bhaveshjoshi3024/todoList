"use client";
import { useEffect, useState } from "react";

export default function TodoDetail({ id }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`);
      const data = await res.json();
      setTodo(data.todo);
    };
    if (id) fetchTodo();
  }, [id]);

  if (!todo) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-2">{todo.title}</h2>
      <p className="text-gray-700 mb-4">{todo.description}</p>
      <p className="text-sm text-gray-400">
        Created on: {new Date(todo.date).toLocaleDateString()}
      </p>
    </div>
  );
}
