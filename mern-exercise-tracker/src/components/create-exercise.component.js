import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
export default class EditExercise extends Component {


  // Constructor
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Initialize State
    this.state= {
      username : '',
      description : '',
      duration: 0,
      date: new Date(),
      users: []
    }

  }

  // To select a user (default user hardcoded)
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  // Change the states
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  // Handler for submit
  onSubmit(e) {
    // Prevents the default HTML form behavior from taking place. (Reloading the page)
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
  
  // Logging the exercise details to console for now 
  console.log(exercise);
  axios.post('http://localhost:5000/exercises/add', exercise)
  .then(res => console.log(res.data));

//  window.location = '/';
  }

  render() {
    return (
      <div>
        <h3> Create a New Exercise </h3>
        <form onSubmit={this.onSubmit}>

          {/* Username Input Group */}
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>

          {/* Description Input Group */}
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>

          {/* Duration Input Group */}
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>

          {/* Date Input Group */}
          <div className="form-group">
            <label>Date: </label>
            <div>
            
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
              
            </div>
          </div>

          {/* Create Exercise Button */}
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}