import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { historyColumns, historyDataForm, historyDefaultValues, historyValidationSchema, IHistory, IHistoryForm } from "./history.data";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";
import { SnackbarComponent } from "../../components/SnackbarComponent";

export const History = () => {

    // useStates
    const [history, setHistory] = useState<IHistory[]>([]);
    const [defaultValues, setDefaultValues] = useState<IHistoryForm>(historyDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getHistory();
    }, []);

    // Async functions
    async function getHistory() {
        setLoading(true);
        await getDataApi('/sparepart-history').then((response: IHistory[]) => {
            setHistory(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/sparepart-history');
        setDefaultValues(responseBaseApi.body as IHistory);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getHistory();
            setOpenSnackbar(true);
        };
    }


    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Historial</p>

            {loading ? <Loader /> : <TableComponent tableData={history} tableColumns={historyColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Historial' : 'Editar Historial'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo historial' : 'un historial'}
                        dataForm={historyDataForm}
                        defaultValues={defaultValues}
                        validationSchema={historyValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Historial' : 'Editar Historial'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>
    );
}
