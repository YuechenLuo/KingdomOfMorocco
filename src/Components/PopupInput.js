import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopupInput extends Component {


    render() {
        return (
            <div className="popup-input">
                <h3>{this.props.title}</h3>
                {this.props.fields.map(
                    (row, i) => <div className="input-group">
                        <label>{row.label+":"}</label>
                        <input type={row.type?row.type:'text'}/>
                    </div>
                )}
                <div className="button-group">
                    <button className="ok-button">OK</button>
                    <button onClick={this.props.cancelHandler}>Cancel</button>
                </div>
            </div>
        );
    }

}

PopupInput.propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    inputHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired
}

export default PopupInput;