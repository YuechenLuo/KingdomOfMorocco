import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import siteLogo from '../Assets/img/SmileLogo.png';

class NavBar extends Component {

    getUserInfo() {
        return (
            <div className='userInfo'>
                I'm Peter
            </div>
        );
    }

    getLoginButton() {
        return (
            <Button className='float-right btn-info' onClick={this.props.signinPageRedirector}>Sign in</Button>
        );
    }

    render() {
        return (
            <div className='navbar'>
                <div className='nav-container'>
                    <div className='site-logo'>
                        <img src={siteLogo} alt='SiteLogo'/>
                        <p>Kingdom of Morocco</p>
                    </div>
                    { this.props.signedin ? this.getUserInfo() : this.getLoginButton()}
                </div>
            </div>
        );
    }

}

NavBar.propTypes = {
    signedin: PropTypes.bool,
    signinPageRedirector: PropTypes.func
}

NavBar.defaultProps = {
    signedin: false,
    signinPageRedirector: () => {}
}

export default NavBar;