import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back arrow icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Forward arrow icon
import Paper from "@mui/material/Paper"; // Container with elevation and padding
import IconButton from "@mui/material/IconButton"; // Clickable icon wrapper
import Typography from "@mui/material/Typography"; // For text display
import HomeIcon from "@mui/icons-material/Home"; // Home link icon
import { useNavigate } from "react-router"; // Navigation hook

const MovieHeader = (props) => {
  const movie = props.movie; // Movie object passed as a prop
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex", // Use flex layout
            justifyContent: "space-around", // Spread items evenly
            flexWrap: "wrap", // Wrap items if screen is small
            padding: 1.5, // Internal spacing
            margin: 0, // No external spacing
        }}
      >
      {/* Back button to navigate one step back in history */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Centered movie title with optional homepage link and tagline */}
      <Typography variant="h4" component="h3">
        {movie.title} 
        {/* Link to the movie's homepage */}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        {/* Display movie tagline */}
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>

      {/* Forward button to navigate one step forward in history */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;