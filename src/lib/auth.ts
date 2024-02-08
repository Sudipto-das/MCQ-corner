import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/model/userModel";
import bcrypt, { compare } from 'bcrypt'
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:'/login'
    },
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                connect();

                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await UserModel.findOne({ email: credentials.email })
                if (!user) {
                    return null
                }
                const passwordMatch = await compare(credentials.password, user.password)
                if (!passwordMatch) {
                    return null
                }
                return {
                    id: `${user._id}`,
                    email: user.email,
                    username: user.username
                }

            }
        })
    ],
    secret: process.env.TOKEN_SECRET,
    

}