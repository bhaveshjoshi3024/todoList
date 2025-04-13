"use client";
import { useState } from "react";
import { createTodo } from "@/lib/api";

export default function CreateTodoButton({ onTodoCreated }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: ""
  });
  const [error, setError] = useState(null);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewTodo({ title: "", description: "" });
    setError(null);
  };

  const handleSubmit = async () => {
    if (!newTodo.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await createTodo({
        ...newTodo,
        date: new Date().toISOString()
      });
      onTodoCreated?.();
      setIsCreating(false);
      setNewTodo({ title: "", description: "" });
    } catch (err) {
      setError("Failed to create todo");
      console.error("Failed to create todo", err);
    }
  };

  const handleChange = (field, value) => {
    setNewTodo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative">
      <button
        onClick={handleCreateClick}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        + New
      </button>

      {isCreating && (
        <div className="absolute right-0 top-12 w-64 bg-white p-4 rounded shadow-lg z-10 border-2 border-gray-300">
          <div className="space-y-3">
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              autoFocus
            />
            <textarea
              value={newTodo.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              rows={3}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-gray-600 hover:text-gray-800 border-2 border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 border-2 border-red-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}