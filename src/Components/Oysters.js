import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Oysters extends Component {

  render() {
    if ( !this.props.signedin ) {
        localStorage.setItem('loginFrom', '/oyster');
        window.location = '/signin';
        return "";
    }
    return <div className="oyster-body">
        <p>hahaha</p>
    </div>;
  }
}

Oysters.propTypes = {
    signedin: PropTypes.bool
}

export default Oysters;
