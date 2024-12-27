import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().refine(text => text !== '',{message: 'El usuario es obligatoria'}),
    password: z.string().refine(text => text !== '',{message: 'La contraseña es obligatoria'})
});

type Login = z.infer<typeof LoginSchema>;
export type UserLoginForm = Pick<Login, 'username' | 'password'>;







