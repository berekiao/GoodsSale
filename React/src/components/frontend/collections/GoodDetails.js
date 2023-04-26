import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function GoodDetails(){

    const {name} = useParams();
    const [detail, setDetailList] = useState([]);

    useEffect(()=>{


        axios.get(`/api/viewgooddetail/${name}`).then(res =>{
            if (res.data.status === 200) 
            {
                setDetailList(res.data.good);
            }
            
        });

    }, [name])

    var Good = ''
    {
        Good = 
        detail.map( (item)=> {
            return (
            <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Good / {item.category.name} / {item.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4 border-end">
                            <img   className="w-100" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {item.name}
                            </h4>
                            <p> {item.description} </p>
                            <h4 className="mb-1"> 
                                Price: {item.price}$
                                
                            </h4>

                            <button type="button" className="btn btn-danger mt-3">Request</button>
                           
                       </div>

                    </div>
                </div>
            </div>
        </div>
       ) })
    }


    return (

        <div>

            {Good}        

        </div>

    )
}

export default GoodDetails