"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import { fetchEventById, fetchEvents, Event } from "../../api/eventsApi";
import { recommendSimilarEvents } from "../../../utils/recommendationUtils";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id, 10);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (id) {
      fetchEventById(id)
        .then((data) => {
          setEvent(data);
          return fetchEvents();
        })
        .then((allEvents) => {
          if (event) {
            const recommendations = recommendSimilarEvents(allEvents, event);
            setRecommendedEvents(recommendations);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching event details:", err);
          setLoading(false);
        });
    }
  }, [id, event]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Event not found</Typography>
      </Box>
    );
  }

  const getCategoryChip = (category: string) => {
    switch (category) {
      case "Sport":
        return { label: "🚴 Sport", color: "#4caf50" };
      case "Study":
        return { label: "📚 Study", color: "#2196f3" };
      case "Entertainment":
        return { label: "🍷 Entertainment", color: "#ff5722" };
      case "Business":
        return { label: "👔 Business", color: "#9c27b0" };
      default:
        return { label: category, color: "#757575" };
    }
  };

  const categoryChip = getCategoryChip(event.category);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "1rem",
        background: "rgba(255, 255, 255, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Chip
          label={categoryChip.label}
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: categoryChip.color,
            color: "#fff",
            fontWeight: "bold",
          }}
        />

        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {event.title}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            sx={{ fontSize: "1rem", marginBottom: "0.5rem" }}
          >
            📅 Date: {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            sx={{ fontSize: "1rem", marginBottom: "0.5rem" }}
          >
            📍 Location: {event.location}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#333",
            }}
          >
            {event.description}
          </Typography>
        </CardContent>
      </Card>

      {recommendedEvents.length > 0 && (
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
            Recommended Events
          </Typography>
          <Grid container spacing={2}>
            {recommendedEvents.map((recommendedEvent) => (
              <Grid item xs={12} sm={6} md={4} key={recommendedEvent.id}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push(`/events/${recommendedEvent.id}`)}
                >
                  <Typography variant="h6">{recommendedEvent.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    📅 {new Date(recommendedEvent.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📍 {recommendedEvent.location}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
