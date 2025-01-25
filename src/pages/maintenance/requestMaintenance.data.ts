import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { ISparePart } from "../Store/sparePart/sparePart.data";

export interface IMaintenanceSparePart {
    id:          number;
    sparePartId: number;
    amount:      number;
    status:      string;
    sparePart:   ISparePart;
}

export const requestSparePartColumns: IColumns[] = [
    {
        label: 'Repuesto',
        column: 'sparePart',
        element: (data: IMaintenanceSparePart) => data.sparePart.sparePart,
    },
    {
        label: 'Cantidad',
        column: 'amount',
        element: (data: IMaintenanceSparePart) => data.amount.toString(),
    },
    {
        label: 'Estado',
        column: 'status',
        element: (data: IMaintenanceSparePart) => data.status.toString(),
    },
    {
        label: 'Cambiar',
        column: 'edit',
        icon: true,
        element: (data: IMaintenanceSparePart) => data.status === 'Aprobado' || data.status === 'Solicitado' ? 'info' : '',
        canFilter: false
    },
];

export const spartePartMaintenanceDataForm: IDataForm[] = [
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'status',
        options: [
            {
                label: 'Aprobar',
                value: 'Aprobado'
            },
            {
                label: 'Denegar',
                value: 'Denegado'
            },
        ]
    },
];

export const requestSpartePartMaintenanceDataForm: IDataForm[] = [
    {
        label: 'Repuesto',
        value: '',
        type: 'select',
        name: 'sparePartId',
        options: []
    },
    {
        label: 'Cantidad',
        value: '',
        type: 'number',
        name: 'amount',
    },
];

export const requestSpartePartMaintenanceDataFormV2: IDataForm[] = [
    {
        label: 'Cantidad usada',
        value: '',
        type: 'number',
        name: 'amount',
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



export const requestSparePartValidationSchema: object = z.object({
    sparePartId: z.coerce.number({ message: 'El campo es requerido' }),
    amount: z.number({ message: 'El campo es requerido' }),
});

export const requestSparePartValidationSchemaV2: object = z.object({
    amount: z.number({ message: 'El campo es requerido' }),
});