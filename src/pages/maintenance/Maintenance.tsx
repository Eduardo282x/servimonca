import { Button } from '@mui/material';
import TableComponent, { Action } from '../../components/TableComponent';
import { useState } from 'react';
import { 
    IMaintenance, 
    maintenanceData, 
    maintenanceColumns, 
    maintenanceDefaultValues, 
    maintenanceDataForm, 
    maintenanceValidationSchema
} from './maintenance.data';
import Filter from '../../components/Filter';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';

export const Maintenance = () => {
    const [defaultValues, setDefaultValues] = useState<IMaintenance>(maintenanceDefaultValues);
    const [dataTable, setDataTable] = useState<IMaintenance[]>(maintenanceData);
    const [dialog, setDialog] = useState(false);
    const openDialog = () => setDialog(true);

    const getActionTable = (action: Action, data: IMaintenance) => {
        if (action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewEquipment = () => {
        setDefaultValues({} as IMaintenance);
        openDialog();
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Mantenimiento</p>
            
            <div className="flex items-center justify-between w-full my-5">
                <Filter data={maintenanceData} setData={setDataTable} columns={maintenanceColumns}></Filter>
                <Button variant="contained" onClick={addNewEquipment} className='flex gap-2'><span className='material-icons'>add_circle</span> Agregar</Button>
            </div>

            <TableComponent tableData={dataTable} tableColumns={maintenanceColumns} action={getActionTable} />

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Cliente'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo cliente'
                        dataForm={maintenanceDataForm}
                        defaultValues={defaultValues}
                        validationSchema={maintenanceValidationSchema}
                        action='add'
                        buttonText='Agregar Cliente'
                    />
                }
            />
        </div>

    );

}
