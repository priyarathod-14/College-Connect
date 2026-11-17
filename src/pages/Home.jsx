import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useData } from "../context/DataContext";

export default function Home() {
  const { events, registrations, loading } = useData();
  const upcoming = [...events].filter((event) => event.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const countFor = (eventId) => registrations.filter((item) => String(item.eventId) === String(eventId)).length;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="eyebrow">SAKEC STUDENT COMMUNITY</span>
              <h1 className="display-4 fw-bold mt-3">Your campus life,<br /><span className="gradient-text">all connected.</span></h1>
              <p className="hero-copy mt-3">Discover workshops, competitions, cultural events and communities. Find what excites you and make your college experience count.</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/events" className="btn btn-purple btn-lg">Explore events <span aria-hidden="true">→</span></Link>
                <Link to="/clubs" className="btn btn-light btn-lg border">Discover clubs</Link>
              </div>
              <div className="hero-stats mt-5">
                <div><strong>{events.length}+</strong><span>Listed events</span></div>
                <div><strong>{registrations.length}</strong><span>Registrations</span></div>
                <div><strong>1</strong><span>Connected campus</span></div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-art">
                <div className="floating-note note-one"><i className="bi bi-stars me-2" aria-hidden="true"></i>Find your next opportunity</div>
                <div className="hero-illustration">
                  <div className="illustration-circle"></div>
                  <div className="illustration-card">
                    <div className="illustration-icon"><i className="bi bi-mortarboard" aria-hidden="true"></i></div>
                    <h5>Make it happen.</h5>
                    <p>Learn · Create · Connect</p>
                    <div className="mini-bars"><i></i><i></i><i></i><i></i><i></i></div>
                  </div>
                </div>
                <div className="floating-note note-two"><i className="bi bi-heart me-2" aria-hidden="true"></i>Campus moments start here</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-heading">
          <div><span className="eyebrow">DON'T MISS OUT</span><h2 className="fw-bold mt-2">Upcoming events</h2><p className="text-muted mb-0">A few opportunities waiting for you.</p></div>
          <Link to="/events" className="text-link">View all events →</Link>
        </div>
        {loading ? <p>Loading events…</p> : (
          <div className="row g-4">
            {upcoming.map((event) => <div className="col-md-6 col-lg-4" key={event.id}><EventCard event={event} registeredCount={countFor(event.id)} /></div>)}
          </div>
        )}
        {!loading && upcoming.length === 0 && <div className="empty-state">No upcoming events are listed yet. Check back soon.</div>}
      </section>
      <section className="container pb-5">
        <div className="join-banner">
          <div><span className="eyebrow">YOUR NEXT CHAPTER</span><h3 className="fw-bold mt-2">There is more to college than classes.</h3><p className="mb-0 text-muted">Explore communities, meet people and try something new.</p></div>
          <Link to="/events" className="btn btn-purple">Find your event →</Link>
        </div>
      </section>
    </>
  );
}