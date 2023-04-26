import React, { useState } from 'react';
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
                        navigate('/');
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
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" autoComplete="off"  />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" autoComplete="off" />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control"  />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>

                                    <p>Click this box if you want to create an account as a seller</p>
                                    <div className="form-check">
                                        <label className="form-check-label" >Seller
                                            <input type="checkbox" name='role_as' onChange={handleCheckbox} defaultChecked={allcheckbox.role_as === 1 ? true:false} className="form-check-input"/>
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;