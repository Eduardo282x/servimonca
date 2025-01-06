import { Button } from "@mui/material";
import Filter from "../../components/Filter";
import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { historyColumns, historyDataForm, historyDefaultValues, historyValidationSchema, IHistory, IHistoryForm } from "./history.data";

export const History = () => {

    // useStates
    const [history, setHistory] = useState<IHistory[]>([]);
    const [tableData, setTableData] = useState<IHistory[]>([]);
    const [defaultValues, setDefaultValues] = useState<IHistoryForm>(historyDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getHistory();
    }, []);

    // Async functions
    async function getHistory() {
        setLoading(true);
        await getDataApi('/sparepart-history').then((response: IHistory[]) => {
            setHistory(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IHistory) => {
        if(action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewHistory = () => {
        setDefaultValues(historyDefaultValues);
        openDialog();
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Historial</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={history} setTableData={setTableData} tableColumns={historyColumns}></Filter>

                <Button
                    onClick={addNewHistory}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>
            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={historyColumns} action={getActionTable} />}
            
            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Usuario'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo usuario'
                        dataForm={historyDataForm}
                        defaultValues={defaultValues}
                        validationSchema={historyValidationSchema}
                        action='add'
                        buttonText='Agregar Usuario'
                    />
                }
            />
        </div>
    );
}
