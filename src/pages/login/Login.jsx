import React, { useState } from 'react'
import api from '../../api/axios';
import { auth } from '../../auth/AuthContext' 
import { useNavigate } from 'react-router-dom';
import { redirectByrole } from '../../utils/redirectByRole.js';

const Login = () =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const { login } = auth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const res = await api.post('/Auth/login', {
                email,
                password
            })

            login(res.data);

            navigate(redirectByrole(res.data.role));

        } catch (err) {
            setError("Email atau Password salah!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100' >
            <div className='bg-white p-8 rounded-xl shadow-md w-200 max-w-wd'>
                <h1 className='text-2xl font-bold text-center mb-6'>
                    Reimburstment System
                </h1>
               
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Email</label>
                        <input 
                            type="email"
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Password</label>
                        <input 
                            type="password" 
                            className='w-full boder rounded-lg px-3 py-2 focus:outline focus:ring focus:ring-blue-200'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type='submit'
                        disabled={loading}
                        className='w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer'
                    >
                        {loading ? "Signin in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login