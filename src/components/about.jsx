import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class About extends Component {
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
                textDecoration : "none",
            },
            about_nav : {
                textDecoration : "underline",
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
            <div className="about-container">
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
                        <div className='mission-div'>
                            <label id="title-div">MISSION</label>
                            <p>
                                We want to aid people with diabetes, especially type 2 diabetes, to monitor, keep track, observe, 
                                and moderate their current and future blood sugar levels on their everyday meals. 
                                We want to provide real-time data or prediction of their next blood 
                                glucose level based on what they choose for that particular meal.
                            </p>
                        </div>

                        <div className='vision-div'>
                            <label id="title-div">VISION</label>  
                            <p>
                                We envision the livelihood of type 2 diabetic people by having moderate and accurate food 
                                suggestions to maintain their blood sugar levels. To help those diabetic people to lessen 
                                the cost of purchasing products to help regulate or moderate their glucose levels. 
                            </p>
                        </div>
                    </main>

                    <img id="wave-down-img" src={require('../imgs/wave1.png')} alt="wave-img" />
                </div>
                
            </div>
        );
    }
}
 
export default About;