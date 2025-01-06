import { Button } from "@mui/material";
import Filter from "../../components/Filter";
import TableComponent from "../../components/TableComponent";
import DialogComponent from "../../components/DialogComponent";
import { FormComponent } from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { actionsValid } from "../../interfaces/table.interface";
import { Loader } from "../../components/loaders/Loader";
import { IReportForm, IReports, reportColumns, reportsDataForm, reportsDefaultValues, reportsValidationSchema } from "./reports.data";

export const Reports = () => {

    // useStates
    const [reports, setReports] = useState<IReports[]>([]);
    const [tableData, setTableData] = useState<IReports[]>([]);
    const [defaultValues, setDefaultValues] = useState<IReportForm>(reportsDefaultValues);
    const [dialog, setDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getReports();
    }, []);

    // Async functions
    async function getReports() {
        setLoading(true);
        await getDataApi('/report').then((response: IReports[]) => {
            setReports(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IReports) => {
        if(action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewUser = () => {
        setDefaultValues(reportsDefaultValues);
        openDialog();
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Reportes</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={reports} setTableData={setTableData} tableColumns={reportColumns}></Filter>

                <Button
                    onClick={addNewUser}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>
            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={reportColumns} action={getActionTable} />}
            
            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Usuario'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo usuario'
                        dataForm={reportsDataForm}
                        defaultValues={defaultValues}
                        validationSchema={reportsValidationSchema}
                        action='add'
                        buttonText='Agregar Usuario'
                    />
                }
            />
        </div>
    );
}
