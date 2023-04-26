import React, { useState } from "react";
import swal from "sweetalert";

import axios from "axios";

const Category = () => {

    const [categoryInput, setCategory] = useState({
        name : '',
        error_list: []
    })

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name] : e.target.value})
    }

    const submitCategory = (e) =>{
        e.preventDefault();


        const data = {
            name:categoryInput.name
        }

        axios.post(`/api/store-category`, data).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success")
                document.getElementById('CATEGORY_FORM').reset()
            }
            else if (res.data.status === 400) 
            {
                setCategory({...categoryInput, error_list:res.data.errors})
            }
        })
    }

    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Category</h1>

            <form onSubmit={submitCategory} id="CATEGORY_FORM">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Add Category</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" autoComplete="off"/>
                            <span className="text-danger">{categoryInput.error_list.name}</span>
                        </div>

                        <button type="submit" className="btn btn-primary px-4">Submit</button>
                    </div>
                    
                </div>
            </form>
            
        </div>
    )
}

export default Category