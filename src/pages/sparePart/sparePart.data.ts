import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";

export interface ISparePart {
    id: number;
    sparePart: string;
    model: string;
    brand: string;
    amount: number;
    description: string;
    criticAmount: number;
}

export const sparePartColumns: IColumns[] = [
    {
        label: 'Repuesto',
        column: 'sparePart',
        element: (data: ISparePart) => data.sparePart,
    },
    {
        label: 'Marca',
        column: 'brand',
        element: (data: ISparePart) => data.brand,
    },
    {
        label: 'Modelo',
        column: 'model',
        element: (data: ISparePart) => data.model,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: ISparePart) => data.description,
    },
    {
        label: 'Cantidad',
        column: 'amount',
        element: (data: ISparePart) => data.amount.toString(),
    },
    {
        label: 'Cantidad Critica',
        column: 'criticAmount',
        element: (data: ISparePart) => data.criticAmount.toString(),
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
export interface ISparePartForm {
    id: number;
    sparePart: string;
    brand: string;
    model: string;
    description: string;
    amount: number;
    criticAmount: number;
}

export const sparePartDataForm: IDataForm[] = [
    {
        label: 'Repuesto',
        value: '',
        type: 'text',
        name: 'sparePart',
    },
    {
        label: 'Marca',
        value: '',
        type: 'text',
        name: 'brand',
    },
    {
        label: 'Modelo',
        value: '',
        type: 'text',
        name: 'model',
    },
    {
        label: 'Descripción',
        value: '',
        type: 'text',
        name: 'description',
    },
    {
        label: 'Cantidad',
        value: '',
        type: 'number',
        name: 'amount',
    },
    {
        label: 'Cantidad critica',
        value: '',
        type: 'number',
        name: 'criticAmount',
    }
];

export const sparePartEditDataForm: IDataForm[] = [
    {
        label: 'Repuesto',
        value: '',
        type: 'text',
        name: 'sparePart',
    },
    {
        label: 'Marca',
        value: '',
        type: 'text',
        name: 'brand',
    },
    {
        label: 'Modelo',
        value: '',
        type: 'text',
        name: 'model',
    },
    {
        label: 'Descripción',
        value: '',
        type: 'text',
        name: 'description',
    },
    {
        label: 'Cantidad critica',
        value: '',
        type: 'number',
        name: 'criticAmount',
    }
];

export const sparePartDefaultValues: ISparePartForm = {
    id: 0,
    sparePart: '',
    brand: '',
    model: '',
    description: '',
    amount: 0,
    criticAmount: 0,
}

export const sparePartValidationSchema: object = z.object({
    sparePart: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    brand: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    model: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    amount: z.coerce.number({ message: 'El campo es requerido' }),
    criticAmount: z.coerce.number({ message: 'El campo es requerido' }),
});


export const existSparePartDataForm: IDataForm[] = [
    {
        label: 'Repuesto',
        value: '',
        type: 'select',
        name: 'id',
        options: []
    },
    {
        label: 'Cantidad',
        value: '',
        type: 'number',
        name: 'amount',
    },
];

export const sparePartExistValidationSchema: object = z.object({
    id: z.coerce.number({ message: 'El campo es requerido' }),
    amount: z.coerce.number({ message: 'El campo es requerido' }),
});