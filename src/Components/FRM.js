import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FRM extends Component {

  render() {
    if ( !this.props.signin ) {
        this.props.signinPageRedirector();
        return "";
    }
    return (
      <h3>Hello FRM!</h3>
    );
  }
}

FRM.propTypes = {
    signedin: PropTypes.bool,
    signinRedirector: PropTypes.func
}
FRM.defaultProps = {
    signedin: false,
    signinRedirector: () => {}
}


export default FRM;
