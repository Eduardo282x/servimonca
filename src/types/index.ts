import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({message: 'El correo electrónico no es valido'}),
    password: z.string().refine(text => text !== '',{message: 'La contraseña es obligatoria'})
});

type Login = z.infer<typeof LoginSchema>;
export type UserLoginForm = Pick<Login, 'email' | 'password'>;







