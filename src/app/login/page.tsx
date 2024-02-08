"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    })
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const signInData = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect:false
            })
            if(signInData?.error){
                console.log(signInData.error)
            }
            else{
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }


    }

    const handleInputChange = (e: { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    }
    return <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="mb-10">
            <h1 className="font-semibold text-xl">Login here</h1>
        </div>
        <form className="flex flex-col gap-4 w-full max-w-md  p-4 mx-2 border rounded shadow-lg" onSubmit={handleSubmit}>

            <Input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <Input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleInputChange} />

            <div>
                <Button type="submit">Login</Button>
            </div>

        </form>

    </div>
}
export default Login