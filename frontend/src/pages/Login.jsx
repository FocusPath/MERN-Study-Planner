import { useState } from 'react'
import InputEmail from '../components/InputEmail.jsx'
import InputPassword from '../components/InputPassword.jsx'
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast'
//https://reactrouter.com/api/hooks/useNavigate

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    const isValidPassword = (value) => value.length >= 8

    const handleLogin = () => {
        const emailValid = isValidEmail(email)
        const passwordValid = isValidPassword(password)

        if (!emailValid || !passwordValid) {
            if (!emailValid && !passwordValid) {
                toast.error('Email format is invalid and password must be 8+ characters.')
                return
            }

            if (!emailValid) {
                toast.error('Email format is invalid.')
                return
            }

            toast.error('Password must be at least 8 characters.')
            return
        }

        toast.success('Validation passed. Logging in...')
        navigate('/subjects')
    }

    return (
        <>
            <Toaster position="top-right" />
            <main className="min-h-screen flex md:flex-row">
                <div className="hidden md:flex md:w-1/2 bg-[#b0e8e0] justify-center items-center py-10 md:py-0">
                    <img
                        src="src/assets/Logo.png"
                        className="w-3/4 max-w-md md:w-[30vw] h-auto"
                    />
                </div>

                <div className="w-full min-h-screen md:min-h-0 md:w-1/2 self-center px-6 md:mx-12 lg:mx-16 py-10 md:py-0 flex items-center md:block">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold p-2">{"LOGIN"}</h1>
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200">
                            <div className="space-y-4">
                                <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button
                                className="mt-6 rounded-2xl text-2xl font-bold px-6 py-3 bg-[#b0e8e0] hover:bg-[#97d1c8]"
                                onClick={handleLogin}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login