import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";

export interface IReports {
    id: string;
    reportType: string;
    description: string;
    createdAt: string;
}

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
