import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";

const VueCategory = () => {

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

    var viewGOODS = '';
    {
        viewGOODS = 
        good.map((good)=> !activeCategory || activeCategory === good.category.name   ? (
            <div className="col-sm-8" key={good.id} >
                <div className="card-body">
                    <h5 className="card-title">{good.name}</h5>
                    <p className="card-text">{good.description}</p>
                    <Link to={`/goods/${good.name}`} className="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        ) : null)    
    }


    return(
        <div>
           <Filter
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

            { viewGOODS }

        </div>
    )
}

export default VueCategory