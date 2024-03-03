/*
 * Author: Meyga Anne Alexander
 * Date: 3 March 2024
 * Description: The parent component that imports the rest of the child components (BillDetails ,HeadCountSelector, DateTimePicker)
 */


import React from 'react';
import BillDetails from './BillDetails';
import HeadCountSelector from './HeadCountSelector';
import DateTimePicker from './DateTimePicker';

class BillingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            adultCount: 0,
            childCount: 0,
            date: 'Not chosen',
            time:'Not Chosen'
        }
    }
    
    handleHeadCountChange = (adultCount, childCount) => {
        this.setState({ adultCount:adultCount,  childCount :childCount});
    }

    handleDateChange = (selectedDate) => {
        if(selectedDate!==""){
        const date = new Date(selectedDate);

// Extract and format the date as "Mar 15 2024"
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
        this.setState({ date:formattedDate});
}
else{
    this.setState({ date:"Not Chosen"});
}
    }

    handleTimeChange= (time) => {
        if(time!==""){
        this.setState({ time:time});
        }
        else{
            this.setState({ time:"Not Chosen"});
        }
    }

    render(){
        return (
            
        <div className="billing-page-container">
        <div className="left-components">
          <HeadCountSelector onCountChange={this.handleHeadCountChange}/>
          <DateTimePicker  onDateChange={this.handleDateChange} onTimeChange={this.handleTimeChange}/>
        </div>
        <div className="right-components">
          <BillDetails data={this.state}/>
        </div>
      </div>

   ) }


}
export default BillingPage;