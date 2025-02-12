import { TodolistType } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { AppDispatch } from "../../../app/store";
import { changeStatusAC, RequestStatus, setAppErrorAC } from "../../../app/app-reducer";
import type {FilterValues} from "../../../common/types/types";
import {ResultCode} from "../../../common/enums/enums";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";

const initialState: DomainTodolist[] = [];

export type DomainTodolist = TodolistType & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | SetTodolistsActionType | ChangeTodolistEntityType;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityType = ReturnType<typeof changetodolistEntityStatusAC>;

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId);
    }
    case "ADD_TODOLIST": {
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      return [newTodolist, ...state];
    }
    case "CHANGE_TODOLIST_FILTER": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl));
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl));
    }
    case "SET_TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }
    case "CHANGE_TODOLIST_ENTITY_STATUS": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, entityStatus: action.payload.entityStatus } : tl));
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE_TODOLIST", payload: { todolistId } } as const;
};

export const addTodolistAC = (todolist: TodolistType) => {
  return { type: "ADD_TODOLIST", payload: { todolist } } as const;
};

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValues }) => {
  return { type: "CHANGE_TODOLIST_FILTER", payload } as const;
};

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
  return { type: "CHANGE_TODOLIST_TITLE", payload } as const;
};

export const setTodolistsAC = (todolists: TodolistType[]) => {
  return { type: "SET_TODOLISTS", todolists } as const;
};

export const changetodolistEntityStatusAC = (payload: { todolistId: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE_TODOLIST_ENTITY_STATUS", payload } as const;
};

//THUNK

export const fetchTodolistsTC = (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data));
    dispatch(changeStatusAC("succeeded"));
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(changetodolistEntityStatusAC({ todolistId, entityStatus: "loading" }));
  dispatch(changeStatusAC("loading"));
  todolistsApi
    .removeTodolist(todolistId)
    .then((res) => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(changeStatusAC("succeeded"));
    })
    .catch((err) => {
      dispatch(setAppErrorAC(err.message));
      dispatch(changeStatusAC("failed"));
      dispatch(changetodolistEntityStatusAC({ todolistId, entityStatus: "failed" }));
    });
};

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(changeStatusAC("succeeded"));
      } else {
        dispatch(setAppErrorAC(res.data.messages ? res.data.messages[0] : "Some error"));
        dispatch(changeStatusAC("failed"));
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(changeStatusAC("loading"));
  todolistsApi
    .updateTodolist(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        const { id, title } = args;
        dispatch(changeTodolistTitleAC({ todolistId: id, title }));
        dispatch(changeStatusAC("succeeded"));
      } else {
        dispatch(setAppErrorAC(res.data.messages ? res.data.messages[0] : "Some error"));
        dispatch(changeStatusAC("failed"));
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};
