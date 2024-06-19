import React, { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

function TravelBookingForm() {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numTravelers, setNumTravelers] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user.age < 18) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const booking = {
      destination,
      departureDate,
      returnDate,
      numTravelers,
    };

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log("Booking successful:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="travel-booking-form">
      <h2 className="form-title">Book Your Trip</h2>
      <div className="form-group">
        <label htmlFor="destination" className="form-label">
          Destination:
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="departureDate" className="form-label">
          Departure Date:
        </label>
        <input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="returnDate" className="form-label">
          Return Date:
        </label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="numTravelers" className="form-label">
          You age:
        </label>
        <input
          type="number"
          id="numTravelers"
          value={numTravelers}
          onChange={(e) => setNumTravelers(e.target.value)}
          min="1"
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button" onClick={handleSubmit}>
        Book Now
      </button>
      
    </form>
  );
}

export default TravelBookingForm;
