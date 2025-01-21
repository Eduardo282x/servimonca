import { useEffect, useState } from "react";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { existMaintenanceDataForm, existMaintenanceValidationSchema, IMaintenance, maintenanceRequestColumns, maintenanceRequestDefaultValues, UpdateMaintenanceStatus } from "./maintenance.data";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { getDataApi } from "../../API/AxiosActions";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";
import { Loader } from "../../components/loaders/Loader";
import TableComponent from "../../components/TableComponent";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";


export const MaintenanceRequests = () => {
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [defaultValues, setDefaultValues] = useState<UpdateMaintenanceStatus>(maintenanceRequestDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getMaintenances();
    }, []);

    // Async functions
    async function getMaintenances() {
        setLoading(true);
        await getDataApi('/maintenance/all/Pendiente').then((response: IMaintenance[]) => {
            setMaintenances(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        // data.status = data.status === 'Approved' ? true : false;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/maintenance/status');
        setDefaultValues(responseBaseApi.body as UpdateMaintenanceStatus);
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
            <div>

                {loading ? <Loader /> : <TableComponent addButton={''} tableData={maintenances} tableColumns={maintenanceRequestColumns} openDialog={openDialog} />}

                <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

                <DialogComponent
                    dialog={dialog}
                    setDialog={setDialog}
                    form={
                        <div className='w-80'>
                            <FormComponent
                                title={'Solicitud'}
                                description={''}
                                descriptionColored={''}
                                dataForm={existMaintenanceDataForm}
                                defaultValues={defaultValues}
                                validationSchema={existMaintenanceValidationSchema}
                                action={formAction}
                                buttonText={'Enviar'}
                                onSubmitForm={openDialog}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    )
}
