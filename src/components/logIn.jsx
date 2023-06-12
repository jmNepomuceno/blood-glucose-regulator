import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class LogIn extends Component {
    constructor(props){
        super()
        const {window_width} = props
        this.state={
            desktop_display : {
                display : (window_width <= 770) ? "none" : "block"
            },
            mobile_display : {
                display : (window_width <= 770) ? "block" : "none"
            },
            // kingina : (props.args.user_account_validity)
        }
    }

    render() { 
        //console.log("validity", this.props.args.user_account_validity)

        let path = (this.props.args.user_account_validity) ? "/home" : "/log-in"
        return (
            <div className="log-in-container">
                <div className="left-div">

                    <div style={this.state.desktop_display} className="left-up-div">
                        <img id="logo-img" src={require('../imgs/logo.png')} alt="logo-img" />
                        <h3>BLOOD <span>MONITORING WEBSITE</span> </h3>
                    </div>

                    <div style={this.state.desktop_display} className="left-bottom-div">
                    </div>

                    {/* MOBILE DIVS */}
                    <div style={this.state.mobile_display} className='mobile-div'>
                        <div className="logo-div">
                            <img id="logo-img" src={require('../imgs/logo.png')} alt="logo-img" />
                            <h3>BLOOD <span>MONITORING SHIT</span> </h3>
                        </div>

                        <div className="create-acc-div">
                            <label>Log In</label>
                            <p>
                                Mahalaga Lahat ng Information
                            </p>
                        </div>
                    </div>


                </div>

                {/* <img id="blood-img" src={require('../imgs/blood-img.png')} alt="blood-img" /> */}

                <div className="right-div">
                    <section>
                        <header>
                            <img id="user-img" src={require('../imgs/user-img.png')} alt="user-icon-img" />
                            <hr/>
                        </header>

                        <form>
                            <div className='input-div'>
                                <label id='first-name-lbl'>First Name</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="first-name-txt" 
                                    name="first_name"
                                    onChange={this.props.args.handleOnChangeLogInInput} 
                                    type="text" 
                                    placeholder="Juan" 
                                    autoComplete="off" 
                                    required
                                />
                            </div>

                            <div className='input-div'>
                                <label id='last-name-lbl'>Last Name</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="last-name-txt" 
                                    name="last_name"
                                    onChange={this.props.args.handleOnChangeLogInInput} 
                                    type="text" 
                                    placeholder="Dela Cruz" 
                                    autoComplete="off" 
                                    
                                />
                            </div>

                            <div className='input-div'>
                                <label id='password-lbl'>Password</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="password-txt" 
                                    name="password"
                                    onChange={this.props.args.handleOnChangeLogInInput} 
                                    type="password" 
                                    placeholder="password" 
                                    autoComplete="off" 
                                />
                            </div>
                            <Link to={path}>
                                <button 
                                    // onClick={this.props.args.handleSignUpBtn} 
                                    // onClick={this.props.args.register}
                                    onClick={this.props.args.login}
                                    type="button" 
                                    className="btn btn-primary" 
                                    // style={this.props.args.lets_start_btn}
                                >
                                    Log In
                                </button>
                            </Link>
                        </form>
                    </section>
                        
                </div>
            </div>
        );
    }
}
 
export default LogIn;