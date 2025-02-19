import { clientsDataForm, clientsDefaultValues, clientsValidationSchema, customerColumns, IClients, IClientsForm } from './clients.data';
import TableComponent from '../../components/TableComponent';
import { FC, useEffect, useState } from 'react';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { BaseApi, BaseApiReturn } from '../../API/BaseAPI';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import { ServicesProps } from '../services/Services';

export const Clients : FC<ServicesProps>= ({onRequest,triggerEffect}) => {

    // useStates
    const [clients, setClients] = useState<IClients[]>([]);
    const [defaultValues, setDefaultValues] = useState<IClientsForm>(clientsDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getClients();
    }, [triggerEffect]);

    // Async functions
    async function getClients() {
        setLoading(true);
        await getDataApi('/clients').then((response: IClients[]) => {
            setClients(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/clients');
        setDefaultValues(responseBaseApi.body as IClientsForm);
        setFormAction(responseBaseApi.action);
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getClients();
            setOpenSnackbar(true);
            onRequest();
        };
    }

    return (
        <div>
            {/* <p className=' text-3xl font-semibold mb-5'>Clientes</p> */}

            {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={clients} tableColumns={customerColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Cliente' : 'Editar Cliente'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo cliente' : 'un cliente'}
                        dataForm={clientsDataForm}
                        defaultValues={defaultValues}
                        validationSchema={clientsValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Cliente' : 'Editar Cliente'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>
    )
}
