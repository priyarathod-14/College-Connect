import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useData } from "../context/DataContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { events, registrations, dataSource } = useData();
  const categories = [...new Set(events.map((event) => event.category))];
  const counts = categories.map((category) => {
    const ids = events.filter((event) => event.category === category).map((event) => String(event.id));
    return registrations.filter((registration) => ids.includes(String(registration.eventId))).length;
  });
  const chartData = {
    labels: categories,
    datasets: [{ label: "Registrations", data: counts, backgroundColor: "#9b83e8", borderRadius: 8, maxBarThickness: 48 }]
  };

  return <main className="container page-space">
    <div className="page-heading"><span className="eyebrow">CAMPUS ACTIVITY OVERVIEW</span><h1 className="fw-bold mt-2">Event dashboard</h1><p className="text-muted">A quick view of event participation and activity.</p></div>
    <div className="row g-3 mb-4">
      <div className="col-md-4"><div className="stat-card"><span>Total events</span><strong>{events.length}</strong><small>Available in the portal</small></div></div>
      <div className="col-md-4"><div className="stat-card"><span>Total registrations</span><strong>{registrations.length}</strong><small>Student sign-ups</small></div></div>
      <div className="col-md-4"><div className="stat-card"><span>Data source</span><strong className="source-value">{dataSource}</strong><small>Current storage mode</small></div></div>
    </div>
    <div className="chart-card"><div className="mb-4"><h4 className="fw-bold">Registrations by category</h4><p className="text-muted small mb-0">The chart updates when registrations are added or cancelled.</p></div><div className="chart-wrap"><Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }} /></div></div>
  </main>;
}