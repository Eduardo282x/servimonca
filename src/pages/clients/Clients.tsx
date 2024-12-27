import { clientsDataForm, clientsDefaultValues, clientsValidationSchema, columnsCustomer, customers, IClients } from './clients.data';
import { Button } from '@mui/material';
import TableComponent, { Action } from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useState } from 'react';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';

export const Clients = () => {
    const [defaultValues, setDefaultValues] = useState<IClients>(clientsDefaultValues);
    const [dataTable, setDataTable] = useState<IClients[]>(customers);
    const [dialog, setDialog] = useState<boolean>(false);
    const openDialog = () => setDialog(true);
    
    const getActionTable = (action: Action, data: IClients) => {
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
                <Filter data={customers} setData={setDataTable} columns={columnsCustomer}></Filter>

                <Button
                    onClick={addNewClient}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>

            </div>

            <TableComponent tableData={dataTable} tableColumns={columnsCustomer} action={getActionTable} />

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
