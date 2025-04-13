"use client";

import { useState } from "react";
import { updateTodo, deleteTodo } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TodoDetailClient({ 
  todo: initialTodo, 
  onTodoUpdated,
  onDelete 
}) {
  const [todo, setTodo] = useState(initialTodo);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (field, value) => {
    setTodo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = async () => {
    setIsSaving(true);
    try {
      await updateTodo(todo._id, {
        title: todo.title,
        description: todo.description,
      });
      onTodoUpdated?.();
    } catch (err) {
      setError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(todo._id);
        onDelete?.();
        router.push("/");
      } catch (err) {
        setError("Failed to delete todo");
      }
    }
  };

  return (
    <div className="p-4 space-y-4 border-2 border-gray-300 rounded-lg">
      {/* Mobile Back Button */}
      <Link
        href="/"
        className="text-blue-600 hover:underline font-semibold md:hidden"
      >
        ← Back
      </Link>

      <div className="space-y-2">
        <input
          type="text"
          value={todo.title}
          onChange={(e) => handleChange("title", e.target.value)}
          onBlur={handleBlur}
          className="w-full text-xl font-bold border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Untitled TODO"
        />

        <textarea
          value={todo.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={handleBlur}
          className="w-full resize-none border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-700"
          placeholder="Write something..."
          rows={4}
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">TODO ID: {todo._id}</p>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 border-2 border-red-600"
          >
            Delete
          </button>
        </div>

        {isSaving && (
          <p className="text-sm text-blue-500">Saving...</p>
        )}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}