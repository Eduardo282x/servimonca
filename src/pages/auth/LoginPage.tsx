import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
import { UserLoginForm } from "../../types";

export default function LoginPage() {

    const initialValues: UserLoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    function successfulLogin(formData: UserLoginForm) {

        if(formData.email === 'admin@admin.com' && formData.password === 'admin') {
            reset();
            console.log('Login successful');
        } else {
            reset();
            console.log('User Not Found');
        }

    }

    const handleLogin = (formData: UserLoginForm) => successfulLogin(formData);

    return (

        <>

            <div className="flex justify-center items-center mb-10">

                <Logo />

            </div>

            <h1 className="text-5xl font-black text-white text-center">Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 mt-10 p-10 bg-white rounded-lg"
                noValidate
            >

                <div className="flex flex-col gap-5">

                    <label
                        className="font-normal text-2xl"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
                            },
                        })}
                    />

                    {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}

                </div>

                <div className="flex flex-col gap-5">

                    <label
                        className="font-normal text-2xl"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />

                    {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
                    
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-black hover:bg-gray-400 w-full p-3 text-white font-black rounded-lg text-xl cursor-pointer"
                />

            </form>

            <nav
                className="mt-10 flex flex-col space-y-4"
            >

                <Link 
                    to={''}
                    className="text-center text-gray-300 font-normal"
                >
                    ¿No tienes cuenta? Crear una
                </Link>

                <Link 
                    to={''}
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>

            </nav>

        </>

    );

}


