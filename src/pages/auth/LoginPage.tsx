import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
import { LoginSchema, UserLoginForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {

    const defaultValues: UserLoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues,
        resolver: zodResolver(LoginSchema)
    });

    function successfulLogin(formData: UserLoginForm) {
        if (formData.email === 'admin@admin.com' && formData.password === 'admin') {
            reset();
            console.log('Login successful');
        } else {
            reset();
            console.log('User Not Found');
        }
    }

    return (

        <div className="bg-white rounded-lg px-4 py-6">

            <div className="flex justify-center items-center">
                <Logo widthLogo="w-40" heightLogo="h-40" />
            </div>

            <form onSubmit={handleSubmit(successfulLogin)} className="space-y-8 p-4" noValidate>
                <div className="flex flex-col gap-2">
                    <label className="font-normal text-lg">Correo electrónico</label>
                    <input type="email" placeholder="correo@gmail.com"
                        className="w-full p-3 border-gray-300 border outline-none rounded-lg"
                        {...register("email")}
                    />
                    {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
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

            <nav className="mt-10 hidden flex-col space-y-4">
                <Link to={''} className="text-center text-gray-300 font-normal">
                    ¿No tienes cuenta? Crear una
                </Link>

                <Link to={''} className="text-center text-gray-300 font-normal">
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </div>
    );
}


