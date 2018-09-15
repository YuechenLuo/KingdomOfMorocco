import React, { Component } from 'react';
import CrossfadeImage from 'react-crossfade-image';

class BirthdayText extends Component {

    render() {
      return (
        <div className='text-stage'>
          { this.props.page === 0 && <p className='text0'>Happy Birthday!</p> }
        </div>
      );
    }
}

export default BirthdayText;