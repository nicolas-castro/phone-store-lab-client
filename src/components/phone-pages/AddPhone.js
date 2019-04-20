import React, { Component } from 'react';
import Axios from 'axios';
import service from '../api/services';
import { Redirect } from "react-router-dom";


class AddPhone extends Component{
  constructor(props){
    super(props);
    this.state ={
      model: "",
      brand: "",
      price: "",
      image: "",
      specs: ["", "", ""],
      isSubmitSuccessful: false,
    }
  }

  genericSync = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }   

  syncSpec(event, index){
    const { specs } = this.state;
    // update the spec with whatever user typed in 
    // which means replace empty string with the value user typed in, on index 0, then 1, then 2, ...
    specs[index] = event.target.value;
    // update the state with the updated specs array
    this.setState({ specs });
}

  handleSubmit(event){
    event.preventDefault();

    Axios.post(
      "http://localhost:3001/api/phones",
      this.state,
      { withCredentials: true},
    )
    .then( response => {
      // console.log("New Phone: ", response.data);
      this.setState({ isSubmitSuccessful: true })
    })
    .catch( err => console.log(err))
  }

    render(){
      if(!this.props.currentUser){
        return <Redirect to='/login' />
      }

      if(this.state.isSubmitSuccessful){
        return <Redirect to='/phones'/>
      }
      return(
        <section>
          <h2> Add a Phone </h2>
          <form onSubmit={ e=> this.handleSubmit(e) } >
            <label>Model</label>
            <input
              value= { this.state.model }
              onChange={ e => this.genericSync(e)}
              type='text'
              name='model'
              placeholder='Model'
            />  
            <label>Brand</label>
            <input
              value= { this.state.brand }
              onChange={ e => this.genericSync(e)}
              type='text'
              name='brand'
              placeholder='Brand'
            />  
            <label>Price</label>
            <input
              value= { this.state.price }
              onChange={ e => this.genericSync(e)}
              type='number'
              name='price'
              placeholder='Price'
            />  
            <label>image</label>
            <input
              onChange={ e => this.handleFileUpload(e)}
              type='file'
            />  
             <br />
              <label> Specs </label>
              <br />
              <small> has to be 3 letters at least </small>
              <br />

              { this.state.specs.map((oneSpec, index) => {
                  return (
                      <input 
                          key = {index}
                          type = "text"
                          value = { oneSpec }
                          onChange = { e => this.syncSpec(e, index) }
                      />
                  );
              } ) }

            <button> Save </button>
          </form>
        </section>
      )
    }

    }
    export default AddPhone;
