import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";


export interface IClients {
    id:        number;
    name:      string;
    lastname:  string;
    rif:       string;
    phone:     string;
    email:     string;
    address:   string;
    createdAt: Date;
}


// Table
export const customerColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'customerName',
        element: (data: IClients) => data.name,
    },
    {
        label: 'Apellido',
        column: 'customerLastnamea',
        element: (data: IClients) => data.lastname,
        canFilter: false,
    },
    {
        label: 'Razón social',
        column: 'customerEmail',
        element: (data: IClients) => data.email.toString(),
    },
    {
        label: 'Teléfono',
        column: 'customerEmail',
        element: (data: IClients) => data.phone.toString(),
    },
    {
        label: 'Correo',
        column: 'customerEmail',
        element: (data: IClients) => data.email.toString(),
    },
    {
        label: 'Dirección',
        column: 'customerAddress',
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
    id: string;
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
    id: '',
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

