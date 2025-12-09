import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton"; // MUI button for icons
import DeleteIcon from "@mui/icons-material/Delete"; // Trash/delete icon
import { MoviesContext } from "../../contexts/moviesContext"; // Import context for managing favorites

// Component for removing a movie from favorites
const RemoveFromFavoritesIcon = ({ movie }) => {
  // Access the movies context
  const context = useContext(MoviesContext);

  // Handler function called when the icon button is clicked
  const handleRemoveFromFavorites = (e) => {
    e.preventDefault(); // Prevent default button behavior
    context.removeFromFavorites(movie); // Call context function to remove movie from favorites
  };

  // Render the icon button with a delete icon
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="#cf2d2d" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;