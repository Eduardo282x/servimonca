import { useState } from 'react'
import TabsComponent from '../../components/TabsComponent'
// import { Request } from '../request/Request';
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

export interface updateStore {
    update: boolean;
    changeUpdate: (updateData: boolean) => void;
}

export const Store = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [update, setUpdate] = useState<boolean>(false);

    return (
        <div>
            <p className='text-4xl font-semibold mb-3'>Almacén</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={storeTabsProperties} />
            <div className={`${tabValue === 0 ? 'block' : 'hidden'}`}><Equipment /></div>
            <div className={`${tabValue === 1 ? 'block' : 'hidden'}`}><SparePart update={update} changeUpdate={setUpdate} /></div>
            {/* <div className={`${tabValue === 2 ? 'block' : 'hidden'}`}><Request  update={update} changeUpdate={setUpdate}/></div> */}
        </div>
    )
}
