import React from "react";
import PageTemplate from "../components/templateMoviePage"; // Template for displaying a single movie page
import ReviewForm from "../components/reviewForm"; // Form component to write a movie review
import { useLocation } from "react-router"; // Hook to access the location state from routing
import { useQuery } from "@tanstack/react-query"; // React Query hook to fetch data
import { getMovie } from "../api/tmdb-api"; // Function to fetch movie details by ID
import Spinner from "../components/spinner"; // Loading spinner component

const WriteReviewPage = (props) => {
  // Get movieId from location state (passed via Link or Navigate)
  const location = useLocation();
  const movieId = location.state.movieId;

  // Fetch the movie details using React Query
  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', { id: movieId }], // Unique key for caching the query
    queryFn: getMovie, // Function to fetch movie details
  });

  // Show spinner while movie data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if the query fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Render the page template and the review form
  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;

