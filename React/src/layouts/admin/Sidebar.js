import React from 'react'
import {Link} from 'react-router-dom';

const Sidebar = () => {

    var AuthButtons = '';
    if (localStorage.getItem('auth_token') && localStorage.getItem('auth_role') == 'admin') {

        AuthButtons = (

            <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/admin/dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
            
                <Link className="nav-link" to="/admin/profile">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Profile
                </Link>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Category
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-category">Add Category</Link>
                        <Link className="nav-link" to="/admin/view-category">Categories List</Link>
                    </nav>
                </div>

                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#layouts" aria-expanded="false" aria-controls="layouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Moderator
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="layouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-moderator">Add Moderator</Link>
                        <Link className="nav-link" to="/admin/view-moderator">Moderators List</Link>
                    </nav>
                </div>
                    
            </div>

        )
        
    } 
    else
    {
        AuthButtons = (

            <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>

                <Link className="nav-link" to="/admin/profile">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Profile
                </Link>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Goods
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/list-goods">List of Goods</Link>
                        <Link className="nav-link" to="#">Goods Signposted</Link>
                    </nav>
                </div>
                
                
            </div>
        )
    }

    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                {AuthButtons}
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    )
}

export default Sidebar