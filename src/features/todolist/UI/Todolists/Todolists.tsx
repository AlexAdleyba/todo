import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectTodolists } from "../../model/todolists-selectors";
import { fetchTodolistsTC } from "../../model/todolists-reducer";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC);
  }, []);

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Paper sx={{ p: "0 20px 20px 20px" }} key={tl.id}>
            <Todolist todolist={tl} />
          </Paper>
        );
      })}
    </>
  );
};
