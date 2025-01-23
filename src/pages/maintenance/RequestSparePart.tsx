import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../API/BaseAPI';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { UpdateStatusSparePart, requestDefaultValues, existSparePartValidationSchema } from '../request/request.data';
import { ISparePart } from '../Store/sparePart/sparePart.data';
import { Loader } from '../../components/loaders/Loader';
import { IMaintenanceSparePart, requestSparePartColumns, requestSparePartValidationSchema, requestSpartePartMaintenanceDataForm, spartePartMaintenanceDataForm } from './requestMaintenance.data';
import { useLocation } from 'react-router-dom';
import { IDataForm } from '../../interfaces/form.interface';

export const RequestSparePart = () => {
    const location = useLocation();
    const [sparePartMaintenance, setSparePartMaintenance] = useState<IMaintenanceSparePart[]>([]);
    const [btnAction, setBtnAction] = useState<string>('Solicitar repuesto');
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [defaultValues, setDefaultValues] = useState<UpdateStatusSparePart>(requestDefaultValues);
    const [sparePartDataForm, setSparePartDataForm] = useState<IDataForm[]>(requestSpartePartMaintenanceDataForm);
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        getMaintenanceSparePart();
        getSpareParts();
    }, []);

    // Async functions
    async function getMaintenanceSparePart() {
        setLoading(true);
        const url = location.pathname === '/mantenimiento' ? '/maintenance/sparePart/all' : '/maintenance/sparePart/Solicitado';
        setBtnAction(location.pathname === '/mantenimiento' ? 'Solicitar repuesto' : '')
        await getDataApi(url).then((response: IMaintenanceSparePart[]) => {
            setSparePartMaintenance(response);
            setLoading(false);
        });
    }

    async function getSpareParts() {
        await getDataApi('/sparepart/Approved').then((response: ISparePart[]) => {
            const newDataForm = [...requestSpartePartMaintenanceDataForm];
            const findSparePart = newDataForm.find(form => form.name === 'sparePartId') as IDataForm;
            findSparePart.options = response.map(option => {
                return {
                    label: option.sparePart,
                    value: option.id
                }
            });

            setSparePartDataForm(newDataForm);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const url = location.pathname === '/mantenimiento' ? '/maintenance/sparePart' : '/maintenance/sparePart/status';
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', url);
        setDefaultValues(responseBaseApi.body as UpdateStatusSparePart)
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getMaintenanceSparePart();
            setOpenSnackbar(true);
        };
    }

    return (
        <div>
            <div>
                {/* <p className='text-4xl font-semibold mb-3'>Ordenes de compra</p> */}

                {loading ? <Loader /> : <TableComponent addButton={btnAction} tableData={sparePartMaintenance} tableColumns={requestSparePartColumns} openDialog={openDialog} />}

                <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

                <DialogComponent
                    dialog={dialog}
                    setDialog={setDialog}
                    form={
                        <div className='w-80'>
                            <FormComponent
                                title={location.pathname === '/mantenimiento' ? 'Solicitar' : 'Solicitud'}
                                description={''}
                                descriptionColored={''}
                                dataForm={location.pathname === '/mantenimiento' ? sparePartDataForm : spartePartMaintenanceDataForm}
                                defaultValues={defaultValues}
                                validationSchema={location.pathname === '/mantenimiento' ? requestSparePartValidationSchema : existSparePartValidationSchema}
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
