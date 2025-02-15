import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
import { LoginSchema, UserLoginForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ScreenLoader } from "../../components/loaders/ScreenLoader";
import { postDataApi } from "../../API/AxiosActions";
import { BaseResponse, BaseResponseLogin } from "../../interfaces/actions-api.interface";
import { SnackbarComponent } from "../../components/SnackbarComponent";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const [responseApi, setResponseApi] = useState<BaseResponseLogin>({} as BaseResponseLogin);
    const defaultValues: UserLoginForm = {
        username: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: zodResolver(LoginSchema)
    });

    async function successfulLogin(formData: UserLoginForm) {
        setLoader(true);
        await postDataApi('/auth', formData).then((response: BaseResponseLogin | BaseResponse) => {
            const returnApi = response as BaseResponseLogin;
            setResponseApi(response as BaseResponseLogin);
            setOpen(true);
            if (response.success) {
                localStorage.setItem('userData', JSON.stringify(returnApi.userData));
                setTimeout(() => {
                    // if(returnApi.userData.rol.rol === 'Taller'){
                    //     navigate('/mantenimiento')
                    // } else {
                    // }
                    navigate('/perfil')
                }, 1500);
            }
            setLoader(false);
        });
    }

    return (

        <div className="bg-white rounded-lg px-4 py-6">
            {loader && (
                <ScreenLoader></ScreenLoader>
            )}

            <div className="flex justify-center items-center">
                <Logo widthLogo="w-40" heightLogo="h-40" />
            </div>

            <form onSubmit={handleSubmit(successfulLogin)} className="space-y-8 p-4" noValidate>
                <div className="flex flex-col gap-2">
                    <label className="font-normal text-lg">Usuario</label>
                    <input type="text" placeholder="Usuario"
                        className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                        {...register("username")}
                    />
                    {errors.username && (<ErrorMessage>{errors.username.message}</ErrorMessage>)}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-normal text-lg">Contraseña</label>
                    <input type="password" placeholder="********"
                        className="w-full p-3  border-gray-300 border outline-none rounded-lg"
                        {...register("password")}
                    />
                    {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
                </div>

                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-black transition-all w-full p-3 text-white font-semibold rounded-lg text-lg"
                >Iniciar Sesión</button>
            </form>

            <SnackbarComponent baseResponse={responseApi} open={open} setOpen={setOpen}></SnackbarComponent>
        </div>
    );
}


