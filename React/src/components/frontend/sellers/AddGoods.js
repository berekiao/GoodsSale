import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AddGood() {

    const [categoryList, setCategoryList] = useState([]);
    const [goodInput, setGood] = useState({
        name: '',
        category_id: '',
        price: '',
        description: ''
    });

    const [pricture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();    
        setGood({ ...goodInput, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }


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

    const submitGood = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('image', pricture.image);
        formData.append('name', goodInput.name);
        formData.append('category_id', goodInput.category_id);
        formData.append('price', goodInput.price);
        formData.append('description', goodInput.description);

        axios.post(`/api/store-good`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setGood({...goodInput,
                    name: '',
                    category_id: '',
                    price: '',
                    description: ''
                });
                setError([]);
            }
            else if (res.data.status === 422) {
                
                setError(res.data.errors);
            }
        });
    };


    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Goods
                        <Link to="/dashboardSeller/view-goods" className='btn btn-primary btn-sm float-end'>View Goods</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitGood} encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={goodInput.name} className="form-control" />
                            <small className="text-danger">{errorlist.name}</small>
                        </div>

                        <div className="form-group mb-3">
                            <label>Category</label>
                            <select name="category_id" onChange={handleInput} value={goodInput.category_id} className="form-control">
                                <option>Selected Category</option>

                                {categoryList.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    );
                                })}

                            </select>
                            <small className="text-danger">{errorlist.category_id}</small>
                        </div>

                        <div className="form-group mb-3">
                            <label>Price</label>
                            <input type="text" onChange={handleInput} value={goodInput.price} name="price" className="form-control" />
                            <small className="text-danger">{errorlist.price}</small>
                        </div>

                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={goodInput.description} className="form-control" />
                            <small className="text-danger">{errorlist.description}</small>
                        </div>

                        <div className="form-group mb-3">
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                            <small className="text-danger">{errorlist.image}</small>
                        </div>

                        
                        <button type="submit" className="btn btn-primary">Request</button>
                        
                    </form>
                </div>
            </div>


        </div>
    );
}

export default AddGood