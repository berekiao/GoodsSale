import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Sidebar = () => {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/logout`).then(res =>{
                if (res.data.status === 200) 
                {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal("Success",res.data.message,"success");
                    navigate('/');    
                }
            })
        })
    }

    var AuthButtons = '';
    if (localStorage.getItem('auth_token')) 
    {
        if (localStorage.getItem('auth_role') == 'admin') {

            AuthButtons = (
    
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Link to="/admin/dashboard" >
                            <span className="material-icons-outlined">dashboard</span> Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/view-category" >
                            <span className="material-icons-outlined">inventory_2</span> Category
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/view-moderator" >
                            <span className="material-icons-outlined">fact_check</span> Moderator
                        </Link>
                    </li>
                </ul>
    
            )
            
        } 
        else if(localStorage.getItem('auth_role') == 'moderator')
        {
            AuthButtons = (

                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Link to="/admin/dashboardModerator" >
                            <span className="material-icons-outlined">home</span> Dashboard
                        </Link>
                    </li>
                    
                </ul>
            )
        }
        else if(localStorage.getItem('auth_role') == 'seller')
        {
            AuthButtons = (

                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Link to="/admin/dashboardSeller" >
                            <span className="material-icons-outlined">home</span> Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/dashboardSeller/views-goods" >
                            <span className="material-icons-outlined">add_shopping_cart</span> Goods
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/dashboardSeller/publish-goods" >
                            <span className="material-icons-outlined">publish</span> Published goods
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/list-proposal" >
                            <span className="material-icons-outlined">visibility</span> Visit request
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Link to="/admin/conversations" >
                            <span className="material-icons-outlined">sms</span> Conversations
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    
    
    


    return(
        <div>

            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <span className="material-icons-outlined">inventory</span> GOODSALES
                </div>
                <span className="material-icons-outlined" onclick="closeSidebar()">close</span>
            </div>

            {AuthButtons}
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link onClick={logoutSubmit} to="#!" >
                        <span class="material-icons-outlined">logout</span> Logout
                    </Link>
                </li>
            </ul>
            
        </div>
    )
}

export default Sidebar