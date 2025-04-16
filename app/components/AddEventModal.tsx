"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    id?: number;
    title: string;
    location: string;
    category: string;
    description: string;
  }) => void;
  initialData?: {
    id?: number;
    title: string;
    location: string;
    category: string;
    description: string;
  };
}

export default function AddEventModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: AddEventModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      location: "",
      category: "",
      description: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [errors, setErrors] = useState({
    title: false,
    location: false,
    category: false,
    description: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
    setErrors((prev) => ({ ...prev, [name!]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {
      title: !formData.title.trim(),
      location: !formData.location.trim(),
      category: !formData.category.trim(),
      description: !formData.description.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    onSubmit(formData);

    setFormData({
      title: "",
      location: "",
      category: "",
      description: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Event" : "Add New Event"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            helperText={errors.title ? "Title is required" : ""}
            fullWidth
            sx={{
              "& label.Mui-focused": {
                color: "#fa3c7e",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "#fa3c7e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fa3c7e",
                },
              },
            }}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            helperText={errors.location ? "Location is required" : ""}
            fullWidth
            sx={{
              "& label.Mui-focused": {
                color: "#fa3c7e",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "#fa3c7e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fa3c7e",
                },
              },
            }}
          />
          <FormControl
            fullWidth
            error={errors.category}
            sx={{
              "& label.Mui-focused": {
                color: "#fa3c7e",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "#fa3c7e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fa3c7e",
                },
              },
            }}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Study">Study</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
            {errors.category && (
              <FormHelperText>Category is required</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
            multiline
            rows={4}
            fullWidth
            sx={{
              "& label.Mui-focused": {
                color: "#fa3c7e",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "#fa3c7e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fa3c7e",
                },
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          sx={{ backgroundColor: "#fa3c7e" }}
          variant="contained"
        >
          {initialData ? "Save Changes" : "Add Event"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
