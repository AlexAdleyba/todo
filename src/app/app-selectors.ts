import { RootState } from "./store";
import { RequestStatus, ThemeMode } from "./app-reducer";

export const selectTheme = (state: RootState): ThemeMode => state.app.themeMode;
export const selectStatus = (state: RootState): RequestStatus => state.app.status;
export const selectAppError = (state: RootState): string | null => state.app.error;
