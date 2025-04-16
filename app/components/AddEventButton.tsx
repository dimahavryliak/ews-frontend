"use client";

import { Button } from "@mui/material";

export default function AddEventButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outlined"
      sx={{
        margin: "1rem auto",
        width: "100%",
        height: 100,
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid white",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: 2,
      }}
      onClick={onClick}
    >
      Add Event
    </Button>
  );
}
