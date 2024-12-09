import { IUser } from "../interfaces/user.interface";

export const validateUserLoged = (): null | IUser => {
    const getLocalStorageUser: IUser = JSON.parse(localStorage.getItem('userData') as string) as IUser;

    if(!getLocalStorageUser){
        return null;
    }

    return getLocalStorageUser;
}