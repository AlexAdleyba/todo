import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useAppDispatch } from "../../../../../app/hooks";
import { addTaskTC } from "../../../model/tasks-reducer";
import { DomainTodolist } from "../../../model/todolists-reducer";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";

type Props = {
  todolist: DomainTodolist;
};

export const Todolist = (props: Props) => {
  const { todolist } = props;

  const dispatch = useAppDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
