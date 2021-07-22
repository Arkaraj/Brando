import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import pic1 from '../Images/image1.jpg'
import pic2 from '../Images/image2.png'
import pic3 from '../Images/image3.jpg'
import pic4 from '../Images/image4.png'
import pic5 from '../Images/image5.png'
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
            <SplideSlide>
                <img src={pic3} alt="Avengers" />
            </SplideSlide>
            <SplideSlide>
                <img src={pic4} alt="Avengers" />
            </SplideSlide>
            <SplideSlide>
                <img src={pic5} alt="Avengers" />
            </SplideSlide>
        </Splide>


        /*<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={pic1} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Slider One Item</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt
                excepturi quas vero.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={pic2} alt="Second slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Slider One Item</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt
                excepturi quas vero.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={pic3} alt="Third slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Slider One Item</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt
                excepturi quas vero.</p>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>*/
    )
}
