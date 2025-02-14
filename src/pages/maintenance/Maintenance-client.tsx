import TableComponent from '../../components/TableComponent';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { useEffect, useState } from 'react';
import { IMaintenance, maintenanceDataForm, IMaintenanceForm, maintenanceClientColumns, maintenanceEditDataForm, maintenanceClientDataForm, maintenanceClientDefaultValues, maintenanceClientValidationSchema, maintenanceEditValidationSchema } from './maintenance.data';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { BaseApi, BaseApiReturn } from '../../API/BaseAPI';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import { IDataForm } from '../../interfaces/form.interface';
import { IEquipment } from '../Store/equipment/equipment.data';
import { ISparePart } from '../Store/sparePart/sparePart.data';
import { IClients } from '../clients/clients.data';

export const MaintenanceClient = () => {

    // useStates
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    // const [defaultValues, setDefaultValues] = useState<IMaintenanceForm>(maintenanceDefaultValues);
    const [clientDefaultValues, setClientDefaultValues] = useState(maintenanceClientDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(maintenanceDataForm);
    const [sparePartDataForm, setSparePartDataForm] = useState<IDataForm[]>(maintenanceDataForm);
    const [clientDataForm, setClientDataForm] = useState<IDataForm[]>(maintenanceClientDataForm);

    // useEffects
    useEffect(() => {
        getMaintenances();
        getVehicles();
        getSpareParts();
        getClients();
    }, []);

    // Async functions
    async function getMaintenances() {
        setLoading(true);
        await getDataApi('/maintenance/clientAll').then((response: IMaintenance[]) => {
            setMaintenances(response);
            setLoading(false);
        });
    }

    async function getVehicles() {
        await getDataApi('/equipment').then((response: IEquipment[]) => {
            const newDataForm = [...dataForm];
            const findEquipmentId = newDataForm.find(form => form.name === 'equipmentId') as IDataForm;
            findEquipmentId.options = response.map(option => {
                return {
                    value: option.id,
                    label: `${option.model}`
                }
            });

            setDataForm(newDataForm)
        })
    }

    async function getClients() {
        await getDataApi('/clients').then((response: IClients[]) => {
            const newDataForm = [...clientDataForm];
            const findClientId = newDataForm.find(form => form.name === 'clientId') as IDataForm;
            findClientId.options = response.map(option => {
                return {
                    value: option.id,
                    label: option.name
                }
            });

            setClientDataForm(newDataForm)
        })
    }

    async function getSpareParts() {
        await getDataApi('/sparepart/Approved').then((response: ISparePart[]) => {
            const newDataForm = [...sparePartDataForm];
            const findSparePart = newDataForm.find(form => form.name === 'sparePartId') as IDataForm;
            findSparePart.options = response.map(option => {
                return {
                    label: option.sparePart,
                    value: option.id
                }
            });

            setSparePartDataForm(newDataForm);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, clientDefaultValues, 'id', action === 'editApi' ? '/maintenance/completed' : '/maintenance');
        if (action === 'edit') { setClientDefaultValues(responseBaseApi.body as IMaintenanceForm) };
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getMaintenances();
            setOpenSnackbar(true);
        };
    }

    return (

        <div>
            {/* <p className='text-4xl font-semibold mb-3'>Mantenimiento de Clientes</p> */}

            {!loading ?
                <TableComponent addButton={'Agregar'} tableData={maintenances} tableColumns={maintenanceClientColumns} openDialog={openDialog} />
                : <Loader />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Mantenimiento' : 'Finaliza el Mantenimiento'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Describe el mantenimiento'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo mantenimiento' : 'realizado'}
                        dataForm={formAction === 'editApi' ? maintenanceEditDataForm : maintenanceClientDataForm}
                        defaultValues={clientDefaultValues}
                        validationSchema={formAction === 'editApi' ? maintenanceEditValidationSchema : maintenanceClientValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Mantenimiento' : 'Finalizar'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>

    );

}
