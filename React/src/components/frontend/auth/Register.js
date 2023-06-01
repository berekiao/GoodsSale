import React, { useState } from 'react';
import '../../../assets/admin/js/login.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const [allcheckbox, setCheckboxes] = useState([])
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({...allcheckbox, [e.target.name]: e.target.checked });

    }

    const registerSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            role_as:allcheckbox.role_as
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => { 
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    
                        swal("Success",res.data.message,"success");
                        navigate('/login');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div>

            <div class="login-container">
                <h1>Register</h1>
                <form onSubmit={registerSubmit} >
                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} autoComplete="off" placeholder="Full Name" required/>
                    <span>{registerInput.error_list.name}</span>

                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} autoComplete="off" placeholder="Email" required/>
                    <span>{registerInput.error_list.email}</span>

                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} placeholder="Mot de passe" required/>
                    <span>{registerInput.error_list.password}</span>

                    <label>
                        Click this box if you want to create an account as a seller
                        <input type="checkbox" name='role_as' onChange={handleCheckbox} defaultChecked={allcheckbox.role_as === 1 ? true:false} />
                    </label>

                    <button type="submit">Register</button>
                </form>
            </div>

        </div>
    );
}

export default Register;