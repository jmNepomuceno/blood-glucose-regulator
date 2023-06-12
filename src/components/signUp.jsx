import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'

class SignUp extends Component {
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
        }
    }

    componentDidMount = () => {
        Axios.get('http://localhost:3001/sign-up').then((response) =>{
                // console.log(response.data)
                // let index 
                // for(let i=0; i < response.data.length; i++){
                //     if(this.props.args.users_login_data.password === response.data[i].password){
                //         index = i
                //     }
                // }
                // let user_logged_in_info = {...this.state.user_logged_in_info}
                // user_logged_in_info.first_name = response.data[index].first_name
                // user_logged_in_info.last_name = response.data[index].last_name
                // user_logged_in_info.blood_test = response.data[index].latest_blood_test
                // user_logged_in_info.age = response.data[index].age
                // user_logged_in_info.height = response.data[index].height
                // user_logged_in_info.weight = response.data[index].weight
                // user_logged_in_info.gender = response.data[index].gender
                // user_logged_in_info.password = response.data[index].password
                // user_logged_in_info.others = response.data[index].others

                // this.setState({user_logged_in_info})
                // // console.log("MAIN CDM", user_logged_in_info)
                // this.props.args.handleTry(user_logged_in_info)
                this.props.args.handleGetAllUsers(response.data)
            })
    }

    render() { 
        return (
            <div className="sign-up-container">
                <div className="left-div">

                    <div style={this.state.desktop_display} className="left-up-div">
                        <img id="logo-img" src={require('../imgs/logo.png')} alt="logo-img" />
                        <h3>BLOOD <span>MONITORING WEBSITE</span> </h3>

                        <label>Create Account</label>
                    </div>

                    <div style={this.state.desktop_display} className="left-bottom-div">
                        <p>
                            The data that you will input here will be used lately to serve as some of the parameters for the prediction
                            of your next glucose meter result.
                        </p>
                    </div>
                    
                    {/* MOBILE DIVS */}
                    <div style={this.state.mobile_display} className='mobile-div'>
                        <div className="logo-div">
                            <img id="logo-img" src={require('../imgs/logo.png')} alt="logo-img" />
                            <h3>BLOOD <span>MONITORING SHIT</span> </h3>
                        </div>

                        <div className="create-acc-div">
                            <label>Create Account</label>
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
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="text" 
                                    placeholder="Juan" 
                                    autoComplete="off" 
                                    
                                />
                            </div>

                            <div className='input-div'>
                                <label id='last-name-lbl'>Last Name</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="last-name-txt" 
                                    name="last_name"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="text" 
                                    placeholder="Dela Cruz" 
                                    autoComplete="off" 
                                    

                                />
                            </div>

                            <div className='input-div'>
                                <label id='blood-test-lbl'>Fasting</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="birth-date-txt" 
                                    name="blood_test"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="number" 
                                    placeholder="135" 
                                    autoComplete="off"
                                    

                                />
                            </div>
                            
                            <div className='input-div'>
                                <label>Age</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="age-txt" 
                                    name="age"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="number" 
                                    placeholder="30" 
                                    autoComplete="off" 
                                    

                                />
                            </div>
                            
                            <div className='input-div'>
                                <label>Height</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="height-txt" 
                                    name="height"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="number" 
                                    placeholder="170cm" 
                                    autoComplete="off" 
                                    

                                />
                            </div>
                            
                            <div className='input-div'>
                                <label>Weight</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="weight-txt" 
                                    name="weight"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="number" 
                                    placeholder="70kg" 
                                    autoComplete="off" 
                                    

                                />
                            </div>

                            <div className='input-div'>
                                <label>Password</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                <input 
                                    id="password-txt" 
                                    name="password"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                    type="password" 
                                    placeholder="password" 
                                    autoComplete="off" 
                                />
                            </div>
                            
                            <div className='input-div'>
                                <label>Gender</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />
                                 <label onClick={this.props.args.handleOnClickGenderBtn} id="male-btn">Male</label>
                                 <label onClick={this.props.args.handleOnClickGenderBtn} id="female-btn">Female</label>
                                 
                            </div>

                            <div className='input-div'>
                                <label>Other sakit</label>
                                <img id="user-img" src={require('../imgs/right-sign-up.png')} alt="right-arrow-img" />

                                <select 
                                    name="others" 
                                    id="sakit-select"
                                    onChange={this.props.args.handleOnChangeSignUpInput} 
                                >
                                    <option value="none">none</option>
                                    <option value="stroke">Stroke</option>
                                    <option value="tuberculosis">Tuberculosis</option>
                                    <option value="pneumonias">Pneumonias</option>
                                    <option value="protein">Proteins</option>
                                </select>
                                 
                            </div>

                            <div className='terms-div'>
                                <input 
                                    id="terms-cb" 
                                    name="termsAndAgreement"
                                    type="checkbox" 
                                    autoComplete="off" 
                                    onClick={this.props.args.handleOnClickTermsCondition}
                                />
                                <label>I have accepted the terms and conditions.</label>
                            </div>
                            
                            <Link to="/log-in">
                                <button 
                                    // onClick={this.props.args.handleSignUpBtn} 
                                    onClick={this.props.args.register}
                                    type="button" 
                                    className="btn btn-primary" 
                                    style={this.props.args.lets_start_btn}
                                >
                                    Let's Start
                                </button>
                            </Link>
                        </form>
                    </section>
                        
                </div>
            </div>
        );
    }
}
 
export default SignUp;