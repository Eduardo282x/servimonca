import { IStore, IStoreForm, storeColumns, storeDataForm, storeDefaultValues, storeValidationSchema } from './store.data.ts';
import TableComponent from '../../components/TableComponent';
import { useEffect, useState } from 'react';
import DialogComponent from '../../components/DialogComponent.tsx';
import { FormComponent } from '../../components/FormComponent.tsx';
import { actionsValid, TableReturn } from '../../interfaces/table.interface.ts';
import { getDataApi } from '../../API/AxiosActions.ts';
import { Loader } from '../../components/loaders/Loader.tsx';
import { IDataForm } from '../../interfaces/form.interface.ts';
import { BaseResponse } from '../../interfaces/actions-api.interface.ts';
import { BaseApi, BaseApiReturn } from '../../API/BaseAPI.ts';
import { SnackbarComponent } from '../../components/SnackbarComponent.tsx';

export const Store = () => {

    // useStates
    const [equipment, setEquipment] = useState<IStore[]>([]);
    const [defaultValues, setDefaultValues] = useState<IStoreForm>(storeDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(storeDataForm);

    // useEffects
    useEffect(() => {
        getEquipments();
    }, []);

    // Asuync functions
    async function getEquipments() {
        setLoading(true);
        await getDataApi('/equipment').then((response: IStore[]) => {
            setEquipment(response);
            setLoading(false);
        });
    }

    // async function getStatus() {
    //     await getDataApi('/user/roles').then((response: Status[]) => {
    //         const newDataForm = [...dataForm];
    //         const findRolId = newDataForm.find(form => form.name === 'rolId') as IDataForm;
    //         findRolId.options = response.map(option => {
    //             return {
    //                 value: option.id,
    //                 label: option.rol
    //             }
    //         });
    //     })
    // }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {

        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/equipment');
        setDefaultValues(responseBaseApi.body as IStore);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getEquipments();
            setOpenSnackbar(true);
        };
    }

    return (
        <div>

            <p className=' text-3xl font-semibold mb-5'>Almacén</p>

            {loading ? <Loader /> : <TableComponent tableData={equipment} tableColumns={storeColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Usuario' : 'Editar Usuario'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo usuario' : 'un usuario'}
                        dataForm={storeDataForm}
                        defaultValues={defaultValues}
                        validationSchema={storeValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Usuario' : 'Editar Usuario'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>
    );

}
