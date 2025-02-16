import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { getDataApi } from "../../API/AxiosActions";

export interface IUsers {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    identify: string;
    rolId: number;
    rol: Rol;
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
        column: 'rol.rol',
        element: (data: IUsers) => data.rol.rol,
    },
    {
        label: 'Contraseña',
        column: 'password',
        icon: true,
        element: () => 'password',
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
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    identify: string;
    rolId: number;
}

export interface IUserPasswordForm {
    id: string;
    password: string;
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
    },
    {
        label: 'Rol',
        value: '',
        type: 'select',
        name: 'rolId',
        options: []
    }
];

export const usersPasswordDataForm: IDataForm[] = [
    {
        label: 'Contraseña',
        value: '',
        type: 'text',
        name: 'password',
    }
];

export const usersDefaultValues : IUserForm = {
    id: '',
    identify: '',
    username: '',
    firstName: '',
    lastName: '',
    rolId: 0,
}

export const usersPasswordDefaultValues : IUserPasswordForm = {
    id: '',
    password: ''
}

export const usersValidationSchema: object = z.object({
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    username: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    rolId: z.coerce.number({ message: 'El campo es requerido' }),
});

export const usersPasswordValidationSchema: object = z.object({
    password: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

// functions
export const getDataApiV2 = async () : Promise<IUsers[]> => {
    return await getDataApi('/user').then((response: IUsers[]) => {
        response.map((user => {
            return user;
        }))
        return response;
    })
}








