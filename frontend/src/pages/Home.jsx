import React from 'react'
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import carousel_img1 from '../assets/carousel/carousel_img1.png';
import carousel_img2 from '../assets/carousel/carousel_img2.png';
import carousel_img3 from '../assets/carousel/carousel_img3.png';
export default function Home() {
  return (
    <div className='home-container'>
      <Navbar />
      <div className='container home-content'>
        <div className='carousel'>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carousel_img1} className="d-block carousel-img" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={carousel_img2} className="d-block  carousel-img" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={carousel_img3} className="d-block carousel-img" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
