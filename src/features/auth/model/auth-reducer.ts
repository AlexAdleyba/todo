import { Inputs } from "../ui/Login/Login";
import { Dispatch } from "redux";
import { changeStatusAC } from "../../../app/app-reducer";
import { authApi } from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";
import {handleAppError} from "../../../common/utils/handleAppError";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    case "SET_INITIALIZED": {
      return { ...state, isInitialized: action.payload.isInitialized };
    }
    default:
      return state;
  }
};
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const;
};
export const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_INITIALIZED", payload: { isInitialized } } as const;
};

// Actions types
type ActionsType = SetIsLoggedInType | SetInitializedActionType;

type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>;
type SetInitializedActionType = ReturnType<typeof setIsInitializedAC>;

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(changeStatusAC("loading"));
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true));
        dispatch(changeStatusAC("succeeded"));
        localStorage.setItem("token", res.data.data.token);
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(changeStatusAC("loading"));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(false));
        dispatch(changeStatusAC("succeeded"));
        localStorage.removeItem("token");
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(changeStatusAC("loading"));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setIsInitializedAC(true));
        dispatch(changeStatusAC("succeeded"));
      } else {
        handleAppError(dispatch, res.data);
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
