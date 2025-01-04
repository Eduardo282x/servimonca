import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IUsers {
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

//Table
export const userColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'firstName',
        element: (data: IUsers) => data.firstName,
    },
    {
        label: 'Apellido',
        column: 'lastName',
        element: (data: IUsers) => data.lastName,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IUsers) => data.identify,
    },
    {

        
        label: 'Usuario',
        column: 'username',
        element: (data: IUsers) => data.username,
    },
    {
        label: 'Rol',
        column: 'rol',
        element: (data: IUsers) => data.rol.rol,
    },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
        canFilter: false
    },
];


//Dialog & Form
export interface IUserForm {
    firstName: string;
    lastName: string;
    username: string;
    identify: string;
    rolId: number;
    status: boolean;
}

export const usersDataForm: IDataForm[] = [
    {
        label: 'Nombre',
        value: '',
        type: 'text',
        name: 'firstName',
    },
    {
        label: 'Apellido',
        value: '',
        type: 'text',
        name: 'lastName',
    },
    {
        label: 'Cédula',
        value: '',
        type: 'text',
        name: 'identify',
    },
    {
        label: 'Usuario',
        value: '',
        type: 'text',
        name: 'username',
    }
];

export const usersDefaultValues : IUserForm = {
    identify: '',
    username: '',
    firstName: '',
    lastName: '',
    rolId: 0,
    status: true,
}

export const usersValidationSchema : object = z.object({
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    username: z.string().refine(email => email !== '', { message: 'El campo es requerido' }),
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    rolId: z.number({ message: 'El campo es requerido' }),
    status: z.boolean({ message: 'El campo es requerido' }),
});