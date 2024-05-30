
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService{
    async execute({ email, password }: AuthRequest){
        // Verifica se o e-mail existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário/Senha errados!")
        }

        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("A Senha está incorreta")
        }


        // Se deu certo vamos gerar um Token JWT e devolve os dados do usuário
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
           process.env.JWT_SECRET,
           {
            subject: user.id,
            expiresIn: '30d'
           }
        )

        
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService };