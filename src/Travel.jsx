import React from "react";
import "./TravelPage.css";
import parisImage from "./paris.jpeg";
import baliImage from "./bali.jpeg";
import tokyoImage from "./tokyo.jpeg";
import honeyMoonImage from "./honeymoon.jpeg";
import familyImage from "./family.jpeg";
import TravelBookingForm from "./TravelForm";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

function TravelPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  return (
    <div className="travel-page">
      {user ? (
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : null}
      <header className="header">
        <h1 className="title">Adventure Awaits</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a to="/destinations">Destinations</a>
            </li>
            <li className="nav-item">
              <a to="/packages">Packages</a>
            </li>
            <li className="nav-item">
              <a to="/about">About</a>
            </li>
            <li className="nav-item">
              <a to="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h2 className="hero-title">Explore the World</h2>
          <p className="hero-description">
            From the bustling cities to the serene beaches, we have the perfect
            destination for your next adventure.
          </p>
          <a className="hero-button" onClick={() => navigate("/register")}>
            Book Now
          </a>
        </section>

        <section className="destinations">
          <h2 className="section-title">Popular Destinations</h2>
          <ul className="destination-list">
            <li className="destination-item">
              <img src={parisImage} alt="Paris" className="destination-image" />
              <h3 className="destination-title">Paris</h3>
              <p className="destination-description">The City of Lights</p>
            </li>
            <li className="destination-item">
              <img src={baliImage} alt="Bali" className="destination-image" />
              <h3 className="destination-title">Bali</h3>
              <p className="destination-description">The Island of the Gods</p>
            </li>
            <li className="destination-item">
              <img src={tokyoImage} alt="Tokyo" className="destination-image" />
              <h3 className="destination-title">Tokyo</h3>
              <p className="destination-description">The Neon Metropolis</p>
            </li>
          </ul>
        </section>

        <section className="packages">
          <h2 className="section-title">Featured Packages</h2>
          <div className="package-item">
            <img
              src={honeyMoonImage}
              alt="Honeymoon Package"
              className="package-image"
            />
            <h3 className="package-title">Romantic Getaway</h3>
            <p className="package-description">
              Escape to a private island for a dreamy honeymoon.
            </p>
            <button className="package-button">Learn More</button>
          </div>
          <div className="package-item">
            <img
              src={familyImage}
              alt="Family Package"
              className="package-image"
            />
            <h3 className="package-title">Family Adventure</h3>
            <p className="package-description">
              Explore the wonders of nature with your loved ones.
            </p>
            <button className="package-button">Learn More</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="copyright">
          &copy; 2024 Adventure Awaits. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default TravelPage;
