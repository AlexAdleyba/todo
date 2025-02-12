import { changeStatusAC, setAppErrorAC } from "../../app/app-reducer";
import { AppDispatch } from "../../app/store";
import { Response } from "../types/types";

export const handleAppError = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppErrorAC(data.messages ? data.messages[0] : "Some error"));
  dispatch(changeStatusAC("failed"));
};
