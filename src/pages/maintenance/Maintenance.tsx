import TableComponent from '../../components/TableComponent';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { useEffect, useState } from 'react';
import { IMaintenance, maintenanceColumns, maintenanceDefaultValues, maintenanceDataForm, maintenanceValidationSchema, IMaintenanceForm, maintenanceTabsProperties } from './maintenance.data';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { getDataApi } from '../../API/AxiosActions';
import { Loader } from '../../components/loaders/Loader';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { BaseApi, BaseApiReturn } from '../../API/BaseAPI';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import { IDataForm } from '../../interfaces/form.interface';
import { IEquipment } from '../equipment/equipment.data';
import TabsComponent from '../../components/TabsComponent';

export const Maintenance = () => {

    // useStates
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [defaultValues, setDefaultValues] = useState<IMaintenanceForm>(maintenanceDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(maintenanceDataForm);
    const [tabValue, setTabValue] = useState<number>(0);

    // useEffects
    useEffect(() => {
        getMaintenances();
        getVehicles();
    }, []);

    // Async functions
    async function getMaintenances() {
        setLoading(true);
        await getDataApi('/maintenance').then((response: IMaintenance[]) => {
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

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        if (action === 'edit') {
            data.sparePartId = 1;
        }
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/maintenance');
        setDefaultValues(responseBaseApi.body as IMaintenanceForm);
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
                {tabValue !== 0 && (
                    <p>En proceso...</p>
                )}
                </>
                :
                <Loader />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Mantenimiento' : 'Editar Mantenimiento'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo mantenimiento' : 'un mantenimiento'}
                        dataForm={maintenanceDataForm}
                        defaultValues={defaultValues}
                        validationSchema={maintenanceValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Mantenimiento' : 'Editar Mantenimiento'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>

    );

}
