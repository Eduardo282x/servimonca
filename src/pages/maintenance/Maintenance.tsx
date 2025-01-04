import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import { actionsValid } from '../../interfaces/table.interface';
import { useEffect, useState } from 'react';
import { IMaintenance, maintenanceColumns, maintenanceDefaultValues, maintenanceDataForm, maintenanceValidationSchema } from './maintenance.data';
import Filter from '../../components/Filter';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';

export const Maintenance = () => {

    // useStates
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [tableData, setTableData] = useState<IMaintenance[]>(maintenances);
    const [defaultValues, setDefaultValues] = useState<IMaintenance>(maintenanceDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getMaintenances();

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    // Async functions
    async function getMaintenances() {
        await getDataApi('/maintenance').then((response: IMaintenance[]) => {
            setMaintenances(response);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IMaintenance) => {
        if (action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewMaintenance = () => {
        setDefaultValues(maintenanceDefaultValues);
        openDialog();
    }

    // Conditionals
    if(isLoading) {
        return <Loader />;
    }

    return (

        <div>
            <p className=' text-3xl font-semibold mb-5'>Mantenimiento</p>
            
            <div className="flex items-center justify-between w-full my-5">

                <Filter tableData={maintenances} setTableData={setTableData} tableColumns={maintenanceColumns}></Filter>

                <Button 
                    variant="contained" 
                    onClick={addNewMaintenance} 
                    className='flex gap-2'>
                        <span className='material-icons'>add_circle</span> Agregar
                </Button>

            </div>

            <TableComponent tableData={tableData} tableColumns={maintenanceColumns} action={getActionTable} />

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
