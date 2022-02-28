import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
  const logged = useSelector((state) => state.logged.logged);
  return (
    logged && (
    <footer className="green_primary">
      <div className="Layout__container_pages">
        <div className="Footer__container_all">
          <div className="Footer__container">
            <div className="Footer__container_text">
              <Link to="/">Home</Link>
              <Link to="/home/one">Mobiera</Link>
              <Link to="/home/two">Covid-19</Link>
              <Link to="/home/three">open knowledge</Link>
              <Link to="/home/four">Mobiera</Link>
              <Link to="/home/five">Mobiera</Link>
              <Link to="/home/six">Mobiera</Link>
            </div>
          </div>
          <div className="Footer__container">
            <div className="Footer__container_text">
              <Link to="/home">Products</Link>
              <Link to="/about-us/one">Price</Link>
              <Link to="/about-us/two">Count</Link>
              <Link to="/about-us/three">Mobiera</Link>
              <Link to="/about-us/four">Mobiera</Link>
              <Link to="/about-us/five">Ambassadors</Link>
            </div>
          </div>
          <div className="Footer__container">
            <div className="Footer__container_text">
              <Link to="/home">Content</Link>
              <Link to="/content/one">Mobiera</Link>
              <Link to="/content/two">Mobiera</Link>
            </div>
          </div>
          <div className="Footer__container">
            <div className="Footer__container_text">
              <Link to="/">Tools</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
            </div>
          </div>
          <div className="Footer__container">
            <div className="Footer__container_text">
              <Link to="/">Conect</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
              <Link to="/">lorem ipsum</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="dark_gray_secondary">
        <div className="Footer__section_small">
          <a
            rel="noopener noreferrer"
            href="http://www.mobiera.com/"
            target="_blank"
          >
            Privacy statement
          </a>
          &nbsp; | &nbsp;
          <a
            rel="noopener noreferrer"
            href="http://www.mobiera.com/"
            target="_blank"
          >
            Data protection policy
          </a>
          &nbsp; | &nbsp; Copyright 2022&nbsp;-&nbsp;http://www.mobiera.com/
          community&nbsp;-&nbsp; sponsored by&nbsp;http://www.mobiera.com/
        </div>
      </div>
    </footer>
    )
  );
}
export default Footer;
