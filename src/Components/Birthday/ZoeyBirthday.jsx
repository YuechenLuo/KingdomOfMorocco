import React, { Component } from 'react';
import BaldBirthday from './BaldBirthday';
import NormBirthday from './NormBirthday';
import '../../css/zoeyBirthday.css';
import '../../css/global.css';

class ZoeyBirthday extends Component {

  constructor(props) {
    super(props);
    this.state = {
      baldMode: true
    };

    this.getBaldSwitchBar = this.getBaldSwitchBar.bind(this);
    this.switchToBald = this.switchToBald.bind(this);
    this.switchToNormal = this.switchToNormal.bind(this);

  }

  getBaldSwitchBar() {
    return (
      <div className='bald-switch-bar'>
        <div className='bald-switch'>
          {this.state.baldMode ? <span>太秃了？</span> : <span>不够秃？</span> }
          {this.state.baldMode
            ? <a href='#norm' onClick={this.switchToNormal}>试试正常版</a>
            : <a href='#bald' onClick={this.switchToBald}>试试秃版</a> }
        </div>
      </div>
    );
  }

  switchToBald() {
    this.setState({
      baldMode: true
    });
  }

  switchToNormal() {
    this.setState({
      baldMode: false
    });
  }

  render() {
    return (
      <div>
        { this.getBaldSwitchBar() }
        {this.state.baldMode ? <BaldBirthday /> : <NormBirthday />}
      </div>
    );
  }

}

export default ZoeyBirthday;
