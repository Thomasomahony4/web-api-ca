import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext"; // Import context for managing favorites
import IconButton from "@mui/material/IconButton"; // MUI button for icons
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart icon

// Component for adding a movie to favorites
const AddToFavoritesIcon = ({ movie }) => {
  // Access the movies context
  const context = useContext(MoviesContext);

  // Handler function called when the icon button is clicked
  const handleAddToFavorites = (e) => {
    e.preventDefault(); // Prevent default button behavior
    context.addToFavorites(movie); // Call context function to add movie to favorites
  };

  // Render the icon button with a heart icon
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;