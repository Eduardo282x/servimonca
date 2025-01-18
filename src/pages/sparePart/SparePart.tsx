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
import { existSparePartDataForm, ISparePart, ISparePartForm, sparePartColumns, sparePartDataForm, sparePartDefaultValues, sparePartEditDataForm, sparePartExistValidationSchema, sparePartValidationSchema } from './sparePart.data';
import { IDataForm } from '../../interfaces/form.interface';

export const SparePart = () => {
    // useStates
    const [maintenances, setMaintenances] = useState<ISparePart[]>([]);
    const [defaultValues, setDefaultValues] = useState<ISparePartForm>(sparePartDefaultValues);
    const [dataFormExist, setDataFormExist] = useState<IDataForm[]>(existSparePartDataForm);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const [isNew, setIsNew] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getSparePart();
    }, []);

    // Async functions
    async function getSparePart() {
        setLoading(true);

        await getDataApi('/sparepart/Approved').then((response: ISparePart[]) => {

            setMaintenances(response);
            setLoading(false);

            const copyDataForm = [...existSparePartDataForm]
            const findSparePart = copyDataForm.find(form => form.name === 'id') as IDataForm;
            findSparePart.options = response.map(option => {
                return {
                    label: option.sparePart,
                    value: option.id
                }
            });

            setDataFormExist(copyDataForm);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        if(action === 'add') setIsNew(true)
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

    return (
        <div>
            <div>

                {loading ? <Loader /> : <TableComponent tableData={maintenances} tableColumns={sparePartColumns} openDialog={openDialog} addButton='Ingresar Orden de Compra' />}

                <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

                <DialogComponent
                    dialog={dialog}
                    setDialog={setDialog}
                    form={
                        <div>

                            {formAction === 'addApi' && (
                                <div className="flex items-center justify-center rounded-lg w-full mx-auto border-blue-600 border-solid border-2 my-4">
                                    <div onClick={() => setIsNew(true)} className={`w-1/2 text-center font-semibold cursor-pointer py-2 px-4 ${isNew ? 'bg-blue-600 text-white' : ''}`}>Nuevo</div>
                                    <div onClick={() => setIsNew(false)} className={`w-1/2 text-center font-semibold cursor-pointer py-2 px-4 ${!isNew ? 'bg-blue-600 text-white' : ''}`}>Existente</div>
                                </div>
                            )}

                            {isNew && (
                                <FormComponent
                                    title={formAction === 'addApi' ? 'Nueva orden' : 'Editar Repuesto'}
                                    description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                                    descriptionColored={formAction === 'addApi' ? 'un nuevo repuesto' : 'un repuesto'}
                                    dataForm={formAction === 'editApi' ? sparePartEditDataForm : sparePartDataForm}
                                    defaultValues={defaultValues}
                                    validationSchema={sparePartValidationSchema}
                                    action={formAction}
                                    buttonText={formAction === 'addApi' ? 'Agregar orden' : 'Editar repuesto'}
                                    onSubmitForm={openDialog}
                                />
                            )}

                            {!isNew && (
                                <div className='w-80'>
                                    <FormComponent
                                        title={'Nueva orden'}
                                        description={'Elige el'}
                                        descriptionColored={'repuesto'}
                                        dataForm={dataFormExist}
                                        defaultValues={defaultValues}
                                        validationSchema={sparePartExistValidationSchema}
                                        action={formAction}
                                        buttonText={'Agregar orden'}
                                        onSubmitForm={openDialog}
                                    />
                                </div>
                            )}
                        </div>
                    }
                />
            </div>
        </div>
    )
}
