import TableComponent from '../../components/TableComponent';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { useEffect, useState } from 'react';
import { IMaintenance, maintenanceColumns, maintenanceDefaultValues, maintenanceDataForm, maintenanceValidationSchema, IMaintenanceForm, maintenanceTabsProperties, maintenanceClientColumns, maintenanceEditDataForm, maintenanceClientDataForm, maintenanceClientDefaultValues, maintenanceClientValidationSchema, maintenanceEditDefaultValues, maintenanceEditValidationSchema, IMaintenanceEdit } from './maintenance.data';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { BaseApi, BaseApiReturn } from '../../API/BaseAPI';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import { IDataForm } from '../../interfaces/form.interface';
import TabsComponent from '../../components/TabsComponent';
import { IEquipment } from '../Store/equipment/equipment.data';
import { ISparePart } from '../Store/sparePart/sparePart.data';
import { IClients } from '../clients/clients.data';
import { MaintenanceRequests } from './MaintenanceRequests';

export const Maintenance = () => {

    // useStates
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [defaultValues, setDefaultValues] = useState<IMaintenanceForm>(maintenanceDefaultValues);
    const [ clientDefaultValues, setClientDefaultValues ] = useState(maintenanceClientDefaultValues);
    const [ editDefaultValues, setEditDefaultValues ] = useState(maintenanceEditDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(maintenanceDataForm);
    const [sparePartDataForm, setSparePartDataForm] = useState<IDataForm[]>(maintenanceDataForm);
    const [clientDataForm, setClientDataForm] = useState<IDataForm[]>(maintenanceClientDataForm);
    const [tabValue, setTabValue] = useState<number>(0);

    // useEffects
    useEffect(() => {
        getMaintenances();
        getVehicles();
        getSpareParts();
        getClients();
    }, [tabValue]);

    // Async functions
    async function getMaintenances() {
        setLoading(true);
        const urlMaintenance = tabValue === 0 ? '/maintenance/Procesando' : '/maintenance/client/Procesando';
        await getDataApi(urlMaintenance).then((response: IMaintenance[]) => {
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

        console.log(data);

        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', action === 'editApi' ? '/maintenance/completed' : '/maintenance');
        if(action === 'edit') {setEditDefaultValues(responseBaseApi.body as IMaintenanceEdit)};
        if(tabValue === 0) {setDefaultValues(responseBaseApi.body as IMaintenanceForm)};
        if(tabValue === 1) {setClientDefaultValues(responseBaseApi.body as IMaintenanceForm)};
        console.log(responseBaseApi.body)
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
            <p className='text-4xl font-semibold mb-3'>Taller</p>

            <TabsComponent tabValue={tabValue} setTabValue={setTabValue} tabs={maintenanceTabsProperties} />

            {!loading ?
                <>
                    {tabValue === 0 && (
                        <TableComponent addButton={'Agregar'} tableData={maintenances} tableColumns={maintenanceColumns} openDialog={openDialog} />
                    )}
                    {tabValue === 1 && (
                        <TableComponent addButton={'Agregar'} tableData={maintenances} tableColumns={maintenanceClientColumns} openDialog={openDialog} />
                    )}
                    {tabValue === 2 && <MaintenanceRequests />}
                </>
                : <Loader />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Mantenimiento' : 'Editar Mantenimiento'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo mantenimiento' : 'un mantenimiento'}
                        dataForm={formAction === 'editApi' ? maintenanceEditDataForm : (tabValue === 0 ? maintenanceDataForm : maintenanceClientDataForm)}
                        defaultValues={formAction === 'editApi' ? editDefaultValues : (tabValue === 0 ? defaultValues : clientDefaultValues)}
                        validationSchema={formAction === 'editApi' ? maintenanceEditValidationSchema : (tabValue === 0 ? maintenanceValidationSchema : maintenanceClientValidationSchema)}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Mantenimiento' : 'Editar Mantenimiento'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>

    );

}
