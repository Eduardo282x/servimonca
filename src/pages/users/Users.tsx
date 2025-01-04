import { Button } from "@mui/material";
import Filter from "../../components/Filter";
import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { IUsers, userColumns, usersDataForm, usersDefaultValues, usersValidationSchema } from "./users.data";
import { actionsValid } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";

export const Users = () => {

    // useStates
    const [users, setUsers] = useState<IUsers[]>([]);
    const [tableData, setTableData] = useState<IUsers[]>([]);
    const [defaultValues, setDefaultValues] = useState<IUsers>(usersDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IUsers) => {
        if(action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewUser = () => {
        setDefaultValues(usersDefaultValues);
        openDialog();
    }

    // Conditionals
    if(loading) {
        return <Loader />;
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

            <TableComponent tableData={tableData} tableColumns={userColumns} action={getActionTable} />
            
            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Usuario'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo usuario'
                        dataForm={usersDataForm}
                        defaultValues={defaultValues}
                        validationSchema={usersValidationSchema}
                        action='add'
                        buttonText='Agregar Usuario'
                    />
                }
            />
        </div>
    );
}
