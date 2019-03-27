import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/oyster.css';

class Dozo extends Component {

  render() {
    if ( !this.props.signedin ) {
        localStorage.setItem('loginFrom', '/oyster');
        window.location = '/signin';
        return "";
    }
    return <div className="oyster-body">
            <p></p>
            <a href="https://www.meituan.com/meishi/d47291534.html">点我点我</a><br/>
            <a href="http://www.meituan.com/meishi/118031866/">这家店😬</a>
            <p>5个优惠码, 两人份😝</p>
            <p className="promo-code">
                086886634492 未消费<br/>
                199033734964 未消费<br/>
                123622034948 未消费<br/>
                273553334330 未消费<br/>
                075256634192 未消费<br/>
            </p>
            <p>可以带林那啥一起吃😬</p>
    </div>;
  }
}

Dozo.propTypes = {
    signedin: PropTypes.bool
}

export default Dozo;
