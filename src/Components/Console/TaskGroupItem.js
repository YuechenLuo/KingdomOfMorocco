import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskGroupItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.select = this.select.bind(this);
        this.rename = this.rename.bind(this);
        this.delete = this.delete.bind(this);
        this.bindEditLink = this.bindEditLink.bind(this);
        this.bindEditMenu = this.bindEditMenu.bind(this);
    }

    showMenu() {
        if ( !this.state.showMenu ) {
            this.setState({
                showMenu: true
            });
        }
    }

    hideMenu() {
        if ( this.state.showMenu ) {
            this.setState({
                showMenu: false
            });
        }
    }

    handleClick(e) {
        if (this.editLink.contains(e.target)) {
            this.showMenu();
        } else if (!this.editLink.contains(e.target)
            && !this.editMenu.contains(e.target)
            && this.state.showMenu ) {
            this.hideMenu();
        }
    }

    bindEditLink(node) {
        this.editLink = node;
    }

    bindEditMenu(node) {
        this.editMenu = node;
    }

    select() {
        this.props.selectGroupHandler(this.props.group_id);
    }

    rename() {
        this.props.updateGroupHandler(this.props.group_id);
        this.hideMenu();
    }

    delete() {
        this.props.deleteGroupHandler(this.props.group_id);
        this.hideMenu();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    render() {
        return (
            <div className={`task-group ${this.props.active?'active':''} task-group-item`}
                onClick={this.select}>
                <p className="group-name">{this.props.groupName}</p>
                <div className="edit-menu">
                    <a className="edit-link" ref={this.bindEditLink}>…</a>
                    <ul className={`edit-submenu ${this.state.showMenu?'active':''}`}
                        ref={this.bindEditMenu}>
                        <li className="menu-item" onClick={this.rename}>Rename</li>
                        <li className="menu-item" onClick={this.delete}>Delete</li>
                    </ul>
                </div>
            </div>
        );
    }

}

TaskGroupItem.propTypes = {
    groupName: PropTypes.string.isRequired,
    group_id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    showMenu: PropTypes.bool,
    deleteGroupHandler: PropTypes.func.isRequired,
    updateGroupHandler: PropTypes.func.isRequired,
    selectGroupHandler: PropTypes.func.isRequired
}

TaskGroupItem.defaultProps = {
    active: false,
    showMenu: false
}

export default TaskGroupItem;