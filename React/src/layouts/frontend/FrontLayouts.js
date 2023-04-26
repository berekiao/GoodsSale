import React from "react"
import {Outlet} from "react-router-dom";

import Navbar from "./Navbar";






function FrontLayouts(){

    

    return(
        <div>

            

            <Navbar />

            <main>
                
                <Outlet />
            </main>



        </div>
    )
}

export default FrontLayouts