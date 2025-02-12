import { addTodolistTC } from "../features/todolist/model/todolists-reducer";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Todolists } from "../features/todolist/UI/Todolists/Todolists";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../features/auth/model/authSelector";
import {Path} from "../common/routing/Routing";
import Grid2 from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";

export const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login);
    }
  }, [navigate, isLoggedIn]);

  const addTodolist = (todolistTitle: string) => {
    dispatch(addTodolistTC(todolistTitle));
  };
  return (
    <Container fixed sx={{ mt: "30px" }}>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
};
