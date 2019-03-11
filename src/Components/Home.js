import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/home.css';

class Home extends Component {

  render() {
    window.location = '/console';
    return "";
    // redirect to happy birthday page if today is zoey's birthday
    // const date_now = new Date();
    // const mm = date_now.getMonth() + 1;
    // const dd = date_now.getDate();
    // if ( mm === 9 && dd === 16) {
    //     return <Redirect to='/zoeyBirthday' />;
    // }

    // return (
    //   <div className='header'>
    //     <div className='home-container'></div>
    //   </div>
    // );
  }
}

export default Home;
