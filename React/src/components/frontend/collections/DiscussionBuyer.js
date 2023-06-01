import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import moment from 'moment';
import 'moment/locale/fr';

function DiscussionBuyer() {

    moment.locale('fr');
    let {id} = useParams();

    const [viewDiscussion, setDiscussion] = useState([]);

    useEffect( () => {
        
        axios.get(`/api/conversations/${id}`).then(res=>{
           
            if(res.data.status === 200)
            {
                setDiscussion(res.data.result)
                
            }
        });
        

    }, [id]);

    const [content, setContent] = useState('');

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            content: content
        }

        axios.post(`/api/sendMessage/${id}`, data).then(res =>{
            if (res.data.status === 200) 
            {
                swal("Success", res.data.message, "success")
            }
            else if (res.data.status === 401) 
            {
                swal("Warning", res.data.message, "warning")
            }
        })
        
      };

    var view_HTML = '';
    {
        view_HTML = 
        viewDiscussion.map( (item)=> {
        
            return(
                <div key={item.id}>
                    <h2>Nom du bien : {item.good.name}</h2> <br/>
                    {item.messages.map((message) => (
                        <div class="messages" key={message.id}>
                            <div class="message">
                                <p class={message.user.name === localStorage.getItem('auth_name')  ? "contents" : "content"}>{message.content}</p>
                                <span class="timestamp">{moment(message.created_at).format('LT')}</span>                            
                            </div>       
                        </div>       
                    ))}
                </div> 
            )
        });
    }

    return (
        <section>
            <div class="conversation">
                {view_HTML}

                <form onSubmit={handleSubmit}>
                    <div class="input-container">
                        <textarea className="message-input" name="content" value={content} onChange={handleChange} placeholder="Entrez votre message"></textarea>
                        <button className="send-button">Envoyer</button>
                    </div>
                </form>
            
            </div>
        </section>
    );
    } 
    

export default DiscussionBuyer