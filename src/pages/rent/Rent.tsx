import { useState } from 'react'
import TabsComponent from '../../components/TabsComponent';
import { RequestRent } from './requestRent/RequestRent';
import { Rentals } from './rentals/Rentals';

const rentTabsProperties = [
    {
        label: 'Alquiler de equipos'
    },
    {
        label: 'Solicitudes de alquiler'
    }
];

export const Rent = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [update, setUpdate] = useState<boolean>(false);

    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Alquiler</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={rentTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Rentals update={update} changeUpdate={setUpdate} /></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><RequestRent update={update} changeUpdate={setUpdate} /></div>
        </div>
    )
}
