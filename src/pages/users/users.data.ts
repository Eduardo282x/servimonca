import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IUsers {
    identify: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
} 

export const usersDataForm: IDataForm[] = [
    {
        label: 'Identificación',
        value: '',
        type: 'text',
        name: 'identify',
    },
    {
        label: 'Usuario',
        value: '',
        type: 'text',
        name: 'username',
    },
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
        label: 'Contraseña',
        value: '',
        type: 'text',
        name: 'password',
    },
];

export const usersDefaultValues : IUsers = {
    identify: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
}

export const usersValidationSchema : object = z.object({
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    username: z.string().refine(email => email !== '', { message: 'El campo es requerido' }),
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    password: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});

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
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
        canFilter: false
    },
];




