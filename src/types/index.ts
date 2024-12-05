import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

type Login = z.infer<typeof LoginSchema>;
export type UserLoginForm = Pick<Login, 'email' | 'password'>;







