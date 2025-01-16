import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { putDataApi } from "../../API/AxiosActions";
import { BaseResponse } from "../../interfaces/actions-api.interface";
import { useState } from "react";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import { validateUserLoged } from "../../utils/auth";

interface UpdatePassword {
    password: string;
    confirmPassword: string;
}

const passwordSchema = z.object({
    password: z.string().refine(text => text !== '', { message: 'El campo es obligatorio' }),
    confirmPassword: z.string().refine(text => text !== '', { message: 'El campo es obligatorio' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
});

export const Profile = () => {
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const { handleSubmit, register, reset, formState: { errors } } = useForm<UpdatePassword>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(passwordSchema)
    })


    const onSubmit = async (newPassword: UpdatePassword) => {
        console.log(newPassword);
        const bodyUpdatePassword = {
            password: newPassword.password,
            id: validateUserLoged()?.id as number
        }

        await putDataApi('/auth/password', bodyUpdatePassword).then((response: BaseResponse) => {
            setSnackbar(response);
            setOpenSnackbar(true);
            reset();
        })
    }


    return (
        <div>
            <p className="text-2xl font-semibold mb-5">Mi Perfil</p>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-1/2 mx-auto">
                <div className="flex flex-col gap-2">
                    <label className="font-normal">Contraseña</label>
                    <input type="text" autoComplete="off" placeholder="********"
                        className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                        {...register("password")}
                    />
                    {errors.password?.message && <span className='text-sm text-red-600 font-semibold'>{errors.password?.message?.toString()}</span>}
                </div>
                <div className="flex flex-col gap-2 my-5">
                    <label className="font-normal">Confirmar Contraseña</label>
                    <input type="text" autoComplete="off" placeholder="********"
                        className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword?.message && <span className='text-sm text-red-600 font-semibold'>{errors.confirmPassword?.message?.toString()}</span>}
                </div>

                <button
                    type="submit"
                    className="disabled:bg-gray-400 bg-gray-900 hover:bg-black transition-all w-full my-4 p-3 text-white font-semibold rounded-lg text-lg"
                >Confirmar</button>
            </form>


            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
