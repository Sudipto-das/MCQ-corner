"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
       
    })
    const handleInputChange = (e: { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    }
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/signup', formData)
            console.log('User signed up successfully:', response.data);
        } catch (error) {
            console.error('Error signing up user:', error);
        }

    }
    return <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="mb-10">
            <h1 className="font-semibold text-xl">Signup here</h1>
        </div>
        <form className="flex flex-col gap-4 w-full max-w-md  p-4 mx-2 border rounded shadow-lg" onSubmit={handleSubmit}>
            <Input name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
            <Input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <Input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleInputChange} />
            
            <div>
                <Button type="submit">Signup</Button>
            </div>

        </form>

    </div>
}
export default SignupForm;