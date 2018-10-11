import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ZoeyBirthday from './Components/Birthday/ZoeyBirthday';
import Home from './Components/Home';
import Signin from './Components/Signin';
import FRM from './Components/FRM';

class App extends Component {

  render() {
      return (
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/zoeyBirthday' component={ZoeyBirthday} />
            <Route path='/signin' component={Signin} />
            <Route path='/frm' component={FRM} />
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
