import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ZoeyBirthday from './Components/Birthday/ZoeyBirthday';
import Home from './Components/Home';
import Signin from './Components/Signin';
import FRM from './Components/FRM';
import NavBar from './Components/NavBar';

import './css/global.css';
import './css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedin: false,
            showSigninPage: false,
            // APIBaseUrl: 'https://kom-service-beta.herokuapp.com',
            APIBaseUrl: 'http://localhost:8080',
            userInfo: {}
        };

        this.userInfoUpdater = this.userInfoUpdater.bind(this);
        this.signinRedirector = this.signinRedirector.bind(this);

    }

    userInfoUpdater(info) {
        this.setState({
            userInfo: info,
            showSigninPage: false,
            signedin: true
        });
    }

    signinRedirector(show) {
        this.setState({
            showSigninPage: true
        });
    }

    render() {
        if ( this.state.showSigninPage ) {
            return <Signin
                    userInfoUpdater={this.userInfoUpdater}
                    fromUrl={currentPath}
                    APIBaseUrl={this.state.APIBaseUrl}/>;
        }
        const currentPath = window.location.pathname;
        const showNavbar = ('/zoeyBirthday' !== currentPath);

        return (
            <div>
                { showNavbar && <NavBar
                    signedin={this.state.signedin}
                    signinPageRedirector={this.signinRedirector}/> }

                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route path='/zoeyBirthday' component={ZoeyBirthday} />
                        <Route path='/frm' component={FRM} />
                    </div>
                </BrowserRouter>
            </div>);
    }
}

export default App;
