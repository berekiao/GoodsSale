import React, { useState } from "react";
import '../../../assets/admin/js/login.css';
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

function Login (){

    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) 
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_role', res.data.role);
                    swal("Success",res.data.message,"success");
                    if (res.data.role === 'admin'  ) {
                        
                        navigate('/admin/dashboard');

                    }
                    else if (res.data.role === 'seller') 
                    {

                        navigate('/admin/dashboardSeller');
                        
                    } 
                    else if (res.data.role === 'moderator') 
                    {
                        navigate('/admin/dashboardModerator');
                        
                    } else {
                        
                        navigate('/');
                    }

                } 
                else if (res.data.status === 401) 
                {
                    swal("Warning",res.data.message,"warning");
  
                }
                else 
                {
                    setLogin({...loginInput, error_list : res.data.validation_errors });
                }

            });
        });
    }

    return(
        <div>

            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <input type="email" name="email" onChange={handleInput} value={loginInput.email} autoComplete="off" placeholder="Your Email" required/>
                    <span>{loginInput.error_list.email}</span>

                    <input type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Your Password" required/>
                    <span>{loginInput.error_list.password}</span>
                    
                    <button type="submit">Se connecter</button>
                </form>
                <p class="signup-link">Not a member? <Link to="/register">Sign up</Link></p>
            </div>
            
        </div>
        
    )
}

export default Login