import React from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useState } from "react";

export default function MyEvents() {
  const { registrations, cancelRegistration } = useData();
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.success || "");
  const [error, setError] = useState("");

  const cancel = async (registration) => {
    if (!window.confirm(`Cancel your registration for ${registration.eventTitle}?`)) return;
    try {
      await cancelRegistration(registration);
      setNotice("Registration cancelled successfully.");
      setError("");
    } catch (problem) {
      setError(problem.message);
    }
  };

  return (
    <main className="container page-space">
      <div className="page-heading"><span className="eyebrow">YOUR CAMPUS CALENDAR</span><h1 className="fw-bold mt-2">My Events</h1><p className="text-muted">Keep track of the events you have joined.</p></div>
      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {registrations.length === 0 ? <div className="empty-state"><div className="empty-icon"><i className="bi bi-calendar-event" aria-hidden="true"></i></div><h4>No registrations yet</h4><p className="text-muted">Your registered events will appear here.</p><a className="btn btn-purple" href="/events">Explore events</a></div> : (
        <div className="row g-3">{[...registrations].reverse().map((item) => (
          <div className="col-12" key={item.id}><div className="registration-row">
            <div className="registration-icon"><i className="bi bi-ticket-perforated" aria-hidden="true"></i></div>
            <div className="flex-grow-1"><h5 className="fw-bold mb-1">{item.eventTitle}</h5><div className="small text-muted">{item.name} · {item.email}</div><div className="small text-muted">Roll no: {item.rollNo} · {item.department} · {item.year}</div></div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => cancel(item)}>Cancel</button>
          </div></div>
        ))}</div>
      )}
    </main>
  );
}