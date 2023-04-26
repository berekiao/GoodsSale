import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"


function ListGoods(){

    const [viewGood, setGood] = useState([])

    useEffect(() => {

        axios.get(`/api/all-good`).then(res=>{
            if (res.data.status === 200) 
            {
                setGood(res.data.goods);    
            }

        })
    }, [] )

    var viewgood_HTMLTABLE = "";
    {
        viewgood_HTMLTABLE = 
        viewGood.map( (item)=> {
            
            return(
                <tr key={item.id}>
                    <td>#</td>
                    <td>{item.user.name}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>{item.approval}</td>
                    
                    <td>
                        
                        <Link to={`/admin/edit-goods/${item.id}`} className="btn btn-secondary btn-sm">Configure</Link>
                        
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div className="container px-4">
            <div className="card">
                <div className="card-header">
                    <h4>Total Request Post Goods
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Seller Name</th>
                                <th>Good Name</th>
                                <th>Description</th>
                                <th>Posted</th>
                                <th>Validation</th>
                                <th>Request</th>
                            </tr>
                        </thead>
                        <tbody>
                        {viewgood_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListGoods