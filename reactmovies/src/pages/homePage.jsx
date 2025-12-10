import React from "react";
import { getMovies } from "../api/tmdb-api"; // Function to fetch movies from TMDB API
import PageTemplate from '../components/templateMovieListPage'; // Template component to display a list of movies
import { useQuery } from '@tanstack/react-query'; // React Query hook for fetching and caching data
import Spinner from '../components/spinner'; // Loading spinner component
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // Icon/button to add movie to favorites

const HomePage = (props) => {

  // Fetch movies using React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'], // Unique key for caching the "discover" movies
    queryFn: getMovies, // Function that fetches movies
  });

  // Show loading spinner while data is being fetched
  if (isPending) {
    return <Spinner />
  }

  // Show error message if the query fails
  if (isError) {
    return <h1>{error.message}</h1>
  }

  // Extract movies array from API response
  const movies = data.results;

  // Redundant, but stores favorite movies in localStorage to avoid app crashing
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Dummy function for adding a movie to favorites (can be expanded later)
  const addToFavorites = (movieId) => true;

  // Render the list of movies using PageTemplate
  return (
    <PageTemplate
      title="Discover Movies" // Page title
      movies={movies} // Array of movies to display
      action={(movie) => {
        // For each movie, render the "Add to Favorites" icon/button
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default HomePage;