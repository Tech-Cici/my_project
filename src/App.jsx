import "./App.css";
import React from "react";
import TravelPage from "./Travel";
import TravelBookingForm from "./TravelForm";
import RegistrationForm from "./Register";
import AgeVerification from "./auth";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<TravelPage />} />
      <Route path="/book" element={<TravelBookingForm />} />
      <Route path="/auth" element={<AgeVerification />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
