import React, { Component } from 'react';
import DisplayWord from './DisplayWord';
import PropTypes from 'prop-types';

class ClockPanel extends Component {

    render() {
        const day = this.props.datetime.getDay();
        const dd = this.props.datetime.getDate();
        const mm = this.props.datetime.getMonth()+1 ;
        const yyyy = this.props.datetime.getFullYear();
        const h24 = this.props.datetime.getHours();
        const h = h24 > 12 ? h24-12 : h24;
        const am = h24 < 12;
        const m = this.props.datetime.getMinutes();
        const s = this.props.datetime.getSeconds();

        return (<div className="digital-clock">
            <div className="days">
                <DisplayWord value="Sunday" active={day===0} />
                <DisplayWord value="Monday" active={day===1} />
                <DisplayWord value="Tuesday" active={day===2} />
                <DisplayWord value="Wednesday" active={day===3} />
                <DisplayWord value="Thursday" active={day===4} />
                <DisplayWord value="Friday" active={day===5} />
                <DisplayWord value="Saturday" active={day===6} />
            </div>
            <div className="datetime">
                <div className="date-display digital-numbers">
                    <DisplayWord value={`${mm<10?('0'+mm):mm} / ${dd<10?('0'+dd):dd} / ${yyyy}`} isNumber/>
                    <DisplayWord value={`88 X 88 X 8888`} isNumber placeholder/>
                </div>
                <div className="time-display">
                    <div className="hh-mm digital-numbers">
                        <DisplayWord value={`${(h)<10?('0'+h):h}:${m<10?('0'+m):m}`} isNumber/>
                        <DisplayWord value={"88:88"} isNumber placeholder/>
                    </div>
                    <div className="ss digital-numbers">
                        <DisplayWord value={`:${s<10?('0'+s):s}`} isNumber/>
                        <DisplayWord value={" :88"} isNumber placeholder/>
                    </div>
                    <div className="am-pm">
                        <DisplayWord value={`${am?'AM':'PM'}`} isNumber/>
                    </div>
                </div>
            </div>
        </div>);
    }

}

ClockPanel.propTypes = {
    datetime: PropTypes.instanceOf(Date).isRequired
}

export default ClockPanel;