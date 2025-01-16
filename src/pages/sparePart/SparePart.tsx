import { useEffect, useState } from 'react'
import { getDataApi } from '../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../API/BaseAPI';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { Loader } from '../../components/loaders/Loader';
import { ISparePart, ISparePartForm, sparePartColumns, sparePartDataForm, sparePartDefaultValues, sparePartEditDataForm, sparePartValidationSchema } from './sparePart.data';

export const SparePart = () => {
    // useStates
    const [maintenances, setMaintenances] = useState<ISparePart[]>([]);
    const [defaultValues, setDefaultValues] = useState<ISparePartForm>(sparePartDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getSparePart();
    }, []);

    // Async functions
    async function getSparePart() {
        setLoading(true);
        await getDataApi('/sparepart').then((response: ISparePart[]) => {
            setMaintenances(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/sparepart');
        setDefaultValues(responseBaseApi.body as ISparePartForm);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getSparePart();
            setOpenSnackbar(true);
        };
    }

    console.log(formAction)


    return (
        <div>
            <div>
                <p className=' text-3xl font-semibold mb-5'>Repuestos</p>

                {loading ? <Loader /> : <TableComponent tableData={maintenances} tableColumns={sparePartColumns} openDialog={openDialog} addButton='Ingresar Orden de Compra' />}

                <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

                <DialogComponent
                    dialog={dialog}
                    setDialog={setDialog}
                    form={
                        <FormComponent
                            title={formAction === 'addApi' ? 'Nuevo Repuesto' : 'Editar Repuesto'}
                            description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                            descriptionColored={formAction === 'addApi' ? 'un nuevo repuesto' : 'un repuesto'}
                            dataForm={formAction === 'editApi' ? sparePartEditDataForm : sparePartDataForm}
                            defaultValues={defaultValues}
                            validationSchema={sparePartValidationSchema}
                            action={formAction}
                            buttonText={formAction === 'addApi' ? 'Agregar repuesto' : 'Editar repuesto'}
                            onSubmitForm={openDialog}
                        />
                    }
                />
            </div>
        </div>
    )
}
