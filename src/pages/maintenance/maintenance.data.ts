import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { formatDate } from "../../utils/formater";
import { IEquipment } from "../Store/equipment/equipment.data";
import { ISparePart } from "../Store/sparePart/sparePart.data";


export interface IMaintenance {
    id: number;
    equipmentId: number;
    sparePartId: number;
    amount: number;
    type: string;
    description: string;
    maintenanceDate: Date;
    createdAt: Date;
    equipment: IEquipment;
    sparePart: ISparePart;
}

export const maintenanceColumns: IColumns[] = [
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
        label: 'Repuesto',
        column: 'sparePart',
        element: (data: IMaintenance) => typeof data.sparePart,
    },
    {
        label: 'Cantidad',
        column: 'amount',
        element: (data: IMaintenance) => data.amount.toString(),
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
    amount: number;
    maintenanceType: string;
    maintenanceDate: Date;
    description: string;
    sparePart: string;

    type: string;
    sparePartId: number;
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
    },
    {
        label: 'Repuestos',
        value: '',
        type: 'select',
        name: 'sparePartId',
    },
    {
        label: 'Cantidad',
        value: '',
        type: 'number',
        name: 'amount',
    }
];

export const maintenanceDefaultValues: IMaintenanceForm = {
    id: '',
    equipmentId: 0,
    maintenanceType: '',
    maintenanceDate: new Date(),
    description: '',
    type: '',
    sparePartId: 0,
    amount: 0,
    sparePart: ''
}

export const maintenanceValidationSchema: object = z.object({
    equipmentId: z.coerce.number({ message: 'El campo es requerido' }),
    type: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    maintenanceDate: z.date().refine((date) => !isNaN(date.getTime()), { message: 'Debe ser una fecha válida' }),
    description: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    status: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    // sparePartId: z.number({ message: 'El campo es requerido' })
});

// Tabs
export const maintenanceTabsProperties = [
    {
        label: 'Mantenimientos'
    },
    {
        label: 'Ordenes de Mantenimiento'
    },
    {
        label: 'Solicitudes de Mantenimiento'
    }
];


