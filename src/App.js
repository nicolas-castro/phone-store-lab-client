import React, { Component } from 'react';
import './App.css';
import Signup from './components/user-pages/Signup';
import Axios from 'axios'

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

syncCurrentUser(user){
  this.setState({ currentUser: user })
}

  render() {
    return (
      <div className="App">
        <Signup currentUser={this.state.currentUser} onUserChange={ userDoc => this.syncCurrentUser(userDoc) }/>
      </div>
    );
  }
}

export default App;
