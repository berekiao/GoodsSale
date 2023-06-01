import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Proposal()
{
    const [proposalList, setProposalList] = useState([]);

    useEffect(() => {

        axios.get(`/api/viewProposal`).then(res=>{
            //console.log(res.data.category)
            if (res.status === 200 ) 
            {
                setProposalList(res.data.proposal)    
            }
        })

    }, []);

    var viewProposals = '';
    {
        viewProposals = 
        proposalList.map( (item)=>{
            return(
                <div>
                    <div id="qui" class="contenu" key={item.id}>
                        <h2>👉{item.good.name}</h2>
                        <p>
                            {item.request_letter.content} : {`${item.validated == true ? "[Demande valider]" : "[En cours]"}`}
                        </p>
                        
                    </div> <br/>
                </div> 
            )
        })
    }

    return (
        <section className="ok">
            {viewProposals}
        </section>    
    )
}

export default Proposal