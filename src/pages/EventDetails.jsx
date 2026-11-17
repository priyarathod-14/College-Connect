import React from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function EventDetails() {
  const { id } = useParams();
  const { events, registrations } = useData();
  const event = events.find((item) => String(item.id) === String(id));

  if (!event) return <main className="container page-space"><div className="empty-state"><h3>Event not found</h3><Link to="/events">Back to events</Link></div></main>;

  const count = registrations.filter((item) => String(item.eventId) === String(event.id)).length;
  const seatsLeft = Math.max(0, Number(event.capacity) - count);

  return (
    <main className="container page-space">
      <Link to="/events" className="text-link">← Back to events</Link>
      <div className="row g-5 mt-1">
        <div className="col-lg-7"><img className="detail-image" src={event.image} alt={event.title} /></div>
        <div className="col-lg-5">
          <span className="category-pill">{event.category}</span>
          <h1 className="fw-bold mt-3">{event.title}</h1>
          <p className="text-muted">{event.description}</p>
          <div className="detail-facts my-4">
            <div><span><i className="bi bi-calendar-event" aria-hidden="true"></i></span><div><small>Date</small><strong>{new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></div></div>
            <div><span><i className="bi bi-clock" aria-hidden="true"></i></span><div><small>Time</small><strong>{event.time}</strong></div></div>
            <div><span><i className="bi bi-geo-alt" aria-hidden="true"></i></span><div><small>Venue</small><strong>{event.venue}</strong></div></div>
            <div><span><i className="bi bi-people" aria-hidden="true"></i></span><div><small>Organizer</small><strong>{event.organizer}</strong></div></div>
          </div>
          <div className="capacity-box mb-3"><strong>{seatsLeft}</strong><span> seats remaining out of {event.capacity}</span></div>
          {seatsLeft > 0 ? <Link to={`/register/${event.id}`} className="btn btn-purple btn-lg w-100">Register for this event →</Link> : <button className="btn btn-secondary btn-lg w-100" disabled>Registration full</button>}
        </div>
      </div>
    </main>
  );
}