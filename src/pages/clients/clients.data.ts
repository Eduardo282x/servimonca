import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";


export interface IClients {
    id: number;
    name: string;
    lastname: string;
    rif: string;
    phone: string;
    email: string;
    address: string;
    createdAt: Date;
}


// Table
export const customerColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'name',
        element: (data: IClients) => data.name,
    },
    {
        label: 'Apellido',
        column: 'lastname',
        element: (data: IClients) => data.lastname,
        canFilter: false,
    },
    {
        label: 'Razón social',
        column: 'rif',
        element: (data: IClients) => data.rif.toString(),
    },
    {
        label: 'Teléfono',
        column: 'phone',
        element: (data: IClients) => data.phone.toString(),
    },
    {
        label: 'Correo',
        column: 'email',
        element: (data: IClients) => data.email.toString(),
    },
    {
        label: 'Dirección',
        column: 'address',
        element: (data: IClients) => data.address,
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
];

//Dialog & Form
export interface IClientsForm {
    id: number;
    name: string;
    lastname: string;
    rif: string;
    phone: string;
    email: string;
    address: string;
}

export const clientsDataForm: IDataForm[] = [
    {
        label: 'Nombre',
        value: '',
        type: 'text',
        name: 'name',
    },
    {
        label: 'Apellido',
        value: '',
        type: 'text',
        name: 'lastname',
    },
    {
        label: 'Rif',
        value: '',
        type: 'text',
        name: 'rif',
    },
    {
        label: 'Teléfono',
        value: '',
        type: 'text',
        name: 'phone',
    },
    {
        label: 'Correo',
        value: '',
        type: 'email',
        name: 'email',
    },
    {
        label: 'Dirección',
        value: '',
        type: 'text',
        name: 'address',
    }
];

export const clientsDefaultValues: IClientsForm = {
    id: 0,
    name: '',
    lastname: '',
    rif: '',
    phone: '',
    email: '',
    address: '',
}

export const clientsValidationSchema: object = z.object({
    name: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastname: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    rif: z.string().email().refine(email => email !== '', { message: 'El campo es requerido' }),
    phone: z.string().email().refine(email => email !== '', { message: 'El campo es requerido' }),
    email: z.string().email().refine(email => email !== '', { message: 'El campo es requerido' }),
    address: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});

