import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TaskList from './TaskList';
import TaskGroupList from './TaskGroupList';
import DisplayPanel from './DisplayPanel';
import PopupInput from '../PopupInput'
import PropTypes from 'prop-types';

import './console.css';
import './tasklist.css';

class ConsoleHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskGroupData: [],
            taskData: [],
            showCreateGroupPopup: false,
            showRenameGroupPopup: false,
            activeGroup: 0
        };

        this.retrieveTaskInfo = this.retrieveTaskInfo.bind(this);
        this.createTaskGroup = this.createTaskGroup.bind(this);
        this.updateTaskGroup = this.updateTaskGroup.bind(this);
        this.deleteTaskGroup = this.deleteTaskGroup.bind(this);
        this.renameGroupHandler = this.renameGroupHandler.bind(this);
        this.clearPopups = this.clearPopups.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
        this.newGroupHandler = this.newGroupHandler.bind(this);
    }

    createTaskGroup(inputs) {
        const groupName = inputs[0];
        const createGroupUrl = `${this.props.APIBaseUrl}/task/createGroup`;

        axios({
            method: "PUT",
            url: createGroupUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "group_name": groupName,
            })
        }).then((res) => {
            this.clearPopups();
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                window.location = '/signin';
            }

        });
    }

    deleteTaskGroup(group_id) {
        console.log(group_id);
        const deleteGroupUrl = `${this.props.APIBaseUrl}/task/group/${group_id}`;

        axios({
            method: "DELETE",
            url: deleteGroupUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                window.location = '/signin';
            } else {
                console.log(err.response);
            }

        });
    }

    updateTaskGroup(body) {
        console.log(body);
    }

    clearPopups() {
        this.setState({
            showCreateGroupPopup: false,
            showRenameGroupPopup: false
        });
    }

    newGroupHandler() {
        this.setState({
            showCreateGroupPopup: true
        });
    }

    renameGroupHandler(group_id) {
        console.log(group_id);
        this.setState({
            showRenameGroupPopup: true,
            rename_group_id: group_id
        });
    }

    selectGroup(i) {
        this.setState({
            activeGroup: i
        });
    }

    retrieveTaskInfo() {
        const getTaskUrl = `${this.props.APIBaseUrl}/task/getTasks`;

        axios({
            method: "GET",
            url: getTaskUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            console.log(res.data);
            this.setState({
                taskGroupData: res.data.taskGroups,
                taskData: res.data.tasks
            });
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                window.location = '/signin';
            }
        });
    }

    componentWillMount() {
        this.retrieveTaskInfo();
    }

    render() {
        
        return (
            <div className="console-container">

                { this.state.showCreateGroupPopup && <PopupInput
                    title="Create Task Group"
                    fields={[{
                        key: 0,
                        label: 'Group Name'
                    }]}
                    okHandler={this.createTaskGroup}
                    cancelHandler={this.clearPopups}/>}
                { this.state.showRenameGroupPopup && <PopupInput
                    title="Rename Task Group"
                    fields={[{
                        key: 0,
                        label: 'Group Name'
                    }]}
                    okHandler={this.updateTaskGroup}
                    cancelHandler={this.clearPopups}/>}
                <DisplayPanel/>
                <div className='op-bar'>
                    <label>Task Groups</label>
                    <a className="text-link" onClick={this.newGroupHandler}>New</a>
                </div>
                <TaskGroupList
                    groups={this.state.taskGroupData}
                    updateGroupHandler={this.renameGroupHandler}
                    deleteGroupHandler={this.deleteTaskGroup}
                    activeItem={this.state.activeGroup}
                    selectGroup={this.selectGroup}/>
                <div className="task-list-container">
                    <TaskList/>
                </div>
            </div>
        );
    }

}

ConsoleHome.propTypes = {
    APIBaseUrl: PropTypes.string.isRequired
}

export default ConsoleHome;