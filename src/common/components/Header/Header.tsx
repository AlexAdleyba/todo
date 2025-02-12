import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import { changeThemeAC } from "../../../app/app-reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectStatus, selectTheme } from "../../../app/app-selectors";
import { LinearProgress } from "@mui/material";
import { selectIsLoggedIn } from "../../../features/auth/model/authSelector";
import { logoutTC } from "../../../features/auth/model/auth-reducer";
import {MenuButton} from "../MenuButton/MenuButton";

export const Header = () => {
  const themeMode = useAppSelector(selectTheme);
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"));
  };

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  );
};
