import { getTodoById } from "@/lib/api";
import TodoDetailClient from "./TodoDetailClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TodoDetailPage({ params }) {
  const todo = await getTodoById(params.id);

  return <TodoDetailClient todo={todo} />;
}



