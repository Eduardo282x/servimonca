import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";

export interface IHistory {
    id: string;
    sparePartId: string;
    operationType: 'entrada' | 'salida' | '';
    quantity: number;
    operationDate: string;
    description: string;
}

//Table
export const historyColumns: IColumns[] = [
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
        label: 'Descripción',
        column: 'description',
        element: (data: IHistory) => data.description,
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
    operationType: 'entrada' | 'salida' | '';
    quantity: number;
    operationDate: string;
    description: string;
}

export const historyDataForm: IDataForm[] = [
    {
        label: 'Tipo de Operación',
        value: '',
        type: 'text',
        name: 'operationType',
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
        type: 'text',
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
    operationType: '',
    quantity: 0,
    operationDate: '',
    description: '',
}

export const historyValidationSchema: object = z.object({
    operationType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    quantity: z.number({ message: 'El campo es requerido' }),
    operationDate: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});