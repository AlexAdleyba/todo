import { GetTasksResponse, DomainTask, UpdateTaskModel } from "./tasksApi.types";
import { Response } from "../../../common/types/types";
import {instance} from "../../../common/instance/instance";

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`);
  },
  createTasks(payload: { todolistId: string; title: string }) {
    return instance.post<Response<{ item: DomainTask }>>(`/todo-lists/${payload.todolistId}/tasks`, { title: payload.title });
  },
  removeTask(payload: { taskId: string; todolistId: string }) {
    return instance.delete<Response>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
  },
  updateTask(payload: { model: UpdateTaskModel; taskId: string; todolistId: string }) {
    const { model } = payload;
    return instance.put<Response<{ item: DomainTask }>>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, model);
  },
};
