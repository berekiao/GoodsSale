import React from "react";


function Footer(){
    return(
        <div>
            <section className="contact">
                <div className="contact-info">
                    <div className="first-info">
                        <h2>GOODSALES</h2>

                        <p>3245 Cotonou Street Akpakpa, <br/> TX Akpakpa Dabdji 769856</p>
                        <p>Tel : 987-485-69</p>
                        <p>goodssales@gmail.com</p>

                        <div className="social-icon">
                            <a href="#"><i className="bx bxl-facebook"></i></a>
                            <a href="#"><i className="bx bxl-twitter"></i></a>
                            <a href="#"><i className="bx bxl-youtube"></i></a>
                            <a href="#"><i className="bx bxl-linkedin"></i></a>
                            <a href="#"><i className="bx bxl-instagram"></i></a>
                        </div>
                    </div>

                    <div className="second-info">
                        <h4>Support</h4>
                        <p>Contact us</p>
                        <p>About page</p>
                        <p>Size Guide</p>
                        <p>Shopping & Resturns</p>
                        <p>Privacy</p>
                    </div>

                    <div className="third-info">
                        <h4>Company</h4>
                        <p>About</p>
                        <p>Blog</p>
                        <p>Affiliate</p>
                        <p>Login</p>
                    </div>

                    <div className="third-info">
                        <h4>Post</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br/> Aliquam dolore ullam</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br/> Aliquam dolore ullam</p>
                    </div>
                </div>
            </section>

            <div className="end-text">
                <p>Copyright @2023. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer