import TableComponent from "../../components/TableComponent";
import { useEffect, useState } from "react";
import { getDataApi } from "../../API/AxiosActions";
import { IReportForm, IReports, keysForm, optionReports, validation } from "./reports.data";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import DatePickerComponent from "../../components/date-pickers/DatePickerComponent";
import { IOptions } from "../../interfaces/form.interface";
import { zodResolver } from "@hookform/resolvers/zod";

export const Reports = () => {
    // useStates
    const [reports, setReports] = useState<IReports[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { control, setValue, handleSubmit, register, formState: { errors } } = useForm<IReportForm>({
        defaultValues: {
            startDate: null,
            endDate: null,
            type: ''
        },
        resolver: zodResolver(validation)
    })

    const onSubmit = async (reportForm: IReportForm) => {
        console.log(reportForm);
    }

    const setChangeDatePicker = (formControl: keysForm, value: any) => {
        const formattedValue = value ? dayjs(value).toISOString() : null;
        setValue(formControl, new Date(formattedValue as string))
    }

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

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center justify-around gap-5">
                <div className="flex flex-col gap-2 !my-4">
                    <label className='font-normal text-xl'>Tipo de reporte</label>
                    <select
                        {...register('type')}
                        className={`w-80 p-4 rounded-md border-gray-300 border ${errors.type?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                    >
                        <option value='' className=' hidden text-center'>----- Seleccione -----</option>
                        {optionReports && optionReports.map((opt: IOptions) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <div>
                        <label className="font-normal text-xl">Desde</label>
                        <Controller
                            name={'startDate'}
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePickerComponent
                                    includeMin={false}
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
                                    includeMin={false}
                                    value={field.value ? dayjs(field.value) : null} // Convertir el valor a Dayjs
                                    onChange={(date) => {
                                        setChangeDatePicker('endDate', date)
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

                <button 
                className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-600 w-40 p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm mt-5"
                > Enviar</button>
            </form>
            {/* {loading ? <Loader /> : <TableComponent addButton={'Agregar'} tableData={reports} tableColumns={reportColumns} openDialog={openDialog} />}

            */}
        </div>
    );
}
