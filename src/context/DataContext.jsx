import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createRegistration, deleteRegistration, getEvents, getRegistrations } from "../services/api";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("loading");
  const [apiWarning, setApiWarning] = useState("");

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [eventResult, registrationResult] = await Promise.all([getEvents(), getRegistrations()]);
        if (!active) return;
        setEvents(eventResult.data);
        setRegistrations(registrationResult.data);
        const hosted = eventResult.source === "hosted" && registrationResult.source === "hosted";
        setDataSource(hosted ? "Hosted API" : "Local demo storage");
        if (eventResult.error || registrationResult.error) {
          setApiWarning("Hosted API unavailable. Showing saved local demo data instead.");
        }
      } catch (error) {
        console.error("Application data loading error:", error);
        if (active) setApiWarning("Some data could not be loaded. Refresh the page and check the console.");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  const registerStudent = async (formData, event) => {
    const normalizedEmail = formData.email.trim().toLowerCase();
    const duplicate = registrations.some((item) =>
      String(item.eventId) === String(event.id) && item.email?.toLowerCase() === normalizedEmail
    );
    if (duplicate) throw new Error("This email is already registered for this event.");

    const alreadyFull = registrations.filter((item) => String(item.eventId) === String(event.id)).length >= Number(event.capacity);
    if (alreadyFull) throw new Error("Sorry, this event has reached its registration capacity.");

    const payload = {
      eventId: String(event.id),
      eventTitle: event.title,
      name: formData.name.trim(),
      email: normalizedEmail,
      rollNo: formData.rollNo.trim(),
      department: formData.department,
      year: formData.year,
      createdAt: new Date().toISOString()
    };
    const result = await createRegistration(payload);
    setRegistrations((current) => [...current, result.data]);
    return result.data;
  };

  const cancelRegistration = async (registration) => {
    await deleteRegistration(registration);
    setRegistrations((current) => current.filter((item) => item.id !== registration.id));
  };

  const value = useMemo(() => ({
    events, registrations, loading, dataSource, apiWarning,
    registerStudent, cancelRegistration
  }), [events, registrations, loading, dataSource, apiWarning]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside DataProvider");
  return context;
};