import TableComponent from "../../components/TableComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { IReports } from "./reports.data";

export const Reports = () => {
    // useStates
    const [reports, setReports] = useState<IReports[]>([]);
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

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Reportes</p>

            {/* {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={reports} tableColumns={reportColumns} openDialog={openDialog} />}

            */}
        </div>
    );
}
