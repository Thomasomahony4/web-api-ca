import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api"; // Function to fetch upcoming movies from TMDB API
import PageTemplate from '../components/templateMovieListPage'; // Template to display a list of movies
import { useQuery } from '@tanstack/react-query'; // React Query hook for fetching and caching data
import Spinner from '../components/spinner'; // Loading spinner component
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // Icon/button to add movie to favorites

const UpcomingPage = (props) => {

  // Fetch upcoming movies using React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'], // Unique query key for caching
    queryFn: getUpcomingMovies, // Function that fetches upcoming movies
  });

  // Show loading spinner while data is being fetched
  if (isPending) {
    return <Spinner />
  }

  // Show error message if query fails
  if (isError) {
    return <h1>{error.message}</h1>
  }

  // Extract the movies array from the API response
  const movies = data.results;

  // Redundant, but ensures favorites are stored in localStorage to prevent app crashes
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Dummy function for adding a movie to favorites (can be expanded later)
  const addToFavorites = (movieId) => true;

  // Render the list of upcoming movies using the PageTemplate
  return (
    <PageTemplate
      title="Upcoming Movies" // Page title
      movies={movies} // Movie list to display
      action={(movie) => {
        // For each movie, render the "Add to Favorites" icon/button
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default UpcomingPage;