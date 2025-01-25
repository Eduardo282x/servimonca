import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { getDataApi } from "../../API/AxiosActions";

export interface IPayments {
    id: number;
    bank: string;
    identify: string;
    email: string;
    phone: string;
    owner: string;
    type: string;
}

export interface IBanks {
    bank: string;
}


//Table
export const paymentsColumns: IColumns[] = [
    {
        label: 'Titular',
        column: 'owner',
        element: (data: IPayments) => data.owner,
    },
    {
        label: 'Banco',
        column: 'bank',
        element: (data: IPayments) => data.bank,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IPayments) => data.identify,
    },
    {
        label: 'Teléfono',
        column: 'phone',
        element: (data: IPayments) => data.phone,
    },
    {
        label: 'Correo',
        column: 'email',
        element: (data: IPayments) => data.email,
    },
    {
        label: 'Tipo',
        column: 'type',
        element: (data: IPayments) => data.type,
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
export interface IPaymentForm {
    bank: string;
    identify: string;
    email: string;
    phone: string;
    owner: string;
    type: string;
}

export const paymentDataForm: IDataForm[] = [
    {
        label: 'Titular',
        value: '',
        type: 'text',
        name: 'owner',
    },
    {
        label: 'Banco',
        value: '',
        type: 'select',
        name: 'bank',
        options: []
    },
    {
        label: 'Cédula',
        value: '',
        type: 'text',
        name: 'identify',
    },
    {
        label: 'Correo',
        value: '',
        type: 'text',
        name: 'email',
    },
    {
        label: 'Teléfono',
        value: '',
        type: 'text',
        name: 'phone',
    },
    {
        label: 'Tipo',
        value: '',
        type: 'select',
        name: 'type',
        options: [
            {
                label: 'Efectivo',
                value: 'Efectivo'
            },
            {
                label: 'Transferencia',
                value: 'Transferencia'
            }
        ]
    }
];

export const paymentDefaultValues: IPaymentForm = {
    bank: '',
    identify: '',
    email: '',
    phone: '',
    owner: '',
    type: ''
}

export const paymentValidationSchema: object = z.object({
    bank: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    email: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    phone: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    owner: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    type: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

// functions
export const getDataApiV2 = async (): Promise<IPayments[]> => {
    return await getDataApi('/payment').then((response: IPayments[]) => {
        return response;
    })
}








