import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

import '../css/bootstrap.min.css';
import '../css/signin.css';

class Signin extends Component {
    
    render() {
        return (
            <form id="Signin" onsubmit={this.props.signinHandler}>
                <FormGroup controlId='email' bsSize='lg'>
                    <FormControl componentClass='input' placeHolder='email'/>
                </FormGroup>
                <FormGroup controlId='password' bsSize='lg'>
                    <FormControl componentClass='input' type='password' placeHolder='password'/>
                </FormGroup>
    
                <Button type='submit' bsStyle='primary'>Signin</Button>
            </form>);
    }
}

export default Signin;