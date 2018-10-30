import React, { Component } from 'react';
// import Sound from 'react-sound';
import BirthdayImage from './BirthdayImage';
import BirthdayText from './BirthdayText';
// import bgmusic from '../../Assets/img/zoeyBirthday/city_of_star.mp3';

const PAGE_DURATION = 8000;

class NormBirthday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    nextPage() {
        this.setState(prevState => ({
            page: prevState.page + 1
        }));
        console.log('next page!');
        if ( this.state.page === 8 ) {
            clearInterval(this.pager);
        }
    }

    componentDidMount() {
        this.pager = setInterval(() => this.nextPage(), PAGE_DURATION);
    }

    render() {
      return (
            <div>
                {/* <Sound 
                  url={bgmusic}
                  playStatus={Sound.status.PLAYING}
                /> */}
                <BirthdayImage page={this.state.page} />
                <BirthdayText page={this.state.page} />
            </div>
      );
    }
}

export default NormBirthday;
