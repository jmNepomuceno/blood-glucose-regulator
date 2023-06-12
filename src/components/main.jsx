import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

import 'font-awesome/css/font-awesome.min.css';

import BreakfastComponent from './BreakfastComponent';
import LunchDinnerComponent from './LunchDinnerComponent';

class Main extends Component {
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
            gluco_meter_div : {
                left:(window_width <= 770) ? "-80%" : "-40%"
            },
            user_info_div : {
                left:(window_width <= 770) ? "-90%" : "-30%"
            },
            graph_div : {
                left:(window_width <= 770) ? "-100%" : "-45%"
            },
            status_div : {
                left:(window_width <= 770) ? "-90%" : "-30%"
            },
            food_list_btn : {
                display: (window_width <= 770) ? "block" : "none"
            },
            food_list_div : {
                right:(window_width <= 770) ? "-65%" : "2.5%"
            },
            edit_user_info_inputs : {
                pointerEvents : "none",

            },
            save_edit_user_btn : {
                pointerEvents : "none",
                opacity : "0.5"
            },
            home_nav : {
                textDecoration : "underline",
            },
            prev_record_nav : {
                textDecoration : "none",
            },
            dikopaalam : {
                textDecoration : "none",
            },
            user_logged_in_info : {
                first_name : "",
                last_name : "",
                blood_test : 0,
                age : 0,
                height : 0,
                weight : 0,
                gender : "",
                password : "",
                others : ""
            },
            updated_user_logged_in_info : {
                first_name : "",
                last_name : "",
                blood_test : 0,
                age : 0,
                height : 0,
                weight : 0,
                gender : "",
                password : "",
            },
            graph_user_data : {
                labels : [],
                datasets : []
            },
            exercise_div : {
                display:"none"
            },
            cycling : 0,
            running : 0,
            cleaning : 0,
            color_div : {
                background : "none",
                height : "0%"
            },
            use_prev_btn : {
                pointerEvents : "",
                opacity : 1
            }
        }
    }

    handleClickNavBar = () =>{
        let nav_div = {...this.state.nav_div}
        nav_div.display = (this.state.nav_div.display === "none") ? "block" : "none"
        this.setState({nav_div})
    }

    componentDidMount = () =>{
        // console.log(this.props.args.users_login_data)
        // Axios.post('http://localhost:3001/home' , 
        //     this.props.args.users_login_data).then((response) =>{
        //         // console.log(response.data[0].first_name)
        //         let user_logged_in_info = {...this.state.user_logged_in_info}
        //         user_logged_in_info.first_name = response.data[0].first_name
        //         user_logged_in_info.last_name = response.data[0].last_name
        //         user_logged_in_info.blood_test = response.data[0].latest_blood_test
        //         user_logged_in_info.age = response.data[0].age
        //         user_logged_in_info.height = response.data[0].height
        //         user_logged_in_info.weight = response.data[0].weight
        //         user_logged_in_info.gender = response.data[0].gender
        //         user_logged_in_info.password = response.data[0].password

        //         this.setState({user_logged_in_info})
        //     })

        Axios.get('http://localhost:3001/home').then((response) =>{
            // console.log(response.data)
            let index 
            for(let i=0; i < response.data.length; i++){
                if(this.props.args.users_login_data.password === response.data[i].password){
                    index = i
                }
            }
            let user_logged_in_info = {...this.state.user_logged_in_info}
            user_logged_in_info.first_name = response.data[index].first_name
            user_logged_in_info.last_name = response.data[index].last_name
            user_logged_in_info.blood_test = response.data[index].latest_blood_test
            user_logged_in_info.age = response.data[index].age
            user_logged_in_info.height = response.data[index].height
            user_logged_in_info.weight = response.data[index].weight
            user_logged_in_info.gender = response.data[index].gender
            user_logged_in_info.password = response.data[index].password
            user_logged_in_info.others = response.data[index].others

            this.setState({user_logged_in_info})
            // console.log("MAIN CDM", user_logged_in_info)
            this.props.args.handleTry(user_logged_in_info)
        })

        let graph_user_data = {...this.state.graph_user_data}
        graph_user_data.labels = this.props.args.user_prev_record_data.map(elem => elem.after_blood)
        graph_user_data.datasets = [
            {
                label: "Blood Sugar Level",
                data : this.props.args.user_prev_record_data.map(elem => elem.after_blood)
            }
        ]
        this.setState({graph_user_data})

        if(this.props.args.prev_status < 140 && this.props.args.prev_status > 0){
            let color_div = {...this.state.color_div}
            color_div.background = "lightgreen"
            color_div.height = "30%"
            this.setState({color_div})
        }else if(this.props.args.prev_status > 140 && this.props.args.prev_status < 199){
            let color_div = {...this.state.color_div}
            color_div.background = "#F7E11C"
            color_div.height = "70%"
            this.setState({color_div})
        }else if(this.props.args.prev_status > 200){
            let color_div = {...this.state.color_div}
            color_div.background = "#F24213"
            color_div.height = "100%"
            this.setState({color_div})
        }


        if(this.props.args.user_prev_record_data.length === 0){
            let use_prev_btn = {...this.state.use_prev_btn}
            use_prev_btn.pointerEvents = "none"
            use_prev_btn.opacity = "0.5"
            this.setState({use_prev_btn})
        }

        this.props.args.handleGlucoseMeterPE()
    }

    handleOnClickGlucoMeter = () => {
        if(this.props.window_width <= 770){
            let gluco_meter_div = {...this.state.gluco_meter_div}
            gluco_meter_div.left = (this.state.gluco_meter_div.left === "-80%") ? "0" : "-80%"
            this.setState({gluco_meter_div})
        }else{
            let gluco_meter_div = {...this.state.gluco_meter_div}
            gluco_meter_div.left = (this.state.gluco_meter_div.left === "-40%") ? "0" : "-40%"
            this.setState({gluco_meter_div})
        } 
    }

    handleOnClickUserInfo = () => {
        if(this.props.window_width <= 770){
            let user_info_div = {...this.state.user_info_div}
            user_info_div.left = (this.state.user_info_div.left === "-90%") ? "5%" : "-90%"
            this.setState({user_info_div})
            
            if(user_info_div.left === "-90%"){
                let edit_user_info_inputs = {...this.state.edit_user_info_inputs}
                edit_user_info_inputs.pointerEvents = "auto"
                this.setState({edit_user_info_inputs})

                let save_edit_user_btn = {...this.state.save_edit_user_btn}
                save_edit_user_btn.pointerEvents = "auto"
                save_edit_user_btn.opacity = "1"
                this.setState({save_edit_user_btn})
            }
        }else{
            let user_info_div = {...this.state.user_info_div}
            user_info_div.left = (this.state.user_info_div.left === "-30%") ? "5%" : "-30%"
            this.setState({user_info_div})

            if(user_info_div.left === "-30%"){
                let edit_user_info_inputs = {...this.state.edit_user_info_inputs}
                edit_user_info_inputs.pointerEvents = "none"
                this.setState({edit_user_info_inputs})

                let save_edit_user_btn = {...this.state.save_edit_user_btn}
                save_edit_user_btn.pointerEvents = "none"
                save_edit_user_btn.opacity = "0.5"
                this.setState({save_edit_user_btn})
            }
        } 
    }

    handleOnClickGraph = () => {
        if(this.props.window_width <= 770){
            let graph_div = {...this.state.graph_div}
            graph_div.left = (this.state.graph_div.left === "-100%") ? "0" : "-100%"
            this.setState({graph_div})
        }else{
            let graph_div = {...this.state.graph_div}
            graph_div.left = (this.state.graph_div.left === "-45%") ? "5%" : "-45%"
            this.setState({graph_div})
        } 
    }

    handleOnClickStatus = () => {
        if(this.props.window_width <= 770){
            let status_div = {...this.state.status_div}
            status_div.left = (this.state.status_div.left === "-90%") ? "0" : "-90%"
            this.setState({status_div})
        }else{
            let status_div = {...this.state.status_div}
            status_div.left = (this.state.status_div.left === "-30%") ? "5%" : "-30%"
            this.setState({status_div})
        } 
    }

    handleOnClickClickedFood = () => {
        let food_list_div = {...this.state.food_list_div}
        food_list_div.right = (this.state.food_list_div.right === "-65%") ? "0" : "-65%"
        this.setState({food_list_div})
    }

    handleOnClickEditUserInfo = () => {
        let edit_user_info_inputs = {...this.state.edit_user_info_inputs}
        edit_user_info_inputs.pointerEvents = "auto"
        this.setState({edit_user_info_inputs})

        let save_edit_user_btn = {...this.state.save_edit_user_btn}
        save_edit_user_btn.pointerEvents = "auto"
        save_edit_user_btn.opacity = "1"
        this.setState({save_edit_user_btn})

        let updated_user_logged_in_info = {...this.state.updated_user_logged_in_info}
        updated_user_logged_in_info.first_name = this.state.user_logged_in_info.first_name
        updated_user_logged_in_info.last_name = this.state.user_logged_in_info.last_name
        updated_user_logged_in_info.blood_test = this.state.user_logged_in_info.blood_test
        updated_user_logged_in_info.age = this.state.user_logged_in_info.age
        updated_user_logged_in_info.height = this.state.user_logged_in_info.height
        updated_user_logged_in_info.weight = this.state.user_logged_in_info.weight
        updated_user_logged_in_info.gender = this.state.user_logged_in_info.gender
        updated_user_logged_in_info.password = this.state.user_logged_in_info.password
        updated_user_logged_in_info.others = this.state.user_logged_in_info.others


        this.setState({updated_user_logged_in_info})
    }

    handleOnChangeEditUserInfo = (e) =>{
        // console.log(e.target.value)

        let updated_user_logged_in_info = {...this.state.updated_user_logged_in_info}
        // if(e.target.name === "first_name"){
        //     if(e.target.value.length > 1){
        //         updated_user_logged_in_info.first_name = e.target.value
        //     }
        // }
        // else if(e.target.name === "last_name"){
        //     if(e.target.value.length > 1){
        //         updated_user_logged_in_info.last_name = e.target.value
        //     }
        // }
        // else 
        if(e.target.name === "blood_test"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.blood_test = parseFloat(e.target.value)
            }
        }
        else if(e.target.name === "age"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.age = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "height"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.height = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "weight"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.weight = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "gender"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.gender = e.target.value
            }
        }
        else if(e.target.name === "password"){
            if(e.target.value.length > 1){
                updated_user_logged_in_info.password = e.target.value
            }
        }
        else if(e.target.name === "others"){
            console.log(e.target.value)
            if(e.target.value.length > 1){
                updated_user_logged_in_info.others = e.target.value
            }
        }

        this.setState({updated_user_logged_in_info})
        console.log(updated_user_logged_in_info)
        this.props.args.handleTry(updated_user_logged_in_info)
        // this.setState({user_logged_in_info : this.state.updated_user_logged_in_info})
    }

    handleOnClickExercise = (e) =>{
        // console.log(e)
        let index = e.id
        let food
        
        if(e.where === "bf"){
            for(let elem of this.props.args.breakfast_db){
                if(elem.id === index){
                    food = elem
                }
            }
        }else{
            for(let elem of this.props.args.lunch_dinner_db){
                if(elem.id === index){
                    food = elem
                }
            }
        }
        
        // console.log(e.serving)
        let temp_cycling = food.cycling
        let temp_running = food.running
        let temp_cleaning = food.cleaning
        temp_cycling = food.cycling * e.serving
        temp_running = food.running * e.serving
        temp_cleaning = food.cleaning * e.serving

        this.setState({cycling : temp_cycling})
        this.setState({running : temp_running})
        this.setState({cleaning : temp_cleaning})
        let exercise_div = {...this.state.exercise_div}
        exercise_div.display = (this.state.exercise_div.display === "none") ? "block" : "none"
        this.setState({exercise_div})
    }

    render() { 
        // console.log(this.state.cycling)
        // console.log(this.state.user_logged_in_info)
        // console.log(this.props.args.list_down_btn)
        // console.log(this.props.args.input_gluco_test)

        // console.log("MAIN ULII" , this.props.args.user_logged_in_info)
        // console.log("MAIN UpdatedULII" , this.state.updated_user_logged_in_info)

        // console.log(this.props.args.calculate_blood.pointerEvents)
        // console.log(this.props.args.record_data.pointerEvents)

        // console.log(this.props.args.input_gluco_test > 0)
        // let calculate_blood = {
        //     pointerEvents : (this.props.args.input_gluco_test > 0) ? "auto" : "none"
        // }
        // let record_data = {
        //     pointerEvents : (this.props.args.calculate_blood.pointerEvents === "auto") ? "auto" : "none"
        // }
        // console.log(this.props.args.user_prev_record_data)
        const breakfast_components = this.props.args.breakfast_db.map(elem => {

            let in_list = false
            let in_list_PE = {
                background : "#DC3545",
                pointerEvents : "auto"
            }
            for(let obj of this.props.args.list_down_btn){
                let newObjId = parseInt(obj.id.replace("bf-",""))
                if(newObjId === elem.id){
                    in_list = true
                    in_list_PE.background = obj.background
                    in_list_PE.pointerEvents = obj.pointerEvents
                }
            }

            if(in_list){
                return(
                    <BreakfastComponent 
                        key={elem.id} 
                        args={{
                            elem:elem,
                            handleOnListDownClick : this.props.args.handleOnListDownClick,
                            list_down_btn : in_list_PE,
                            handleOnClickExercise : this.handleOnClickExercise
                        }} 
                    />
                )    
            }else{
                return(
                    <BreakfastComponent 
                        key={elem.id} 
                        args={{
                            elem:elem,
                            handleOnListDownClick : this.props.args.handleOnListDownClick,
                            list_down_btn : {background : "#DC3545",  pointerEvents : "auto"},
                            handleOnClickExercise : this.handleOnClickExercise
                        }} 
                    />
                ) 
            }

            
            
        })

        const lunch_dinner_components = this.props.args.lunch_dinner_db.map(elem => {
            let in_list = false
            let in_list_PE = {
                background : "#DC3545",
                pointerEvents : "auto"
            }
            for(let obj of this.props.args.list_down_btn_LD){
                let newObjId = parseInt(obj.id.replace("ld-",""))
                if(newObjId === elem.id){
                    in_list = true
                    in_list_PE.background = obj.background
                    in_list_PE.pointerEvents = obj.pointerEvents
                }
            }
            
            if(in_list){
                return(
                    <LunchDinnerComponent 
                        key={elem.id} 
                        args={{
                            elem:elem,
                            handleOnListDownClick : this.props.args.handleOnListDownClick,
                            list_down_btn_LD : in_list_PE,
                            handleOnClickExercise : this.handleOnClickExercise
                        }} 
                    />
                )    
            }else{
                return(
                    <LunchDinnerComponent 
                        key={elem.id} 
                        args={{
                            elem:elem,
                            handleOnListDownClick : this.props.args.handleOnListDownClick,
                            list_down_btn_LD : {background : "#DC3545",  pointerEvents : "auto"},
                            handleOnClickExercise : this.handleOnClickExercise
                        }} 
                    />
                ) 
            }
        })

        // console.log(this.props.args.food_list_clicked)
        const food_list_clicked_components = this.props.args.food_list_clicked.map(elem =>{
            return (
                <div className="list-div" key={elem.id}>
                    <label id='name-lbl'>Food: {elem.name}</label>
                    <label id='serve-lbl'>Serving: {elem.served}</label>
                    <button 
                        type="button" 
                        className="btn btn-light"
                        onClick={() => this.props.args.handleOnClickRemoveInList(elem.id)}
                    >
                        Remove
                    </button>
                </div>
                    
            )
        })
        
        let save_pointerEvents = (this.props.args.food_list_clicked.length < 1) ? "none" : "auto"
        let save_opacity = (this.props.args.food_list_clicked.length < 1) ? "0.5" : "1"

        const update_user_info = () => {
            alert("Successfully Edited your Infomation")
            Axios.put('http://localhost:3001/home' , 
            [this.state.updated_user_logged_in_info , this.state.user_logged_in_info])
            .then((response)=>{  
                console.log(response)
            })
        }

        // console.log(this.props.args.user_prev_record_data[this.props.args.user_prev_record_data.length - 1].after_blood)
        // let prev_status
        // if(this.props.args.user_prev_record_data === []){
        //     prev_status = 0
        // }else{
        //     prev_status = this.props.args.user_prev_record_data[this.props.args.user_prev_record_data.length - 1].after_blood
        // }
        return (
            <div className="home-container">
                {/* <h1>Kyla</h1> */}
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
                                <button onClick={this.props.args.handleLogOut} id="log-out-btn">Log out</button>
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
                                <button onClick={this.props.args.handleLogOut} id="log-out-btn-mobile">Log out</button>
                            </Link>
                        </form>
                    </nav>
                </div>

                <main>

                    <div className="exercise-div" style={this.state.exercise_div}>
                        <label id="title-div">Activity Needed to Burn</label>
                        <h3 id="calories-div">Calories</h3>

                        <div id="cycling-div">
                            <img id="cycling-img" src={require('../imgs/cycling-img.png')} alt="cycling-img" />
                            <label id="time-lbl">{this.state.cycling}</label>
                            <label id="text-lbl">Minutes of Cycling</label>
                        </div>

                        <div id="running-div">
                            <img id="running-img" src={require('../imgs/running-img.png')} alt="running-img" />
                            <label id="time-lbl">{this.state.running}</label>
                            <label id="text-lbl">Minutes of Running</label> 
                        </div>

                        <div id="cleaning-div">
                            <img id="cleaning-img" src={require('../imgs/cleaning-img.png')} alt="cleaning-img" />
                            <label id="time-lbl">{this.state.cleaning}</label>
                            <label id="text-lbl">Minutes of Cleaning</label>
                        </div>
                    </div>

                    {/* SIDE BUTTONS */}
                    <div className="side-btns">
                        <ul>
                            <li>
                                <div id="user-info-btn" onClick={this.handleOnClickUserInfo}>
                                    <label id=''>
                                        <div className="icon" >
                                            Your Account
                                        </div>
                                    </label>
                                </div>
                            </li>

                            <li>
                            {/* style={this.props.args.glucose_meter} */}
                                <div id="glucose-btn" onClick={this.handleOnClickGlucoMeter} style={this.props.args.glucose_meter}>
                                    <label>
                                        <div className="icon" >
                                            Glucose Meter
                                        </div>
                                    </label>
                                </div>
                            </li>

                            <li>
                                <div id="graph-btn" onClick={this.handleOnClickGraph}>
                                    <label>
                                        <div className="icon" >
                                            Sugar Graph
                                        </div>
                                    </label>
                                </div>
                            </li>

                            <li>
                                <div id="status-btn" onClick={this.handleOnClickStatus}>
                                    <label>
                                        <div className="icon" >
                                            Your Status
                                        </div>
                                    </label>
                                </div>
                            </li>

                            <li style={this.state.food_list_btn}>
                                <div id="food-list-btn" onClick={this.handleOnClickClickedFood}>
                                    <label>
                                        <div className="icon" >
                                            Your Lists
                                        </div>
                                    </label>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div className="user-account-div" style={this.state.user_info_div}>
                        <label id="user-info-list-lbl">Your Information List</label>
                        
                        <div className="info-div" id='info-div-1'>
                            <label>First Name:</label>
                            <input 
                                type="text"
                                name="first_name"
                                defaultValue={this.props.args.user_logged_in_info.first_name}
                                // style={this.state.edit_user_info_inputs}
                                // onChange={this.handleOnChangeEditUserInfo}
                            />
                        </div>

                        <div className="info-div" id='info-div-2'>
                            <label>Last Name: </label>
                            <input 
                                type="text" 
                                name="last_name"
                                // style={this.state.edit_user_info_inputs}
                                // onChange={this.handleOnChangeEditUserInfo}
                                defaultValue={this.props.args.user_logged_in_info.last_name}
                            />
                        </div>

                        <div className="info-div" id='info-div-3'>
                            <label id='info-lbl-1'>Initial Blood Test: </label>
                            <input 
                                type="number" 
                                name="blood_test"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                placeholder={this.props.args.user_logged_in_info.blood_test}
                            />
                        </div>

                        <div className="info-div" id='info-div-4'>
                            <label>Age: </label>
                            <input 
                                type="number" 
                                name="age"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                placeholder={this.props.args.user_logged_in_info.age}
                            />
                        </div>

                        <div className="info-div" id='info-div-5'>
                            <label>Height: </label>
                            <input 
                                type="number" 
                                name="height"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                placeholder={this.props.args.user_logged_in_info.height}
                            />
                        </div>

                        <div className="info-div" id='info-div-6'>
                            <label>Weight: </label>
                            <input 
                                type="number" 
                                name="weight"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                placeholder={this.props.args.user_logged_in_info.weight}
                            />
                        </div>

                        <div className="info-div" id='info-div-7'>
                            <label>Gender: </label>
                            <input 
                                type="text" 
                                name="gender"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                defaultValue={this.props.args.user_logged_in_info.gender}
                            />
                        </div>

                        <div className="info-div" id='info-div-8'>
                            <label>Password: </label>
                            <input 
                                type="password" 
                                name="password"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                defaultValue={this.props.args.user_logged_in_info.password}
                            />
                        </div>

                        <div className="info-div" id='info-div-9'>
                            <label>Others: </label>
                            {/* <input 
                                name="others"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                                defaultValue={this.props.args.user_logged_in_info.others}
                            /> */}
                            <select 
                                name="others" 
                                id="sakit-select"
                                style={this.state.edit_user_info_inputs}
                                onChange={this.handleOnChangeEditUserInfo}
                            >
                                <option selected="selected">{this.props.args.user_logged_in_info.others}</option>
                                <option value="none">none</option>
                                <option value="stroke">Stroke</option>
                                <option value="tuberculosis">Tuberculosis</option>
                                <option value="pneumonias">Pneumonias</option>
                                <option value="protein">Proteins</option>
                            </select>
                        </div>
                        
                        <button 
                            type="button" 
                            id='edit-btn' 
                            className="btn btn-danger"
                            onClick={this.handleOnClickEditUserInfo}
                        >
                            Edit
                        </button>
                        
                        <button 
                            type="button" 
                            id='save-btn' 
                            className="btn btn-success"
                            style={this.state.save_edit_user_btn}
                            onClick={update_user_info}
                        >
                            Save
                        </button>
                    </div>


                    <div className="gluco-meter-div" style={this.state.gluco_meter_div}>
                        <div id="temp-div">{this.props.args.calculate_blood_value}</div>
                        <img id="gluco-meter-img" src={require('../imgs/glucose-meter-img.png')} alt="gluco-meter-img" />
                        {/* <label id="temp-result">{this.props.args.calculate_blood_value}</label> */}
                        
                        <button 
                            id='use-current-btn'
                            onClick={this.props.args.handleUseCurrBlood}
                            style={this.state.use_prev_btn}
                        >
                            Use your current blood sugar level
                        </button>
                        
                        <button 
                            id='use-prev-btn'
                            onClick={this.props.args.handleUsePrevBlood}
                            style={this.state.use_prev_btn}
                        >
                            Use the latest blood sugar level from recordings
                        </button>

                        <button 
                            id='use-initial-btn'
                            onClick={this.props.args.handleUseInitBlood}
                        >
                            Use your initial blood sugar level
                        </button>

                        <div className="input-gm-div">
                            <label id="input-gm-result-lbl">Your Blood Sugar Level: </label>
                            <input 
                                type="number" 
                                id="input-gm-result-txt" 
                                onChange={this.props.args.handleOnChangeInputGlucoTest}
                                value={this.props.args.input_gluco_test}
                            />
                        </div>
                        
                                
                        <button 
                            id='calc-expect-btn'
                            style={this.props.args.calculate_blood}
                            onClick={() => this.props.args.handleCalculateBlood({initialBlood : this.state.user_logged_in_info.blood_test})}
                        >Calculate Expected Blood Glucose Level
                        </button>

                        <button 
                            id='record-blood-test-btn'
                            style={this.props.args.record_data}
                            onClick={this.props.args.new_record_data_db}
                        >Record the Blood Glucose Level
                        </button>
                    </div>

                    <div className="graph-div" style={this.state.graph_div}>
                        {/* <label id='graph-title'>Your Blood Sugar Level Graph</label> */}
                        <Line data={this.state.graph_user_data} id='graph-div-sub'/>
                    </div>

                    <div className="status-div" style={this.state.status_div}>
                        <label id='title-div'>Your Blood Sugar Status</label> 
                        <div id='bar-div'>
                            <div id='color-bar' style={this.state.color_div}></div>
                        </div>

                        <label id="prev-sugar">
                            Expected Current Blood Sugar Level : {this.props.args.current_blood_glucose}
                        </label>
                        
                        {/* <button id="level-btn"></button> */}
                        <div className='legend-div'>
                            <div id='label-div'>
                                <label>Normal</label>
                                <label>Pre-Diabetic</label>
                                <label>Diabetic</label>
                            </div>
                            <div id='fasting-div'>
                                <label>Fasting</label>
                                <div>100-125 mg/dl</div>
                                <div>80-130 mg/dl</div> 
                                <div>70-99 mg/dl</div>
                            </div>

                            <div id='after-div'>
                                <label>1hr</label>
                                <div>200-230 mg/dl</div>
                                <div>230-300 mg/dl</div>
                                <div>170-200 mg/dl</div>

                            </div>

                            <div id='after-2-3-div'>
                                <label>2-3hrs</label>
                                <div>  140-199 mg/dl</div>

                                <div>  {'>'} 200 mg/dl</div>
                                <div> {'<'} 140mg/dl </div>

                            </div>

                            {/* <div id='normal-div'>
                                <div></div>
                                <label>normal</label>
                            </div>

                            <div id='pre-diab-div'>
                                <div></div>
                                <label>Pre-Diabetic</label>
                            </div>

                            <div id='diab-div'>
                                <div></div>
                                <label>Diabetic</label>
                            </div> */}
                        </div>
                        
                    </div>
                    
                    <div id="suggested-foods-div">
                        <button type="button" id="suggest-btn" className="btn btn-success">Suggested</button>
                        <img 
                            id="q-mark-img" 
                            src={require('../imgs/question-img.png')} 
                            alt="q-mark-icon" 
                            onClick={()=>{
                                alert("Suggested Foods based on your last recorded gluco-meter test and on your illness")
                            }}
                        />
                    </div>

                    <div className="main-content">
                        <div className="food-list-div">

                            <div className="search-sort-div">

                                <div className="search-div">
                                    <button

                                        type="button" 
                                        id="search-btn" 
                                        className="btn btn-secondary"
                                    >
                                        Search:
                                    </button>
                                    <input onKeyDown={this.props.args.onChangeSearch} type="text" />
                                    <img id="search-icon-img" src={require('../imgs/search-icon.png')} alt="search-icon" />
                                </div>

                                <div className="sort-div">
                                    <button type="button" id="sort-btn" className="btn btn-secondary">Sort by:</button>
                                    <select onChange={this.props.args.handleOnChangeSelection} name="sort-option" id="sort-select">
                                        <option></option>
                                        <option value="calories">Calories</option>
                                        <option value="carbs">Carbs</option>
                                        <option value="fat">Fats</option>
                                        <option value="protein">Proteins</option>
                                    </select>
                                    <img id="sort-icon-img" src={require('../imgs/sort-icon.png')} alt="sort-icon" />
                                </div>
                            </div>

                            <div className="meals-btn">
                                <button
                                    style={this.props.args.breakfast_btn}
                                    onClick={this.props.args.handleBreakfastBtnClick}
                                    type="button" 
                                    id="breakfast-btn" 
                                    className="btn btn-secondary meal-btn"
                                >
                                    Breakfast
                                </button>

                                <button 
                                    style={this.props.args.lunch_btn}
                                    onClick={this.props.args.handleLunchBtnClick}
                                    type="button" 
                                    id="lunch-btn" 
                                    className="btn btn-secondary meal-btn"
                                >
                                    Lunch
                                </button>

                                <button 
                                    style={this.props.args.dinner_btn}
                                    onClick={this.props.args.handleDinnerBtnClick}
                                    type="button" 
                                    id="dinner-btn" 
                                    className="btn btn-secondary meal-btn"
                                >
                                    Dinner
                                </button>
                            </div>

                            <div style={this.props.args.breakfast_display} className='food-database-div'>
                                {breakfast_components}
                            </div>

                            <div style={this.props.args.lunch_dinner_display} className='food-database-div'>
                                {lunch_dinner_components}
                            </div>

                        </div>

                    </div>

                    <div className="clicked-food-div" style={this.state.food_list_div}>
                        <label>List of your chosen food</label>

                        <div id='temp-div'>
                            {food_list_clicked_components}
                        </div>

                        <button 
                        type="button" 
                        className="btn btn-success"
                        id='save-btn'
                        style={{pointerEvents : save_pointerEvents, opacity: save_opacity}}
                        onClick={this.props.args.handleOnClickSaveFoodListBtn}
                        >Save
                        </button>
                    </div>

                </main>

            </div>
        );
    }
}
 
export default Main;