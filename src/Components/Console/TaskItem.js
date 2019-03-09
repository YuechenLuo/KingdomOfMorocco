import React, { Component } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../Assets/img/editIcon.png';
import doneIcon from '../../Assets/img/doneIcon.png';

class TaskItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            finishing: false
        };

        this.bindTextArea = this.bindTextArea.bind(this);
        this.bindOpBar = this.bindOpBar.bind(this);
        this.editTaskHandler = this.editTaskHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.taskFinishHandler = this.taskFinishHandler.bind(this);
    }

    editTaskHandler() {
        this.setState({
            editing: true
        });
        this.textarea.focus();
    }

    taskFinishHandler(e) {
        if ( !this.opBar.contains(e.target) ) {
            // Done
            this.setState({
                finishing: true
            });

            setTimeout(() => {
                this.props.deleteTask(this.props.taskId);
                this.setState({
                    finishing: false
                });
            }, 500);
        }
    }

    handleClick(e) {
        if ( !this.textarea.contains(e.target) && this.state.editing) {
            // Focus out
            this.setState({
                editing: false
            });

            if ( this.props.isNew ) {
                this.props.createTask({body:this.textarea.value});
            } else if ( this.textarea.value !== this.props.body ) {
                this.props.updateTask({
                    _id: this.props.taskId,
                    body: this.textarea.value
                });
            }
        }
    }

    bindOpBar(node) {
        this.opBar = node;
    }

    bindTextArea(node) {
        this.textarea = node;
    }

    componentWillMount() {
        this.setState({
            editing: this.props.isNew
        });
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    render() {
        return (
            <div className={`task-item${this.state.editing?' editing':''}`}
                onClick={this.taskFinishHandler}
                key={this.props.body}>
                <div className="done-img placeholder">
                    <img src={doneIcon} alt="doneIcon"/>
                </div>
                <div className={`done-img real${this.state.finishing?' show':''}`}>
                    <img src={doneIcon} alt="doneIcon"/>
                </div>
                <div className="taskitem-op-bar" ref={this.bindOpBar}>
                    { !this.state.editing && <a className="edit-button"
                        onClick={this.editTaskHandler}>
                        <img src={editIcon} alt="editIcon"/>
                    </a>}
                </div>
                <textarea autoFocus
                    ref={this.bindTextArea}
                    cols="5"
                    defaultValue={this.props.body}
                    readOnly={!this.state.editing}/>
            </div>
        );
    }

}

TaskItem.propTypes = {
    isNew: PropTypes.bool,
    taskId: PropTypes.string,
    body: PropTypes.string,
    createTask: PropTypes.func,
    updateTask: PropTypes.func,
    deleteTask: PropTypes.func
}

TaskItem.defaultProps = {
    isNew: false,
    taskId: "",
    body: "",
    createTask: () => {},
    updateTask: () => {},
    deleteTask: () => {}
}

export default TaskItem;