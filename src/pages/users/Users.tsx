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
    const [tableData, setTableData] = useState<IUsers[]>(users);
    const [defaultValues, setDefaultValues] = useState<IUsers>(usersDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getUsers();

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    // Async functions
    async function getUsers() {
        await getDataApi('user').then((response: IUsers[]) => {
            setUsers(response);
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
    if(isLoading) {
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
