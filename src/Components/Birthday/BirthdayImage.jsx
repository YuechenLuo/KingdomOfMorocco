import React, { Component } from 'react';
import CrossfadeImage from 'react-crossfade-image';

import zoeyImg0 from '../../Assets/img/zoeyBirthday/Zoey.jpg';
import zoeyImg1 from '../../Assets/img/zoeyBirthday/Zoey1.jpg';
import zoeyImg2 from '../../Assets/img/zoeyBirthday/Zoey2.jpg';
import zoeyImg3 from '../../Assets/img/zoeyBirthday/Zoey3.jpg';
import zoeyImg4 from '../../Assets/img/zoeyBirthday/Zoey4.jpg';
import zoeyImg5 from '../../Assets/img/zoeyBirthday/Zoey5.jpg';
import zoeyImg6 from '../../Assets/img/zoeyBirthday/Zoey6.jpg';
import zoeyImg7 from '../../Assets/img/zoeyBirthday/Zoey7.jpg';
import pythonImg1 from '../../Assets/img/zoeyBirthday/Python1.jpg';

class BirthdayImage extends Component {

    render() {
        const images = [zoeyImg1, zoeyImg2, zoeyImg3, zoeyImg4, zoeyImg5, zoeyImg6,
            zoeyImg7, pythonImg1, zoeyImg0];
        const classNames = ['slide-0 move-left', 'slide-1 scale-down', 'slide-2 move-right',
            'slide-3 move-up', 'slide-4 scale-up', 'slide-5 move-up', 'slide-6 move-left',
            'slide-7 scale-down', 'slide-8'];

      return (
        <div className='norm-body'>
            <div className={classNames[this.props.page]}>
                <CrossfadeImage
                  src={images[this.props.page]}
                  duration={800}
                  timingFunction={"ease-out"}
                />
            </div>
        </div>
      );
    }
}

export default BirthdayImage;