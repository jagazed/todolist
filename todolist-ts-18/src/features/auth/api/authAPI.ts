
import {instance} from "../../../app/instance/instance";
import {LoginParamsType} from "./authAPI.types";
import {BaseResponse} from "../../../common/types/BaseResponse";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponse<{ userId?: number }>>("auth/login", data);
    },
    logout() {
        return instance.delete<BaseResponse<{ userId?: number }>>("auth/login");
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me");
    },
};

