import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Navbar(){
    
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

    if (localStorage.getItem('auth_token')) {
        
        AuthButtons = (
            <div>
                <Link to="/GoodLikes"><i className="bx bx-heart"></i></Link>
                <Link to="/achats"><i className="bx bx-cart"></i></Link>
                <Link to="/conversations"><i className="bx bx-message"></i></Link>
                <Link onClick={logoutSubmit} to="#!"><i className="bx bx-log-out"></i></Link>
            </div>
        )
    } else {

        AuthButtons = (
            <Link to="/login"><i className="bx bx-user"></i></Link>
        )
    }

    return(
       <header>
            <Link to="#" className="logo"><h2>GOODSALES</h2></Link>

            <ul className="navmenu">
                <li><Link to="/">home</Link></li>
                <li><Link to="">products</Link></li>
                <li><Link to="">New</Link></li>
                <li><Link to="">About</Link></li>
            </ul>

            <div className="nav-icon">

                {AuthButtons}
            </div>
       </header>
    )
}

export default Navbar