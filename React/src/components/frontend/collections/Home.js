import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import swal from "sweetalert"

function Home(){

    const [activeCategory, setActiveCategory] = useState('')

    const [good, setGood] = useState([])

    useEffect(() => {
        let isMountered = true;

        axios.get(`/api/getGood`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setGood(res.data.good);
                }
            }
        });

        return () => {
            isMountered = false;
        }
    }, []);

    var categories = ''; 
    {
        categories = good.reduce(
            (acc, elem) =>
                acc.includes(elem.category.name) ? acc : acc.concat(elem.category.name),
            []
        )
    }

    const likeGood = (e, id) => {
        e.preventDefault();

        axios.post(`/api/good/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
            } 
            else if (res.data.status === 403)
            {
                swal("Warning",res.data.message,"warning");
            }
        })

    }

    var viewGOODS = '';
    {
        viewGOODS = 
        good.map((good)=> !activeCategory || activeCategory === good.category.name   ? (
            <div className="row"  key={good.id}>
                <Link to={`/goods/${good.id}`}><img src={`http://127.0.0.1:8000/${good.image}`}/></Link>
                <div className="heart-icon">
                    
                    <Link to='!#' onClick={(e) => likeGood(e, good.id)} ><i className="bx bx-heart"></i></Link>
                </div>

                <div className="price">
                    <h4>{good.name}</h4>
                    <p>${good.price}</p>
                </div>
            </div>

            
        ) : null) 
    }        

    return(
        <div>

            <section className="main-home" id="sec">
                <div className="main-text">
                    <h5>Model Collection</h5>
                    <h1>New  <br/> Collection </h1>
                    <p>There's Nothing like Trend</p>

                    <a href="#" className="main-btn">Shop now <i className="bx bx-right-arrow-alt"></i></a>
                </div>
            </section>

            <section className="trending-production" id="trending">
                <div className="center-text">
                    <h2>Our Trending <span>Products</span></h2>
                </div>

                <Filter
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			    />

                <div className="products">
                    { viewGOODS }
                </div>
            </section>
            
            
        </div>
    )
}

export default Home