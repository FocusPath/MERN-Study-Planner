import InputEmail from '../components/InputEmail.jsx'
import InputPassword from '../components/InputPassword.jsx'
import { useNavigate } from "react-router-dom";
//https://reactrouter.com/api/hooks/useNavigate

const Login = () => {
    const navigate = useNavigate()
    return (
        <main
            style={{
                height: '100vh',
                display: 'flex',
            }}>
            <div
                style={{
                    width: '50vw',
                    backgroundColor: '#b0e8e0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src="src/components/FocusPath.png"
                    style={{ width: '30vw', height: 'auto' }}
                />
            </div>

            <div
                style={{
                    width: '50vw',
                    alignSelf: 'center',
                    marginLeft: 50,
                    marginRight: 50
                }}>
                <h1 className="text-4xl font-bold p-2">{"LOGIN"}</h1>
                <br />
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400">
                    <InputEmail />
                    <br />
                    <InputPassword />
                    <br />
                     <button className="rounded-2xl text-2xl font-bold px-6 py-3 bg-[#b0e8e0] hover:bg-[#97d1c8] " 
                     onClick={() => navigate('/subjects')} >
  LOGIN
</button>

                </div>
               

            </div>

            

        </main>




    )
}

export default Login