export interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  category: string;
  description: string;
}

// Fetch all events
export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(
    "https://ews-backend-production.up.railway.app/events"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

export const fetchEventById = async (id: number): Promise<Event> => {
  const response = await fetch(
    `https://ews-backend-production.up.railway.app/events/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }
  return response.json();
};

// Add a new event
export const addEvent = async (
  eventData: Omit<Event, "id">
): Promise<Event> => {
  const response = await fetch(
    "https://ews-backend-production.up.railway.app/events",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add event");
  }
  return response.json();
};

// Edit an event
export const editEvent = async (eventData: Event): Promise<Event> => {
  const response = await fetch(
    `https://ews-backend-production.up.railway.app/events/${eventData.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to edit event");
  }
  return response.json();
};

// Delete an event
export const deleteEvent = async (eventId: number): Promise<void> => {
  const response = await fetch(
    `https://ews-backend-production.up.railway.app/events/${eventId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete the event");
  }
};
