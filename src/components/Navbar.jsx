import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom">
      <div className="container py-2">
        <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <span className="brand-mark">CC</span>
          <span>College <span className="brand-purple">Connect</span></span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/events">Explore Events</NavLink>
            <NavLink className="nav-link" to="/clubs">Clubs</NavLink>
            <NavLink className="nav-link" to="/my-events">My Events</NavLink>
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            <NavLink className="btn btn-purple ms-lg-2" to="/events">Find an event <span aria-hidden="true">→</span></NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}