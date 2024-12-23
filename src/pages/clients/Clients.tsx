import { columnsCustomer, customers, IClients } from './clients.data';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useState } from 'react';

export const Clients = () => {

    const [dataTable, setDataTable] = useState<IClients[]>(customers);

    return (
        <div>

            <p className=' text-3xl font-semibold mb-5'>Clientes</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter data={customers} setData={setDataTable} columns={columnsCustomer}></Filter>
                <Button variant="contained" className='flex gap-2'><span className='material-icons'>add_circle</span> Agregar</Button>
            </div>

           <TableComponent tableData={dataTable} tableColumns={columnsCustomer} />

        </div>
    )
}
