import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { formatDate } from "../../utils/formater";
import { IEquipment } from "../Store/equipment/equipment.data";
import { IClients } from "../clients/clients.data";

// ******************** Maintenance *********************
export interface IMaintenance {
    id: number;
    equipmentId: number;
    sparePartId: number;
    clientId?: number;
    type: string;
    status: string;
    description: string;
    maintenanceDate: Date;
    createdAt: Date;
    equipment: IEquipment;
    client?: IClients;
}

export const maintenanceColumns: IColumns[] = [
    {
        label: 'Tipo',
        column: 'type',
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
        label: 'Estado',
        column: 'status',
        element: (data: IMaintenance) => data.status,
    },
    {
        label: 'Fecha',
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
    maintenanceDate: Date;
    description: string;
    type: string;
    equipmentId: number;
    clientId?: number;
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
        name: 'type',
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
    }
];

export const maintenanceDefaultValues: IMaintenanceForm = {
    equipmentId: 0,
    type: '',
    maintenanceDate: new Date(),
    description: ''
}

export const maintenanceValidationSchema: object = z.object({
    equipmentId: z.coerce.number({ message: 'El campo es requerido' }),
    type: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

// ******************** Maintenance Client *********************

// Table
export const maintenanceClientColumns: IColumns[] = [
    {
        label: 'Cliente',
        column: 'client',
        element: (data: IMaintenance) => data.client ? `${data.client.name} ${data.client.lastname}` : '-',
    },
    ...maintenanceColumns,
];

// Form & Dialog
export const maintenanceClientDataForm: IDataForm[] = [
    {
        label: 'Cliente',
        value: '',
        type: 'select',
        name: 'clientId',
        options: []
    },
    ...maintenanceDataForm
];

export const maintenanceClientDefaultValues: IMaintenanceForm = {
    clientId: 0,
    equipmentId: 0,
    type: '',
    maintenanceDate: new Date(),
    description: '',
}

export const maintenanceClientValidationSchema: object = z.object({
    clientId: z.coerce.number({ message: 'El campo es requerido' }),
    equipmentId: z.coerce.number({ message: 'El campo es requerido' }),
    type: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

// ******************** Edit Maintenance *********************
export interface IMaintenanceEdit {
    id: number;
    description: string;
}

export const maintenanceEditDataForm: IDataForm[] = [
    {
        label: 'Descripción',
        value: '',
        type: 'textArea',
        name: 'description',
    },
];

export const maintenanceEditDefaultValues: IMaintenanceEdit = {
    id: 0,
    description: '',
}

export const maintenanceEditValidationSchema: object = z.object({
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

// ******************** Requests *********************

// Table
export const maintenanceRequestColumns: IColumns[] = [
    {
        label: 'Cliente',
        column: 'client',
        element: (data: IMaintenance) => data.client ? `${data.client.name} ${data.client.lastname}` : '-',
    },
    {
        label: 'Tipo',
        column: 'type',
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
        label: 'Estado',
        column: 'status',
        element: (data: IMaintenance) => data.status,
    },
    {
        label: 'Fecha',
        column: 'maintenanceDate',
        element: (data: IMaintenance) => formatDate(data.maintenanceDate),
    },
    {
        label: 'Cambiar',
        column: 'edit',
        icon: true,
        element: () => 'info',
        canFilter: false
    },
];

// Form & Dialog
export interface UpdateMaintenanceStatus {
    id: number;
    status: string;
}

export const maintenanceRequestDefaultValues: UpdateMaintenanceStatus = {
    status: '',
    id: 0
}

export const existMaintenanceDataForm: IDataForm[] = [
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'status',
        options: [
            {
                label: 'Aprobar',
                value: 'Procesando'
            },
            {
                label: 'Denegar',
                value: 'Denegado'
            },
        ]
    },
];

export const existMaintenanceValidationSchema: object = z.object({
    status: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});


// ******************** TABS *********************
export const maintenanceTabsProperties = [
    {
        label: 'Mantenimientos'
    },
    {
        label: 'Solicitudes de Mantenimiento'
    },
    {
        label: 'Repuestos de taller'
    }
];


