import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { formatDate } from "../../utils/formater";

export interface IMaintenance {
    id: string;
    maintenanceType: string;
    maintenanceDate: string;
    description: string;
    equipmentId: string;
    createdAt: string;
};

export const maintenanceColumns : IColumns[] = [
    {
        label: 'Vehículo',
        column: 'equipmentId',
        element: (data: IMaintenance) => data.equipmentId,
    },
    {
        label: 'Tipo de mantenimiento',
        column: 'maintenanceType',
        element: (data: IMaintenance) => data.maintenanceType,
    },
    {
        label: 'Descripción',
        column: 'description',
        element: (data: IMaintenance) => data.description,
    },
    {
        label: 'Fecha de Mantenimiento',
        column: 'maintenanceDate',
        element: (data: IMaintenance) => formatDate(data.maintenanceDate),
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
];

export const maintenanceDataForm: IDataForm[] = [
    {
        label: 'Vehículo',
        value: '',
        type: 'text',
        name: 'id',
    },
    {
        label: 'Tipo de mantenimiento',
        value: '',
        type: 'select',
        name: 'maintenanceType',
        options: [
            {
                label: 'preventiva',
                value: 0
            },
            {
                label: 'correctiva',
                value: 1
            }
        ]
    },
    {
        label: 'Descripción',
        value: '',
        type: 'textArea',
        name: 'description',
    },
    {
        label: 'Fecha de Mantenimiento',
        value: '',
        type: 'text',
        name: 'maintenanceDate',
    },
    // {
    //     label: 'Estado',
    //     value: '',
    //     type: 'select',
    //     name: 'status',
    //     options: [
    //         {
    //             label: 'Pendiente',
    //             value: 'Pendiente'
    //         },
    //         {
    //             label: 'En proceso',
    //             value: 'En proceso'
    //         },
    //         {
    //             label: 'Completada',
    //             value: 'Completada'
    //         }
    //     ]
    // }
];

export const maintenanceDefaultValues: IMaintenance = {
    id: '0',
    maintenanceType: '',
    maintenanceDate: '',
    description: '',
    equipmentId: '',
    createdAt: '',
}

export const maintenanceValidationSchema: object = z.object({
    id: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceDate: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    equipmentId: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    createdAt: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

