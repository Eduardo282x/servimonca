import { z } from "zod";
import { IDataForm } from "../../../interfaces/form.interface";
import { IRental } from "../../../interfaces/rental.interface";
import { IColumns } from "../../../interfaces/table.interface";
import { formatDate, formatNumberWithDots } from "../../../utils/formater";

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
        label: 'Costo',
        column: 'totalCost',
        element: (data: IRental) => formatNumberWithDots(data.totalCost, '', '$'),
    },
    {
        label: 'Revisado',
        column: 'checked',
        element: (data: IRental) => data.checked ? 'success' : 'error',
        icon: true,
        canFilter: false
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
    }
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
    },
    {
        label: 'Fecha de inicio del alquiler',
        value: '',
        type: 'date',
        name: 'rentalStartDate',
    },
    {
        label: 'Fecha de fin del alquiler',
        value: '',
        type: 'date',
        name: 'rentalEndDate',
    },
];

export const rentalFormSchema = z.object({
    clientId: z.coerce.number().positive('Debe seleccionar un cliente válido.'),
    equipmentId: z.coerce.number().positive('Debe seleccionar un equipo válido.'),
    rentalStartDate: z.date({
        required_error: 'La fecha de inicio del alquiler es obligatoria.',
    }),
    rentalEndDate: z.date({
        required_error: 'La fecha de fin del alquiler es obligatoria.',
    }),
    totalCost: z.number().positive('El costo total debe ser mayor a cero.'),
    paymentId: z.coerce.number().positive('Debe seleccionar un método de pago válido.'),
    description: z
        .string()
        .min(5, 'La descripción debe tener al menos 5 caracteres.')
        .max(500, 'La descripción no debe exceder los 500 caracteres.'),
});