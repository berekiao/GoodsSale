import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"


function RequestGoods(){

    const [viewRequest, setRequest] = useState([])

    useEffect(() => {

        axios.get(`/api/list-request`).then(res=>{
            if (res.data.status === 200) 
            {
                setRequest(res.data.request);    
            }

        })
    }, [] )

    

    if (localStorage.getItem('auth_role') == 'moderator') {

    var viewgood_HTMLTABLE = "";
    {
        viewgood_HTMLTABLE = 
        viewRequest.map( (item)=> {
            
            return(
                <tr key={item.id}>
                    <td>#</td>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.price}$</td>
                    <td>{item.description}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" /></td>
                    <td className="add-button">
                        <Link to={`/admin/edit-goods/${item.id}`} className="btn btn-secondary btn-sm">Configure</Link>                    
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {viewgood_HTMLTABLE}
                </tbody>
            </table>

        </div>
    )
    } 
    return(
        <div>
            You do not have permissions for this page
        </div>
    ) 
}

export default RequestGoods