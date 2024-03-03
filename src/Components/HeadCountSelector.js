/*
 * Author: Meyga Anne Alexander
 * Date: 3 March 2024
 * Description: The component that lets user select the number of adults and children for reservation.
 */


import React from 'react';

class HeadCountSelector extends React.Component{
    constructor(props){
        super(props)
        this.state={
         adultCount:0,
         childCount:0
        }
    }
    decrement=(flag)=>
    {
     let countTypeToUpdate = `${flag}Count`;
     
     // Check to ensure adult/child doesnt go below 0
       if( this.state[countTypeToUpdate]!==0){
        this.setState({ [countTypeToUpdate]: this.state[countTypeToUpdate] - 1 }, () => {
            this.props.onCountChange(this.state.adultCount, this.state.childCount);
        });
       }
    }

    increment=(flag)=>
    {
        let countTypeToUpdate = `${flag}Count`;
        this.setState({ [countTypeToUpdate]: this.state[countTypeToUpdate] + 1 }, () => {
            this.props.onCountChange(this.state.adultCount, this.state.childCount);
        });
    }

    render(){
return(  
    <div className="app-container ">
     <div className="headCountSelectorContainer">
     <label className="headCountText">
         Number of Adults:
    </label>
    <br/>
    <div className="headCountButtons">
    <button className="roundButton decrementButton" onClick={()=>{this.decrement("adult")}}>
        <span className="material-symbols-outlined">-</span>
      </button>
      <p>{this.state.adultCount}</p>
      <button className="roundButton incrementButton"  onClick={()=>{this.increment("adult")}}>
        <span class="material-symbols-outlined">+</span>
      </button>
      </div>
     </div>
     <div className="headCountSelectorContainer">
     <label className="headCountText">
         Number of Children:
    </label>
    <br/>
    <div className="headCountButtons">
    <button className="roundButton decrementButton" onClick={()=>{this.decrement("child")}}>
        <span className="material-symbols-outlined">-</span>
      </button>
      <p>{this.state.childCount}</p>
      <button className="roundButton incrementButton"  onClick={()=>{this.increment("child")}}>
        <span class="material-symbols-outlined">+</span>
      </button>
      </div>
     </div>
     </div>
   ) }


}
export default HeadCountSelector;