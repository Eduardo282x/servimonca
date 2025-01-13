import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate } from "../../utils/formater";
import dayjs, { Dayjs } from "dayjs";

export interface IWorkshop {
    id: string;
    equipmentId: number;
    model: Model
    workOrderDate: Dayjs;
    description: string;
    workOrderStatus: string;
    createdAt: string;
}

export interface Model {
    id: number;
    model: string;
}

//Table
export const workshopColumns: IColumns[] = [
    {
        label: 'Modelo',
        column: 'equipmentId',
        element: (data: IWorkshop) => data.equipmentId.toString(),
    },
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
        element: (data: IWorkshop) => formatDate(data.workOrderDate.toString()),
    },
    {
        label: 'Fecha de creación',
        column: 'createdAt',
        element: (data: IWorkshop) => formatDate(data.createdAt.toString()),
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
    id: string;
    equipmentId: number;
    workOrderDate: Dayjs | null;
    description: string;
    workOrderStatus: string;
}

export const workshopDataForm: IDataForm[] = [
    {
        label: 'Modelo',
        value: '',
        type: 'select',
        name: 'equipmentId',
        options: []
    },
    {
        label: 'Fecha de la Orden',
        value: '',
        type: 'date',
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
        options: [
            {
                label: 'En Progreso',
                value: 'En Progreso'
            },
            {
                label: 'Completada',
                value: 'Completada'
            }
        ]
    },
];

export const workshopDefaultValues : IWorkshopForm = {
    id: '',
    equipmentId: 0,
    workOrderDate: null,
    description: '',
    workOrderStatus: '',
}

export const workshopValidationSchema: object = z.object({
    equipmentId: z.coerce.number({ message: 'El campo es requerido' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    workOrderStatus: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});