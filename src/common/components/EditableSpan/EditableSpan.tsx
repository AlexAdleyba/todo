import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  title: string;
  onChange: (newTitle: string) => void;
  disabled?: boolean;
};
export const EditableSpan = ({ title, onChange, disabled }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  let [newTitle, setNewTitle] = useState(title);

  const isActivated = () => {
    if (disabled) return;
    setIsEditable(!isEditable);
    onChange(newTitle);
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return (
    <>
      {isEditable ? (
        <TextField value={newTitle} onBlur={isActivated} onChange={changeTitleHandler} label="Edite a title" variant="outlined" size="small" autoFocus />
      ) : (
        <span onDoubleClick={isActivated}>{title}</span>
      )}
    </>
  );
};
