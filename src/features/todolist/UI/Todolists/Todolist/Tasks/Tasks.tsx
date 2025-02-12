import List from "@mui/material/List";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { Task } from "./Task/Task";
import { useEffect } from "react";
import { fetchTasksTC } from "../../../../model/tasks-reducer";
import { DomainTodolist } from "../../../../model/todolists-reducer";
import {TaskStatus} from "../../../../../../common/enums/enums";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  let tasksForTodo = tasks[todolist.id];
  if (todolist.filter === "completed") {
    tasksForTodo = tasksForTodo.filter((t) => t.status === TaskStatus.New);
  }
  if (todolist.filter === "active") {
    tasksForTodo = tasksForTodo.filter((t) => t.status === TaskStatus.Completed);
  }

  return (
    <>
      {tasksForTodo?.length === 0 && "EMPTY"}
      <List>
        {tasksForTodo?.map((t) => {
          return <Task todolist={todolist} task={t} disabled={todolist.entityStatus === "loading"} />;
        })}
      </List>
    </>
  );
};
