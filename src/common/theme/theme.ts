import {createTheme} from "@mui/material/styles";
import {ThemeMode} from "../../app/app-reducer";

export const getTheme = (themeMode: ThemeMode) => createTheme({
    palette: {
        mode: themeMode,
        primary: {
            main: '#9b40e4',
        },
    },
})