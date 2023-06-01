import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const DashboardModerator = () => {

    const [viewGood, setGood] = useState([])
    const [viewSeller, setSeller] = useState([])
    const [viewRequest, setRequest] = useState([])

    useEffect(() => {

        axios.get(`/api/all-good`).then(res=>{
            if (res.data.status === 200) 
            {
                setGood(res.data.goods);    
            }

        })

        axios.get(`/api/list-seller`).then(res=>{
            if (res.data.status === 200) 
            {
                setSeller(res.data.seller);    
            }

        })

        axios.get(`/api/list-request`).then(res=>{
            if (res.data.status === 200) 
            {
                setRequest(res.data.request);    
            }

        })
    }, [] )


    return(
        <div>
            <div className="main-title">
                <p className="font-weight-bold">DASHBOARD</p>
            </div>

            <div className="main-cards">

                <div className="card">
                    <div className="card-inner">
                    <p className="text-primary">TOTAL GOODS</p>
                    <Link to="/admin/list-goods">
                        <span className="material-icons-outlined text-blue">inventory_2</span>
                    </Link>
                    </div>
                    <span className="text-primary font-weight-bold">{viewGood.length}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                    <p className="text-primary">NEW REQUEST</p>
                    <Link to="/admin/list-request">
                        <span className="material-icons-outlined text-orange">add_shopping_cart</span>
                    </Link>
                    </div>
                    <span className="text-primary font-weight-bold">{viewRequest.length}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                    <p className="text-primary">LIST OF SELLERS </p>
                    <Link to="/admin/list-seller">
                        <span className="material-icons-outlined text-green">person</span>
                    </Link>
                    </div>
                    <span className="text-primary font-weight-bold">{viewSeller.length}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                    <p className="text-primary">GOODS ALERTS</p>
                    <span className="material-icons-outlined text-red">notification_important</span>
                    </div>
                    <span className="text-primary font-weight-bold">12</span>
                </div>

               

            </div>
        </div>
    )
}

export default DashboardModerator