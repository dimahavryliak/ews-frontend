"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../styles/calendar.css";
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EventCard from "./EventCard";
import AddEventButton from "./AddEventButton";
import AddEventModal from "./AddEventModal";
import {
  fetchEvents,
  addEvent,
  deleteEvent,
  editEvent,
  Event,
} from "../api/eventsApi";
import { toast } from "react-toastify";

export default function HeroPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const normalizeDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const filteredEvents = events.filter(
    (event) =>
      normalizeDate(event.date) === normalizeDate(selectedDate) &&
      (selectedCategory === "All" || event.category === selectedCategory)
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleAddEvent = (eventData: Omit<Event, "id" | "date">) => {
    const newEvent = {
      ...eventData,
      date: normalizeDate(selectedDate),
    };

    addEvent(newEvent)
      .then((createdEvent) => {
        setEvents((prevEvents) => [...prevEvents, createdEvent]);
        toast.success("Event added successfully!");
      })
      .catch((err) => {
        console.error("Error adding event:", err);
        toast.error("Failed to add event.");
      });
  };

  const handleEditEvent = (eventData: Event) => {
    editEvent(eventData)
      .then((updatedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        toast.success("Event updated successfully!");
      })
      .catch((err) => {
        console.error("Error editing event:", err);
        toast.error("Failed to update event.");
      });
  };

  const openEditModal = (event: Event) => {
    setEventToEdit(event);
    setEditEventModalOpen(true);
  };

  const handleDelete = async () => {
    if (eventToDelete !== null) {
      try {
        await deleteEvent(eventToDelete);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventToDelete)
        );
        toast.success("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event.");
      } finally {
        setDeleteDialogOpen(false);
        setEventToDelete(null);
      }
    }
  };

  const openDeleteDialog = (id: number) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const hasEventsOnDate = (date: Date): boolean => {
    const normalizedDate = normalizeDate(date);
    return events.some((event) => normalizeDate(event.date) === normalizedDate);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        color: "#fff",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "flex-start" },
          position: { md: "sticky" },
          top: { md: "50%" },
          transform: { md: "translateY(-50%)" },
          height: "fit-content",
        }}
      >
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === "month" && hasEventsOnDate(date) ? (
              <div
                style={{
                  height: "6px",
                  width: "6px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  margin: "0 auto",
                  marginTop: "2px",
                }}
              ></div>
            ) : null
          }
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 5,
            mt: 2,
            fontSize: { xs: "1.5rem", md: "2rem" },
            textAlign: { xs: "center", md: "center" },
          }}
        >
          Events on {selectedDate.toDateString()}
        </Typography>

        <AddEventButton onClick={() => setAddEventModalOpen(true)} />

        <Box sx={{ paddingBottom: 3 }}>
          <FormControl fullWidth sx={{ mb: 0 }}>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
              inputProps={{
                style: {
                  color: "white",
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Study">Study</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Box key={event.id}>
                <EventCard
                  event={event}
                  onDelete={() => openDeleteDialog(event.id)}
                  onEdit={() => openEditModal(event)}
                />
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
              No events for this day.
            </Typography>
          )}
        </Box>
      </Box>

      <AddEventModal
        open={addEventModalOpen}
        onClose={() => setAddEventModalOpen(false)}
        onSubmit={handleAddEvent}
      />

      {eventToEdit && (
        <AddEventModal
          open={editEventModalOpen}
          onClose={() => setEditEventModalOpen(false)}
          onSubmit={handleEditEvent}
          initialData={eventToEdit}
        />
      )}

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
