import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewCategory = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {

        axios.get(`/api/view-category`).then(res=>{
            //console.log(res.data.category)
            if (res.status === 200 ) 
            {
                setCategoryList(res.data.category)    
            }
        })

    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        axios.delete(`/api/delete-category/${id}`).then(res =>{
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

    if (localStorage.getItem('auth_role') == 'admin') {
        
    

    var viewcategory_HTMLTABLE = "";
    {
        viewcategory_HTMLTABLE = 
        categoryList.map( (item)=> {
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td className="add-button">
                        <Link to={`/admin/edit-category/${item.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button type="button" to="#!" onClick={(e) => deleteCategory(e, item.id)} >Delete</button>
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div>
            <div className="main-title">
                <p className="font-weight-bold">CATEGORY</p>
            </div> <br/>
            
            <div>
                <div className="add-button">
                    <Link to='/admin/add-category'>Add Category</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewcategory_HTMLTABLE}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 
return(
    <div>
        Not authorized
    </div>
)
}

export default ViewCategory