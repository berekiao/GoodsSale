import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import swal from "sweetalert";

function AddGood() {

    const [name, setName] = useState("");
    const [category_id, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [categoryList, setCategoryList] = useState([]);

    const [errorlist, setError] = useState([]);

    useEffect( () => {
        let isMounted = true;
        
        axios.get(`/api/all-category`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCategoryList(res.data.category);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category_id", category_id);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);
        
        
        axios.post("/api/store-good", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then(res=>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success");
                setError([]);
            } 
            else if (res.data.status === 422) 
            {
                
                setError(res.data.errors);
            }
        });
          
    
    };

    if (localStorage.getItem('auth_role') == 'seller') {

        return(

            <div className="form">
                <h2>Add new good</h2>
                
                <form onSubmit={handleSubmit}>
                    
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                    <small className="text-danger">{errorlist.name}</small>

                    <label>Category</label>
                    <select name="category_id" onChange={(e) => setCategory(e.target.value)} value={category_id} className="form-control">
                        <option>Selected Category</option>

                        {categoryList.map((item) => {
                            return (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            );
                        })}

                    </select>
                    <small className="text-danger">{errorlist.category_id}</small>
                    
                    <label>Price</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} name="price" className="form-control" />
                    <small className="text-danger">{errorlist.price}</small>
                    
                    <label>Description</label>
                    <textarea name="description" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" />
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
                    <small className="text-danger">{errorlist.image}</small> <br/>
                    
                    <button type="submit">Request</button>
                    
                </form>
                
            </div>

        )
    } 
    return(
        <div>
            You do not have permissions for this page
        </div>
    )    
}

export default AddGood