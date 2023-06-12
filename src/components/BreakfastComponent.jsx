import React, { Component } from 'react';

class BreakfastComponent extends Component {
    constructor(props){
        super()
        // const {window_width} = props
        this.state ={
            served : 1,
            served_1 : {
                opacity : "1"
            },
            served_2 : {
                opacity : "0.7"
            },
            served_3 : {
                opacity : "0.7"
            },
            serving : 1,
            from_what_meal : "breakfast"
        }
    }

    handleOnClickServe = (e) => {
        let served = {...this.state.served}
        served = parseInt(e.target.textContent)
        this.setState({served})

        if(parseInt(e.target.textContent) === 1){
            let served_1 = {...this.state.served_1}
            served_1.opacity = "1"
            this.setState({served_1})

            let served_2 = {...this.state.served_2}
            served_2.opacity = "0.7"
            this.setState({served_2})

            let served_3 = {...this.state.served_3}
            served_3.opacity = "0.7"
            this.setState({served_3})

            this.setState({serving : 1})
        }
        else if(parseInt(e.target.textContent) === 2){
            let served_2 = {...this.state.served_2}
            served_2.opacity = "1"
            this.setState({served_2})

            let served_1 = {...this.state.served_1}
            served_1.opacity = "0.7"
            this.setState({served_1})

            let served_3 = {...this.state.served_3}
            served_3.opacity = "0.7"
            this.setState({served_3})

            this.setState({serving : 2})

        }
        else if(parseInt(e.target.textContent) === 3){
            let served_3 = {...this.state.served_3}
            served_3.opacity = "1"
            this.setState({served_3})

            let served_1 = {...this.state.served_1}
            served_1.opacity = "0.7"
            this.setState({served_1})

            let served_2 = {...this.state.served_2}
            served_2.opacity = "0.7"
            this.setState({served_2})

            this.setState({serving : 3})

        }
    }

    render() {
        // console.log(this.props.args.list_down_btn)
        let list_down_btn = this.props.args.list_down_btn
        // console.log(list_down_btn)
        // console.log(this.state.serving)
        return (
            <div className="food-list-row">
                <div id="food-pic-div">
                    <img id="food-img" src={require("../imgs/breakfast_imgs/" + this.props.args.elem.imgURL)} alt="food-img" />
                   
                    <label> {this.props.args.elem.name} </label>
                </div>
                <div id="food-info-div">

                    {/* <div id="recom-div">
                        <img id="recom-img" src={require("../imgs/recom-img.png")} alt="recommended-img" />
                    </div> */}

                    <div id="exercise-div">
                        <img 
                            id="exer-img" 
                            src={require('../imgs/exercise-img.png')} 
                            alt="exercise-img" 
                            onClick={() => this.props.args.handleOnClickExercise({
                                id : this.props.args.elem.id , 
                                where : "bf",
                                serving : this.state.serving
                            })}
                        />
                    </div>

                    <div id="serving-div">
                        <label>Serving: </label>
                        <button id='serving-1-btn' onClick={this.handleOnClickServe} style={this.state.served_1}>1</button>
                        <button id='serving-2-btn' onClick={this.handleOnClickServe} style={this.state.served_2}>2</button>
                        <button id='serving-3-btn' onClick={this.handleOnClickServe} style={this.state.served_3}>3</button>
                    </div>

                    <div id="calories-div">
                        <div id="circle">{this.props.args.elem.calories * this.state.serving}</div>
                        <label>Calories</label>
                    </div>

                    <div id="carbs-div">
                        <div id="circle">{Number(this.props.args.elem.carbs * this.state.serving).toFixed(1)}g</div>
                        <label>Carbs</label>
                    </div>

                    <div id="fat-div">
                        <div id="circle">{Number(this.props.args.elem.fat * this.state.serving).toFixed(1)}g</div>
                        <label>Fats</label>
                    </div>

                    <div id="protein-div">
                        <div id="circle">{Number(this.props.args.elem.protein * this.state.serving).toFixed(1)}g</div>
                        <label>Proteins</label>
                    </div>

                    <button 
                        type="button" 
                        id='list-it-down-btn' 
                        className="btn btn-danger"
                        style={list_down_btn}
                        onClick={() => {
                            this.props.args.handleOnListDownClick({
                                id: "bf-" + this.props.args.elem.id.toString(),     
                                name: this.props.args.elem.name,
                                served : this.state.served,
                                from_what_meal : this.state.from_what_meal
                            })
                        }}
                    >
                        List it Down
                    </button>
                </div>
            </div>
        );
    }
}
 
export default BreakfastComponent;