import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'

class PrevRecordings extends Component {
    constructor(props){
        super()
        const {window_width} = props
        this.state ={
            nav_style : {
                display : (window_width <= 770) ? "none" : "flex"
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
            prev_record_nav : {
                textDecoration : "underline",
            },
            dikopaalam : {
                textDecoration : "none",
            },
            main_left : {
                display : (window_width <= 770) ? "none" : "block"
            },
            main_left_icon : {
                display : (window_width <= 770) ? "block" : "none"
            },
            food_list_btn : {
                display: (window_width <= 770) ? "block" : "none"
            },
            user_prev_record_data : []
            
        }
    }

    componentDidMount = () =>{
        //Axios.get('http://localhost:3001/recordings').then((response) =>{
            // console.log(response.data);

            // let index = ""
            // for(let i=0; i < response.data.length; i++){
            //     console.log(this.props.args.users_login_data.password, response.data[i].password)
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

            // this.setState({user_logged_in_info})
        //})

        Axios.post('http://localhost:3001/recordings' , 
            this.props.args.users_login_data).then((response) =>{
                this.setState({user_prev_record_data : response.data}) 
                this.props.args.handleSetStateUserPrevData(response.data)
        })

        // Axios.put('http://localhost:3001/home' , 
        //     [this.state.updated_user_logged_in_info , this.state.user_logged_in_info])
        //     .then((response)=>{
        //         console.log(response)
        // }) 
    }

    handleClickNavBar = () =>{
        let nav_div = {...this.state.nav_div}
        nav_div.display = (this.state.nav_div.display === "none") ? "block" : "none"
        this.setState({nav_div})
    }

    render() { 
        // console.log(this.state.user_prev_record_data)
        const td_container = this.state.user_prev_record_data.map(elem => {
            return(
                <div className="record-table-td">
                    <label className="date-lbl">{elem.date}</label>
                    <label className="food-lbl">{elem.foods}</label>
                    <label className="calorie-lbl">{elem.total_calories}</label>
                    <label className="carbs-lbl">{elem.total_carbs}</label>
                    <label className="fats-lbl">{elem.total_fats}</label>
                    <label className="proteins-lbl">{elem.total_proteins}</label>
                    <label className="before-lbl">{elem.before_blood}</label>
                    <label className="after-lbl">{elem.after_blood}</label>
                    <div id="plus-or-minus"> +{parseInt(elem.after_blood) - parseInt(elem.before_blood)}</div>
                </div>
            )
        })
        // console.log(this.props.args.new_record_data)
        // console.log(td_container)
        // const update_prev_record_info = () => {
        //     Axios.put('http://localhost:3001/recordings' , 
        //     [this.state.updated_user_logged_in_info , this.state.user_logged_in_info])
        //     .then((response)=>{
        //         console.log(response)
        //     })
        // }
        return (
            <div className="prev-rec-container">
                <header>
                    <section className="user-section">
                        {(this.props.args.user_logged_in_info.gender === "Female") ? <img id="user-icon-img" src={require('../imgs/female-user.png')} alt="female-user-img" /> : 
                            <img id="user-icon-img" src={require('../imgs/male-user.png')} alt="male-user-img" />}
                        <label>Welcome, {this.props.args.user_logged_in_info.first_name}!</label>
                    </section>

                    <nav style={this.state.nav_style}>
                        <Link to="/home"><button id="home-btn" style={this.state.home_nav}>Home</button></Link>
                        <Link to="/recordings"><button id="prev-rec-btn" style={this.state.prev_record_nav}>Previous Glucose-Meter Results</button></Link>
                        {/* <Link to="/progress"><button id="progress-btn" style={this.state.dikopaalam}>Your Progress</button></Link> */}
                        <form>
                            <Link to="/">
                                <button id="log-out-btn">Log out</button>
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
                        <Link to="/home"><button id="home-btn" style={this.state.home_nav}>Home</button></Link>
                        <Link to="/recordings"><button id="prev-rec-btn" style={this.state.prev_record_nav}>Previous Glucose-Meter Results</button></Link>
                        {/* <Link to="/progress"><button id="progress-btn" style={this.state.dikopaalam}>Your Progress</button></Link> */}
                        <form>
                            <Link to="/">
                                <button id="mob-log-out-btn">Log out</button>
                            </Link>
                        </form>
                    </nav>
                </div>
                
                <main>
                    <div className="record-table">
                        <div className="record-table-header">
                            <label>Date</label>
                            <label>Food(s) Intake</label>
                            <label>Calories Gained</label>
                            <label>Carbs Gained</label>
                            <label>Fats Gained</label>
                            <label>Proteins Gained</label>
                            <label>Before BSL/BGL</label>
                            <label>After BSL/BGL</label>
                        </div>
                        <div className="record-table-tr">
                            {td_container}
                        </div>
                        
                    </div>

                </main>
            </div>
        );
    }
}
 
export default PrevRecordings;