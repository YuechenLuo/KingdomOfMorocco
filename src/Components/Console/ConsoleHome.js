import React, { Component } from 'react';
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
            editNewTask: false,
            activeGroupId: '',
            renameGroupId: '',
            renameGroupName: ''
        };

        this.keepAliveRequest = this.keepAliveRequest.bind(this);
        this.retrieveTaskInfo = this.retrieveTaskInfo.bind(this);
        this.createTaskGroup = this.createTaskGroup.bind(this);
        this.updateTaskGroup = this.updateTaskGroup.bind(this);
        this.deleteTaskGroup = this.deleteTaskGroup.bind(this);
        this.renameGroupHandler = this.renameGroupHandler.bind(this);
        this.clearPopups = this.clearPopups.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
        this.newGroupHandler = this.newGroupHandler.bind(this);
        this.newTaskHandler = this.newTaskHandler.bind(this);
        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    /**
     * API Calls
     */
    keepAliveRequest() {
        const keepServerAliveUrl = this.props.APIBaseUrl;
        const keepWebAliveUrl = '/eric';

        axios({
            method: "GET",
            url: keepServerAliveUrl
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });

        axios({
            method: "GET",
            url: keepWebAliveUrl
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
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
            let group_id = '';
            if ( res.data.taskGroups.find((element) => {
                return element._id === this.state.activeGroupId;
            }) ) {
                group_id = this.state.activeGroupId;
            } else if ( res.data.taskGroups.length ) {
                group_id = res.data.taskGroups[0]._id;
            }

            this.setState({
                taskGroupData: res.data.taskGroups,
                activeGroupId: group_id,
                taskData: res.data.tasks,
                editNewTask: false
            });
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            }
        });
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
                "group_name": groupName
            })
        }).then((res) => {
            this.clearPopups();
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            }

        });
    }

    deleteTaskGroup(group_id) {
        const deleteGroupUrl = `${this.props.APIBaseUrl}/task/group/${group_id}`;

        axios({
            method: "DELETE",
            url: deleteGroupUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            console.log('deleted');
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            } else {
                console.log(err.response);
            }

        });
    }

    updateTaskGroup(inputs) {
        const groupName = inputs[0];
        const updateGroupUrl = `${this.props.APIBaseUrl}/task/updateGroup`;

        axios({
            method: "POST",
            url: updateGroupUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                _id: this.state.renameGroupId,
                "group_name": groupName
            })
        }).then((res) => {
            this.clearPopups();
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            }

        });
    }

    createTask(body) {
        body.group = this.state.activeGroupId;
        const createTaskUrl = `${this.props.APIBaseUrl}/task/createTask`;

        axios({
            method: "PUT",
            url: createTaskUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify(body)
        }).then((res) => {
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            }

        });
    }

    updateTask(body) {
        const updateTaskUrl = `${this.props.APIBaseUrl}/task/updateTask`;
        console.log(body);
        axios({
            method: "POST",
            url: updateTaskUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify(body)
        }).then((res) => {
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            }

        });
    }

    deleteTask(task_id) {
        const deleteTaskUrl = `${this.props.APIBaseUrl}/task/${task_id}`;

        axios({
            method: "DELETE",
            url: deleteTaskUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            console.log('deleted');
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            const status = err.response.status;
            if ( status === 403 || status === 401) {
                localStorage.setItem('loginFrom', '/console');
                window.location = '/signin';
            } else {
                console.log(err.response);
            }

        });
    }


    /**
     *
     */

    clearPopups() {
        this.setState({
            showCreateGroupPopup: false,
            showRenameGroupPopup: false
        });
    }

    // Group Handlers

    newGroupHandler() {
        this.setState({
            showCreateGroupPopup: true
        });
    }

    renameGroupHandler(group_id, group_name) {
        this.setState({
            showRenameGroupPopup: true,
            renameGroupId: group_id,
            renameGroupName: group_name
        });
    }

    selectGroup(group_id) {
        this.setState({
            activeGroupId: group_id
        });
    }

    // Task handlers

    newTaskHandler() {
        this.setState({
            editNewTask: true
        });
    }

    componentWillMount() {
        this.retrieveTaskInfo();
    }

    componentDidMount() {
        this.keepAliveInterval = setInterval(
            () => {
                this.keepAliveRequest();
            }, 1200000);
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
                        label: 'Group Name',
                        defaultValue: this.state.renameGroupName
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
                    activeGroupId={this.state.activeGroupId}
                    selectGroup={this.selectGroup}/>
                <div className="task-list-container">
                    <div className="task-op-bar">
                        <button onClick={this.newTaskHandler}>New Task</button>
                        <button>Clear Tasks</button>
                    </div>
                    <TaskList
                        activeGroupId={this.state.activeGroupId}
                        tasks={this.state.taskData}
                        editNewTask={this.state.editNewTask}
                        createTaskHandler={this.createTask}
                        updateTaskHandler={this.updateTask}
                        deleteTaskHandler={this.deleteTask}/>
                </div>
            </div>
        );
    }

}

ConsoleHome.propTypes = {
    APIBaseUrl: PropTypes.string.isRequired
}

export default ConsoleHome;