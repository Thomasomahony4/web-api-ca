import React from "react";
import { useLocation } from "react-router"; // Hook to access location object and state passed via navigation
import PageTemplate from "../components/templateMoviePage"; // Template for displaying a single movie page
import MovieReview from "../components/movieReview"; // Component to display an individual movie review

const MovieReviewPage = (props) => {
  // Access location object to retrieve state passed from previous page
  let location = useLocation();
  // Destructure movie and review from location state
  const { movie, review } = location.state;

  return (
    // Wrap content in PageTemplate to display movie details
    <PageTemplate movie={movie}>
      {/* Render the MovieReview component with the review passed via state */}
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;