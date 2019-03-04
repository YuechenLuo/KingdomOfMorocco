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
                <div class='op-bar'>
                    <label>Task Groups</label>
                    <a className="text-link" nclick={()=>{console.log("new")}}>New</a>
                </div>
                {this.getTaskGroupList()}
            </div>
        );
    }

}

TaskGroupList.propTypes = {
    groups: PropTypes.array.isRequired,
    activeItem: PropTypes.number,
    newGroupHandler: PropTypes.func.isRequired
}

TaskGroupList.defaultProps = {
    activeItem: 0
}

export default TaskGroupList;