import { TodolistType } from "./todolistsApi.types";
import { instance } from "../../../common/instance/instance";
import { Response } from "../../../common/types/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`);
  },
  updateTodolist(payload: { id: string; title: string }) {
    return instance.put<Response>(`/todo-lists/${payload.id}`, { title: payload.title });
  },
  createTodolist(title: string) {
    return instance.post<
      Response<{
        item: TodolistType;
      }>
    >(`/todo-lists`, { title });
  },
  removeTodolist(id: string) {
    return instance.delete<Response>(`/todo-lists/${id}`);
  },
};
