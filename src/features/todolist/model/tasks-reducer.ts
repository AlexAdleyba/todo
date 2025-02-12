import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { AppDispatch } from "../../../app/store";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, TaskStateType, UpdateTaskModel } from "../api/tasksApi.types";
import { changeStatusAC } from "../../../app/app-reducer";
import {handleAppError} from "../../../common/utils/handleAppError";
import {ResultCode} from "../../../common/enums/enums";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";

export type ActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType | AddTodolistActionType | RemoveTodolistActionType | SetTasksActionType;

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      return { ...state, [action.payload.todolistId]: (state[action.payload.todolistId] = action.payload.tasks) };
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD_TASK": {
      const newTask: DomainTask = action.payload.task;

      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] };
    }
    case "UPDATE_TASK": {
      const task = action.payload.task;
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) =>
          t.id === task.id
            ? {
                ...t,
                status: task.status,
                title: task.title,
              }
            : t,
        ),
      };
    }
    case "ADD_TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };
    }

    case "REMOVE_TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    }

    default:
      return state;
  }
};

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET_TASKS", payload } as const;
};

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const;
};

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE_TASK", payload } as const;
};

//THUNKS

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(setTasksAC({ tasks, todolistId }));
    dispatch(changeStatusAC("succeeded"));
  });
};

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  tasksApi
    .removeTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(args));
        dispatch(changeStatusAC("succeeded"));
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  tasksApi
    .createTasks(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }));
        dispatch(changeStatusAC("succeeded"));
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const updateTaskTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  const model: UpdateTaskModel = {
    description: task.description,
    title: task.title,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
  };

  tasksApi
    .updateTask({ model, taskId: task.id, todolistId: task.todoListId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTaskAC({ task: res.data.data.item }));
        dispatch(changeStatusAC("succeeded"));
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};
