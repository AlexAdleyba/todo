export type TaskStateType = {
  [todolistId: string]: DomainTask[];
};

export type DomainTask = {
  description: string | null;
  title: string;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type GetTasksResponse = {
  items: DomainTask[];
  totalCount: number;
  error: string;
};

export type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
};
