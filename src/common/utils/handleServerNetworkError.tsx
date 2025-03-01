import { changeStatusAC, setAppErrorAC } from "../../app/app-reducer";
import { AppDispatch } from "../../app/store";

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(err.message));
  dispatch(changeStatusAC("failed"));
};
