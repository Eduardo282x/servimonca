import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { IWorkshop, IWorkshopForm, Model, workshopColumns, workshopDataForm, workshopDefaultValues, workshopValidationSchema } from "./workshop.data";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";

export const Workshop = () => {

    // useStates
    const [workshop, setWorkshop] = useState<IWorkshop[]>([]);
    const [defaultValues, setDefaultValues] = useState<IWorkshopForm>(workshopDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(workshopDataForm);

    // useEffects
    useEffect(() => {
        getWorshop();
        getModels();
    }, []);

    // Async functions
    async function getWorshop() {
        setLoading(true);
        await getDataApi('/work-order').then((response: IWorkshop[]) => {
            setWorkshop(response);
            setLoading(false);
        });
    }

    async function getModels() {
        await getDataApi('/equipment').then((response: Model[]) => {
            const newDataForm = [...dataForm];
            const findEquipmentId = newDataForm.find(form => form.name === 'equipmentId') as IDataForm;
            findEquipmentId.options = response.map(option => {
                return {
                    value: option.id,
                    label: option.model
                }
            });
            setDataForm(newDataForm)
        })
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/work-order');
        setDefaultValues(responseBaseApi.body as IWorkshopForm);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getWorshop();
            setOpenSnackbar(true);
        };
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Taller</p>

            {loading ? <Loader /> : <TableComponent tableData={workshop} tableColumns={workshopColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nueva Orden' : 'Editar Orden'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'una nueva orden' : 'una orden'}
                        dataForm={workshopDataForm}
                        defaultValues={defaultValues}
                        validationSchema={workshopValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Orden' : 'Editar Orden'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>
    );
}
