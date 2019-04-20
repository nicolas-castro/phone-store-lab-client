import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3001/api',
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewProfile(newProfile) {
    console.log('new profile is: ', newProfile)
    return service.post('/profile/create', newProfile, {withCredentials:true})
      .then(res => res.data)
      .catch(errorHandler);
  }
}
