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
        <div className="form">
            <h1 className="mt-4">Add Moderator</h1>

            <form onSubmit={submitModerator} id="MODERATOR_FORM">

                <div >
                    <div >
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={moderatorInput.name}  autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="text" name="email" onChange={handleInput} value={moderatorInput.email}  autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleInput} value={moderatorInput.password}  autoComplete="off"/>
                            <span className="text-danger">{moderatorInput.error_list.password}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Role</label>
                            <input type="text" name="role_as" onChange={handleInput} value={moderatorInput.role_as}  autoComplete="off"/>
                            <span className="text-success">Buyer = 0, Sellers = 1, Moderator = 2</span>
                            <span className="text-danger">{moderatorInput.error_list.role_as}</span>
                        </div>

                        <button type="submit" >Submit</button>
                    </div>
                    
                </div>
            </form>
            
        </div>
    )
}

export default Moderator