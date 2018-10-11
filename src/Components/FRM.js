import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class FRM extends Component {

  render() {
  	if ( !this.props.signin ) {
  		return <Redirect to='/signin' />;
  	}
    return (
      <h3>Hello FRM!</h3>
    );
  }
}

export default FRM;
