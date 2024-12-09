import { useState } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, IconButton } from "@mui/material";

interface Column {
    id: number;
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}
  
const columns: Column[] = [
    { id: 1, label: 'Modelo', minWidth: 170, align: 'center'},
    { id: 2, label: 'Marca', minWidth: 100 },
    { id: 3, label: 'Año', minWidth: 100 },
    { id: 4, label: 'Número de Serie', minWidth: 100 },
    { id: 5, label: 'Capacidad de Carga', minWidth: 100 },
    { id: 6, label: 'Dimensiones', minWidth: 100 },
    { id: 7, label: 'Estado Actual', minWidth: 100 }
];

interface Data {
    id: number;
    modelo: string;
    marca: string;
    year: number;
    numero_serie: number;
    capacidad_carga: number;
    dimensiones: number;
    estado_actual: string;
}

function createData(
    id: number,
    modelo: string,
    marca: string,
    year: number,
    numero_serie: number,
    capacidad_carga: number,
    dimensiones: number,
    estado_actual: string,
): Data {
    return { id, modelo, marca, year, numero_serie, capacidad_carga, dimensiones, estado_actual };
}

const rows = [
    createData(56465486418, 'Grua', 'GR', 2014, 5, 7, 10, 'disponible')
];

export default function TableComponent() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    return (

        <div>

            <div>

                <div>

                    <TableContainer component={Paper} className="table">

                        <Table>

                            <TableHead>

                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {row.id}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                    );
                                })}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </div>

            </div>

        </div>

    );
    
}











