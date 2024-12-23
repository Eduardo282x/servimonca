import { data, columnsStore, IStore } from './store.data.ts';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useState } from 'react';

export const Store = () => {

    const [dataTable, setDataTable] = useState<IStore[]>(data);

    return (
        <div>

            <p className=' text-3xl font-semibold mb-5'>Almacén</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter data={data} setData={setDataTable} columns={columnsStore}></Filter>
                <Button variant="contained" className='flex gap-2'><span className='material-icons'>add_circle</span> Agregar</Button>
            </div>

           <TableComponent tableData={dataTable} tableColumns={columnsStore} />

        </div>
    );

}
