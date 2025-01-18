import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { ISparePart } from "../Store/sparePart/sparePart.data";

export const requestColumns: IColumns[] = [
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
        label: 'Cambiar',
        column: 'edit',
        icon: true,
        element: () => 'info',
        canFilter: false
    },
];

export interface UpdateStatusSparePart {
    id: number;
    status: string;
}
export const requestDefaultValues: UpdateStatusSparePart = {
    status: '',
    id: 0
}


export const existSparePartDataForm: IDataForm[] = [
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'status',
        options: [
            {
                label: 'Aprobar',
                value: 'Approved'
            },
            {
                label: 'Denegar',
                value: 'Deny'
            },
        ]
    },
];

export const existSparePartValidationSchema: object = z.object({
    status: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});