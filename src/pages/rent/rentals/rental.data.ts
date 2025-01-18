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
        element: (data: IRental) => data.description !== null ?  data.description : '-',
    },
    {
        label: 'Costo',
        column: 'totalCost',
        element: (data: IRental) => formatNumberWithDots(data.totalCost,'','$'),
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