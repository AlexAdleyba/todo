import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { tasksReducer } from "../features/todolist/model/tasks-reducer";
import { todolistsReducer } from "../features/todolist/model/todolists-reducer";
import { appReducer } from "./app-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { authReducer } from "../features/auth/model/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
