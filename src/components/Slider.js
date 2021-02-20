import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import pic1 from '../Images/image1.jpg'
import pic2 from '../Images/image2.jpg'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// or
// import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
// or
// import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const secondaryOptions = {
    type: 'loop',
    rewind: true,
    width: '100%',
    gap: '0',
    speed: 1000,
    pagination: true,
    heightRatio: 0.5,
    cover: true,
    focus: 'center',
    isNavigation: true,
    updateOnMove: true,
    autoplay: true,
    interval: 7000,
    easing: 'ease'
};


export default function Slider() {
    return (
        <Splide options={secondaryOptions}>
            <SplideSlide style={{ border: "none" }}>
                <img src={pic1} alt="GOT" />
            </SplideSlide>
            <SplideSlide>
                <img src={pic2} alt="Avengers" />
            </SplideSlide>
        </Splide>
    )
}
