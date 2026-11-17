import React from "react";
const clubs = [
  { name: "IEEE Student Community", type: "Technology", description: "Technical sessions, projects, workshops and professional learning.", icon: "bi bi-lightning-charge" },
  { name: "ACM Community", type: "Computing", description: "Programming, computing concepts and peer learning activities.", icon: "bi bi-laptop" },
  { name: "CSI Student Chapter", type: "Technology", description: "Technology awareness, expert talks and student activities.", icon: "bi bi-globe" },
  { name: "Speakers Club", type: "Communication", description: "Debates, public speaking, group discussions and confidence building.", icon: "bi bi-mic" },
  { name: "Green Club", type: "Social Impact", description: "Environmental awareness, sustainability and campus initiatives.", icon: "bi bi-tree" },
  { name: "Student Council", type: "Campus Life", description: "Student participation, cultural activities and campus coordination.", icon: "bi bi-mortarboard" }
];

export default function Clubs() {
  return <main className="container page-space">
    <div className="page-heading"><span className="eyebrow">FIND YOUR PEOPLE</span><h1 className="fw-bold mt-2">Clubs & communities</h1><p className="text-muted">Explore interests, learn together and get involved on campus.</p></div>
    <div className="alert alert-light border">Register Sooner so that you can be a part of the club and acheive & experience more!!</div>
    <div className="row g-4">{clubs.map((club) => <div className="col-md-6 col-lg-4" key={club.name}><div className="club-card h-100"><div className="club-icon"><i className={club.icon} aria-hidden="true"></i></div><span className="category-pill">{club.type}</span><h5 className="fw-bold mt-3">{club.name}</h5><p className="text-muted mb-0">{club.description}</p></div></div>)}</div>
  </main>;
}