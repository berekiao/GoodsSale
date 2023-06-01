import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import moment from 'moment';
import 'moment/locale/fr';

function ConversationBuyer() {

    moment.locale('fr');
    const [viewConversation, setConversation] = useState([]);

    useEffect(() => {
        axios.get(`/api/conversations`).then(res => {
            if (res.data.status === 200) {
                setConversation(res.data.result);    
            }
        });
    }, []);

    let view_HTML = viewConversation.map((item) => {
        return (
            <div>
                <div className="contenu" key={item.id}>
                    <Link to={`/conversations/${item.id}`}>
                        {item.messages.map((message) => (
                            <>
                                <p key={message.id}>{message.content} <span>envoyé par<strong> {message.user.name === localStorage.getItem('auth_name') ? 'vous' : `${message.user.name}`}</strong> {moment(message.created_at).fromNow()}</span></p> 
                            </>    
                        ))}
                    </Link> 
                    
                </div> 
                <br/>
            </div>
        );
    });

    
        return (
            <section>
                <h1>Mes conversations</h1> 
                <br/>
                {view_HTML}
                
            </section>
        );
    } 
    

export default ConversationBuyer;
