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
                const { name, description, price } = res.data.good;
                setName(name);
                setCategory(category_id);
                setDescription(description);
                setPrice(price);
            }
            else if (res.data.status === 404) 
            {
                swal("Error", res.data.message, "error");
                navigate('/admin/dashboardSeller/views-goods')
            }
            
        });
        

    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("category_id", category_id);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);

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

    if (localStorage.getItem('auth_role') == 'seller') {

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

                <label>Image</label>
                <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="item" />
                        ) : (
                            <p>Drop an image here or click to select a file</p>
                        )}
                        </div>
                    )}
                </Dropzone>
                <small className="text-danger">{errorlist.image}</small>

                
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