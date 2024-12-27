import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";

export interface IMaintenance {
    vehicleId: string;
    scheduledProgramationType: "preventiva" | "correctiva";
    status: "pendiente" | "en proceso" | "completada";
};

export const maintenanceColumns : IColumns[] = [
    {
        label: 'ID',
        column: 'vehicleId',
        element: (data: IMaintenance) => data.vehicleId,
    },
    {
        label: 'Tipo de Programación',
        column: 'scheduledProgramationType',
        element: (data: IMaintenance) => data.scheduledProgramationType,
    },
    {
        label: 'Estado',
        column: 'status',
        element: (data: IMaintenance) => data.status,
    },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
        canFilter: false
    },
]

export const maintenanceData : IMaintenance[] = [
    {
        vehicleId: "CAM-001",
        scheduledProgramationType: "preventiva",
        status: "en proceso"
    },
    {
        vehicleId: "CAM-002",
        scheduledProgramationType: "correctiva",
        status: "completada"
    },
    {
        vehicleId: "CAM-003",
        scheduledProgramationType: "preventiva",
        status: "completada"
    },
    {
        vehicleId: "CAM-004",
        scheduledProgramationType: "preventiva",
        status: "completada"
    },
    {
        vehicleId: "CAM-005",
        scheduledProgramationType: "preventiva",
        status: "en proceso"
    },
    {
        vehicleId: "CAM-006",
        scheduledProgramationType: "correctiva",
        status: "completada"
    },
    {
        vehicleId: "CAM-007",
        scheduledProgramationType: "preventiva",
        status: "en proceso"
    },
    {
        vehicleId: "CAM-008",
        scheduledProgramationType: "preventiva",
        status: "completada"
    },
    {
        vehicleId: "CAM-009",
        scheduledProgramationType: "preventiva",
        status: "pendiente"
    },
];

export const maintenanceDataForm: IDataForm[] = [
    {
        label: 'Id',
        value: '',
        type: 'text',
        name: 'vehicleId',
    },
    {
        label: 'Tipo de programación',
        value: '',
        type: 'select',
        name: 'scheduledProgramationType',
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

export const maintenanceDefaultValues: IMaintenance = {
    vehicleId: '0',
    scheduledProgramationType: 'preventiva',
    status: 'pendiente',
}

export const maintenanceValidationSchema: object = z.object({
    vehicleId: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    scheduledProgramationType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    status: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

