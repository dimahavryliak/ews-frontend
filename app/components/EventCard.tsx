"use client";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function EventCard({
  event,
  onDelete,
  onEdit,
}: {
  event: any;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/events/${event.id}`);
  };

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
    <Card
      sx={{
        maxWidth: "100%",
        height: "220px",
        minWidth: 300,
        margin: "1rem auto",
        boxShadow: 3,
        borderRadius: 2,
        background: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <Chip
        label={categoryChip.label}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: categoryChip.color,
          color: "#fff",
          fontWeight: "bold",
        }}
      />

      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          {event.title}
        </Typography>
        <Typography color="textSecondary" sx={{}}>
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Location: {event.location}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "4px",
            width: "100%",
          }}
        >
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            size="large"
            color="error"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
