import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from "react-router-dom";

class Login extends Component {
 constructor(props) {
   super(props);
   this.state = {
     email: '',
     originalPassword: '',
     message: null, 
   };
 }

 handleOnChange = (event) => {
   const { name, value } = event.target;
   this.setState({[name]: value});
 };

 handleSubmit = (event) => {
       event.preventDefault();
       Axios.post('http://localhost:3001/api/login',
       this.state,
       {withCredentials: true}
       )
       .then((response) => {
           const { userDoc } = response.data;
           this.props.onUserChange(userDoc);
       })
       .catch((err) => {
           console.log('error: ', err);
       });
 };

 render() {
   const { email, originalPassword } = this.state;
  if(this.props.currentUser){
    return <Redirect to='/'/>
  }

   return (
     <div>
       <form onSubmit={(event) => this.handleSubmit(event)}>
         <label>email</label>
         <input
           value={email}
           onChange={(event) => this.handleOnChange(event)}
           type="email"
           name="email"
           placeholder="Email"
         />
         <label>Password</label>
         <input
           value={originalPassword}
           onChange={(event) => this.handleOnChange(event)}
           type="password"
           name="originalPassword"
           placeholder="Password"
         />
         <button>Submit</button>
       </form>
       { this.state.message && <div> { this.state.message } </div> }

     </div>
   );
 }
}

export default Login;