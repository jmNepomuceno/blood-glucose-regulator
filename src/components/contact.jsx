import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Contact extends Component {
    constructor(props){
        super()
        const {window_width} = props
        this.state ={
            nav_style : {
                display : (window_width <= 770) ? "none" : "flex"
            },
            paragraph_display : {
                display : (window_width <= 770) ? "none" : "block"
            },
            nav_bar_display : {
                display : (window_width <= 770) ? "block" : "none"
            },
            nav_div : {
                display : "none"
            },
            home_nav : {
                textDecoration : "none",
            },
            contact_nav : {
                textDecoration : "underline",
            },
            about_nav : {
                textDecoration : "none",
            },
        }
    }

    handleClickNavBar = () =>{
        let nav_div = {...this.state.nav_div}
        nav_div.display = (this.state.nav_div.display === "none") ? "block" : "none"
        this.setState({nav_div})
    }

    handleToFb = (e) =>{
        if(e === "fb-1"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "fb-2"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "fb-3"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "fb-4"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
    }

    handleToIg = (e) =>{
        if(e === "ig-1"){
            // window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "ig-2"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "ig-3"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "ig-4"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
    }

    handleToTw = (e) =>{
        if(e === "tw-1"){
            // window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "tw-2"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "tw-3"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
        else if(e === "tw-4"){
            window.location.href = 'https://www.facebook.com/johnmarvin.nepomuceno.3/'
        }
    }

    handleToPn = (e) =>{
        if(e === "09480288229"){
            alert(e)
        }
        else if(e === "09480288229"){
            alert(e)
        }
        else if(e === "09480288229"){
            alert(e)
        }
        else if(e === "09480288229"){
            alert(e)
        }
    }

    handleToEm = (e) =>{
        if(e === "johnmarvinnepomuceno@gmail.com"){
            alert(e)
        }
        else if(e === "johnmarvinnepomuceno@gmail.com"){
            alert(e)
        }
        else if(e === "johnmarvinnepomuceno@gmail.com"){
            alert(e)
        }
        else if(e === "johnmarvinnepomuceno@gmail.com"){
            alert(e)
        }
    }

    render() { 

        return (
            <div className="contact-container">
                <div className="semi-container">
                    <header>
                        <img id="logo-img" src={require('../imgs/logo.png')} alt="logo-img" />

                        <nav style={this.state.nav_style}>
                            <Link to="/"><button id='home-btn' style={this.state.home_nav}>Home</button> </Link>
                            <Link to="/contact"><button id="contact-btn" style={this.state.contact_nav}>Contact us</button></Link>
                            <Link to="/about"><button id='about-btn' style={this.state.about_nav}>About us</button></Link>

                            <form>
                                <Link to="/sign-up">
                                    <button id="sign-up-btn">Sign up</button>
                                </Link>
                            </form>
                        </nav>

                        {/* MOBILE PART */}
                        <img
                            style={this.state.nav_bar_display}
                            onClick={this.handleClickNavBar} 
                            id="nav-bar-img" 
                            src={require('../imgs/nav-bar.png')} 
                            alt="navigation-bar" 
                        />
                    </header>

                    {/* MOBILE PART */}
                    <div style={this.state.nav_div} className="nav-mobile-div">
                        <nav>
                            <Link to="/"><button id='home-btn' style={this.state.home_nav}>Home</button> </Link>
                            <Link to="/contact"><button id="contact-btn" style={this.state.contact_nav}>Contact us</button></Link>
                            <Link to="/about"><button id='about-btn' style={this.state.about_nav}>About us</button></Link>
                            <form>
                                <Link to="/sign-up">
                                    <button id="sign-up-btn">Sign up</button>
                                </Link>
                            </form>
                        </nav>
                    </div>

                    <main>

                        <div className="card-div">

                            <div className='card-sub-div' id="card-1">
                                <div className="card-content">
                                    <img id="user-img" src={require('../imgs/jm_image.jpg')} alt="user-img" />
                                    <h3>John Marvin Nepomuceno</h3>
                                    <h5>Full Stack Developer</h5>
                                </div>
                                <div className="card-icons">
                                    <button onClick={() => this.handleToFb("fb-1")}><i className="fa fa-facebook"></i></button>
                                    <button onClick={() => this.handleToIg("ig-1")}><i className="fa fa-instagram"></i></button>
                                    <button onClick={() => this.handleToTw("tw-1")}><i className="fa fa-twitter"></i></button>
                                    <button onClick={() => this.handleToPn("09480288229")}><i className="fa fa-phone"></i></button>
                                    <button onClick={() => this.handleToEm("johnmarvinnepomuceno@gmail.com")}><i className="fa fa-at"></i></button>
                                </div>
                            </div>

                            <div className='card-sub-div' id="card-2">
                                <div className="card-content">
                                    <img id="user-img" src={require('../imgs/zea_image.jpg')} alt="user-img" />
                                    <h3>Zea John Caparaz</h3>
                                    <h5>UI/UX Designer</h5>
                                </div>
                                <div className="card-icons">
                                    <button onClick={() => this.handleToFb("fb-1")}><i className="fa fa-facebook"></i></button>
                                    <button onClick={() => this.handleToIg("ig-1")}><i className="fa fa-instagram"></i></button>
                                    <button onClick={() => this.handleToTw("tw-1")}><i className="fa fa-twitter"></i></button>
                                    <button onClick={() => this.handleToPn("09480288229")}><i className="fa fa-phone"></i></button>
                                    <button onClick={() => this.handleToEm("johnmarvinnepomuceno@gmail.com")}><i className="fa fa-at"></i></button>
                                </div>
                            </div>

                            <div className='card-sub-div' id="card-3">
                                <div className="card-content">
                                    <img id="user-img" src={require('../imgs/tey_image.jpg')} alt="user-img" />
                                    <h3>Krizzel Mae Nojadera</h3>
                                    <h5>Tester</h5>
                                </div> 
                                <div className="card-icons">
                                    <button onClick={() => this.handleToFb("fb-1")}><i className="fa fa-facebook"></i></button>
                                    <button onClick={() => this.handleToIg("ig-1")}><i className="fa fa-instagram"></i></button>
                                    <button onClick={() => this.handleToTw("tw-1")}><i className="fa fa-twitter"></i></button>
                                    <button onClick={() => this.handleToPn("09480288229")}><i className="fa fa-phone"></i></button>
                                    <button onClick={() => this.handleToEm("johnmarvinnepomuceno@gmail.com")}><i className="fa fa-at"></i></button>
                                </div>
                            </div>

                            <div className='card-sub-div' id="card-4">
                                <div className="card-content">
                                    <img id="user-img" src={require('../imgs/liezel_image.jpg')} alt="user-img" />
                                    <h3>Liezel Ortiz</h3>
                                    <h5>Tester</h5>
                                </div>
                                <div className="card-icons">
                                    <button onClick={() => this.handleToFb("fb-1")}><i className="fa fa-facebook"></i></button>
                                    <button onClick={() => this.handleToIg("ig-1")}><i className="fa fa-instagram"></i></button>
                                    <button onClick={() => this.handleToTw("tw-1")}><i className="fa fa-twitter"></i></button>
                                    <button onClick={() => this.handleToPn("09480288229")}><i className="fa fa-phone"></i></button>
                                    <button onClick={() => this.handleToEm("johnmarvinnepomuceno@gmail.com")}><i className="fa fa-at"></i></button>
                                </div>
                            </div>

                            <div id="mini-card-1">
                                <h1>Mr. Rigor Regalado</h1>
                                <h3>Thesis Advicer</h3>
                                <div className="card-icons">
                                    <button ><i className="fa fa-facebook"></i></button>
                                    <button ><i className="fa fa-phone"></i></button>
                                    <button ><i className="fa fa-at"></i></button>
                                </div>
                            </div>

                            <div id="mini-card-2">
                                <h1>Microcity College of Business and Technology</h1>
                                <h3>College / University</h3>
                                <div className="card-icons">
                                    <button ><i className="fa fa-facebook"></i></button>
                                    <button ><i className="fa fa-phone"></i></button>
                                    <button ><i className="fa fa-at"></i></button>
                                </div>
                            </div>
                        </div>
                        
                    </main>

                    <img id="wave-down-img" src={require('../imgs/wave1.png')} alt="wave-img" />
                </div>
                
            </div>
        );
    }
}
 
export default Contact;