import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasklist.css';

class TaskList extends Component {

    getTasks() {
        this.props.tasks.map(
            (row, i) => {
                if ( row.group === this.props.activeGroupId ) {
                    return <div className="task-item">row.body</div>
                }
            });
    }

    render() {
        return (
            <div className="task-list">
                { this.getTasks() }
                { this.props.editNewTask &&
                    <div className="task-item">
                        <textarea type="text" cols="5"/>
                    </div>}
            </div>
        );
    }

}

TaskList.propTypes = {
    activeGroupId: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    editNewTask: PropTypes.bool.isRequired
}

export default TaskList;