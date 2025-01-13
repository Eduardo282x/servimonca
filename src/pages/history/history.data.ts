import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";

export interface IHistory {
    id:            number;
    sparePartId:   number;
    operationType: string;
    quantity:      number;
    operationDate: Date;
    description:   string;
    sparePart:     SparePart;
}

export interface SparePart {
    id:            number;
    sparePartName: string;
    description:   string;
    currentStock:  number;
    minimumStock:  number;
    maximumStock:  number;
    createdAt:     Date;
}


//Table
export const historyColumns: IColumns[] = [
    {
        label: 'Repuesto',
        column: 'operationType',
        element: (data: IHistory) => data.sparePart.sparePartName,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IHistory) => data.description,
    },
    {
        label: 'Operación Realizada',
        column: 'operationType',
        element: (data: IHistory) => data.operationType,
    },
    {
        label: 'Cantidad',
        column: 'quantity',
        element: (data: IHistory) => data.quantity.toString(),
    },
    {
        label: 'Fecha',
        column: 'operationDate',
        element: (data: IHistory) => formatDate(data.operationDate),
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
export interface IHistoryForm {
    sparePartId: string;
    operationType: string;
    quantity: number;
    operationDate: string;
    description: string;
}

export const historyDataForm: IDataForm[] = [
    {
        label: 'Repuesto',
        value: '',
        type: 'select',
        name: 'sparePartId',
    },
    {
        label: 'Tipo de Operación',
        value: '',
        type: 'select',
        name: 'operationType',
        options: [
            {
                label: 'Entrada',
                value: 'Entrada'
            },
            {
                label: 'Salida',
                value: 'Salida'
            }
        ]
    },
    {
        label: 'Cantidad',
        value: '',
        type: 'number',
        name: 'quantity',
    },
    {
        label: 'Fecha',
        value: '',
        type: 'date',
        name: 'operationDate',
    },
    {
        label: 'Descripción',
        value: '',
        type: 'text',
        name: 'description',
    }
];

export const historyDefaultValues : IHistoryForm = {
    sparePartId: '',
    operationType: '',
    quantity: 0,
    operationDate: '',
    description: '',
}

export const historyValidationSchema: object = z.object({
    sparePartId: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    operationType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    quantity: z.number({ message: 'El campo es requerido' }),
    operationDate: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});