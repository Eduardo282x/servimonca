/* eslint-disable @typescript-eslint/no-explicit-any */
import TableComponent from "../../components/TableComponent";
import { useState } from "react";
import { getDataApi, getDataFileApi } from "../../API/AxiosActions";
import { IEquipmentReport, ISparePartReport, mostRentedEquipmentsColumns, mostRequestedSparePartsColumns, optionReports, statusEquipment, statusMaintenance, statusRental, TypeReport } from "./reports.data";
import { IOptions } from "../../interfaces/form.interface";
import { Loader } from "../../components/loaders/Loader";
import { IColumns, TableReturn } from "../../interfaces/table.interface";
import { storeColumns } from "../Store/equipment/equipment.data";
import { rentalColumns } from "../rent/rentals/rental.data";
import { maintenanceClientColumns, maintenanceColumns } from "../maintenance/maintenance.data";

export const Reports = () => {
    const [reports, setReports] = useState<any[]>([]);
    const [columns, setColumns] = useState<IColumns[]>([]);
    const [optionStatus, setOptionsStatus] = useState<IOptions[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [typeReport, setTypeReport] = useState<TypeReport>('');
    const [status, setStatus] = useState<string>('');
    const [showTable, setShowTable] = useState<boolean>(false);

    async function getReports(type: TypeReport) {
        setTypeReport(type)
        if (type === 'equipmentAvailable') { setOptionsStatus(statusEquipment) }
        if (type === 'rentals') { setOptionsStatus(statusRental) }
        if (type === 'request') { setOptionsStatus(statusMaintenance) }
        if (type === 'requestClient') { setOptionsStatus(statusMaintenance) }
    }

    const setStatusOption = (opt: string) => {
        setStatus(opt)
    }

    const searchReport = async () => {
        if (typeReport === 'equipment') { setColumns(mostRentedEquipmentsColumns); }
        if (typeReport === 'sparePart') { setColumns(mostRequestedSparePartsColumns); }
        if (typeReport === 'equipmentAvailable') {
            const columnsWithoutEdit = storeColumns.filter(col => col.column !== 'edit');
            setColumns(columnsWithoutEdit);
        }
        if (typeReport === 'rentals') {
            const columnsWithoutEdit = rentalColumns.filter(col => col.column !== 'edit');
            setColumns(columnsWithoutEdit);
        }
        if (typeReport === 'request') {
            const columnsWithoutEdit = maintenanceColumns.filter(col => col.column !== 'edit');
            setColumns(columnsWithoutEdit);
        }
        if (typeReport === 'requestClient') {
            const columnsWithoutEdit = maintenanceClientColumns.filter(col => col.column !== 'edit');
            setColumns(columnsWithoutEdit);
        }
        setLoading(true);

        const url = typeReport === 'equipment' || typeReport === 'sparePart'
            ? `/report/${typeReport}`
            : `/report/${typeReport}/${status}`


        await getDataApi(url).then((response: IEquipmentReport[] | ISparePartReport[]) => {
            setReports(response);
            setLoading(false);
        });

        setShowTable(true);
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        console.log(data);
        console.log(action);

        const response = await getDataFileApi(`/report/download/${typeReport}`);
        const url = window.URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = url;
        link.download = setNameFile(); // Cambia el nombre del archivo según tus necesidades
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const setNameFile = (): string => {
        if (typeReport === 'equipment') return 'Equipos Más Alquilados.pdf';
        if (typeReport === 'sparePart') return 'Repuestos mas solicitados.pdf';
        return 'archivo.pdf';
    }

    return (
        <div>
            <p className=' text-3xl font-semibold mb-5'>Reportes</p>

            <div className="w-full flex items-center justify-between gap-5">
                <div className="flex flex-col gap-2 !my-4">
                    <label className='font-normal text-xl'>Tipo de reporte</label>
                    <select
                        onChange={(e) => getReports(e.target.value as TypeReport)}
                        className={`w-80 p-4 rounded-md border-gray-300 border focus:border-blue-500`}
                    >
                        <option value='' className=' hidden text-center'>----- Seleccione -----</option>
                        {optionReports && optionReports.map((opt: IOptions) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                {typeReport !== 'equipment' && typeReport !== 'sparePart' &&
                    <div className="flex flex-col gap-2 !my-4">
                        <label className='font-normal text-xl'>Estado</label>
                        <select
                            onChange={(e) => setStatusOption(e.target.value)}
                            className={`w-80 p-4 rounded-md border-gray-300 border focus:border-blue-500`}
                        >
                            <option value='' className=' hidden text-center'>----- Seleccione -----</option>
                            {optionStatus && optionStatus.map((opt: IOptions) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                }
                {/* 
                <div className=" flex items-center justify-center gap-5">
                    <div>
                        <label className="font-normal text-xl">Desde</label>
                        <Controller
                            name={'startDate'}
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePickerComponent
                                    minDate={minDate}
                                    value={field.value ? dayjs(field.value) : null} // Convertir el valor a Dayjs
                                    onChange={(date) => {
                                        setChangeDatePicker('startDate', date)
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="font-normal text-xl">Hasta</label>
                        <Controller
                            name={'endDate'}
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePickerComponent
                                    minDate={endDateMinDate}
                                    value={field.value ? dayjs(field.value) : null} // Convertir el valor a Dayjs
                                    onChange={(date) => {
                                        setChangeDatePicker('endDate', date)
                                    }}
                                />
                            )}
                        />
                    </div>
                </div> */}

                <button
                    onClick={searchReport}
                    className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-600 w-40 p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm mt-5"
                > Enviar</button>
            </div>
            {showTable && <>
                {loading ? <Loader /> : <TableComponent addButton={'Imprimir'} tableData={reports} tableColumns={columns} openDialog={openDialog} />}
            </>}
        </div>
    );
}
