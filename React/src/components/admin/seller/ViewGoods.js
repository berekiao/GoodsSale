import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"


function ViewsGoods(){

    const [viewGood, setGood] = useState([])

    useEffect(() => {

        axios.get(`/api/view-good`).then(res=>{
            if (res.data.status === 200) 
            {
                setGood(res.data.goods);    
            }

        })
    }, [] )

    const deleteGood = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        axios.delete(`/api/delete-good/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();    
            }
            else if(res.data.status === 400)
            {
                swal("Success",res.data.message,"success");
                thisClicked.innerText = 'Delete';
            }
        })

    }

    if (localStorage.getItem('auth_role') == 'seller') {

    var viewgood_HTMLTABLE = "";
    {
        viewgood_HTMLTABLE = 
        viewGood.map( (item)=> {
            
            return(
                <tr key={item.id}>
                    <td>#</td>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.price}$</td>
                    <td>{item.description}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" /></td>
                    <td className="add-button">
                        <Link to={`/admin/dashboardSeller/edit-goods/${item.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteGood(e, item.id)}>Delete</button>
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div>
            <div className="add-button">
                <Link to='/admin/dashboardSeller/add-goods'>Add Goods</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
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

export default ViewsGoods