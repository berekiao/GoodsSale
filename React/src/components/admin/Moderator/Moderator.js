import React, { useState } from "react";
import swal from "sweetalert";

import axios from "axios";

const Moderator = () => {

    const [moderatorInput, setModerator] = useState({
        name : '',
        email : '',
        password : '',
        role_as : '',
        error_list: []
    })

    const handleInput = (e) => {
        e.persist();
        setModerator({...moderatorInput, [e.target.name] : e.target.value})
    }

    const submitModerator = (e) =>{
        e.preventDefault();


        const data = {
            name:moderatorInput.name,
            email:moderatorInput.email,
            password:moderatorInput.password,
            role_as:moderatorInput.role_as,
        }

        axios.post(`/api/store-moderator`, data).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success")
                document.getElementById('MODERATOR_FORM').reset()
            }
            else if (res.data.status === 400) 
            {
                setModerator({...moderatorInput, error_list:res.data.errors})
            }
        })
    }

    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Moderator</h1>

            <form onSubmit={submitModerator} id="MODERATOR_FORM">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Add Category</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={moderatorInput.name} className="form-control" autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="text" name="email" onChange={handleInput} value={moderatorInput.email} className="form-control" autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleInput} value={moderatorInput.password} className="form-control" autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.password}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Role</label>
                            <input type="text" name="role_as" onChange={handleInput} value={moderatorInput.role_as} className="form-control" autoComplete="off"/>
                            <span className="text-success">Buyer = 0, Sellers = 1, Moderator = 2</span>
                            <span className="text-danger">{moderatorInput.error_list.role_as}</span>
                        </div>

                        <button type="submit" className="btn btn-primary px-4">Submit</button>
                    </div>
                    
                </div>
            </form>
            
        </div>
    )
}

export default Moderator