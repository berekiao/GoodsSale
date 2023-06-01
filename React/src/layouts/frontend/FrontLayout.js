import React from "react"
import {Outlet} from "react-router-dom";
import '../../assets/frontend/style.css'

import Navbar from "./Navbar"
import Content from "./Content";
import Footer from "./footer"

function FrontLayouts(){
    return(
        <div>
            <Navbar/>

            <main>
                <Outlet/>
            </main>

            <Content/>

            <Footer/>

            
        </div>
    )
}

export default FrontLayouts