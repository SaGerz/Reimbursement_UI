import React, { useState } from 'react'

const Login = () =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email);
    console.log(password);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100' >
            <div className='bg-white p-8 rounded-xl shadow-md w-200 max-w-wd'>
                <h1 className='text-2xl font-bold text-center mb-6'>
                    Reimburstment System
                </h1>

                <form className='space-y-4'>
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
                        className='w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login