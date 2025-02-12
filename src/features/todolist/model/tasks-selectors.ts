import { RootState } from "../../../app/store";
import { TaskStateType } from "../api/tasksApi.types";

export const selectTasks = (state: RootState): TaskStateType => state.tasks;
