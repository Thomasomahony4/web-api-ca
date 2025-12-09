import React from "react";
import Movie from "../movieCard/"; // Import individual movie card component
import Grid from "@mui/material/Grid"; // MUI grid for responsive layout

const MovieList = (props) => {
  // Map through the movies array and create a Grid item for each Movie component
  let movieCards = props.movies.map((m) => (
    <Grid 
      key={m.id} 
      size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} // Responsive grid sizing
      sx={{padding: "20px"}} // Add padding around each card
    >
      <Movie 
        key={m.id} // Unique key for each Movie component
        movie={m} // Pass the movie object as a prop
        action={props.action} // Optional action component (e.g., buttons/icons)
      />
    </Grid>
  ));
  return movieCards; // Return array of Grid-wrapped Movie components
};

export default MovieList;