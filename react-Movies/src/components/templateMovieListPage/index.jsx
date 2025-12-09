import React, { useState } from "react";
import Header from "../headerMovieList"; // Displays the page header (title)
import FilterCard from "../filterMoviesCard"; // Component for filtering movies by name and genre
import MovieList from "../movieList"; // Component to display the list of movies
import Grid from "@mui/material/Grid"; // Material-UI grid for layout

function MovieListPageTemplate({ movies, title, action }) {
  // State to keep track of the filters
  const [nameFilter, setNameFilter] = useState(""); // Filter by movie title
  const [genreFilter, setGenreFilter] = useState("0"); // Filter by genre (0 = no filter)
  const genreId = Number(genreFilter);

  // Filter movies by name and genre
  let displayedMovies = movies
    .filter((m) => {
      // Keep movies whose title contains the filter string (case-insensitive)
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      // If genreId > 0, only keep movies that include the genre
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  // Handle changes from the FilterCard component
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value); // Update title filter
    else setGenreFilter(value); // Update genre filter
  };

  return (
    <Grid container>
      {/* Page header */}
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      {/* Main content: filters on the left, movie list on the right */}
      <Grid container sx={{ flex: "1 1 500px" }}>
        {/* Filter card */}
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange} // Callback when filter values change
            titleFilter={nameFilter} // Current title filter value
            genreFilter={genreFilter} // Current genre filter value
          />
        </Grid>

        {/* Display filtered movies */}
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;