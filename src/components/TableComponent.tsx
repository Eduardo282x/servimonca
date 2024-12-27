/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, Paper, IconButton } from "@mui/material";
import { Pencil } from "lucide-react";
import { IColumns } from "../interfaces/table.interface";

export type Action = 'add' | 'edit' | 'delete';
interface TableComponentProps {
    tableData: any[];
    tableColumns: IColumns[];
    action: (action: Action, data: any) => void;
}

export default function TableComponent({ tableData, tableColumns, action }: TableComponentProps) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (

        <div>

            <Paper sx={{ width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ background: '#1c233f' }}>
                                {tableColumns && tableColumns.map((col: IColumns, index: number) => (
                                    <TableCell key={index} sx={{ fontWeight: 600, color: '#fff' }}>{col.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                                <TableRow key={index}>
                                    {tableColumns && tableColumns.map((column: IColumns, index: number) => (
                                        <TableCell key={index}>
                                            {column.column === 'edit' ?
                                                <IconButton onClick={() => action(column.column as Action, row)} >
                                                    {/* <span className='material-icons'>{column.element(row)}</span> */}
                                                    <Pencil />
                                                </IconButton>
                                                :
                                                <span>{column.element(row)}</span>}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )) : <p>No se encontraron datos</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableData.length}
                labelRowsPerPage='Paginas'
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>

    );

}











