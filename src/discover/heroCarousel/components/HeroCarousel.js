import React from "react";
import girl from "../img/carousel-1.jpg";
import couples from "../img/carousel-2.jpg";
import yoga from "../img/carousel-3.jpg";
import "../styles/heroCarousel.scss";

const HeroCarousel = () => {
  return (
    <div
      id="heroCarousel"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#heroCarousel"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#heroCarousel" data-slide-to="1"></li>
        <li data-target="#heroCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active" data-interval="5000">
          <img src={girl} className="carousel-img d-block w-100" alt="gril" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        <div className="carousel-item" data-interval="5000">
          <img
            src={couples}
            className="carousel-img d-block w-100"
            alt="couples"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="carousel-item" data-interval="5000">
          <img src={yoga} className="carousel-img d-block w-100" alt="yoga" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#heroCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#heroCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default HeroCarousel;
