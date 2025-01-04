import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    identify: string;
    rolId: number;
    status: boolean;
    rol: Rol;
    rolDescription: string;
}

export interface Rol {
    id: number;
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
        column: 'rolDescription',
        element: (data: IUsers) => data.rolDescription,
    },
    {
        label: 'Estado',
        column: 'status',
        icon: true,
        element: (data: IUsers) => data.status ? 'success' : 'error',
        canFilter: false
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
    {
        label: 'Eliminar',
        column: 'delete',
        icon: true,
        element: () => 'delete',
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

export const usersDefaultValues: IUsers = {
    identify: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
}

export const usersValidationSchema: object = z.object({
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    username: z.string().refine(email => email !== '', { message: 'El campo es requerido' }),
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    password: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});