import { ChangeEvent } from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../../../../../app/hooks";
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer";
import { getListItemSx } from "./Task.styles";
import { TodolistType } from "../../../../../api/todolistsApi.types";
import { DomainTask } from "../../../../../api/tasksApi.types";
import {TaskStatus} from "../../../../../../../common/enums/enums";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";

type Props = {
  todolist: TodolistType;
  task: DomainTask;
  disabled: boolean;
};
export const Task = ({ todolist, task, disabled }: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const newTask = { ...task, status };
    dispatch(updateTaskTC(newTask));
  };

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId: todolist.id, taskId: task.id }));
  };

  const updateTaskTitleHandler = (title: string) => {
    const newTask = { ...task, title };
    dispatch(updateTaskTC(newTask));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(e)} disabled={disabled} />
        <EditableSpan title={task.title} onChange={updateTaskTitleHandler} disabled={disabled} />
      </div>
      <IconButton disabled={disabled}>
        <DeleteIcon onClick={removeTaskHandler} />
      </IconButton>
    </ListItem>
  );
};
