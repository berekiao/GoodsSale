import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"


function ViewSeller(){

    const [viewSeller, setSeller] = useState([])

    useEffect(() => {

        axios.get(`/api/list-seller`).then(res=>{
            if (res.data.status === 200) 
            {
                setSeller(res.data.seller);    
            }

        })
    }, [] )

    

    if (localStorage.getItem('auth_role') == 'moderator') {

    var viewseller_HTMLTABLE = "";
    {
        viewseller_HTMLTABLE = 
        viewSeller.map( (item)=> {
            
            return(
                <tr key={item.id}>
                    <td>#</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="add-button">
                        <Link to="#" className="btn btn-secondary btn-sm">Configure</Link>                    
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
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {viewseller_HTMLTABLE}
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

export default ViewSeller