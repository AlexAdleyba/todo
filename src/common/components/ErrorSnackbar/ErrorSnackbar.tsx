import { SyntheticEvent } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAppErrorAC } from "../../../app/app-reducer";
import { selectAppError } from "../../../app/app-selectors";

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAppError);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={10000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
