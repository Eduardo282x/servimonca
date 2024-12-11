import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { columnsCustomer, customers, IClients, IColumns } from './clients.data';
import { Pencil } from 'lucide-react';
export const Clients = () => {
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

            <p className=' text-3xl font-semibold mb-5'>Clientes</p>

            <div className="flex items-center justify-between w-full my-5">
                <TextField label="Buscar por..." variant="outlined" sx={{ width: 400 }} />
                <Button variant="contained" className='flex gap-2'><span className='material-icons'>add_circle</span> Agregar</Button>
            </div>

            <Paper sx={{ width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ background: '#1c233f' }}>
                                {columnsCustomer && columnsCustomer.map((col: IColumns, index: number) => (
                                    <TableCell key={index} sx={{ fontWeight: 600, color: '#fff' }}>{col.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IClients, index: number) => (
                                <TableRow key={index}>
                                    {columnsCustomer && columnsCustomer.map((column: IColumns, index: number) => (
                                        <TableCell key={index}>
                                            {column.column === 'edit' ?
                                                <IconButton>
                                                    {/* <span className='material-icons'>{column.element(row)}</span> */}
                                                    <Pencil />
                                                </IconButton>
                                                :
                                                <span>{column.element(row)}</span>}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                labelRowsPerPage='Paginas'
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
