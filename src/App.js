import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Axios from 'axios'
// import {Link} from 'react-router-dom'


import Front from './components/front'
import About from './components/about'
import Contact from './components/contact'
import SignUp from './components/signUp'
import LogIn from './components/logIn'
import Main from './components/main'
import PrevRecordings from './components/prevRecordings'
import Progress from './components/progress'

import breakfast_database from './lists_of_food/breakfast_database'
import lunch_dinner_database from './lists_of_food/lunch_dinner_database'

class App extends Component {
    constructor(){
        super()
        this.state ={
            window_width : window.innerWidth,
            breakfast_db : [],
            lunch_dinner_db : [],
            // SIGN UP STATES
            users_container : {
                first_name : "",
                last_name : "",
                blood_test : 0,
                age : 0,
                height : 0,
                weight : 0,
                gender : "",
                password : "",
                others : "none"
            },
            all_users_container : [],
            check_duplicate_users : false,
            users_database : [],
            lets_start_btn : {
                pointerEvents : "none"
            },
            
            // login_btn : {
            //     pointerEvents : "none"
            // },
            // MAIN STATES
            breakfast_display :{
                display:"block"
            },
            lunch_dinner_display :{
                display:"none"
            },
            breakfast_btn:{
                opacity : "1"
            },
            lunch_btn:{
                opacity : "0.5"
            },
            dinner_btn:{
                opacity : "0.5"
            },
            food_list_clicked : [

            ],
            list_down_btn : [

            ],
            list_down_btn_LD : [

            ],
            calculate_blood : {
                pointerEvents : "none"
            },
            record_data :{
                pointerEvents : "none"
            },
            new_record_data : {
                first_name : "",
                last_name : "",
                password : "",
                date : "",
                food : "",
                total_calories : 0,
                total_carbs : 0,
                total_fat : 0,
                total_proteins : 0,
                before_blood : 0,
                after_blood : 0
            },
            input_gluco_test : null,
            calculate_blood_value : 0,
            // REACT NODE SQL
            users_login_data : {
                first_name : "",
                last_name : "",
                password : ""
            },
            user_account_validity : false,
            path_from_login : "/log-in",
            user_data_logged_in : {
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
            user_prev_record_data : [],
            clickPrev_counter : 0,
            prev_status : 0,
            glucose_meter : {
                pointerEvents : "none",
                opacity : "0.8"
            },
            
            current_blood_glucose : 0,
            last_record_hour : 0,
            last_record_total_minutes : 0
        }
    }

    componentDidMount(){
        this.setState({
            breakfast_db : this.state.breakfast_db.concat(breakfast_database)
        }) 
        this.setState({
            lunch_dinner_db : this.state.lunch_dinner_db.concat(lunch_dinner_database)
        }) 

        let glucose_meter = {...this.state.glucose_meter}
        glucose_meter.pointerEvents = "none"
        glucose_meter.opacity = "0.8"
        this.setState({glucose_meter})

        // console.log(this.state.current_blood_glucose)
    }

    handleGlucoseMeterPE = () =>{
        let glucose_meter = {...this.state.glucose_meter}
        glucose_meter.pointerEvents = "none"
        glucose_meter.opacity = "0.8"
        this.setState({glucose_meter})
    }

    handleGetAllUsers = (e) =>{
        // console.log(e)
        this.setState({all_users_container : e})
    }

    handleOnChangeSignUpInput = (e) =>{
        let users_container = {...this.state.users_container}
        if(e.target.name === "first_name"){
            if(e.target.value.length > 1){
                users_container.first_name = e.target.value
            }
        }
        else if(e.target.name === "last_name"){
            if(e.target.value.length > 1){
                users_container.last_name = e.target.value
            }
        }
        else if(e.target.name === "blood_test"){
            if(e.target.value.length > 1){
                users_container.blood_test = parseFloat(e.target.value)
            }
        }
        else if(e.target.name === "age"){
            if(e.target.value.length > 1){
                users_container.age = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "height"){
            if(e.target.value.length > 1){
                users_container.height = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "weight"){
            if(e.target.value.length > 1){
                users_container.weight = parseInt(e.target.value)
            }
        }
        else if(e.target.name === "password"){
            if(e.target.value.length > 1){
                users_container.password = e.target.value
            }
        }
        else if(e.target.name === "others"){
            if(e.target.value.length > 1){
                users_container.others = e.target.value
            }
        }

        this.setState({users_container})
    }

    handleOnClickGenderBtn = (e) =>{
        console.log(e.target.textContent)
        let users_container = {...this.state.users_container}
        users_container.gender = e.target.textContent
        this.setState({users_container})
    }

    handleOnClickTermsCondition = (e) =>{

        let has_duplicate = false

        for(let elem of this.state.all_users_container){
            // console.log(elem)
            if(
                this.state.users_container.first_name === elem.first_name &&
                this.state.users_container.last_name === elem.last_name &&
                this.state.users_container.password === elem.password
            ){
                has_duplicate = true
            }
        }

        this.setState({check_duplicate_users : has_duplicate})

        let first_name_valid = (this.state.users_container.first_name.length > 1);
        let last_name_valid = (this.state.users_container.last_name.length > 1);
        let blood_test_valid = (this.state.users_container.blood_test > 1)
        let age_valid = (this.state.users_container.age > 1)
        let height_valid = (this.state.users_container.height > 1)
        let weight_valid = (this.state.users_container.weight > 1)
        let gender = (this.state.users_container.gender.length > 1)
        let others = (this.state.users_container.others.length > 1)

        if(first_name_valid && last_name_valid && blood_test_valid && age_valid && height_valid && weight_valid && gender && others && has_duplicate === false){
            let lets_start_btn = {...this.state.lets_start_btn}
            lets_start_btn.pointerEvents = "auto"
            this.setState({lets_start_btn})
        }
    }

    handleBreakfastBtnClick = () =>{
        let breakfast_btn = {...this.state.breakfast_btn}
        breakfast_btn.opacity = "1"
        this.setState({breakfast_btn})

        let lunch_btn = {...this.state.lunch_btn}
        lunch_btn.opacity = "0.5"
        this.setState({lunch_btn})

        let dinner_btn = {...this.state.dinner_btn}
        dinner_btn.opacity = "0.5"
        this.setState({dinner_btn})

        let breakfast_display = {...this.state.breakfast_display}
        breakfast_display.display = "block"
        this.setState({breakfast_display})

        let lunch_dinner_display = {...this.state.lunch_dinner_display}
        lunch_dinner_display.display = "none"
        this.setState({lunch_dinner_display})
    }

    handleLunchBtnClick = () =>{
        let breakfast_btn = {...this.state.breakfast_btn}
        breakfast_btn.opacity = "0.5"
        this.setState({breakfast_btn})

        let lunch_btn = {...this.state.lunch_btn}
        lunch_btn.opacity = "1"
        this.setState({lunch_btn})

        let dinner_btn = {...this.state.dinner_btn}
        dinner_btn.opacity = "0.5"
        this.setState({dinner_btn})

        let lunch_dinner_display = {...this.state.lunch_dinner_display}
        lunch_dinner_display.display = "block"
        this.setState({lunch_dinner_display})

        let breakfast_display = {...this.state.breakfast_display}
        breakfast_display.display = "none"
        this.setState({breakfast_display})
    }

    handleDinnerBtnClick = () =>{
        let breakfast_btn = {...this.state.breakfast_btn}
        breakfast_btn.opacity = "0.5"
        this.setState({breakfast_btn})

        let lunch_btn = {...this.state.lunch_btn}
        lunch_btn.opacity = "0.5"
        this.setState({lunch_btn})

        let dinner_btn = {...this.state.dinner_btn}
        dinner_btn.opacity = "1"
        this.setState({dinner_btn})

        let lunch_dinner_display = {...this.state.lunch_dinner_display}
        lunch_dinner_display.display = "block"
        this.setState({lunch_dinner_display})

        let breakfast_display = {...this.state.breakfast_display}
        breakfast_display.display = "none"
        this.setState({breakfast_display})
    }

    handleOnChangeSearch = (event) =>{
        let current_word_search = event.target.value
        current_word_search = current_word_search.toLowerCase()
        let key = event.keyCode || event.charCode

        if(this.state.breakfast_display.display === "block"){
            if( key === 8 || key === 46 ){
                this.setState({
                    breakfast_db : breakfast_database
                }) 
            }else{
                let breakfast_db = this.state.breakfast_db.filter(elem =>{
                    let name 
                    name = elem.name.toLowerCase()
                    return name.includes(current_word_search)
                })
                this.setState({breakfast_db})
            }
        }
        else if(this.state.lunch_dinner_display.display === "block"){
            if( key === 8 || key === 46 ){
                this.setState({
                    lunch_dinner_db : lunch_dinner_database
                }) 
            }else{
                let lunch_dinner_db = this.state.lunch_dinner_db.filter(elem =>{
                    let name 
                    name = elem.name.toLowerCase()
                    return name.includes(current_word_search)
                })
                this.setState({lunch_dinner_db})
            }
        }
    }

    handleOnChangeSelection = (e) => {
        let selected = e.target.value
        let list = {}

        if(this.state.breakfast_display.display === "block"){
            let breakfast_db = []
            if(selected === ""){
                breakfast_db = breakfast_database
            }
            else{
                this.state.breakfast_db.forEach(elem =>{
                    list[elem.name] = elem[selected]
                })
        
                let keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
                list = keysSorted
        
                
                for(let list_elem of list){
                    this.state.breakfast_db.forEach(elem =>{
                        if(list_elem === elem.name){
                            breakfast_db.push(elem)
                        }
                    })
                }
            }
            
            this.setState({breakfast_db})
        }
        else if(this.state.lunch_dinner_display.display === "block"){
            let lunch_dinner_db = []
            if(selected === ""){
                lunch_dinner_db = lunch_dinner_database
            }
            else{
                this.state.lunch_dinner_db.forEach(elem =>{
                    list[elem.name] = elem[selected]
                })
        
                let keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
                list = keysSorted
    
                for(let list_elem of list){
                    this.state.lunch_dinner_db.forEach(elem =>{
                        if(list_elem === elem.name){
                            lunch_dinner_db.push(elem)
                        }
                    })
                }
            }
            
            this.setState({lunch_dinner_db})
        }
        
    }

    handleOnListDownClick = (e) => {
        if(this.state.user_prev_record_data.length === []){
            alert("Kindly Check first your previous recordings for reference")
        }

        // this.setState({clickPrev_counter : this.state.clickPrev_counter + 1})
        this.setState({
            food_list_clicked : [...this.state.food_list_clicked, {
                id : e.id,
                name : e.name,
                served : e.served
            }]
        })
        if(e.from_what_meal === "breakfast"){
            this.setState({
                list_down_btn : [...this.state.list_down_btn, {
                    id : e.id,
                    pointerEvents : "none",
                    background : "#6C757D",
                }]
            })
        }else{
            this.setState({
                list_down_btn_LD : [...this.state.list_down_btn_LD, {
                    id : e.id,
                    pointerEvents : "none",
                    background : "#6C757D",
                }]
            })
        }
        

        

    }

    handleOnClickRemoveInList = (e) => {
        // console.log(e)
        if(e.includes("bf")){
            this.setState({list_down_btn: this.state.list_down_btn.filter(function(elem) { 
                return elem.id !== e
            })});
        }else{
            this.setState({list_down_btn_LD: this.state.list_down_btn_LD.filter(function(elem) { 
                return elem.id !== e
            })});
        }
        
        this.setState({food_list_clicked: this.state.food_list_clicked.filter(function(elem) { 
            return elem.id !== e
        })});
    }

    handleOnClickSaveFoodListBtn = () => {
        if (window.confirm('Are you sure this is your meal?')) {
            alert("Click and Open now the Glucose meter")
            let glucose_meter = {...this.state.glucose_meter}
            glucose_meter.pointerEvents = "auto"
            glucose_meter.opacity = "1"
            this.setState({glucose_meter})
          } 
    }

    handleOnChangeInputGlucoTest = (e) => {
        if(e.target.value > 0){
            let calculate_blood = {...this.state.calculate_blood}
            calculate_blood.pointerEvents = "auto"
            this.setState({calculate_blood})

            this.setState({input_gluco_test : e.target.value})
        }
        
    }

    handleUsePrevBlood = () => {
        this.setState({input_gluco_test : this.state.user_prev_record_data[this.state.user_prev_record_data.length - 1].after_blood})
        let calculate_blood = {...this.state.calculate_blood}
        calculate_blood.pointerEvents = "auto"
        this.setState({calculate_blood})
    }

    handleUseCurrBlood = () => {
        this.setState({input_gluco_test : this.state.current_blood_glucose})
        let calculate_blood = {...this.state.calculate_blood}
        calculate_blood.pointerEvents = "auto"
        this.setState({calculate_blood})
    }

    handleUseInitBlood = () => {
        this.setState({input_gluco_test :this.state.user_logged_in_info.blood_test})
        let calculate_blood = {...this.state.calculate_blood}
        calculate_blood.pointerEvents = "auto"
        this.setState({calculate_blood})
        // console.log(this.state.user_logged_in_info)

    }

    handleCalculateBlood = (e) => {
        //HERE IS THE CALCULATION OF THE PUTANGINA
        

        let record_data = {...this.state.record_data}
        record_data.pointerEvents = "auto"
        this.setState({record_data})

        let foods = ""
        for(let elem of this.state.food_list_clicked){
            foods += elem.name + ", "
        }

        let total_calories = 0
        let total_carbs = 0
        let total_fats = 0
        let total_proteins = 0
        for(let i of this.state.food_list_clicked){
            for(let j of breakfast_database){
                if(i.name === j.name){
                    total_calories += j.calories * i.served
                    total_carbs += j.carbs * i.served
                    total_fats += j.fat * i.served
                    total_proteins += j.protein * i.served
                }
            }
        }

        for(let i of this.state.food_list_clicked){
            for(let j of lunch_dinner_database){
                if(i.name === j.name){
                    total_calories += j.calories * i.served
                    total_carbs += j.carbs * i.served
                    total_fats += j.fat * i.served
                    total_proteins += j.protein * i.served
                }
            }
        }
        if(total_calories > 900){
            total_calories /= 1
        }
        let temp = total_calories * 0.8
        let deduction = Number((total_calories - temp) / 4).toFixed(1)
        // console.log(deduction)
        let calc_blood = parseFloat(this.state.input_gluco_test) + parseFloat(deduction)
        this.setState({calculate_blood_value : calc_blood})

        let new_record_data = {...this.state.new_record_data}
        new_record_data.first_name = this.state.users_login_data.first_name
        new_record_data.last_name = this.state.users_login_data.last_name
        new_record_data.password = this.state.users_login_data.password
        new_record_data.date = new Date().toLocaleString() + ""
        new_record_data.food = foods
        new_record_data.total_calories = Number(total_calories.toFixed(1))
        new_record_data.total_carbs = Number(total_carbs.toFixed(1))
        new_record_data.total_fat = Number(total_fats.toFixed(1))
        new_record_data.total_proteins = Number(total_proteins.toFixed(1))
        // new_record_data.before_blood = e.initialBlood
        // console.log(this.state.user_prev_record_data[this.state.user_prev_record_data.length - 1])
        // console.log(this.state.user_prev_record_data)
        if(this.state.user_prev_record_data.length === 0){
            new_record_data.before_blood = e.initialBlood
        }else{
            // new_record_data.before_blood = this.state.user_prev_record_data[this.state.user_prev_record_data.length - 1].after_blood
            new_record_data.before_blood = this.state.current_blood_glucose
            // dmtrx0716
        }
        new_record_data.after_blood = calc_blood

        this.setState({new_record_data})
        this.setState({current_blood_glucose : calc_blood})

        this.setState({food_list_clicked : []})
        this.setState({list_down_btn : []})
        this.setState({list_down_btn_LD : []})
        this.setState({input_gluco_test : 0})
        //let calculate_blood = {...this.state.calculate_blood}

        // calculate_blood.pointerEvents = "none"
        // this.setState({calculate_blood})
        // record_data.pointerEvents = "none"
        // this.setState({record_data})
    }

    handleOnChangeLogInInput = (e) =>{
        let users_login_data = {...this.state.users_login_data}
        if(e.target.name === "first_name"){
            if(e.target.value.length > 1){
                users_login_data.first_name = e.target.value
            }
        }
        else if(e.target.name === "last_name"){
            if(e.target.value.length > 1){
                users_login_data.last_name = e.target.value
            }
        }
        else if(e.target.name === "password"){
            if(e.target.value.length > 1){
                users_login_data.password = e.target.value
            }
        }

        this.setState({users_login_data})
    }

    handleTry = (e)=>{
        let user_logged_in_info = {...this.state.user_logged_in_info}
        user_logged_in_info.first_name = e.first_name
        user_logged_in_info.last_name = e.last_name
        user_logged_in_info.blood_test = e.blood_test
        user_logged_in_info.age = e.age
        user_logged_in_info.height = e.height
        user_logged_in_info.weight = e.weight
        user_logged_in_info.gender = e.gender
        user_logged_in_info.password = e.password
        user_logged_in_info.others = e.others

        this.setState({user_logged_in_info})
    }

    handleLogOut = () =>{
        let user_logged_in_info = {...this.state.user_logged_in_info}
        user_logged_in_info.first_name = ""
        user_logged_in_info.last_name = ""
        user_logged_in_info.blood_test = 0
        user_logged_in_info.age = 0
        user_logged_in_info.height = 0
        user_logged_in_info.weight = 0
        user_logged_in_info.gender = ""
        user_logged_in_info.password = ""

        this.setState({user_logged_in_info})
    }

    handleSetStateUserPrevData = (e) => {
        this.setState({user_prev_record_data : e})
        if(e.length === 0){
            this.setState({prev_status : this.state.user_logged_in_info.blood_test})
            this.setState({current_blood_glucose : this.state.user_logged_in_info.blood_test})
        }else{
            this.setState({prev_status : e[e.length - 1].after_blood})
            // this.setState({current_blood_glucose : e[e.length - 1].after_blood})
        
            console.log(e[e.length - 1].after_blood)
            let current_date
            current_date = new Date(e[e.length - 1].date)
            let day = current_date.getDate()
            let hour = current_date.getHours()
            let minute = current_date.getMinutes() 
            this.setState({last_record_hour : hour})
            this.setState({last_record_total_minutes : minute})
            console.log("day", day ,"hour: " , hour , "min: " , minute)

            let newDate = new Date()
            let current_dates = newDate.getDate()
            let current_hour = newDate.getHours()
            let current_minutes = newDate.getMinutes()
            console.log("current_date: " + current_dates)
            console.log("current_minutes: " + current_minutes)
            console.log("current_hours: " + current_hour)

            let interval_hour = (current_hour - hour) * 60
            let interval_minutes = current_minutes - minute
            //console.log("hour: " , interval_hour, "mins", interval_minutes)

            let minutes_passed_by 
            if(current_dates - day > 1){
                minutes_passed_by = 300
            }else{
                minutes_passed_by = interval_hour + interval_minutes
            }

            let decrease
            if(minutes_passed_by >= 300){
                // console.log("here")
                decrease = 300 * 0.17
            }else{
                decrease = minutes_passed_by * 0.027
                // console.log("here")
            }
            
            decrease = Number(decrease).toFixed(1)
            
            if(decrease < 0){
                decrease *= -1
                decrease *= 3.5
            }

            console.log(decrease)
            this.setState({current_blood_glucose : Number(parseFloat(e[e.length - 1].after_blood) - decrease).toFixed(1)})
            // console.log(this.state.current_blood_glucose)
        }
    }

    render() { 
        // console.log("bf", this.state.list_down_btn)
        // console.log("ld", this.state.list_down_btn_LD)
        // console.log(this.state.food_list_clicked)
        
        // console.log(this.state.new_record_data)
        // console.log(this.state.users_container)
        // console.log("App ULII" , this.state.user_logged_in_info)

        // console.log(this.state.user_prev_record_data)
        // console.log(this.state.new_record_data)
        // console.log(this.state.all_users_container)
        let register
        if(this.state.check_duplicate_users === false){
            register = () => {
                alert("Successfully made an account!")
                Axios.post('http://localhost:3001/sign-up' , 
                    this.state.users_container).then((response)=>{
                        console.log(response)
                    })
            }
        }else{
            alert("No duplicate Accounts")
        }

        const login = () => {
            Axios.post('http://localhost:3001/log-in' , 
                this.state.users_login_data).then((response)=>{
                    if(response.data === false) alert("Wrong Combination of Inputs")
                    let user_account_validity = {...this.state.user_account_validity}
                    // console.log(response)
                    user_account_validity = response.data
                    this.setState({user_account_validity})

                })
        }

        const new_record_data_db = () => {
            alert("Successfully Created Record")
            Axios.post('http://localhost:3001/home' , 
                this.state.new_record_data).then((response)=>{
                    console.log("here")
                    console.log(response)
                })
        }
        // console.log(this.state.user_prev_record_data)
        // console.log(this.state.last_record_hour)
        // console.log(this.state.last_record_total_minutes)

        // let newDate = new Date()
        // let current_hour = newDate.getHours()
        // let current_minutes = newDate.getMinutes()
        // console.log("current_minutes: " + current_minutes)
        // console.log("current_hours: " + current_hour)

        // console.log(this.state.current_blood_glucose)
        return (
            <div>
                {/* <Router basename='blood-sugar-thesis'> */}
                <Router basename=''>
                    <React.Fragment>
                        <Routes>
                            <Route path="/" exact element={
                                <React.Fragment>
                                    <Front 
                                        window_width={this.state.window_width}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/about" exact element={
                                <React.Fragment>
                                    <About 
                                        window_width={this.state.window_width}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/contact" exact element={
                                <React.Fragment>
                                    <Contact 
                                        window_width={this.state.window_width}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/sign-up" exact element={
                                <React.Fragment>
                                    <SignUp 
                                        window_width={this.state.window_width}
                                        args={{
                                            handleSignUpBtn: this.handleSignUpBtn,
                                            handleOnChangeSignUpInput : this.handleOnChangeSignUpInput,
                                            handleOnClickGenderBtn : this.handleOnClickGenderBtn,
                                            handleOnClickTermsCondition : this.handleOnClickTermsCondition,
                                            lets_start_btn : this.state.lets_start_btn,
                                            // REACT NODE SQL
                                            register : register,
                                            handleGetAllUsers : this.handleGetAllUsers,
                                            check_duplicate_users : this.state.check_duplicate_users
                                        }}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/log-in" exact element={
                                <React.Fragment>
                                    <LogIn 
                                        window_width={this.state.window_width}
                                        args={{
                                            login : login,
                                            handleOnChangeLogInInput : this.handleOnChangeLogInInput,
                                            user_account_validity : this.state.user_account_validity,
                                            path_from_login: this.state.path_from_login
                                        }}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/home" exact element={
                                <React.Fragment>
                                    <Main 
                                        window_width={this.state.window_width}
                                        args={{
                                            breakfast_db : this.state.breakfast_db,
                                            lunch_dinner_db : this.state.lunch_dinner_db,
                                            handleBreakfastBtnClick : this.handleBreakfastBtnClick,
                                            handleLunchBtnClick : this.handleLunchBtnClick,
                                            handleDinnerBtnClick : this.handleDinnerBtnClick,
                                            breakfast_btn : this.state.breakfast_btn,
                                            lunch_btn : this.state.lunch_btn,
                                            dinner_btn : this.state.dinner_btn,
                                            breakfast_display : this.state.breakfast_display,
                                            lunch_dinner_display : this.state.lunch_dinner_display,
                                            onChangeSearch : this.handleOnChangeSearch,
                                            handleOnChangeSelection: this.handleOnChangeSelection,
                                            food_list_clicked : this.state.food_list_clicked,
                                            handleOnListDownClick : this.handleOnListDownClick,
                                            list_down_btn : this.state.list_down_btn,
                                            list_down_btn_LD : this.state.list_down_btn_LD,
                                            handleOnClickRemoveInList : this.handleOnClickRemoveInList,
                                            handleOnClickSaveFoodListBtn : this.handleOnClickSaveFoodListBtn,
                                            calculate_blood : this.state.calculate_blood,
                                            handleOnChangeInputGlucoTest : this.handleOnChangeInputGlucoTest,
                                            handleCalculateBlood : this.handleCalculateBlood,
                                            record_data : this.state.record_data,
                                            handleRecordTheData : this.handleRecordTheData,
                                            calculate_blood_value : this.state.calculate_blood_value,
                                            input_gluco_test : this.state.input_gluco_test,
                                            handleUseCurrBlood : this.handleUseCurrBlood,
                                            handleUsePrevBlood : this.handleUsePrevBlood,
                                            handleUseInitBlood : this.handleUseInitBlood,
                                            user_prev_record_data : this.state.user_prev_record_data,
                                            prev_status : this.state.prev_status,
                                            glucose_meter : this.state.glucose_meter,
                                            handleGlucoseMeterPE : this.handleGlucoseMeterPE,
                                            current_blood_glucose : this.state.current_blood_glucose,
                                            //REACT NODEJS SQL
                                            // home : home
                                            users_login_data : this.state.users_login_data,
                                            new_record_data_db : new_record_data_db,
                                            handleTry : this.handleTry,
                                            user_logged_in_info : this.state.user_logged_in_info,
                                            handleLogOut : this.handleLogOut
                                        }}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/recordings" exact element={
                                <React.Fragment>
                                    <PrevRecordings 
                                        window_width={this.state.window_width}
                                        args={{
                                            user_logged_in_info : this.state.user_logged_in_info,
                                            //REACT NODEJS SQL
                                            // home : home
                                            users_login_data : this.state.users_login_data,
                                            new_record_data : this.state.new_record_data,
                                            handleSetStateUserPrevData : this.handleSetStateUserPrevData
                                        }}
                                    />
                                </React.Fragment>
                            } />
                            <Route path="/progress" exact element={
                                <React.Fragment>
                                    <Progress 
                                        window_width={this.state.window_width}
                                        args={{
                                            user_logged_in_info : this.state.user_logged_in_info,
                                            //REACT NODEJS SQL
                                            // home : home
                                            users_login_data : this.state.users_login_data,
                                            user_prev_record_data : this.state.user_prev_record_data,
                                            handleSetStateUserPrevData : this.handleSetStateUserPrevData
                                        }}
                                    />
                                </React.Fragment>
                            } />
                        </Routes>
                    </React.Fragment>
                </Router>
            </div>
        );
    }
}
 
export default App;