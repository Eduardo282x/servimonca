import { clientsDataForm, clientsDefaultValues, clientsValidationSchema, customerColumns, IClients, IClientsForm } from './clients.data';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useEffect, useState } from 'react';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { actionsValid } from '../../interfaces/table.interface';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';

export const Clients = () => {

    // useStates
    const [ clients, setClients ] = useState<IClients[]>([]);
    const [tableData, setTableData] = useState<IClients[]>([]);
    const [defaultValues, setDefaultValues] = useState<IClientsForm>(clientsDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(true);

    // useEffects
    useEffect(() => {
        getClients();
    }, []);

    // Async functions
    async function getClients() {
        setLoading(true);
        await getDataApi('/customer').then((response: IClients[]) => {
            setClients(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);
    
    const getActionTable = (action: actionsValid, data: IClients) => {
        if(action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewClient = () => {
        setDefaultValues(clientsDefaultValues);
        openDialog();
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Clientes</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={clients} setTableData={setTableData} tableColumns={customerColumns}></Filter>

                <Button
                    onClick={addNewClient}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>

            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={customerColumns} action={getActionTable} /> }

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Cliente'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo cliente'
                        dataForm={clientsDataForm}
                        defaultValues={defaultValues}
                        validationSchema={clientsValidationSchema}
                        action='add'
                        buttonText='Agregar Cliente'
                    />
                }
            />

        </div>
    )
}
