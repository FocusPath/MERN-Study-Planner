import { useEffect, useState } from 'react'
import InputEmail from '../components/InputEmail.jsx'
import InputPassword from '../components/InputPassword.jsx'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import api from '../lib/api.js'
import { getCurrentEmail, setCurrentEmail } from '../lib/auth.js'
import Logo from '../assets/Logo.png'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (getCurrentEmail()) {
            navigate('/subjects', { replace: true })
        }
    }, [navigate])

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    const isValidPassword = (value) => value.length >= 8

    const handleLogin = async (event) => {
        event.preventDefault()

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

        try {
            setIsSubmitting(true)
            const response = await api.post('/auth/login', { email, password })
            setCurrentEmail(response.data.user.email)
            toast.success('Workspace loaded.')
            navigate('/subjects', { replace: true })
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Unable to log in.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Toaster position="top-right" />
            <main className="min-h-screen flex md:flex-row">
                <div className="hidden md:flex md:w-1/2 bg-[#b0e8e0] justify-center items-center py-10 md:py-0">
                    <img
                        src={Logo}
                        className="w-3/4 max-w-md md:w-[30vw] h-auto"
                        alt="Focus Path logo"
                    />
                </div>

                <div className="w-full min-h-screen md:min-h-0 md:w-1/2 self-center px-6 md:mx-12 lg:mx-16 py-10 md:py-0 flex items-center md:block">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold p-2">{"LOGIN"}</h1>
                        <p className="px-2 pb-4 text-sm text-slate-500">Use any valid email to create or reopen your workspace.</p>
                        <form onSubmit={handleLogin} className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200">
                            <div className="space-y-4">
                                <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-6 rounded-2xl text-2xl font-bold px-6 py-3 bg-[#b0e8e0] hover:bg-[#97d1c8] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? 'LOADING...' : 'LOGIN'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login