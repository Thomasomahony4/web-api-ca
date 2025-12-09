import React from "react";
import { useParams } from 'react-router'; // Hook to access URL parameters
import MovieCredits from "../components/movieCredits/"; // Component to display cast and crew of a movie
import PageTemplate from "../components/templateMoviePage"; // Template for displaying a single movie page
import { getMovieCredits } from '../api/tmdb-api'; // Function to fetch movie credits from TMDB API
import { useQuery } from '@tanstack/react-query'; // React Query hook for fetching and caching data
import Spinner from '../components/spinner'; // Loading spinner component

const MovieCreditsPage = (props) => {
  // Get the movie ID from the URL
  const { id } = useParams();

  // Fetch movie credits using React Query
  const { data: credits, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id }], // Unique key for caching based on movie ID
    queryFn: getMovieCredits, // Function that fetches the movie credits
  });

  // Show a spinner while the query is loading
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if the query fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Render movie credits if data is available
  return (
    <>
      {credits ? (
        <>
          <PageTemplate credits={credits}>
            {/* Display the movie credits */}
            <MovieCredits credits={credits} />
          </PageTemplate>
        </>
      ) : (
        // Fallback text while waiting for data
        <p>Waiting for movie credits</p>
      )}
    </>
  );
};

export default MovieCreditsPage;