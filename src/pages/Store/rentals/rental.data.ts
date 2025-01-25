import { z } from "zod";
import { IDataForm } from "../../../interfaces/form.interface";
import { IRental } from "../../../interfaces/rental.interface";
import { IColumns } from "../../../interfaces/table.interface";
import { formatDate } from "../../../utils/formater";

export const rentalColumns: IColumns[] = [
    {
        label: 'Equipo',
        column: 'model',
        element: (data: IRental) => data.equipment.model,
    },
    {
        label: 'Cliente',
        column: 'client',
        element: (data: IRental) => `${data.client.name} ${data.client.lastname}`,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IRental) => data.description !== null ? data.description : '-',
    },
    {
        label: 'Fecha Inicial',
        column: 'rentalStartDate',
        element: (data: IRental) => formatDate(data.rentalStartDate),
    },
    {
        label: 'Fecha Fin',
        column: 'rentalEndDate',
        element: (data: IRental) => formatDate(data.rentalEndDate),
    },
    {
        label: 'Estado',
        column: 'status',
        element: (data: IRental) => data.status.toString(),
    },
    {
        label: 'Cambiar',
        column: 'edit',
        icon: true,
        element: () => 'info',
        canFilter: false
    },
];

export interface IRentalForm {
    clientId: number;
    equipmentId: number;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalCost: number;
    paymentId: number;
    description: string;
}

export const rentalDataForm: IDataForm[] = [
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'status',
        options: [
            {
                label: 'Entregado',
                value: 'Entregado'
            },
            {
                label: 'Recibido',
                value: 'Recibido'
            },
            {
                label: 'Denegado',
                value: 'Denegado'
            }
        ]
    },
];

export const rentalFormSchema = z.object({
    status: z.string()
});