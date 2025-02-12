export type ThemeMode = "dark" | "light";
export type RequestStatus = "idle" | "loading" | "failed" | "succeeded";

type initialState = typeof initialState;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
};

export const appReducer = (state: initialState = initialState, action: ActionsType): initialState => {
  switch (action.type) {
    case "CHANGE_THEME": {
      return { ...state, themeMode: action.payload.themeMode };
    }
    case "CHANGE_STATUS": {
      return { ...state, status: action.payload.status };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload.error };
    }
    default:
      return state;
  }
};

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME", payload: { themeMode } } as const;
};

export const changeStatusAC = (status: RequestStatus) => {
  return { type: "CHANGE_STATUS", payload: { status } } as const;
};

export const setAppErrorAC = (error: string | null) => {
  return { type: "SET_ERROR", payload: { error } } as const;
};

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;
type ChangeStatusActionType = ReturnType<typeof changeStatusAC>;
type SetErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = ChangeThemeActionType | ChangeStatusActionType | SetErrorActionType;
