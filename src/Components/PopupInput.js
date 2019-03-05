import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopupInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputTexts: []
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(value, key) {
        let it = this.state.inputTexts;
        if ( key in it ) {
            it[key] = value;
        } else {
            it.push({key:value});
        }
        this.setState({
            inputTexts: it
        });
    }

    render() {
        return (
            <div className="popup-input">
                <h3>{this.props.title}</h3>
                {this.props.fields.map(
                    (row, i) => <div className="input-group" key={row.key}>
                        <label>{row.label+":"}</label>
                        <input 
                            type={row.type?row.type:'text'}
                            onChange={(e)=>{
                                this.onInputChange(e.target.value, row.key)
                            }}/>
                    </div>
                )}
                <div className="button-group">
                    <button className="ok-button" onClick={() => {
                            this.props.okHandler(this.state.inputTexts)
                        }}>OK</button>
                    <button onClick={this.props.cancelHandler}>Cancel</button>
                </div>
            </div>
        );
    }

}

PopupInput.propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    okHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired
}

export default PopupInput;