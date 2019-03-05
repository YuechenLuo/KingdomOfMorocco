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
            showCreateGroupPopup: false
        };

        this.retrieveTaskInfo = this.retrieveTaskInfo.bind(this);
        this.createTaskGroup = this.createTaskGroup.bind(this);
        this.clearPopups = this.clearPopups.bind(this);
        this.newGroupHandler = this.newGroupHandler.bind(this);
    }

    createTaskGroup(inputs) {
        const groupName = inputs[0];
        const getTaskUrl = `${this.props.APIBaseUrl}/task/createGroup`;

        axios({
            method: "PUT",
            url: getTaskUrl,
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "group_name": groupName,
            })
        }).then((res) => {
            this.retrieveTaskInfo();
        }, (err) => {
            // TODO: Error handling
            console.log(err);
        });
    }

    clearPopups() {
        this.setState({
            showCreateGroupPopup: false
        });
    }

    newGroupHandler() {
        this.setState({
            showCreateGroupPopup: true
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
                <DisplayPanel/>
                <div className='op-bar'>
                    <label>Task Groups</label>
                    <a className="text-link" onClick={this.newGroupHandler}>New</a>
                </div>
                <TaskGroupList
                    groups={this.state.taskGroupData}/>
                <TaskList/>
            </div>
        );
    }

}

ConsoleHome.propTypes = {
    APIBaseUrl: PropTypes.string.isRequired
}

export default ConsoleHome;