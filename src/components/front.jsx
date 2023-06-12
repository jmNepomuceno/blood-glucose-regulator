import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Front extends Component {
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
                textDecoration : "underline",
            },
            contact_nav : {
                textDecoration : "none",
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

    render() { 

        return (
            <div className="front-container">
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
                        <div className="title-main">
                            <h1>BLOOD</h1>
                            <label>GLUCOSE REGULATOR</label>

                            <hr/>

                            <p style={this.state.paragraph_display}>
                            Blood Glucose Regulator Website helps you by providing data and almost accurate result of your
                            next blood glucose level dependin on what are you going to eat for a specific meal.
                            </p>
                        </div>

                        <img 
                            id="wallpaper-img" 
                            // src={require('../imgs/diabetes-wp.png')} 
                            src={require('../imgs/mini-wp.png')} 
                            alt="wallpaper-img" 
                        />
                        
                        <Link to="/log-in">
                            <button id="get-started-btn">LOG IN</button>
                        </Link>
                        {/* <button type="button" class="btn btn-primary">Primary</button> */}
                    </main>

                    <img id="wave-down-img" src={require('../imgs/wave1.png')} alt="wave-img" />
                </div>
                
            </div>
        );
    }
}
 
export default Front;