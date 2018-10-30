import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import '../css/bootstrap.min.css';
import '../css/signin.css';

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword:''
        }

        this.signinHandler = this.signinHandler.bind(this);
        this.updateSigninEmail = this.updateSigninEmail.bind(this);
        this.updateSigninPassword = this.updateSigninPassword.bind(this);
    }
    
    // For signin
    signinHandler(e) {
        e.preventDefault();
        const signinUrl = `${this.props.APIBaseUrl}/user/login`;

        axios({
            method: "POST",
            url: signinUrl,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "email": this.state.signinEmail,
                "password": this.state.signinPassword
            })
        })
        .then((res) => {
            // send back login result here
            console.log(res);
            this.props.userInfoUpdater(res);
        }, (err) => {
            console.log(err.response);
        });
    }

    updateSigninEmail(e) {
        this.setState({
            signinEmail: e.target.value
        });
    }

    updateSigninPassword(e) {
        this.setState({
            signinPassword: e.target.value
        });
    }

    render() {
        return (
            <form id="Signin" onSubmit={this.signinHandler}>
                <FormGroup controlId='email' bsSize='lg'>
                    <FormControl
                        componentClass='input'
                        placeholder='email'
                        onChange={this.updateSigninEmail}/>
                </FormGroup>
                <FormGroup controlId='password' bsSize='lg'>
                    <FormControl
                        componentClass='input'
                        type='password'
                        placeholder='password'
                        onChange={this.updateSigninPassword}/>
                </FormGroup>
    
                <Button type='submit' bsStyle='primary'>Signin</Button>
            </form>);
    }
}

Signin.propTypes = {
    fromUrl: PropTypes.string,
    APIBaseUrl: PropTypes.string.isRequired,
    userInfoUpdater: PropTypes.func
}
Signin.defaultProps = {
    fromUrl: '/',
    userInfoUpdater: () => {}
}

export default Signin;