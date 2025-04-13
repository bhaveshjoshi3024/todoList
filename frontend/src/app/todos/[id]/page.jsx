import { getTodoById } from "@/lib/api";
import TodoDetailClient from "./TodoDetailClient";

export default async function TodoDetailPage({ params }) {
  const todo = await getTodoById(params.id);

  return <TodoDetailClient todo={todo} />;
}



