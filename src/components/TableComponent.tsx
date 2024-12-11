import { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from "@mui/material";

interface Column {
    id: 'modelo' | 'marca' | 'year' | 'numero_serie';
    label: string;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'modelo', label: 'Modelo', align: 'center' },
    { id: 'marca', label: 'Marca', align: 'center' },
    { id: 'year', label: 'Año', align: 'center' },
    { id: 'numero_serie', label: 'Número de Serie', align: 'center' }
];

interface Data {
    modelo: string;
    marca: string;
    year: number;
    numero_serie: number;
}

function createData(
    modelo: string,
    marca: string,
    year: number,
    numero_serie: number,
): Data {
    return { modelo, marca, year, numero_serie };
}
  
const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];
  

export default function TableComponent() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (

        <div className="border border-gray-500 rounded-lg p-5">

            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">

                <TableContainer sx={{ maxHeight: 440 }}>

                    <Table stickyHeader>

                        <TableHead>

                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                        <TableRow key={row.marca}>
                                            {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                                </TableCell>
                                            );
                                            })}
                                        </TableRow>
                                    ))
                            }

                        </TableBody>

                    </Table>

                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </div>

        </div>

    );
    
}











