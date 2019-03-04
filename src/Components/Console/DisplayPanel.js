import React, { Component } from 'react';
import ClockPanel from './DisplayComponents/ClockPanel';

class DisplayPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datetime: new Date()
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState({ datetime: new Date() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (<div className="display-panel">
            <ClockPanel datetime={this.state.datetime}/>
        </div>);
    }

}

export default DisplayPanel;