import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import swal from "sweetalert";

function EditGoods() {

    let {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category_id, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [approval, setApproval] = useState('');

    const [categoryList, setCategoryList] = useState([]);
    const [errorlist, setError] = useState([]);

    



    useEffect( () => {
        
        axios.get(`/api/all-category`).then(res=>{
           
            if(res.data.status === 200)
            {
                setCategoryList(res.data.category);
            }
            
        });

        axios.get(`/api/edit-good/${id}`).then(res=>{
           
            if(res.data.status === 200)
            {
                const { name, description, price, status, approval } = res.data.good;
                setName(name);
                setCategory(category_id);
                setDescription(description);
                setPrice(price);
                setStatus(status);
                setApproval(approval);
            }
            
            
        });
        

    }, [id]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleCheckboxChange = () => {
        setStatus(!status);
    };

    const handleCheckboxChangeApproval = () => {
        setApproval(!approval);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("category_id", category_id);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("status", status ? 1:0);
        formData.append("approval", approval ? 1:0);

        axios.post(`/api/update-good/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(res=>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success");
            } 
            else if (res.data.status === 422) 
            {
                
                setError(res.data.errors);
            }
        });;
          
      };

    if (localStorage.getItem('auth_role') == 'moderator') {

    return (
        <div className="form">
            <h2>Update good</h2>    

            <form onSubmit={handleSubmit}>

                <label>Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                <small className="text-danger">{errorlist.name}</small>

                <label>Category</label>
                <select name="category_id" onChange={(e) => setCategory(e.target.value)} value={category_id} >
                    <option>Selected Category</option>

                    {categoryList.map((item) => {
                        return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        );
                    })}

                </select>
                <small className="text-danger">{errorlist.category_id}</small>

                <label>Price</label>
                <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} name="price"  />
                <small className="text-danger">{errorlist.price}</small>

                <label>Description</label>
                <textarea name="description" onChange={(e) => setDescription(e.target.value)} value={description}  />
                <small className="text-danger">{errorlist.description}</small>

                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <small className="text-danger">{errorlist.image}</small>
                
                <label>Status || check = permission granted // uncheck = permission denied  </label>
                <input type="checkbox" checked={status} onChange={handleCheckboxChange} />
                

                <label>Approval || check = approval denied // uncheck = permission granted</label>
                <input type="checkbox" checked={approval} onChange={handleCheckboxChangeApproval} />
                
                
                
                <button type="submit">Update</button>
                
            </form>

        </div>
    );
    } 
    return(
        <div>
            You do not have permissions for this page
        </div>
    )
}

export default EditGoods