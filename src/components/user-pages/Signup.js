import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {
    constructor(props){
      super(props);
      this.state = {
        fullName: "",
        email: "", 
        originalPassword: "",
        message: null, 
      }
    }

    handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
    }

    handleFormSubmnit = (event) =>{
      event.preventDefault();      
      axios.post(
        "http://localhost:3001/api/signup",
        this.state,
        { withCredentials: true}
      )
      .then(ResponseFromServer => {
        this.setState({
          fullName: "", 
          email: "",
          originalPassword: "",
      });

        console.log("response is: ", ResponseFromServer)
      })
      .catch(err => {
        // console.log("error while signup", err)
        if(err.response && err.response.data){
          return this.setState({message:err.response.data.message})
        }
      })

    }

    render(){
      return(
        <section> 
          <h2>Signup</h2>
          <form onSubmit={ e => this.handleFormSubmnit(e)}>
            <label>full Name</label>
            <input 
              value={this.state.fullName}
              onChange={e => this.handleChange(e)}
              type='text'
              name='fullName'
              placeholder='FullName'
            />
             <label>Email</label>
            <input 
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              type='email'
              name='email'
              placeholder='Email'
            />
             <label>Password</label>
            <input 
              value={this.state.originalPassword}
              onChange={e => this.handleChange(e)}
              type='password'
              name='originalPassword'
              placeholder='Password'
            />
            <button>Signup</button>
          </form>
          { this.state.message && <div> { this.state.message } </div> }
        </section>

      )
    }

}

export default Signup;