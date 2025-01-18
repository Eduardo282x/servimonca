import { IClients } from "../pages/clients/clients.data";
import { IEquipment } from "../pages/Store/equipment/equipment.data";

export interface IRental {
    id:              number;
    clientId:        number;
    equipmentId:     number;
    rentalStartDate: Date;
    rentalEndDate:   Date;
    totalCost:       number;
    paymentId:       number;
    checked:         boolean;
    description:     null;
    status:          boolean;
    createdAt:       Date;
    client:          IClients;
    equipment:       IEquipment;
}
