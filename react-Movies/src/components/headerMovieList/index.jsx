import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back arrow icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Forward arrow icon
import Paper from "@mui/material/Paper"; // Paper component for background and layout
import IconButton from "@mui/material/IconButton"; // Icon button wrapper
import { useNavigate } from "react-router"; // Navigation hook
import Typography from "@mui/material/Typography"; // Text display

const Header = (props) => {
  const title = props.title; // Header title passed as a prop
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <Paper
      component="div"
      sx={{
        display: "flex", // Flex layout
        justifyContent: "space-around", // Space out the items evenly
        flexWrap: "wrap", // Allow wrapping if screen is small
        marginBottom: 1.5, // Bottom margin
      }}
    >
      {/* Back button */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Title in the center */}
      <Typography variant="h4" component="h3">
        {title}
      </Typography>

      {/* Forward button */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;