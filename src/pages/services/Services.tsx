import { useState } from "react";
import TabsComponent from "../../components/TabsComponent";
import { Clients } from "../clients/Clients";
import { MaintenanceClient } from "../maintenance/Maintenance-client";
import { Rentals } from "../rent/rentals/Rentals";

const servicesTabsProperties = [
    {
        label: 'Clientes'
    },
    {
        label: 'Alquiler'
    },
    {
        label: 'Mantenimiento de cliente'
    }
];


export const Services = () => {
    const [tabValue, setTabValue] = useState<number>(0);

    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Servicios</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={servicesTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Clients /></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><Rentals /></div>
            <div className={`${tabValue === 2 ? 'block' : 'hidden'}`}><MaintenanceClient /></div>
        </div>
    )
}
