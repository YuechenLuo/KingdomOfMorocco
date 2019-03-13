import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HJ from '../Assets/img/hj.png';
import '../css/oyster.css';

class Oysters extends Component {

  render() {
    if ( !this.props.signedin ) {
        localStorage.setItem('loginFrom', '/oyster');
        window.location = '/signin';
        return "";
    }
    return <div className="oyster-body">
        <img src={HJ} alt="lalala"/>
        <div className="content">
            <p>听说。。有些人想吃生蚝？？</p>
            <a>点我点我</a>
            <p>5个优惠码</p>
            <p className="promo-code">
                1234512345123451234512345<br/>
                12345<br/>
                12345<br/>
            </p>
            <p>可以带林那啥一起吃</p>
        </div>
    </div>;
  }
}

Oysters.propTypes = {
    signedin: PropTypes.bool
}

export default Oysters;
