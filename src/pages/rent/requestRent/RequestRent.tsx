import { FC, useEffect, useState } from 'react'
import { getDataApi } from '../../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../../API/BaseAPI';
import DialogComponent from '../../../components/DialogComponent';
import { FormComponent } from '../../../components/FormComponent';
import { SnackbarComponent } from '../../../components/SnackbarComponent';
import TableComponent from '../../../components/TableComponent';
import { BaseResponse } from '../../../interfaces/actions-api.interface';
import { actionsValid, IColumns, TableReturn } from '../../../interfaces/table.interface';
import { UpdateStatusSparePart, requestDefaultValues, existSparePartValidationSchema, existSparePartDataForm } from '../../request/request.data';
import { Loader } from '../../../components/loaders/Loader';
import { ISparePart } from '../../Store/sparePart/sparePart.data';
import { rentalColumns } from '../rentals/rental.data';
import { updateStore } from '../../Store/Store';

export const RequestRent:FC<updateStore> = ({update, changeUpdate}) => {
    const [maintenances, setMaintenances] = useState<ISparePart[]>([]);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [defaultValues, setDefaultValues] = useState<UpdateStatusSparePart>(requestDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const columns: IColumns[] = [...rentalColumns, {
        label: 'Cambiar',
        column: 'edit',
        icon: true,
        element: () => 'info',
        canFilter: false
    },]

    // useEffects
    useEffect(() => {
        getSparePart();
    }, [update]);

    // Async functions
    async function getSparePart() {
        setLoading(true);
        await getDataApi('/rental/inactive').then((response: ISparePart[]) => {
            setMaintenances(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        data.status = data.status === 'Approved' ? true : false;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/rental/status');
        setDefaultValues(responseBaseApi.body as UpdateStatusSparePart)
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getSparePart();
            setOpenSnackbar(true);
            changeUpdate(true);
            changeUpdate(false);
        };
    }

    return (
        <div>
            <div>
                {/* <p className=' text-3xl font-semibold mb-5'>Solicitudes de alquiler</p> */}

                {loading ? <Loader /> : <TableComponent addButton={''} tableData={maintenances} tableColumns={columns} openDialog={openDialog} />}

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
                                dataForm={existSparePartDataForm}
                                defaultValues={defaultValues}
                                validationSchema={existSparePartValidationSchema}
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
