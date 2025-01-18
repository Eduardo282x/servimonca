import { EquipmentForm, IEquipment, storeColumns, storeDataForm, storeDefaultValues, storeValidationSchema } from './equipment.data.ts';
import TableComponent from '../../../components/TableComponent.tsx';
import { useEffect, useState } from 'react';
import DialogComponent from '../../../components/DialogComponent.tsx';
import { FormComponent } from '../../../components/FormComponent.tsx';
import { actionsValid, TableReturn } from '../../../interfaces/table.interface.ts';
import { getDataApi } from '../../../API/AxiosActions.ts';
import { Loader } from '../../../components/loaders/Loader.tsx';
// import { IDataForm } from '../../../interfaces/form.interface.ts';
import { BaseResponse } from '../../../interfaces/actions-api.interface.ts';
import { BaseApi, BaseApiReturn } from '../../../API/BaseAPI.ts';
import { SnackbarComponent } from '../../../components/SnackbarComponent.tsx';

export const Equipment = () => {

    // useStates
    const [equipment, setEquipment] = useState<IEquipment[]>([]);
    const [defaultValues, setDefaultValues] = useState<EquipmentForm>(storeDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    // const [dataForm, setDataForm] = useState<IDataForm[]>(storeDataForm);

    // useEffects
    useEffect(() => {
        getEquipments();
    }, []);

    // Asuync functions
    async function getEquipments() {
        setLoading(true);
        await getDataApi('/equipment').then((response: IEquipment[]) => {
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
        setDefaultValues(responseBaseApi.body as EquipmentForm);
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

            {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={equipment} tableColumns={storeColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Elemento' : 'Editar Elemento'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo elemento' : 'un elemento'}
                        dataForm={storeDataForm}
                        defaultValues={defaultValues}
                        validationSchema={storeValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar elemento' : 'Editar elemento'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>
    );

}
