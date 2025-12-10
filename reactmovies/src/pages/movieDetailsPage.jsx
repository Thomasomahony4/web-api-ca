import React from "react";
import { useParams } from 'react-router'; // Hook to access URL parameters
import MovieDetails from "../components/movieDetails/"; // Component to show detailed info about a movie
import PageTemplate from "../components/templateMoviePage"; // Template for displaying a single movie page
import { getMovie } from '../api/tmdb-api'; // Function to fetch movie details from TMDB API
import { useQuery } from '@tanstack/react-query'; // React Query hook for fetching and caching data
import Spinner from '../components/spinner'; // Loading spinner component

const MoviePage = (props) => {
  // Get the movie ID from the URL
  const { id } = useParams();

  // Fetch movie details using React Query
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }], // Unique query key based on movie ID
    queryFn: getMovie, // Function that fetches movie details
  });

  // Show loading spinner while data is being fetched
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if query fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Render movie details if data is available
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            {/* Display detailed info about the movie */}
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        // Show fallback text if movie data is not yet available
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;