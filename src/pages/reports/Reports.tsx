import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { IReportForm, IReports, reportColumns, reportsDataForm, reportsDefaultValues, reportsValidationSchema } from "./reports.data";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";
import { SnackbarComponent } from "../../components/SnackbarComponent";

export const Reports = () => {

    // useStates
    const [reports, setReports] = useState<IReports[]>([]);
    const [defaultValues, setDefaultValues] = useState<IReportForm>(reportsDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getReports();
    }, []);

    // Async functions
    async function getReports() {
        setLoading(true);
        await getDataApi('/report').then((response: IReports[]) => {
            setReports(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/report');
        setDefaultValues(responseBaseApi.body as IReports);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getReports();
            setOpenSnackbar(true);
        };
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Reportes</p>

            {loading ? <Loader /> : <TableComponent tableData={reports} tableColumns={reportColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Reporte' : 'Editar Reporte'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo reporte' : 'un reporte'}
                        dataForm={reportsDataForm}
                        defaultValues={defaultValues}
                        validationSchema={reportsValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Reporte' : 'Editar Reporte'}
                        onSubmitForm={openDialog}
                    />
                }
            />
        </div>
    );
}
