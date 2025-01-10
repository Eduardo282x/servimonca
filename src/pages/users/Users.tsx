import { Button } from "@mui/material";
import Filter from "../../components/Filter";
import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { IUserForm, IUsers, userColumns, usersDataForm, usersDefaultValues, usersValidationSchema } from "./users.data";
import { actionsValid, TableReturn } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { BaseApi, BaseApiReturn } from "../../API/BaseAPI";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import { BaseResponse } from "../../interfaces/actions-api.interface";

export const Users = () => {

    // useStates
    const [users, setUsers] = useState<IUsers[]>([]);
    const [tableData, setTableData] = useState<IUsers[]>([]);
    const [defaultValues, setDefaultValues] = useState<IUserForm>(usersDefaultValues);
    const [formAction, setFormAction] = useState<actionsValid>('addApi');
    const [dialog, setDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<BaseResponse>({
        success: false,
        message: ''
    });
    const [loading, setLoading] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getUsers();
    }, []);

    // Async functions
    async function getUsers() {
        setLoading(true);
        await getDataApi('/user').then((response: IUsers[]) => {
            response.map((user => {
                user.rolDescription = user.rol.rol;
                return user;
            }))
            setUsers(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = async (tableReturn : TableReturn) => {

        const { data, action } = tableReturn;

        const responseBaseApi : BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/user');

        setDefaultValues(responseBaseApi.body as IUsers);

        if(responseBaseApi.open){setDialog(true)};
        if(responseBaseApi.close){setDialog(false)};
        if(responseBaseApi){getUsers()};

        if(responseBaseApi.action === 'add'){setFormAction('add')}
        if(responseBaseApi.action === 'edit'){setFormAction('edit')}

        if(responseBaseApi.snackbarMessage){setSnackbar(responseBaseApi.snackbarMessage)};

    }

    const addNewUser = () => {
        setFormAction('add');
        setDefaultValues(usersDefaultValues);
        setDialog(true);
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Usuarios</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={users} setTableData={setTableData} tableColumns={userColumns}></Filter>

                <Button
                    onClick={addNewUser}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>
            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={userColumns} openDialog={openDialog} />}

            { snackbar.success && <SnackbarComponent baseResponse={snackbar} />}
            
            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}   
                form={
                    <FormComponent
                        title={formAction === 'add' ? 'Nuevo Usuario' : 'Editar Usuario'}
                        description={formAction === 'add' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
                        descriptionColored={formAction === 'add' ? 'un nuevo usuario' : 'un usuario'}
                        dataForm={usersDataForm}
                        defaultValues={defaultValues}
                        validationSchema={usersValidationSchema}
                        action={formAction}
                        buttonText={formAction === 'add' ? 'Agregar Usuario' : 'Editar Usuario'}
                        onSubmitForm={openDialog}
                    />
                }
            />

        </div>

    );
}
