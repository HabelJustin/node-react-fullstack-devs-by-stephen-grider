import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  fetchRes = (e) => {
    e.preventDefault()

    axios.get('/api/resources')
    .then(res => console.log(res.data))
    .catch(err => console.log('Axios Failed: ',err));
  }

  render() {
    return (
      <div className="App">
        <center>
          <h1>React App</h1>
          <a href="/api/auth/google">Google SignIn</a>
          <br/>
          <a href="" onClick={this.fetchRes}>Fetch Resources</a>
        </center>
      </div>
    );
  }
}

export default App;
