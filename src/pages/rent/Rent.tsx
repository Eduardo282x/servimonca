import React, { useState } from 'react'
import TabsComponent from '../../components/TabsComponent';
import { RequestRent } from './requestRent/RequestRent';
import { Rentals } from './rentals/Rentals';

const rentTabsProperties = [
    {
        label: 'Alquileres'
    },
    {
        label: 'Solicitudes de alquiler'
    }
];

export const Rent = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Alquiler</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={rentTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Rentals /></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><RequestRent /></div>
        </div>
    )
}
