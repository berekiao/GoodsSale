import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewModerator = () => {

    const [moderatorList, setmoderatorList] = useState([]);

    useEffect(() => {

        axios.get(`/api/view-moderator`).then(res=>{
            //console.log(res.data.category)
            if (res.status === 200 ) 
            {
                setmoderatorList(res.data.moderator)    
            }
        })

    }, []);

    const deleteModerator = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        axios.delete(`/api/delete-moderator/${id}`).then(res =>{
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


    var viewmoderator_HTMLTABLE = "";
    {
        viewmoderator_HTMLTABLE = 
        moderatorList.map( (item)=> {
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.role_as}</td>
                    <td>
                        <Link to={`/admin/edit-moderator/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteModerator(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>

            )
        });
    }   

    return(
        <div className="container px-4">
            <div className="card">
                <div className="card-header">
                    <h4>Moderator List
                        <Link to='/admin/add-moderator' className="btn btn-primary btn-sm float-end">Add Moderator</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewmoderator_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewModerator