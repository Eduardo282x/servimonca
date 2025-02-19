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

export interface ServicesProps {
    onRequest: () => void; // Callback para notificar al padre
    triggerEffect: number; // Estado para activar el useEffect
}

export const Services = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [triggerEffect, setTriggerEffect] = useState<number>(0);

    // Función callback que se ejecutará cuando openDialog sea llamado en los hijos
    const handleRequest = () => {
        setTriggerEffect(prev => prev + 1); // Incrementa el estado para activar el useEffect
    };

    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Servicios</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={servicesTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Clients onRequest={handleRequest} triggerEffect={triggerEffect}/></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><Rentals onRequest={handleRequest} triggerEffect={triggerEffect}/></div>
            <div className={`${tabValue === 2 ? 'block' : 'hidden'}`}><MaintenanceClient onRequest={handleRequest} triggerEffect={triggerEffect}/></div>
        </div>
    )
}
