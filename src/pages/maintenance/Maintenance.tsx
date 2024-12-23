import { Button, TextField } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import { useState } from 'react';
import { IMaintenance, maintenanceData, maintenanceColumns } from './maintenance.data';
import Filter from '../../components/Filter';

export const Maintenance = () => {

    const [dataTable, setDataTable] = useState<IMaintenance[]>(maintenanceData);

    return (
        
        <div>

            <p className=' text-3xl font-semibold mb-5'>Mantenimiento</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter data={maintenanceData} setData={setDataTable} columns={maintenanceColumns}></Filter>
                <Button variant="contained" className='flex gap-2'><span className='material-icons'>add_circle</span> Agregar</Button>
            </div>

            <TableComponent tableData={dataTable} tableColumns={maintenanceColumns} />

        </div>

    );

}
