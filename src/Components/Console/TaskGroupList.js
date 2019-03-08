import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskGroupItem from './TaskGroupItem';

class TaskGroupList extends Component {

    selectGroupHandler(e) {
        console.log(e.target);
    }

    clickGroup(e) {
        console.log(e.target);
    }

    getTaskGroupList() {
        return this.props.groups.map(
            (row, i) => <TaskGroupItem
                            groupName={row.group_name}
                            group_id={row._id}
                            active={row._id === this.props.activeGroupId}
                            key={i}
                            deleteGroupHandler={this.props.deleteGroupHandler}
                            updateGroupHandler={this.props.updateGroupHandler}
                            selectGroupHandler={this.props.selectGroup}/>);
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
    activeGroupId: PropTypes.string,
    deleteGroupHandler: PropTypes.func.isRequired,
    updateGroupHandler: PropTypes.func.isRequired,
    selectGroup: PropTypes.func.isRequired
}

TaskGroupList.defaultProps = {
    activeGroupId: ''
}

export default TaskGroupList;