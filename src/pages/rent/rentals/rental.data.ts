import { z } from "zod";
import { IDataForm } from "../../../interfaces/form.interface";
import { IRental } from "../../../interfaces/rental.interface";
import { IColumns } from "../../../interfaces/table.interface";
import { formatDate, formatNumberWithDots } from "../../../utils/formater";

export const rentalColumns: IColumns[] = [
    {
        label: 'Equipo',
        column: 'equipment.model',
        element: (data: IRental) => data.equipment.model,
    },
    {
        label: 'Cliente',
        column: 'name',
        element: (data: IRental) => `${data.client.name} ${data.client.lastname}`,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IRental) => data.description !== null ? data.description : '-',
    },
    {
        label: 'Costo',
        column: 'totalCost',
        element: (data: IRental) => formatNumberWithDots(data.totalCost, '', '$'),
    },
    {
        label: 'Pago',
        column: 'payment.bank',
        element: (data: IRental) => data.payment.bank,
    },
    {
        label: 'Fecha Inicial',
        column: 'rentalStartDate',
        element: (data: IRental) => data.rentalStartDate !== null ? formatDate(data.rentalStartDate) : '-',
    },
    {
        label: 'Fecha Fin',
        column: 'rentalEndDate',
        element: (data: IRental) => data.rentalEndDate !== null ? formatDate(data.rentalEndDate) : '-',
    },
    {
        label: 'Estado',
        column: 'status',
        element: (data: IRental) => data.status.toString(),
    }
];

export interface IRentalForm {
    clientId: number;
    equipmentId: number;
    totalCost: number;
    paymentId: number;
    description: string;
}

export const rentalDataForm: IDataForm[] = [
    {
        label: 'Cliente',
        value: '',
        type: 'select',
        name: 'clientId',
        options: [], // Aquí puedes añadir opciones dinámicamente.
    },
    {
        label: 'Equipo',
        value: '',
        type: 'select',
        name: 'equipmentId',
        options: [], // Aquí puedes añadir opciones dinámicamente.
    },
    {
        label: 'Descripción',
        value: '',
        type: 'textArea',
        name: 'description',
    },
    {
        label: 'Pago',
        value: '',
        type: 'select',
        name: 'paymentId',
        options: [], // Aquí puedes añadir opciones dinámicamente.
    },
    {
        label: 'Costo total',
        value: '',
        type: 'number',
        name: 'totalCost',
    }
];

export const rentalFormSchema = z.object({
    clientId: z.coerce.number().positive('Debe seleccionar un cliente válido.'),
    equipmentId: z.coerce.number().positive('Debe seleccionar un equipo válido.'),
    totalCost: z.number().positive('El costo total debe ser mayor a cero.'),
    paymentId: z.coerce.number().positive('Debe seleccionar un método de pago válido.'),
    description: z
        .string()
        .min(5, 'La descripción debe tener al menos 5 caracteres.')
        .max(500, 'La descripción no debe exceder los 500 caracteres.'),
});