import { IColumns } from "../../components/TableComponent";

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
