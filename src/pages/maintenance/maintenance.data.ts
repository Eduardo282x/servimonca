import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { formatDate } from "../../utils/formater";


export interface IMaintenance {
    id:              number;
    equipmentId:     number;
    sparePartId:     number;
    type:            string;
    description:     string;
    maintenanceDate: Date;
    createdAt:       Date;
    equipment:       Equipment;
}

export interface Equipment {
    id:            number;
    model:         string;
    serialNumber:  string;
    currentStatus: string;
    placa:         string;
    createdAt:     Date;
}


export const maintenanceColumns : IColumns[] = [
    {
        label: 'Tipo de mantenimiento',
        column: 'maintenanceType',
        element: (data: IMaintenance) => data.type,
    },
    {
        label: 'Equipo',
        column: 'model',
        element: (data: IMaintenance) => data.equipment.model,
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

//Dialog & Form
export interface IMaintenanceForm {
    id: string;
    equipmentId: number;
    maintenanceType: string;
    maintenanceDate: Date;
    description: string;
}

export const maintenanceDataForm: IDataForm[] = [
    {
        label: 'Vehículo',
        value: '',
        type: 'select',
        name: 'equipmentId',
        options: []
    },
    {
        label: 'Tipo de mantenimiento',
        value: '',
        type: 'select',
        name: 'maintenanceType',
        options: [
            {
                label: 'Preventivo',
                value: 'Preventivo'
            },
            {
                label: 'Correctivo',
                value: 'Correctivo'
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
        type: 'date',
        name: 'maintenanceDate',
    },
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'status',
        options: [
            {
                label: 'Pendiente',
                value: 'Pendiente'
            },
            {
                label: 'En proceso',
                value: 'En proceso'
            },
            {
                label: 'Completada',
                value: 'Completada'
            }
        ]
    }
];

export const maintenanceDefaultValues: IMaintenanceForm = {
    id: '',
    equipmentId: 0,
    maintenanceType: '',
    maintenanceDate: new Date(),
    description: '',
}

export const maintenanceValidationSchema: object = z.object({
    equipmentId: z.coerce.number({ message: 'El campo es requerido' }),
    maintenanceType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

