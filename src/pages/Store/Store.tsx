import { useState } from 'react'
import TabsComponent from '../../components/TabsComponent'
import { Request } from '../request/Request';
import { Equipment } from './equipment/Equipment';
import { SparePart } from './sparePart/SparePart';

const storeTabsProperties = [
    {
        label: 'Equipos'
    },
    {
        label: 'Repuestos'
    },
    {
        label: 'Solicitudes repuestos'
    }
];

export const Store = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Almacén</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={storeTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Equipment /></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><SparePart /></div>
            <div className={`${tabValue === 2 ? 'block' : 'hidden'}`}><Request /></div>
        </div>
    )
}
