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

    createTaskGroup(groupName) {
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
        console.log(111);
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
                signedin: this.props.signedin,
                taskGroupData: res.data.taskGroups,
                taskData: res.data.tasks
            });
        }, (err) => {
            // TODO: Error handling
            console.log(err);
        });
    }


    componentDidMount() {
        if (this.props.signedin) {
            const data = this.retrieveTaskInfo();
            this.setState({
                signedin: this.props.signedin
            });
        }
    }

    render() {
        if ( !this.props.signedin ) {
            localStorage.setItem('loginFrom', window.location.pathname);
            return <Redirect to='/signin'/>
        }
        return (
            <div className="console-container">
                { this.state.showCreateGroupPopup && <PopupInput
                    title="Create Task Group"
                    fields={[{
                        label: 'Group Name'
                    }]}
                    inputHandler={this.createTaskGroup}
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
    APIBaseUrl: PropTypes.string.isRequired,
    signedin: PropTypes.bool
}

export default ConsoleHome;