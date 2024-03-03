/*
 * Author: Meyga Anne Alexander
 * Date: 3 March 2024
 * Description: Includes all the Reservation Details that ar ebeing displayed once the number of sdults/children and date, time are selected
 */

import React, { Component } from 'react';

class BillDetails extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
  render() {
    return (
      <div className="billDetailsStyle">
        <h2>Reservation Details</h2>
        <p>Number of Adult's - {this.props.data.adultCount}</p>
        <p>Number of Kids - {this.props.data.childCount}</p>
        <p>Date- { this.props.data.date}</p>
        <p>Time - { this.props.data.time}</p>
        <p>Total Amount - {( 10 * this.props.data.adultCount )+ (5 * this.props.data.childCount )} $</p>
      </div>
    );
  }
}

export default BillDetails;
