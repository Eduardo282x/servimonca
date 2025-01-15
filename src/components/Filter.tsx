/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { IColumns } from "../interfaces/table.interface";

interface IFilter {
    tableData: any[];
    setTableData: (value: any) => void;
    tableColumns: IColumns[];
}

export default function Filter({ tableData, setTableData, tableColumns }: IFilter) {
    // useEffects
    useEffect(() => {
        setTableData(tableData);
    }, [tableData]);

    // Main Function
    const changeFilter = (filter: string) => {
        if (tableData && tableData.length > 0) {
            const filterColumn = tableColumns.filter((col: IColumns) => col.canFilter !== false);
            const filtersKey = filterColumn.map((col: IColumns) => col.column);
            const filterSearch = filtersKey.map((col: string) => 
                tableData.filter((fil) =>
                    fil[col].toString().toLowerCase().includes(filter.toLowerCase().toString())
                )
            ).flat();
            const reduceFilter = new Set(filterSearch);
            const result = [...reduceFilter];
            setTableData(result);
        }
    }

    return (
        <div >
            <TextField onChange={(e) => changeFilter(e.target.value)} label="Buscar por..." variant="outlined" sx={{ width: 400 }} />
        </div>
    )
}
