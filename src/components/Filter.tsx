import { TextField } from "@mui/material";
import { IColumns } from "./TableComponent";

interface Ifilter {
    data: any[];
    setData: (value: any) => void;
    columns: IColumns[];
}

export default function Filter({ data, setData, columns } : Ifilter) {

    const changeFilter = (filter: string) => {
        
        if (data && data.length > 0) {

            const filterColumn = columns.filter((col: IColumns) => col.canFilter !== false);
            const filtersKey = filterColumn.map((col: IColumns) => col.column);

            const filterSearch = filtersKey.map((col: string) =>
                    data.filter((fil) =>
                        fil[col].toString().toLowerCase().includes(filter.toLowerCase().toString())
                    )
                )
                .flat();
            const reduceFilter = new Set(filterSearch);
            const result = [...reduceFilter];
            setData(result);
        }
    }

    return (
        <div >
            <TextField onChange={(e) => changeFilter(e.target.value)} label="Buscar por..." variant="outlined" sx={{ width: 400 }} />
        </div>
    )
}
