import { FC, useEffect, useState } from 'react'
import { getDataApi } from '../../API/AxiosActions';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { Loader } from 'lucide-react';
import { BaseApiReturn, BaseApi } from '../../API/BaseAPI';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { existSparePartDataForm, existSparePartValidationSchema, requestColumns, requestDefaultValues, UpdateStatusSparePart } from './request.data';
import { ISparePart } from '../Store/sparePart/sparePart.data';
import { updateStore } from '../Store/Store';

export const Request:FC<updateStore> = ({update, changeUpdate}) => {
    const [maintenances, setMaintenances] = useState<ISparePart[]>([]);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [defaultValues, setDefaultValues] = useState<UpdateStatusSparePart>(requestDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getSparePart();
    }, [update]);

    // Async functions
    async function getSparePart() {
        setLoading(true);
        await getDataApi('/sparepart/Pending').then((response: ISparePart[]) => {
            setMaintenances(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/sparepart/status');
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

                {loading ? <Loader /> : <TableComponent addButton={''} tableData={maintenances} tableColumns={requestColumns} openDialog={openDialog} />}

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
