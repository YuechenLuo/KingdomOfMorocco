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
            <p>找到工作请你们吃饭😝</p>
            <a href="https://www.meituan.com/meishi/d44423680.html">优惠券信息</a><br/>
            <a href="http://www.meituan.com/meishi/70863/">家门口环亚广场这家店</a>
            <p>4个优惠码, 带公公舅舅一起吃</p>
            <p className="promo-code">  
              美团券密码：101381180203 未消费
              美团券密码：019049180749 未消费
              美团券密码：124595480659 未消费
              美团券密码：098701880335 未消费
            </p>
    </div>;
  }
}

Dozo.propTypes = {
    signedin: PropTypes.bool
}

export default Dozo;
