import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!,{dbName:"PrepExam"})
        const conection = mongoose.connection
        conection.on('connected', () => {
            console.log('connected sucsessfull')
        })
    } catch (error) {
        console.log(error)
    }
}