import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import s from "./Login.module.css";
import { loginTC } from "../../model/auth-reducer";
import { selectIsLoggedIn } from "../../model/authSelector";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {Path} from "../../../../common/routing/Routing";
import {Grid} from "@mui/material";

export type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Inputs>({ defaultValues: { email: "", password: "", rememberMe: false } });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();
    dispatch(loginTC(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main);
    }
  }, [navigate, isLoggedIn]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Incorrect email address",
                },
              })}
            />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            <FormControlLabel
              label={"Remember me"}
              control={<Controller name={"rememberMe"} control={control} render={({ field: { onChange, value } }) => <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />} />}
              {...register("rememberMe")}
            />
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  );
};
