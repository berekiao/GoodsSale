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
        <div className="form" >

            <h2>Add category</h2>

            <form onSubmit={submitCategory} id="CATEGORY_FORM">                    
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} autoComplete="off"/> <br/>
                <span className="text-danger">{categoryInput.error_list.name}</span>

                <button type="submit">Request</button>
                        
            </form>

            
        </div>
    )
}

export default Category