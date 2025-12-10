import React from "react";
import MovieHeader from "../headerMovie"; // Component to display the movie's header (title, tagline, etc.)
import Grid from "@mui/material/Grid"; // Material-UI grid for layout
import ImageList from "@mui/material/ImageList"; // Material-UI image list to show movie posters
import ImageListItem from "@mui/material/ImageListItem"; 
import { getMovieImages } from "../../api/tmdb-api"; // Function to fetch movie images from TMDB API
import { useQuery } from "@tanstack/react-query"; // React Query hook for fetching and caching data
import Spinner from '../spinner'; // Loading spinner component

const TemplateMoviePage = ({ movie, children }) => {
  // Fetch movie images using React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }], // Unique query key for caching images
    queryFn: getMovieImages, // Function to fetch images
  });

  // Show loading spinner while images are being fetched
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if the query fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Extract poster images from API response
  const images = data.posters;

  return (
    <>
      {/* Render the movie header */}
      <MovieHeader movie={movie} />

      {/* Layout: left side for images, right side for children components */}
      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* Left column for movie posters */}
        <Grid size={{ xs: 3 }}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
              sx={{
                height: "100vh",
              }}
              cols={1} // Single column
            >
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} // Construct full image URL
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* Right column for children components (e.g., MovieDetails, MovieCredits) */}
        <Grid size={{ xs: 9 }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;