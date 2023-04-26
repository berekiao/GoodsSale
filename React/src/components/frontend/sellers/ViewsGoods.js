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

    const deleteCategory = (e, id) => {
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
                    <td>
                        <Link to={`/dashboardSeller/edit-goods/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteCategory(e, item.id)}  className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div className="container px-4">
            <div className="card">
                <div className="card-header">
                    <h4>Your Goods
                        <Link to='/dashboardSeller/add-goods' className="btn btn-primary btn-sm float-end">Add Goods</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
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

export default ViewsGoods