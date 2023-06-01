import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";


function GoodDetails(){

    const navigate = useNavigate();

    const {id} = useParams();
    const [detail, setDetailList] = useState([]);

    useEffect(()=>{


        axios.get(`/api/viewgooddetail/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                setDetailList(res.data.good);
            }
            
        });

    }, [id])

    const [content, setContent] = useState('');

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            content: content
        }

        axios.post(`/api/proposal/${id}`, data).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success")
                navigate('/');
            }
            else if (res.data.status === 401) 
            {
                swal("Warning", res.data.message, "warning")
                navigate('/');
            }
        })
        
      };
    

    var Good = ''

    if (localStorage.getItem('auth_token')){

        Good = 
        detail.map( (item)=> {
            return (


            <section className="prodetails" key={item.id}>
                <div className="single-pro-image">
                    <img src={`http://127.0.0.1:8000/${item.image}`} width="100%" id="MainImg" alt="" />
                </div>
                <div className="single-pro-details">
                    <h6>{item.category.name}</h6>
                    <h2>{item.name}</h2>
                    <h4>{item.price}$</h4>
                    <h3>Description</h3>
                    <span>{item.description}</span>

                    
                    <p>Submit a visit request for this item here if you wish.</p>

                    <form onSubmit={handleSubmit}>
                        <textarea name="content" value={content} onChange={handleChange} />
                        <button>Submit</button>
                    </form>

                </div>
            </section>  
        
       ) })
    } else
    {
        Good = 
        detail.map( (item)=> {
            return (


            <section className="prodetails" key={item.id}>
                <div className="single-pro-image">
                    <img src={`http://127.0.0.1:8000/${item.image}`} width="100%" id="MainImg" alt="" />
                </div>
                <div className="single-pro-details">
                    <h6>{item.category.name}</h6>
                    <h2>{item.name}</h2>
                    <h4>{item.price}$</h4>
                    <h3>Description</h3>
                    <span>{item.description}</span>

                    
                    <p>Please create an account or login in order to purchase this item</p>
                    
                </div>
            </section>  
        
       ) })
    }


    return (

        <div>

            {Good}      

        </div>

    )
}

export default GoodDetails