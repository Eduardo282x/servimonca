import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";

export interface IWorkshop {
    id: number;
    equipmentId: number;
    workOrderDate: string;
    description: string;
    workOrderStatus: string;
    createdAt: string;
}

//Table
export const workshopColumns: IColumns[] = [
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IWorkshop) => data.description,
    },
    {
        label: 'Estado',
        column: 'workOrderStatus',
        element: (data: IWorkshop) => data.workOrderStatus,
    },
    {
        label: 'Fecha de la Orden',
        column: 'workOrderDate',
        element: (data: IWorkshop) => formatDate(data.workOrderDate),
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
export interface IWorkshopForm {
    workOrderDate: string;
    description: string;
    workOrderStatus: string;
}

export const workshopDataForm: IDataForm[] = [
    {
        label: 'Fecha de la Orden',
        value: '',
        type: 'text',
        name: 'workOrderDate',
    },
    {
        label: 'Descripción',
        value: '',
        type: 'text',
        name: 'description',
    },
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'workOrderStatus',
    },
];

export const workshopDefaultValues : IWorkshopForm = {
    workOrderDate: '',
    description: '',
    workOrderStatus: '',
}

export const workshopValidationSchema: object = z.object({
    workOrderDate: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    username: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    workOrderStatus: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});