/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, IDataForm, IForm, IOptions } from '../interfaces/form.interface';
import ErrorMessage from './ErrorMessage';
import { TableReturn } from '../interfaces/table.interface';
import DatePickerComponent from './date-pickers/DatePickerComponent';
import dayjs from "dayjs";

export const minDate = dayjs();

export const FormComponent = ({ title, description, descriptionColored, dataForm, defaultValues, validationSchema, buttonText, action, onSubmitForm }: IForm) => {

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues,
        resolver: zodResolver(validationSchema as any),
    });

    const onSubmit = (returnForm: any) => {
        
        (returnForm as FormValues).id = returnForm.id ? returnForm.id : defaultValues.id;
        const formData: TableReturn = {
            action: action,
            data: returnForm
        }

        onSubmitForm(formData);
    }

    const setChangeDatePicker = (formControl: string, value: any) => {
        const formattedValue = value ? dayjs(value).toISOString() : null;
        setValue(formControl, new Date(formattedValue as string))
    }

    return (
        <>
            <h2 className="text-center text-xl">{title}</h2>

            {description !== '' && (
                <p className="text-xl font-bold mt-5">{description}  {''}
                    <span className="text-blue-600">{descriptionColored}</span>
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-2' noValidate>
                {dataForm && dataForm.map((form: IDataForm, index: number) => (
                    (form.type == 'text' &&
                        <div key={index} className="flex flex-col gap-2 !my-4">
                            <label className='font-normal text-xl'>{form.label}</label>
                            <input
                                type="text"
                                className={`w-full p-3 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    ) ||
                    (form.type == 'number' &&
                        <div key={index} className="flex flex-col gap-2 !my-4">
                            <label className='font-normal text-xl'>{form.label}</label>
                            <input
                                type="number"
                                className={`w-full p-3 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name, { valueAsNumber: true })}
                            />
                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    ) ||
                    (form.type == 'email' &&
                        <div key={index} className="flex flex-col gap-2 !my-4">
                            <label className='font-normal text-xl'>{form.label}</label>
                            <input
                                type="email"
                                className={`w-full p-3 rounded-lg  border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    ) ||
                    (form.type == 'select' &&
                        <div key={index} className="flex flex-col gap-2 !my-4">
                            <label className='font-normal text-xl'>{form.label}</label>
                            <select
                                {...register(form.name)}
                                className={`w-full p-3 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500 selectOption`}
                            >
                                <option value='' className=' hidden text-center'>----- Seleccione -----</option>
                                {form.options?.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    ) ||
                    (form.type == 'textArea' &&
                        <div key={index} className="flex flex-col gap-2 !my-4">
                            <label className='font-normal text-xl'>{form.label}</label>
                            <textarea
                                className={`w-full p-3 rounded-lg border-gray-300 border ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)}
                            />
                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    ) ||
                    (form.type === 'date' && (
                        <div key={index} className="flex flex-col gap-1 !my-4">
                            <label className="font-normal text-xl">{form.label}</label>
                            <Controller
                                name={form.name}
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <DatePickerComponent
                                        minDate={minDate}
                                        value={field.value ? dayjs(field.value) : null} // Convertir el valor a Dayjs
                                        onChange={(date) => {
                                            setChangeDatePicker(form.name, date)
                                        }}
                                    />
                                )}
                            />
                            {errors[form.name]?.message && (
                                <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>
                            )}
                        </div>
                    ))
                ))}

                <div className='pt-3'>
                    <input
                        type="submit"
                        value={buttonText}
                        className="bg-blue-500 hover:bg-blue-600 w-full p-2 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg text-sm"
                    />
                </div>
            </form>
        </>
    );
}