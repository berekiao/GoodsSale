import React from "react";
import { Link } from "react-router-dom";

const DashboardSeller = () => {
    return(
        <div className="container py-5">

            <Link to="/dashboardSeller/add-goods" class="btn btn-primary btn-lg active">Add Goods</Link>
            <br/> <br/>
            <Link to="/dashboardSeller/view-goods" class="btn btn-primary btn-lg active">View All Goods</Link>
            <br/> <br/>
            <Link to="#" class="btn btn-primary btn-lg active">Total Request</Link>
            
        </div>
    )
}

export default DashboardSeller