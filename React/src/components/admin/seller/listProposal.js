import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"


function ListProposal(){

    const navigate = useNavigate();

    const [viewProposal, setProposal] = useState([])

    useEffect(() => {

        axios.get(`/api/listProposal`).then(res=>{
            if (res.data.status === 200) 
            {
                setProposal(res.data.proposal);    
            }

        })
    }, [] )

    const validate = (e, id) => {
        e.preventDefault();

        axios.get(`/api/confirmProposal/${id}`).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                navigate('/admin/dashboardSeller')
            }
            
        })

    }

    if (localStorage.getItem('auth_role') == 'seller') {

    var viewProposal_HTML = "";
    var confirm = ""
    
    {
        viewProposal_HTML = 
        viewProposal.map( (item)=> {

            const confirm = item.validated ? "[Demande validée]" : <Link onClick={(e) => validate(e, item.id)}>Validate the proposal</Link>
            
            return(
                <div key={item.id}>
                    <div >
                        <h3>{item.good.name}</h3>
                         
                        <p className="add-button">
                            
                            ● "{item.request_letter.content}" by <strong>{item.user.name}</strong> <br/> 
                            {confirm}
                            
                        </p>
                    </div><br/>
                </div> 
            )
        });
    }   

    return(
        <div>
            <h1>Goods</h1> <br/>
            {viewProposal_HTML}

        </div>
    )
    } 
    return(
        <div>
            You do not have permissions for this page
        </div>
    ) 
}

export default ListProposal