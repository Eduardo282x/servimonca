import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IClients {
    id: string;
    customerName: string;
    customerLastname: string;
    customerEmail: string;
    customerAddress: string;
    createdAt: string;
}

// Table
export const customerColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'customerName',
        element: (data: IClients) => data.customerName,
    },
    {
        label: 'Apellido',
        column: 'customerLastName',
        element: (data: IClients) => data.customerLastname,
    },
    {
        label: 'Correo',
        column: 'customerEmail',
        element: (data: IClients) => data.customerEmail,
    },
    {
        label: 'Dirección',
        column: 'customerAddress',
        element: (data: IClients) => data.customerAddress.toString(),
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
    customerName: string;
    customerLastname: string;
    customerEmail: string;
    customerAddress: string;
}

export const clientsDataForm: IDataForm[] = [
    {
        label: 'Nombre',
        value: '',
        type: 'text',
        name: 'customerName',
    },
    {
        label: 'Apellido',
        value: '',
        type: 'text',
        name: 'customerLastname',
    },
    {
        label: 'Correo',
        value: '',
        type: 'email',
        name: 'customerEmail',
    },
    {
        label: 'Dirección',
        value: '',
        type: 'text',
        name: 'customerAddress',
    }
];

export const clientsDefaultValues : IClientsForm = {
    customerName: '',
    customerLastname: '',
    customerEmail: '',
    customerAddress: ''
}

export const clientsValidationSchema : object = z.object({
    customerName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    customerLastname: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    customerEmail: z.string().email().refine(email => email !== '', { message: 'El campo es requerido' }),
    customerAddress: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});

