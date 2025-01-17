import { z } from "zod";
import { IOptions } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";

export interface IReportForm {
    startDate: Date | null,
    endDate: Date | null,
    type: string
}

export const validation = z.object({
    startDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    endDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    type: z.string().refine(text => text !== '', {message: 'Este campo es requerido.'})
})

export type keysForm = 'startDate' | 'endDate'

export interface IReports {
    id: string;
    reportType: string;
    description: string;
    createdAt: string;
}

export const optionReports: IOptions[] = [
    { label: 'Solicitudes', value: 'Solicitudes' },
    { label: 'Repuestos', value: 'Repuestos' },
    { label: 'Alquileres', value: 'Alquileres' },
    { label: 'Mantenimiento', value: 'Mantenimiento' },
]

//Table
export const reportColumns: IColumns[] = [
    {
        label: 'Tipo de Reporte',
        column: 'reportType',
        element: (data: IReports) => data.reportType,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IReports) => data.description,
    },
    {
        label: 'Fecha',
        column: 'createdAt',
        element: (data: IReports) => formatDate(data.createdAt),
        canFilter: false
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
];
