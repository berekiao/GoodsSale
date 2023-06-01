import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert"

function LikeGood(){

    const [good, setGood] = useState([])

    useEffect(() => {
        let isMountered = true;

        axios.get(`/api/like`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setGood(res.data.good);
                } 
                else if(res.data.status === 400)
                {
                    swal("Warning",res.data.message,"warning");
                }
            }
        });

        return () => {
            isMountered = false;
        }
    }, []);


    const unlikeGood = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/unlikeGood/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
            }
        })

    }

    var viewGOODS = '';
    {
        viewGOODS = 
        good.map((good)=> (
            <div className="row"  key={good.id}>
                <Link to={`/goods/${good.id}`}><img src={`http://127.0.0.1:8000/${good.image}`}/></Link>
                <div className="heart-icon">
                    
                    <Link to='!#' onClick={(e) => unlikeGood(e, good.id)} ><i className="bx bx-heart"></i></Link>
                </div>

                <div className="price">
                    <h4>{good.name}</h4>
                    <p>${good.price}</p>
                </div>
            </div>

            
        ) ) 
    }        

    return(
        <div>

            <section className="trending-production" id="trending">
                <div className="center-text">
                    <h2>The Loved <span>Goods</span></h2>
                </div>

                <div className="products">
                    { viewGOODS }
                </div>
            </section>
            
            
        </div>
    )
}

export default LikeGood