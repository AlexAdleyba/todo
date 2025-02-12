import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectTheme } from "./app-selectors";
import { useEffect } from "react";
import { initializeAppTC } from "../features/auth/model/auth-reducer";
import { selectIsInitialized } from "../features/auth/model/authSelector";
import s from "./App.module.css";
import { CircularProgress } from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Routing} from "../common/routing/Routing";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";

export const App = () => {
  const themeMode = useAppSelector(selectTheme);
  const isInitialized = useAppSelector(selectIsInitialized);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </>
  );
};
