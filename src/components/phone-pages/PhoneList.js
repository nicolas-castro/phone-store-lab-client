import React, { Component } from 'react';
import Axios from 'axios';


class PhoneList extends Component {
  constructor(props){
    super(props);
    this.state ={
      phonesArray: [],
    }

  }

  componentDidMount(){
    Axios.get(
      "http://localhost:3001/api/phones",
      { withCredentials: true},
    )
    .then( responseFromAPI => {(this.setState({ phonesArray: responseFromAPI.data }) 
    )});
   
  }
render(){
  // console.log('array of phones', this.state.phonesArray)
  const {phonesArray} = this.state
  return(
    <section>
      { phonesArray.map(onePhone => {
        return(
          <li key={ onePhone._id }>
            { onePhone.model } by { onePhone.brand }
            <p> $ { onePhone.price } </p>
            <img src={ onePhone.image } alt={ onePhone.model } width='100'></img>
          </li>
        )
      }) }
    </section>
  )
}

}

export default PhoneList;