import React from "react";
import A from '../../assets/img/A.jpg'
import C from '../../assets/img/C.jpg'
import D from '../../assets/img/D.jpg'

function Content(){
    return(
        <section className="Update-news" id="sec" >
            <div className="up-center-text">
                <h2>New Goods</h2>
            </div>

        <div className="update-cart">
            <div className="cart">
                <img src={A} alt=""/>
                <h4>This is the new goods for your needs.</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nihil? Culpa quos consectetur eaque exercitationem </p>
                <h6>View all...</h6>
            </div>
            <div className="cart">
                <img src={C} alt=""/>
                <h4>This is the new goods for your needs.</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nihil? Culpa quos consectetur eaque exercitationem </p>
                <h6>View all...</h6>
            </div>
            <div className="cart">
                <img src={D} alt=""/>
                <h4>This is the new goods for your needs.</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nihil? Culpa quos consectetur eaque exercitationem </p>
                <h6>View all...</h6>
            </div>
        </div>
        
    </section>
    )
}

export default Content