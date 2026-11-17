import { seedEvents } from "../data/seedEvents";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "");
const EVENTS_KEY = "cc_events";
const REG_KEY = "cc_registrations";

const readLocal = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Could not read ${key} from localStorage:`, error);
    return fallback;
  }
};

const writeLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const message = `API request failed (${response.status})`;
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export const isHostedApiConfigured = Boolean(API_BASE);

export async function getEvents() {
  if (!API_BASE) {
    const events = readLocal(EVENTS_KEY, seedEvents);
    writeLocal(EVENTS_KEY, events);
    return { data: events, source: "local" };
  }

  try {
    let events = await request("events");
    if (events.length === 0) {
      // Seed the hosted resource once, only when it is empty.
      events = await Promise.all(seedEvents.map((event) => request("events", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(Object.entries(event).filter(([key]) => key !== "id")))
      })));
    }
    writeLocal(EVENTS_KEY, events);
    return { data: events, source: "hosted" };
  } catch (error) {
    console.error("Hosted events could not be loaded:", error);
    return { data: readLocal(EVENTS_KEY, seedEvents), source: "local-fallback", error };
  }
}

export async function getRegistrations() {
  if (!API_BASE) return { data: readLocal(REG_KEY, []), source: "local" };

  try {
    const data = await request("registrations");
    writeLocal(REG_KEY, data);
    return { data, source: "hosted" };
  } catch (error) {
    console.error("Hosted registrations could not be loaded:", error);
    return { data: readLocal(REG_KEY, []), source: "local-fallback", error };
  }
}

export async function createRegistration(registration) {
  if (API_BASE) {
    try {
      const saved = await request("registrations", {
        method: "POST",
        body: JSON.stringify(registration)
      });
      const current = readLocal(REG_KEY, []);
      writeLocal(REG_KEY, [...current, saved]);
      return { data: saved, source: "hosted" };
    } catch (error) {
      console.error("Hosted registration failed:", error);
      throw new Error("The hosted API could not save this registration. Please check your connection and try again.");
    }
  }

  const current = readLocal(REG_KEY, []);
  const saved = { ...registration, id: crypto.randomUUID() };
  writeLocal(REG_KEY, [...current, saved]);
  return { data: saved, source: "local" };
}

export async function deleteRegistration(registration) {
  if (API_BASE && registration.id && !String(registration.id).startsWith("local-")) {
    try {
      await request(`registrations/${registration.id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Hosted deletion failed:", error);
      throw new Error("Could not cancel the registration on the hosted API.");
    }
  }
  const current = readLocal(REG_KEY, []);
  writeLocal(REG_KEY, current.filter((item) => item.id !== registration.id));
}

// Promise chaining example for the syllabus: GET events, then transform JSON.
export const getEventTitlesWithPromise = () =>
  getEvents()
    .then(({ data }) => data.map(({ title }) => title))
    .catch((error) => {
      console.error("Promise chain error:", error);
      return [];
    });