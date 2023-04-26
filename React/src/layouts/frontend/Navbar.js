import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Navbar() {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/logout`).then(res =>{
                if (res.data.status === 200) 
                {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal("Success",res.data.message,"success");
                    navigate('/');    
                }
            })
        })
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) 
    {
        AuthButtons = (
            <ul className="navbar-nav">
               <li className="nav-item active">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li> 
            </ul>
        )
    }
    else if(localStorage.getItem('auth_token') && localStorage.getItem('auth_role') === 'seller')
    {
        AuthButtons = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboardSeller">Dashboard</Link>
                </li>
                
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" to="">Logout</button>
                </li>
            </ul>
            
        )
    } else {
        AuthButtons = (
            
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" to="">Logout</button>
            </li>
        
        )
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                    <li className="nav-item active">
                        <Link className="nav-link" to="#">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/goods">Goods</Link>
                    </li>
                    {AuthButtons}
                </ul>
            </div>
        </nav>

    )
}

export default Navbar