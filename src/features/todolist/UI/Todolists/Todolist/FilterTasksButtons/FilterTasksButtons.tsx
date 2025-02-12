
import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../../../../app/hooks";
import {changeTodolistFilterAC, DomainTodolist} from "../../../../model/todolists-reducer";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";
import type {FilterValues} from "../../../../../../common/types/types";

type Props = {
    todolist: DomainTodolist
};

export const FilterTasksButtons = ({todolist}: Props) => {

    const dispatch = useAppDispatch();

    const filteredTaskHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId: todolist.id, filter}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button variant={todolist.filter === "all" ? "outlined" : "text"} onClick={() => filteredTaskHandler("all")}
                    size="small">All</Button>
            <Button variant={todolist.filter === "active" ? "outlined" : "text"}
                    onClick={() => filteredTaskHandler("active")} size="small">Active</Button>
            <Button variant={todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={() => filteredTaskHandler("completed")} size="small">Completed</Button>
        </Box>
    );
};