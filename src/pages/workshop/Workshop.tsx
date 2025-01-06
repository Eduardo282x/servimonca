import { Button } from "@mui/material";
import Filter from "../../components/Filter";
import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { IWorkshop, IWorkshopForm, workshopColumns, workshopDataForm, workshopDefaultValues, workshopValidationSchema } from "./workshop.data";

export const Workshop = () => {

    // useStates
    const [workshop, setWorkshop] = useState<IWorkshop[]>([]);
    const [tableData, setTableData] = useState<IWorkshop[]>([]);
    const [defaultValues, setDefaultValues] = useState<IWorkshopForm>(workshopDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getWorshop();
    }, []);

    // Async functions
    async function getWorshop() {
        setLoading(true);
        await getDataApi('/work-order').then((response: IWorkshop[]) => {
            setWorkshop(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IWorkshop) => {
        if(action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewWorshop = () => {
        setDefaultValues(workshopDefaultValues);
        openDialog();
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Taller</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={workshop} setTableData={setTableData} tableColumns={workshopColumns}></Filter>

                <Button
                    onClick={addNewWorshop}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>
            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={workshopColumns} action={getActionTable} />}
            
            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Usuario'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo usuario'
                        dataForm={workshopDataForm}
                        defaultValues={defaultValues}
                        validationSchema={workshopValidationSchema}
                        action='add'
                        buttonText='Agregar Usuario'
                    />
                }
            />
        </div>
    );
}
