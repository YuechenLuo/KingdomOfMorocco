import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskGroupItem extends Component {

    render() {
        return (
            <div className={`task-group ${this.props.active?'active':''}`}>
                <p>{this.props.groupName}</p>
            </div>
        );
    }

}

TaskGroupItem.propTypes = {
    groupName: PropTypes.string.isRequired,
    active: PropTypes.bool
}

TaskGroupItem.defaultProps = {
    active: false
}

export default TaskGroupItem;