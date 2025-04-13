"use client";

import { useRouter } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { useState } from "react";

export default function TodoList({ todos, onSelect, activeId }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!todos.length) {
    return (
      <div>
        <div className="sticky-search">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <p className="no-results">No TODOs found. Create your first one!</p>
      </div>
    );
  }

  if (!filteredTodos.length) {
    return (
      <div>
        <div className="sticky-search">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <p className="no-results">
          No todos found for "{searchTerm}". Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky-search">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo._id}
            className={`cursor-pointer p-2 hover:bg-gray-100 border-b ${
              activeId === todo._id ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              if (isMobile) {
                router.push(`/todos/${todo._id}`);
              } else {
                onSelect(todo._id);
              }
            }}
          >
            <h3 className="font-semibold">{todo.title}</h3>
            <p className="text-sm text-gray-500 truncate">{todo.description}</p>
            <span className="text-xs text-gray-400 block mt-1">
              {new Date(todo.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
