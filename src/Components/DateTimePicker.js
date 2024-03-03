/*
 * Author: Meyga Anne Alexander
 * Date: 3 March 2024
 * Description: The component that lets user select the data and time for reservation
 */


import React from 'react';

class DateTimePicker extends React.Component {
    constructor(props){
        super(props)
        this.state={   
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDate: null,
            selectedTime: null,
            times: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'],
            isTimeDisabled: true, // Initially time selection is disabled}
    }
}


  daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  createDaysForCurrentMonth = () => {
    const { currentMonth, currentYear } = this.state;
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = this.daysInMonth(currentMonth, currentYear);
    const days = [];

    // Adjust to add empty slots before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); 
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }

    return days;
};



  isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  renderCalendarDays = () => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekdayHeaders = weekdays.map((day, index) => (
      <div key={index} className="weekday">{day}</div>
    ));

    const days = this.createDaysForCurrentMonth();
    const dayElements = days.map((day, index) => {
      if (day === null) {
        return <div key={`empty-${index}`} className="day empty"></div>;
      } else {
        const dayNumber = day.getDate();
        const isPast = this.isPastDate(day);
        const isSelected = this.state.selectedDate?.toDateString() === day.toDateString();

        return (
          <button
            key={index}
            disabled={isPast}
            className={`day ${isPast ? 'past' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => this.selectDate(day)}
          >
            {dayNumber}
          </button>
        );
      }
    });

    return (
      <>
        <div className="weekday-header">{weekdayHeaders}</div>
        <div className="calendar-grid">{dayElements}</div>
      </>
    );
};



  selectDate = (date) => {
    this.setState({
        selectedDate: date,
        isTimeDisabled: false, // Enable time selection
      }, () => {
        this.props.onDateChange(this.state.selectedDate);
      });
  };

  selectTime = (time) => {
    this.setState({ selectedTime: time }, () => {
        this.props.onTimeChange(this.state.selectedTime);
    });
  };



  changeMonth = (offset) => {
 
    let { currentMonth, currentYear } = this.state;
    currentMonth += offset;
  
     if (currentMonth === -1) {
      currentMonth = 11;
      currentYear -= 1;
    } else if (currentMonth === 12) {
      currentMonth = 0;
      currentYear += 1;
    }
  
    // When changing the month, reset the selected date and disable time selection
    this.setState({
      currentMonth,
      currentYear,
      selectedDate: null, // Deselect any selected date
      selectedTime:null, // Reset selected time as well
      isTimeDisabled: true, // Ensure time selection is disabled until a new date is selected
    },()=>{
        this.props.onDateChange(""); this.props.onTimeChange("");
    })
  };

  render() {
    const { currentMonth, selectedTime, times } = this.state;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <>
      <div className="date-time-header">
        <label >Select Date</label>
        <div style={{ flex: '1' }}></div>
        <label >Select Time</label>
      </div>

      <div className="date-time-picker">
        <div className="date-picker">
          <div className="month-nav">
            <button className="arrow left" onClick={() => this.changeMonth(-1)}>&lt;</button>
            <label>{monthNames[currentMonth]}</label>
            <button className="arrow right" onClick={() => this.changeMonth(1)}>&gt;</button>
          </div>
          <div className="calendar">
            {this.renderCalendarDays()}
          </div>
        </div>
        <>
        <div className="time-picker">
          <div className="time-slots">
            {times.map((time, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => this.selectTime(time)}
                disabled={!this.state.selectedDate}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        </>
      </div>
      </>
    );
  }
}

export default DateTimePicker;
