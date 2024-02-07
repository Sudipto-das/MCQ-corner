import UserModel from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody
        const user = await UserModel.findOne({ email })

        if (user) {
            return NextResponse.json({ massage: "user already exists" }, { status: 400 })
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        return NextResponse.json({massage: "user signup sucsess",savedUser},{ status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.massage }, { status: 500 })
    }
}