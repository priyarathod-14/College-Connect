import React from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import MyEvents from "./pages/MyEvents";
import Clubs from "./pages/Clubs";
import Dashboard from "./pages/Dashboard";
import { useData } from "./context/DataContext";

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    const pageName = location.pathname === "/" ? "Home" : location.pathname.split("/")[1];
    document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | College Connect`;
    sessionStorage.setItem("cc_last_visited_page", location.pathname);
  }, [location]);
  return null;
}

function ApiNotice() {
  const { apiWarning } = useData();
  return apiWarning ? <div className="container pt-3"><div className="alert alert-warning small mb-0">{apiWarning}</div></div> : null;
}

export default function App() {
  return (
    <>
      <PageTracker />
      <Navbar />
      <ApiNotice />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<main className="container page-space"><div className="empty-state"><h3>Page not found</h3><a href="/">Go to home</a></div></main>} />
      </Routes>
      <Footer />
    </>
  );
}