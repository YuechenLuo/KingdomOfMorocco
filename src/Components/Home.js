import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {

  render() {
    // redirect to happy birthday page if today is zoey's birthday
    const date_now = new Date();
    const mm = date_now.getMonth() + 1;
    const dd = date_now.getDate();
    if ( mm === 9 && dd <= 16) {
        return <Redirect to='/zoeyBirthday' />;
    }

    return (
      <h3>Hello World!</h3>
    );
  }
}

export default Home;
