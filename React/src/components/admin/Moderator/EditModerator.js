import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function EditModerator(props) 
{
    let {id} = useParams();
    const navigate =  useNavigate();
    const [moderatorInput, setModerator] = useState([])
    const [error, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setModerator({...moderatorInput, [e.target.name] : e.target.value})
    }

    useEffect(()=>{

        axios.get(`/api/edit-moderator/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                setModerator(res.data.moderator);
            }
            else if (res.data.status === 404) 
            {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-moderator')
            }
        });

    }, [id, navigate])

    const updateModerator = (e) => {
        e.preventDefault();

        const data = {
            name : moderatorInput.name,
            email : moderatorInput.email,
            password : moderatorInput.password,
            role_as : moderatorInput.role_as,
        }

        axios.put(`/api/update-moderator/${id}`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('admin/view-moderator');
            }
        });
    }
        

    return(
        <div >
            <div >
                <div className="card-header">
                    <h2>Edit Moderator </h2>
                </div>

                <div className="form">

                    <form onSubmit={updateModerator}>
                        <div className="tab-content" id="myTabContent">
                            
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={moderatorInput.name} />
                                <small className="text-danger">{error.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input type="text" name="email" onChange={handleInput} value={moderatorInput.email} />
                                <small className="text-danger">{error.email}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleInput} value={moderatorInput.password} />
                                <small className="text-danger">{error.password}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Role</label>
                                <input type="text" name="name" onChange={handleInput} value={moderatorInput.role_as} />
                                <span className="text-success">Buyer = 0, Sellers = 1, Moderator = 2</span>   
                                <small className="text-danger">{error.role_as}</small>
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Update</button>

                            
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default EditModerator