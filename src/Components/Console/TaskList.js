import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import './tasklist.css';

class TaskList extends Component {

    render() {
        return (
            <div className="task-list">
                {this.props.tasks.map(
                    (row, i) => {
                        if ( row.group === this.props.activeGroupId ) {
                            return <TaskItem
                                taskId={row._id}
                                key={i}
                                body={row.body}
                                updateTask={this.props.updateTaskHandler}
                                deleteTask={this.props.deleteTaskHandler}/>
                        } else return "";
                    })}
                { this.props.editNewTask &&
                   <TaskItem isNew
                    createTask={this.props.createTaskHandler}/>}
            </div>
        );
    }

}

TaskList.propTypes = {
    activeGroupId: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    editNewTask: PropTypes.bool.isRequired,
    createTaskHandler: PropTypes.func.isRequired,
    updateTaskHandler: PropTypes.func.isRequired,
    deleteTaskHandler: PropTypes.func.isRequired
}

export default TaskList;