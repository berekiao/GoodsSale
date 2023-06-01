import React, { useEffect, useState } from 'react'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

import {Outlet, Navigate, useNavigate} from "react-router-dom";

import Navbar from './Navbar'
import Sidebar from './Sidebar'

import axios from 'axios';
import swal from 'sweetalert';

const MasterLayout = () => {

    const navigate = useNavigate();

    const [Authenticated, setAuthenticated] =  useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.status === 200) 
            {
                setAuthenticated(true);
            }
            setLoading(false)
        });


        return()=>{
            setAuthenticated(false);
        };
    }, [])

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            navigate('/');

        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response){
        return response;
        }, function (error) {
            if (error.response.status === 403) //Access no authorized
            {
                swal('Forbidden', error.response.data.message, "warning");
                navigate('/Page403')  
            } 
            else if (error.response.status === 404) // Page not found
            {
                swal('404 Error', "Url/Page Not Fount", "warning");
                navigate('/Page404')  
            }
            return Promise.reject(error)
        }
    );

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!Authenticated) {
        return <Navigate to="/login"/>
    }

    return(
        <div className="grid-container">
            

            <aside id="sidebar">
                <Sidebar/>
            </aside>

            <main className="main-container">
                <Outlet />
            </main>
        </div>
    )
}

export default MasterLayout