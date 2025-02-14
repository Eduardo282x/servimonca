import { IClients } from "../pages/clients/clients.data";
import { IEquipment } from "../pages/Store/equipment/equipment.data";
import { IPayments } from "./payments.interface";

export interface IRental {
    id: number;
    clientId: number;
    equipmentId: number;
    rentalStartDate: Date | null;
    rentalEndDate: Date | null;
    totalCost: number;
    paymentId: number;
    payment: IPayments;
    description: string | null;
    status: string;
    createdAt: Date;
    client: IClients;
    equipment: IEquipment;
}
