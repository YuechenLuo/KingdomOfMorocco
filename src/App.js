import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ZoeyBirthday from './Components/Birthday/ZoeyBirthday';
import Home from './Components/Home';

class App extends Component {

  render() {
      return (
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/zoeyBirthday' component={ZoeyBirthday} />
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
