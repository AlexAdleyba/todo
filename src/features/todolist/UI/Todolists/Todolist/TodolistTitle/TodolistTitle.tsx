import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../app/hooks";
import styles from "./TodolistTitle.module.css";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(todolist.id));
  };
  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }));
  };
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan title={todolist.title} onChange={updateTodolistHandler} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
