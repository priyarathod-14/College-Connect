import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event, registeredCount = 0 }) {
  const seatsLeft = Math.max(0, Number(event.capacity || 0) - registeredCount);
  const dateLabel = new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <article className="card event-card h-100">
      <img className="event-image" src={event.image} alt={`${event.title} event`} onError={(e) => { e.currentTarget.src = "https://placehold.co/800x500/eee9fb/6d55b5?text=College+Connect"; }} />
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="category-pill">{event.category}</span>
          <span className="small text-muted">{seatsLeft} seats left</span>
        </div>
        <h5 className="fw-bold">{event.title}</h5>
        <p className="text-muted small mb-3">{event.description}</p>
        <div className="event-meta small mb-3">
          <div><i className="bi bi-calendar-event me-2" aria-hidden="true"></i>{dateLabel}</div>
          <div><i className="bi bi-clock me-2" aria-hidden="true"></i>{event.time}</div>
          <div><i className="bi bi-geo-alt me-2" aria-hidden="true"></i>{event.venue}</div>
        </div>
        <Link className="btn btn-outline-purple mt-auto" to={`/events/${event.id}`}>View details <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}