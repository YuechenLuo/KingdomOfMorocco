import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayWord extends Component {

    render() {
        return (<div className={this.props.isNumber
            ?"display-number":"display-word"}>

            <p className={`${this.props.active
                ?(this.props.placeholder?'':'active')
                :''} ${this.props.color}`}>
                {this.props.value}
            </p>
        </div>);
    }

}

DisplayWord.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    active: PropTypes.bool,
    isNumber: PropTypes.bool,
    placeholder: PropTypes.bool
}

DisplayWord.defaultProps = {
    color: 'lightblue',
    active: true,
    isNumber: false,
    placeholder: false
}

export default DisplayWord;