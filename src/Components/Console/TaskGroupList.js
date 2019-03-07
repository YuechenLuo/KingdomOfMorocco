import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskGroupItem from './TaskGroupItem';

class TaskGroupList extends Component {

    selectGroupHandler(e) {
        console.log(e.target);
    }

    getTaskGroupList() {
        return this.props.groups.map(
            (row, i) => <TaskGroupItem
                            groupName={row.group_name}
                            group_id={row._id}
                            active={i === this.props.activeItem}
                            key={i}
                            deleteGroupHandler={this.props.deleteGroupHandler}
                            updateGroupHandler={this.props.updateGroupHandler}
                            onClick={()=>{console.log(1)}}/>);
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
    activeItem: PropTypes.number,
    deleteGroupHandler: PropTypes.func.isRequired,
    updateGroupHandler: PropTypes.func.isRequired,
    selectGroup: PropTypes.func.isRequired
}

TaskGroupList.defaultProps = {
    activeItem: 0
}

export default TaskGroupList;