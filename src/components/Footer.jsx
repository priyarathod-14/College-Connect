import React from "react";
export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
        <div><strong>College Connect</strong><div className="small text-muted">Discover. Connect. Participate.</div></div>
        <div className="small text-muted">Academic microproject · SAKEC · {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}