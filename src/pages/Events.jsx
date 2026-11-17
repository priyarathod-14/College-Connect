import React from "react";
import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import EventCard from "../components/EventCard";

export default function Events() {
  const { events, registrations } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("date");

  const categories = ["All", ...new Set(events.map(({ category }) => category))];
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events
      .filter((event) => category === "All" || event.category === category)
      .filter((event) => `${event.title} ${event.description} ${event.organizer}`.toLowerCase().includes(query))
      .sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : a.date.localeCompare(b.date));
  }, [events, search, category, sort]);

  const countFor = (eventId) => registrations.filter((item) => String(item.eventId) === String(eventId)).length;

  return (
    <main className="container page-space">
      <div className="page-heading"><span className="eyebrow">FIND YOUR NEXT EXPERIENCE</span><h1 className="fw-bold mt-2">Explore events</h1><p className="text-muted">Search, filter and discover what's happening around campus.</p></div>
      <div className="filter-panel row g-3 align-items-end mb-4">
        <div className="col-lg-6"><label className="form-label">Search events</label><input className="form-control form-control-lg" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try hackathon, music, workshop…" /></div>
        <div className="col-md-6 col-lg-3"><label className="form-label">Category</label><select className="form-select form-select-lg" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="col-md-6 col-lg-3"><label className="form-label">Sort by</label><select className="form-select form-select-lg" value={sort} onChange={(event) => setSort(event.target.value)}><option value="date">Date: soonest</option><option value="title">Event name</option></select></div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3"><span className="text-muted small">{filteredEvents.length} event(s) found</span><button className="btn btn-sm btn-link text-decoration-none" onClick={() => { setSearch(""); setCategory("All"); setSort("date"); }}>Clear filters</button></div>
      <div className="row g-4">
        {filteredEvents.map((event) => <div className="col-md-6 col-lg-4" key={event.id}><EventCard event={event} registeredCount={countFor(event.id)} /></div>)}
      </div>
      {filteredEvents.length === 0 && <div className="empty-state"><h5>No matching events</h5><p className="text-muted mb-0">Try another search term or category.</p></div>}
    </main>
  );
}