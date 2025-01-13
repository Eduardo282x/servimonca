import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IReports {
    id: string;
    reportType: string;
    description: string;
    createdAt: string;
}

//Table
export const reportColumns: IColumns[] = [
    {
        label: 'Reporte',
        column: 'id',
        element: (data: IReports) => data.id,
    },
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
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
];


//Dialog & Form
export interface IReportForm {
    reportType: string;
    description: string;
}

export const reportsDataForm: IDataForm[] = [
    {
        label: 'Tipo de Reporte',
        value: '',
        type: 'select',
        name: 'reportType',
        options: [
            {
                label: 'Inventario',
                value: 'Inventario'
            },
            {
                label: 'Mantenimiento',
                value: 'Mantenimiento'
            }
        ]
    },
    {
        label: 'Descripción',
        value: '',
        type: 'text',
        name: 'description',
    },
];

export const reportsDefaultValues : IReportForm = {
    reportType: '',
    description: '',
}

export const reportsValidationSchema: object = z.object({
    reportType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    description: z.string().refine(email => email !== '', { message: 'El campo es requerido' }),
});