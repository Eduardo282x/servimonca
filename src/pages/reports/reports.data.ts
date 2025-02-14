import { z } from "zod";
import { IOptions } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { IMaintenance } from "../maintenance/maintenance.data";
import { formatDate } from "../../utils/formater";

export interface IReportForm {
    startDate: Date | null,
    endDate: Date | null,
    type: string
}

export const validation = z.object({
    startDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    endDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    type: z.string().refine(text => text !== '', { message: 'Este campo es requerido.' })
})

export type keysForm = 'startDate' | 'endDate'

export type TypeReport = 'equipment' | 'sparePart' | 'equipmentAvailable' | 'rentals' | 'request' | 'requestClient' | ''

export const optionReports: IOptions[] = [
    { label: 'Equipos solicitados', value: 'equipment' },
    { label: 'Repuestos solicitados', value: 'sparePart' },

    { label: 'Equipos disponibles', value: 'equipmentAvailable' },
    { label: 'Solicitudes de alquiler', value: 'rentals' },
    { label: 'Solicitudes de mantenimiento', value: 'request' },
    { label: 'Solicitudes de mantenimiento cliente', value: 'requestClient' },
];
export interface ISparePartReport {
    sparePartId: number;
    sparePart: string;
    model: string;
    brand: string;
    totalUsed: number;
}
export interface IEquipmentReport {
    equipmentId: number;
    model: string;
    serialNumber: string;
    placa: string;
    rentalCount: number;
}

export const mostRentedEquipmentsColumns: IColumns[] = [
    {
        label: 'Modelo',
        column: 'model',
        element: (data: IEquipmentReport) => data.model,
        canFilter: true,
    },
    {
        label: 'Numero de serie',
        column: 'serialNumber',
        element: (data: IEquipmentReport) => data.serialNumber,
        canFilter: true,
    },
    {
        label: 'Placa',
        column: 'placa',
        element: (data: IEquipmentReport) => data.placa,
        canFilter: true,
    },
    {
        label: 'Veces Alquilado',
        column: 'totalRented',
        element: (data: IEquipmentReport) => data.rentalCount.toString(),
    },
];

export const mostRequestedSparePartsColumns: IColumns[] = [
    {
        label: 'Nombre del Repuesto',
        column: 'sparePart',
        element: (data: ISparePartReport) => data.sparePart,
        canFilter: true,
    },
    {
        label: 'Modelo',
        column: 'model',
        element: (data: ISparePartReport) => data.model,
        canFilter: true,
    },
    {
        label: 'Marca',
        column: 'brand',
        element: (data: ISparePartReport) => data.brand,
        canFilter: true,
    },
    {
        label: 'Cantidad Solicitada',
        column: 'totalRequested',
        element: (data: ISparePartReport) => data.totalUsed.toString(),
    },
];

export const lastColumnMaintenance: IColumns = {
    label: 'Fecha Final',
    column: 'maintenanceDateEnd',
    element: (data: IMaintenance) => data.maintenanceDateEnd ? formatDate(data.maintenanceDateEnd) : '-',
    canFilter: true,
}

export const statusEquipment: IOptions[] = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Usado', value: 'Usado' },
    { label: 'Mantenimiento', value: 'Mantenimiento' },
]

export const statusRental: IOptions[] = [
    { label: 'Entregado', value: 'Entregado' },
    { label: 'Solicitado', value: 'Solicitado' },
    { label: 'Denegado', value: 'Denegado' },
    { label: 'Recibido', value: 'Recibido' },
]

export const statusMaintenance: IOptions[] = [
    { label: 'Completado', value: 'Completado' },
    { label: 'Procesando', value: 'Procesando' },
    { label: 'Denegado', value: 'Denegado' },
    { label: 'Pendiente', value: 'Pendiente' },
]