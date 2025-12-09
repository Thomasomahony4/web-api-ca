import React from "react";
import { getRatedMovies } from "../api/tmdb-api"; // Function to fetch top-rated movies from TMDB API
import PageTemplate from '../components/templateMovieListPage'; // Template component to display a list of movies
import { useQuery } from '@tanstack/react-query'; // React Query hook for fetching and caching data
import Spinner from '../components/spinner'; // Loading spinner component
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // Icon/button to add movie to favorites

const RatedPage = (props) => {

  // Fetch top-rated movies using React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['rated'], // Unique key for caching top-rated movies
    queryFn: getRatedMovies, // Function that fetches top-rated movies
  });

  // Show loading spinner while the query is in progress
  if (isPending) {
    return <Spinner />
  }

  // Show error message if query fails
  if (isError) {
    return <h1>{error.message}</h1>
  }

  // Extract the movies array from the API response
  const movies = data.results;

  // Redundant, but stores favorite movies in localStorage to prevent app crashes
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Dummy function for adding a movie to favorites (can be expanded later)
  const addToFavorites = (movieId) => true;

  // Render the list of top-rated movies using the PageTemplate
  return (
    <PageTemplate
      title="Top Rated Movies" // Page title
      movies={movies} // Array of movies to display
      action={(movie) => {
        // For each movie, render the "Add to Favorites" icon/button
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default RatedPage;