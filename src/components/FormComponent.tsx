import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDataForm, IForm, IOptions } from '../interfaces/form.interface';
import ErrorMessage from './ErrorMessage';

export const FormComponent = ({ title, description, descriptionColored, dataForm, defaultValues, validationSchema, buttonText } : IForm) => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = () => {
        reset();

        console.log("Funciona");
    }

    return (

        <>

            <h2 className="text-center text-xl">{title}</h2>

            <p className="text-xl font-bold mt-5">{description}  {''}
              <span className="text-blue-600">{descriptionColored}</span>
            </p>

            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='mt-8 space-y-2'
                noValidate
            >
                
                {dataForm && dataForm.map((form: IDataForm, index: number) => (
                    (form.type == 'text' &&
                        <div key={index} className="flex flex-col gap-5">
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
                        <div key={index} className="flex flex-col gap-5">
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
                        <div key={index} className="flex flex-col gap-5">
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
                        <div key={index} className="w-full my-3 gap-5">
                            <label className=' text-black ml-2'>{form.label}</label>
                            <select
                                {...register(form.name)}
                                className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500 selectOption`}  >
                                {form.options?.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {errors[form.name]?.message && <ErrorMessage>{errors[form.name]?.message?.toString()}</ErrorMessage>}
                        </div>
                    )
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