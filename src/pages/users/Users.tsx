import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi, putDataApi } from "../../API/AxiosActions";
import { getDataApiV2, IUserForm, IUserPasswordForm, IUsers, Rol, userColumns, usersDataForm, usersDefaultValues, usersPasswordDataForm, usersPasswordDefaultValues, usersPasswordValidationSchema, usersValidationSchema } from "./users.data";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { IDataForm } from "../../interfaces/form.interface";

export const Users = () => {
    // useStates 
    const [users, setUsers] = useState<IUsers[]>([]);
    const [defaultValues, setDefaultValues] = useState<IUserForm>(usersDefaultValues);
    const [defaultValuesPassword, setDefaultValuesPassword] = useState<IUserPasswordForm>(usersPasswordDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('add');
    const [dialog, setDialog] = useState<boolean>(false);
    const [dialogPassword, setDialogPassword] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [dataForm, setDataForm] = useState<IDataForm[]>(usersDataForm);

    // useEffects
    useEffect(() => {
        getUsers();
        getRoles();
    }, []);

    // Async functions
    async function getUsers() {
        setLoading(true);
        setUsers(await getDataApiV2());
        setLoading(false);
    }

    async function getRoles() {
        await getDataApi('/user/roles').then((response: Rol[]) => {
            const newDataForm = [...dataForm];
            const findRolId = newDataForm.find(form => form.name === 'rolId') as IDataForm;
            findRolId.options = response.map(option => {
                return {
                    value: option.id,
                    label: option.rol
                }
            });

            setDataForm(newDataForm);
        });
    }

    // Functions
    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        if (action === 'password') {
            setFormAction('passwordApi')
            const parseData = {...data, password: ''}
            setDefaultValuesPassword(parseData as IUserPasswordForm);
            setDialogPassword(true)
        }
        else if (action === 'passwordApi') {
            setDialogPassword(false)
            await putDataApi('/auth/password', data).then((response: BaseResponse) => {
                setSnackbar(response);
                setOpenSnackbar(true);
            })
        } else {
            const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/user');
            setDefaultValues(responseBaseApi.body as IUsers);
            setFormAction(responseBaseApi.action)
            if (responseBaseApi.open) { setDialog(true) };
            if (responseBaseApi.close) { setDialog(false) };
            if (responseBaseApi.snackbarMessage.message !== '') {
                setSnackbar(responseBaseApi.snackbarMessage);
                getUsers();
                setOpenSnackbar(true);
            };
        }
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Usuarios</p>

            {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={users} tableColumns={userColumns} openDialog={openDialog} />}

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title={formAction === 'addApi' ? 'Nuevo Usuario' : 'Editar Usuario'}
                        description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'addApi' ? 'un nuevo usuario' : 'un usuario'}
                        dataForm={usersDataForm}
                        defaultValues={defaultValues}
                        validationSchema={usersValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'addApi' ? 'Agregar Usuario' : 'Editar Usuario'}
                        onSubmitForm={openDialog}
                    />
                }
            />

            <DialogComponent
                dialog={dialogPassword}
                setDialog={setDialogPassword}
                form={
                    <FormComponent
                        title={'Actualizar Contraseña'}
                        description={''}
                        descriptionColored={''}

                        dataForm={usersPasswordDataForm}
                        defaultValues={defaultValuesPassword}
                        validationSchema={usersPasswordValidationSchema}

                        action={formAction}
                        buttonText={'Cambiar'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>

    );
}
