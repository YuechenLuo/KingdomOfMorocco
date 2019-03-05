import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskGroupItem from './TaskGroupItem';

class TaskGroupList extends Component {

    getTaskGroupList() {
        return this.props.groups.map(
            (row, i) => <TaskGroupItem
                            value={row.group_name}
                            active={i === this.props.activeItem}/>);
    }

    render() {
        return (
            <div className="task-group-container">
                {this.getTaskGroupList()}
            </div>
        );
    }

}

TaskGroupList.propTypes = {
    groups: PropTypes.array.isRequired,
    activeItem: PropTypes.number
}

TaskGroupList.defaultProps = {
    activeItem: 0
}

export default TaskGroupList;