/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, Paper, IconButton, Button } from "@mui/material";
import { Check, Info, LockKeyhole, Pencil, Trash, X } from "lucide-react";
import { IColumns, TableReturn } from "../interfaces/table.interface";
import { actionsValid } from "../interfaces/table.interface";
import ErrorMessage from "./ErrorMessage";
import Filter from "./Filter";
import { useLocation } from "react-router-dom";

interface TableComponentProps {
    tableData: any[];
    tableColumns: IColumns[];
    openDialog: (tableReturn: TableReturn) => Promise<void>;
    addButton: string;
}

export default function TableComponent({ tableData, tableColumns, openDialog, addButton }: TableComponentProps) {

    const location = useLocation();
    // useStates
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [dataFilter, setDataFilter] = useState(tableData);

    // Functions
    const editingBody = (action: actionsValid, data: any) => {
        openDialog({ action: action, data: data });
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const showIcons = (icon: string) => {
        if (icon === 'edit') return <Pencil />;
        if (icon === 'delete') return <Trash color="#ff0000" />;
        if (icon === 'success') return <Check color="#00ff33" />;
        if (icon === 'error') return <X color="#ff0000" />;
        if (icon === 'info') return <Info color="#1565c0" />;
        if (icon === 'password') return <LockKeyhole color="#1565c0" />;
    }

    const changeRowColor = (row: any) => {
        if (row.criticAmount > row.amount && location.pathname === '/almacen') {
            return { background: '#ff0000' }
        }
    }

    return (

        <div>
            <div className={`flex items-center ${addButton === 'Imprimir' ? 'justify-end' : 'justify-between'}  w-full my-5`}>
                {addButton !== 'Imprimir' && <>
                    <Filter tableData={tableData} setTableData={setDataFilter} tableColumns={tableColumns}></Filter>
                </>}

                {addButton !== '' && (
                    <Button
                        onClick={() => openDialog({ action: 'add', data: null })}
                        variant="contained"
                        className='flex gap-2'
                    >
                        <span className='material-icons'>{addButton === 'Imprimir' ? 'download' : 'add_circle'}</span> {addButton}
                    </Button>
                )}
            </div>

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
                            {dataFilter.length > 0 ? dataFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                                <TableRow key={index} sx={changeRowColor(row)}>
                                    {tableColumns && tableColumns.map((column: IColumns, index: number) => (
                                        <TableCell key={index}>
                                            {column.icon &&
                                                <IconButton onClick={() => editingBody(column.column as actionsValid, row)} >
                                                    {showIcons(column.element(row))}
                                                </IconButton>
                                            }

                                            {!column.icon && (
                                                <span>{column.element(row)}</span>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={tableColumns.length} align='center'>
                                        <ErrorMessage>No hay datos</ErrorMessage>
                                    </TableCell>
                                </TableRow>
                            )}
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











