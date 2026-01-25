import React from 'react'
import { auth } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom';
import { redirectByrole } from '../utils/redirectByRole';

const Rootredirect = () => {
    const { user, loading } = auth();

    if(loading)
    {
        return null;
    }
 
    if(!user)
    {
        return <Navigate to="/login" replace />
    }

    return <Navigate to={redirectByrole(user.role)} replace />
}

export default Rootredirect;