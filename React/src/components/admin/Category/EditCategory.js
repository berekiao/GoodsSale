import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function EditCategory(props) 
{
    let {id} = useParams();
    
    const navigate =  useNavigate();
    const [categoryInput, setCategory] = useState([])
    const [error, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name] : e.target.value})
    }

    useEffect(()=>{

        axios.get(`/api/edit-category/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                setCategory(res.data.category);
            }
            else if (res.data.status === 404) 
            {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category')
            }
        });

    }, [id, navigate])

    const updateCategory = (e) => {
        e.preventDefault();

        const data = {
            name : categoryInput.name
        }

        axios.put(`/api/update-category/${id}`, data).then(res => {
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
                navigate('admin/view-category');
            }
        });
    }
        

    return(
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category 
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Update</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <small className="text-danger">{error.name}</small>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Update</button>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default EditCategory