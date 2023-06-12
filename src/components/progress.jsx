import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"
// import Axios from 'axios'

class Progress extends Component {
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
                textDecoration : "none",
            },
            dikopaalam : {
                textDecoration : "underline",
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
            user_prev_record_data : [],
            user_data : {
                labels : [],
                datasets : []
            }
            
        }
    }

    componentDidMount = () =>{
        // user_prev_record_data
        let user_data = {...this.state.user_data}
        user_data.labels = this.props.args.user_prev_record_data.map(elem => elem.after_blood)
        user_data.datasets = [
            {
                label: "Blood Sugar Level",
                data : this.props.args.user_prev_record_data.map(elem => elem.after_blood)
            }
        ]
        this.setState({user_data})
    }

    handleClickNavBar = () =>{
        let nav_div = {...this.state.nav_div}
        nav_div.display = (this.state.nav_div.display === "none") ? "block" : "none"
        this.setState({nav_div})
    }
    render() { 
        console.log(this.props.args.user_prev_record_data)

        let graph_data = []
        this.props.args.user_prev_record_data.forEach(elem => {
            graph_data.push({
                date : elem.date,
                result : elem.after_blood
            })
        })
        // console.log(graph_data)
        console.log(this.state.user_data)
        return (
            <div className="progress-container">
                <header>
                    <section className="user-section">
                        {(this.props.args.user_logged_in_info.gender === "Female") ? <img id="user-icon-img" src={require('../imgs/female-user.png')} alt="female-user-img" /> : 
                            <img id="user-icon-img" src={require('../imgs/male-user.png')} alt="male-user-img" />}
                        <label>Welcome, {this.props.args.user_logged_in_info.first_name}!</label>
                    </section>

                    <nav style={this.state.nav_style}>
                        <Link to="/home"><button id="home-btn" style={this.state.home_nav}>Home</button></Link>
                        <Link to="/recordings"><button id="prev-rec-btn" style={this.state.prev_record_nav}>Previous Glucose-Meter Results</button></Link>
                        <Link to="/recordings"><button id="progress-btn" style={this.state.dikopaalam}>Your Progress</button></Link>
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
                        <Link to="/recordings"><button id="progress-btn" style={this.state.dikopaalam}>Your Progress</button></Link>
                        <form>
                            <Link to="/">
                                <button id="mob-log-out-btn">Log out</button>
                            </Link>
                        </form>
                    </nav>
                </div>


                <main>

                    <div className="graph-div">
                        <label id='graph-title'>Your Blood Sugar Level Graph</label>
                        <Line data={this.state.user_data} id='graph-div-sub'/>
                    </div>
                    
                </main>


            </div>
        );
    }
}
 
export default Progress;