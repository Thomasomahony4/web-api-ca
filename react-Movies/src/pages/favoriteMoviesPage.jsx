import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage"; // Template component to display a list of movies
import { MoviesContext } from "../contexts/moviesContext"; // Context to get favorite movie IDs
import { useQueries } from "@tanstack/react-query"; // Hook to run multiple queries in parallel
import { getMovie } from "../api/tmdb-api"; // Function to fetch a single movie by ID
import Spinner from '../components/spinner'; // Loading spinner component
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites"; // Button/icon to remove a movie from favorites
import WriteReview from "../components/cardIcons/writeReview"; // Button/icon to write a review for a movie

const FavoriteMoviesPage = () => {
  // Get the list of favorite movie IDs from context
  const { favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries to fetch each favorite movie in parallel
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }], // Unique query key for each movie
        queryFn: getMovie, // Function to fetch movie data
      }
    })
  });
  
  // Check if any of the parallel queries is still loading
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  // Show spinner while any movie data is still loading
  if (isPending) {
    return <Spinner />;
  }

  // Extract the movie data from all queries
  const movies = favoriteMovieQueries.map((q) => {
    // Convert genres array to genre_ids to match other components
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  // Dummy function placeholder (not used here)
  const toDo = () => true;

  // Render favorite movies using PageTemplate
  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        // For each movie, show buttons for removing from favorites and writing a review
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;