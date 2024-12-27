import { UserData } from "./user.interface";

export interface BaseResponse {
    success:    boolean;
    message:    string;
}

export interface BaseResponseLogin extends BaseResponse {
    userData: UserData;
}







