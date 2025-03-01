import { Inputs } from "../ui/Login/Login";
import { Response } from "../../../common/types/types";
import {instance} from "../../../common/instance/instance";

export const authApi = {
  login(payload: Inputs) {
    return instance.post<Response<{ userId: number; token: string }>>(`auth/login`, payload);
  },
  logout() {
    return instance.delete<Response>(`auth/login`);
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>(`auth/me`);
  },
};
