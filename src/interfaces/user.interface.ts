export interface IUser {
    firstname: string;
    rol: string;
}

export interface UserData {
    id:        number;
    firstName: string;
    lastName:  string;
    username:  string;
    password:  string;
    identify:  string;
    rolId:     number;
    status:    boolean;
    rol:       Rol;
}

export interface Rol {
    id:  number;
    rol: string;
}
