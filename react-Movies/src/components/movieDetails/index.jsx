import React, { useState } from "react";
import Chip from "@mui/material/Chip"; // Material UI component for small labeled items
import Paper from "@mui/material/Paper"; // Material UI container with paper effect
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Icon to represent runtime
import MonetizationIcon from "@mui/icons-material/MonetizationOn"; // Icon to represent revenue
import StarRate from "@mui/icons-material/StarRate"; // Icon to represent rating
import NavigationIcon from "@mui/icons-material/Navigation"; // Icon for reviews button
import Fab from "@mui/material/Fab"; // Floating action button
import Typography from "@mui/material/Typography"; // Typography component for text
import Drawer from "@mui/material/Drawer"; // Slide-out drawer component
import MovieReviews from "../movieReviews" // Component to display movie reviews

// Styles for Paper component containing Chips
const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

// Styles for individual Chips
const chip = { margin: 0.5 };

// MovieDetails component receives a movie object as a prop
const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to open/close reviews drawer

  return (
    <>
      {/* Movie Overview Section */}
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview} {/* Display movie overview */}
      </Typography>

      {/* Genres Section */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" /> {/* Label for genres */}
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} /> {/* Display each genre */}
          </li>
        ))}
      </Paper>

      {/* Movie Details Section using Chips */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} /> {/* Runtime */}
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} /> {/* Release date */}
      </Paper>

      {/* Floating Action Button to open Reviews Drawer */}
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      {/* Drawer containing MovieReviews component */}
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} /> {/* Pass movie to reviews component */}
      </Drawer>
    </>
  );
};

export default MovieDetails;