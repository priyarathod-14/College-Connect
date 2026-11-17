import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

const initialForm = { name: "", email: "", rollNo: "", department: "Computer Engineering", year: "Second Year" };

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registerStudent } = useData();
  const event = events.find((item) => String(item.id) === String(id));
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 3) next.name = "Enter your full name (at least 3 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!/^[A-Za-z0-9/-]{3,20}$/.test(form.rollNo.trim())) next.rollNo = "Enter a valid roll number (3–20 letters/numbers).";
    if (!form.department) next.department = "Select your department.";
    if (!form.year) next.year = "Select your year.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (eventObject) => {
    eventObject.preventDefault();
    setMessage("");
    if (!validate()) return;
    setSaving(true);
    try {
      await registerStudent(form, event);
      localStorage.setItem("cc_student_profile", JSON.stringify({ name: form.name.trim(), email: form.email.trim().toLowerCase() }));
      sessionStorage.setItem("cc_last_registration", event.title);
      navigate("/my-events", { state: { success: `You are registered for ${event.title}!` } });
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!event) return <main className="container page-space"><div className="empty-state">Event not found. <Link to="/events">Browse events</Link></div></main>;

  return (
    <main className="container page-space narrow-page">
      <Link to={`/events/${event.id}`} className="text-link">← Back to event</Link>
      <div className="form-card mt-3">
        <span className="eyebrow">SAVE YOUR SPOT</span>
        <h1 className="fw-bold mt-2">Event registration</h1>
        <p className="text-muted">Registering for <strong>{event.title}</strong></p>
        {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3"><label className="form-label" htmlFor="name">Full name</label><input id="name" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={handleChange} placeholder="Enter your full name" />{errors.name && <div className="invalid-feedback">{errors.name}</div>}</div>
          <div className="mb-3"><label className="form-label" htmlFor="email">College email</label><input id="email" name="email" type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={form.email} onChange={handleChange} placeholder="you@example.com" />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
          <div className="mb-3"><label className="form-label" htmlFor="rollNo">Roll number</label><input id="rollNo" name="rollNo" className={`form-control ${errors.rollNo ? "is-invalid" : ""}`} value={form.rollNo} onChange={handleChange} placeholder="Enter roll number" />{errors.rollNo && <div className="invalid-feedback">{errors.rollNo}</div>}</div>
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label" htmlFor="department">Department</label><select id="department" name="department" className="form-select" value={form.department} onChange={handleChange}><option>Computer Engineering</option><option>Information Technology</option><option>Electronics Engineering</option><option>Electronics and Computer Science</option><option>Artificial Intelligence and Data Science</option></select></div>
            <div className="col-md-6"><label className="form-label" htmlFor="year">Year</label><select id="year" name="year" className="form-select" value={form.year} onChange={handleChange}><option>First Year</option><option>Second Year</option><option>Third Year</option><option>Final Year</option></select></div>
          </div>
          <div className="form-check my-4"><input className="form-check-input" type="checkbox" id="confirm" required /><label className="form-check-label small" htmlFor="confirm">I confirm that the information provided is correct.</label></div>
          <button className="btn btn-purple btn-lg w-100" type="submit" disabled={saving}>{saving ? "Submitting…" : "Confirm registration →"}</button>
        </form>
      </div>
    </main>
  );
}