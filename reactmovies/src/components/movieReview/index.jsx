import React from "react";
import Typography from "@mui/material/Typography"; // MUI component for consistent text styling

const MovieReview =  ({ review }) => {
  return (
    <>
      {/* Display the review author */}
      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      {/* Display the full content of the review */}
      <Typography variant="h6" component="p">
        {review.content} 
      </Typography>
    </>
  );
};

export default MovieReview;