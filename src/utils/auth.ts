import { UserData } from "../interfaces/user.interface";

export const validateUserLoged = (): null | UserData => {
    const getLocalStorageUser: UserData = JSON.parse(localStorage.getItem('userData') as string) as UserData;

    if(!getLocalStorageUser){
        return null;
    }

    return getLocalStorageUser;
}