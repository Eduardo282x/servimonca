import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../API/BaseAPI';
import DialogComponent from '../../components/DialogComponent';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/actions-api.interface';
import { IDataForm } from '../../interfaces/form.interface';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { IPayments, IPaymentForm, paymentDefaultValues, paymentDataForm, getDataApiV2, paymentsColumns, paymentValidationSchema, IBanks } from './payments.data';
import { Loader } from '../../components/loaders/Loader';

export const Payments = () => {
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [defaultValues, setDefaultValues] = useState<IPaymentForm>(paymentDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(paymentDataForm);

    // useEffects
    useEffect(() => {
        getPayments();
        getRoles();
    }, []);

    // Async functions
    async function getPayments() {
        setLoading(true);
        setPayments(await getDataApiV2());
        setLoading(false);
    }

    async function getRoles() {
        await getDataApi('/payment/banks').then((response: IBanks[]) => {
            const newDataForm = [...dataForm];
            const findBankForm = newDataForm.find(form => form.name === 'bank') as IDataForm;
            findBankForm.options = response.map(option => {
                return {
                    value: option.bank,
                    label: option.bank
                }
            });

            setDataForm(newDataForm);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/payment');
        setDefaultValues(responseBaseApi.body as IPayments);
        setFormAction(responseBaseApi.action)
        if (responseBaseApi.open) { setDialog(true) };
        if (responseBaseApi.close) { setDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            getPayments();
            setOpenSnackbar(true);
        };
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Métodos de pagos</p>

            {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={payments} tableColumns={paymentsColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Método de pago' : 'Editar Método de pago'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo Método de pago' : 'un Método de pago'}
                        dataForm={paymentDataForm}
                        defaultValues={defaultValues}
                        validationSchema={paymentValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Método de pago' : 'Editar Método de pago'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>

    );
}
