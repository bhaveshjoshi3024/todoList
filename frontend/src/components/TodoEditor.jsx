"use client";

import { useEffect, useState } from "react";

export default function TodoEditor({ todoId }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if (!todoId) return;

    const fetchTodo = async () => {
      const res = await fetch(`http://localhost:5000/api/todos/${todoId}`);
      const data = await res.json();
      setTodo(data);
    };

    fetchTodo();
  }, [todoId]);

  if (!todo) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <input
        value={todo.title}
        className="w-full text-2xl font-bold outline-none"
        readOnly
      />
      <textarea
        value={todo.description}
        className="w-full h-40 p-2 rounded border outline-none resize-none"
        readOnly
      />
    </div>
  );
}
