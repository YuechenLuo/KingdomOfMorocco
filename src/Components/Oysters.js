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
        <p>听说。。有些人想吃生蚝？？</p>
        <a>点我点我</a>
        <p>5个优惠码</p>

        <p>可以带林那啥一起吃</p>
    </div>;
  }
}

Oysters.propTypes = {
    signedin: PropTypes.bool
}

export default Oysters;
