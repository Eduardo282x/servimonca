import { Roles } from "../layouts/sidebar.data";

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
    rol: Roles;
}
