import React, { Component } from 'react';
import './App.css';
import Signup from './components/user-pages/Signup';
import Axios from 'axios'
import Login from './components/user-pages/Login';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import AddPhone from './components/phone-pages/AddPhone'
import PhoneList from './components/phone-pages/PhoneList';

class App extends Component {
  constructor(){
    super();
    this.state ={
      currentUser: null,
    }
  }

componentDidMount(){
  Axios.get('http://localhost:3001/api/checkuser', { withCredentials: true})
  .then(responseFromServer => {
    console.log("Check user that is logged in: ", responseFromServer.data)
    const { userDoc } = responseFromServer.data;
    this.syncCurrentUser(userDoc)
  })
}

logoutUser = () =>{
  Axios.delete('http://localhost:3001/api/logout', { withCredentials: true})
  .then(responseFromServer => {
    //ends the user session on the app
    this.setState({ currentUser: null });
    //ends the user session on the backend
    // const { userDoc } = responseFromServer.data;
    // this.syncCurrentUser(userDoc) 
  })
}

syncCurrentUser(user){
  this.setState({ currentUser: user })
}

  render() {
    return (
      <div className="App">
      
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/phones'>Phones</NavLink>
          { this.state.currentUser ? (
            <span>
            <NavLink to='/add-phone'>Add Phone </NavLink>
            <NavLink to='/' onClick={() => this.logoutUser()}>Logout</NavLink>          
            </span>
          ):(
          <span>
          <NavLink to='/signup'>Signup</NavLink>
          <NavLink to='/login'>Login</NavLink>
          </span>
          )}

        </nav>
        <h1> IronPhone store</h1>
          <Switch>
            <Route exact path='/' render={() => <Home currentUser={this.state.currentUser} onUserChange={ userDoc => this.syncCurrentUser(userDoc) }/>}/>
            <Route exact path='/signup' render={() => <Signup currentUser={this.state.currentUser} onUserChange={ userDoc => this.syncCurrentUser(userDoc) }/>}/>
            <Route exact path='/login' render={() => <Login currentUser={this.state.currentUser} onUserChange={ userDoc => this.syncCurrentUser(userDoc) }/>}/>
            <Route path="/add-phone" render={() => <AddPhone currentUser={this.state.currentUser}/>}/>
            <Route path="/phones" component={ PhoneList }/>
            
          </Switch>
      </div>
    );
  }
}

export default App;
