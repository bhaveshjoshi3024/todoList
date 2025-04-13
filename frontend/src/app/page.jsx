"use client";

import TodoList from "@/components/TodoList";
import CreateTodoButton from "@/components/CreateTodoButton";
import { useEffect, useState } from "react";
import { getTodos, getTodoById, deleteTodo } from "@/lib/api";
import useIsMobile from "@/hooks/useIsMobile";
import TodoDetailClient from "./todos/[id]/TodoDetailClient";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState(null); 
  const isMobile = useIsMobile();

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchSelectedTodo = async () => {
      if (selectedId) {
        try {
          const todo = await getTodoById(selectedId);
          setSelectedTodo(todo);
          setActiveId(selectedId); 
        } catch (err) {
          console.error("Failed to load selected todo", err);
        }
      }
    };
    fetchSelectedTodo();
  }, [selectedId]);

  const handleTodoUpdated = () => {
    fetchTodos();
    if (selectedId) {
      getTodoById(selectedId).then(setSelectedTodo);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await fetchTodos();
      if (selectedId === id) {
        setSelectedId(null);
        setSelectedTodo(null);
        setActiveId(null);
      }
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f3f3f3]">
      {/* Sidebar */}
      <div className="w-full md:w-[350px] bg-white border-r p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">TODO</h1>
          <CreateTodoButton onTodoCreated={fetchTodos} />
        </div>
        <TodoList
          todos={todos}
          onSelect={setSelectedId}
          activeId={activeId}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm} 
        />
      </div>

      {/* Detail panel for desktop */}
      {!isMobile && (
        <div className="flex-1 p-4">
          {selectedTodo ? (
            <TodoDetailClient
              todo={selectedTodo}
              onTodoUpdated={handleTodoUpdated}
              onDelete={() => handleDelete(selectedTodo._id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a TODO from the left
            </div>
          )}
        </div>
      )}
    </div>
  );
}
