import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../../app/hooks";
import { selectStatus } from "../../../app/app-selectors";

type Props = {
  addItem: (title: string) => void;
};
export const AddItemForm = (props: Props) => {
  const status = useAppSelector(selectStatus);

  const { addItem } = props;

  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() === "") {
      setError("error! Title incorrect!");
    } else {
      addItem(title.trim());
      setTitle("");
      setError(null);
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      <TextField
        value={title}
        onChange={changeItemHandler}
        onKeyUp={onKeyUpHandler}
        label="Enter a title"
        variant="outlined"
        size="small"
        error={!!error}
        defaultValue="Hello World"
        helperText={error}
        disabled={status === "loading"}
      />

      <IconButton onClick={addItemHandler} color={"primary"} disabled={status === "loading"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
