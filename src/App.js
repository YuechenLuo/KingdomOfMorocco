import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ZoeyBirthday from './Components/Birthday/ZoeyBirthday';
import Home from './Components/Home';
import Signin from './Components/Signin';
import FRM from './Components/FRM';
import NavBar from './Components/NavBar';
import EricHomepage from './Components/Eric/EricHomepage';
import ConsoleHome from './Components/Console/ConsoleHome'

import './css/global.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedin: false,
            APIBaseUrl: 'https://kom-service-beta.herokuapp.com',
            // APIBaseUrl: 'http://localhost:8080',
            hideNavBar: ['/signin', '/ZoeyBirthday', '/console']
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

    componentWillMount() {
        if ( localStorage.getItem('accessToken') ) {
            this.setState({
                signedin: true
            });
        }
    }

    render() {
        const currentPath = window.location.pathname;
        const showNavbar = !this.state.hideNavBar.includes(currentPath);

        return (
            <div>
                { showNavbar && <NavBar
                    signedin={this.state.signedin}
                    signinRedirector={this.signinRedirector}/> }

                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route path='/signin' component={
                            () => <Signin
                                APIBaseUrl={this.state.APIBaseUrl} />
                        }/>
                        <Route path='/zoeyBirthday' component={ZoeyBirthday} />
                        <Route path='/frm' component={FRM} />
                        <Route path='/eric' component={EricHomepage} />
                        <Route path='/console' component={
                            () => <ConsoleHome
                                signedin={this.state.signedin}
                                APIBaseUrl={this.state.APIBaseUrl} />
                        }/>
                    </div>
                </BrowserRouter>
            </div>);
    }
}

export default App;
