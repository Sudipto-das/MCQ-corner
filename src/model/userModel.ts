import mongoose, { Model } from "mongoose";

interface User {
    username: string;
    password: string;
    email:string
}
const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: [true, "please provide a username"],
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    }
})

let UserModel: Model<User>;

try {
    // Try to retrieve the existing model
    UserModel = mongoose.model<User>("users");
} catch (error) {
    // Model doesn't exist, create a new one
    UserModel = mongoose.model<User>("users", userSchema);
}

export default UserModel