import React from "react";
import Table from "@mui/material/Table"; // Main table component
import TableBody from "@mui/material/TableBody"; // Table body container
import TableCell from "@mui/material/TableCell"; // Individual table cells
import TableContainer from "@mui/material/TableContainer"; // Wrapper for table with Paper
import TableHead from "@mui/material/TableHead"; // Table header container
import TableRow from "@mui/material/TableRow"; // Table row
import Paper from "@mui/material/Paper"; // Paper component for table background
import { Link } from "react-router"; // React router link for navigation
import { getMovieReviews } from "../../api/tmdb-api"; // API call to get movie reviews
import { excerpt } from "../../util"; // Utility to shorten long text
import { useQuery } from "@tanstack/react-query"; // React Query hook
import Spinner from '../spinner' // Spinner for loading state


export default function MovieReviews({ movie }) {

  // Fetch movie reviews using React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id }], // Unique key for caching
    queryFn: getMovieReviews, // Function to fetch reviews
  });
  
  // Show loading spinner while fetching
  if (isPending) {
    return <Spinner />;
  }

  // Show error if fetching fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const reviews = data.results; // Extract reviews from API response


  return (
    <TableContainer component={Paper}>
      {/* Table for displaying reviews */}
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell> {/* Review author */}
            <TableCell align="center">Excerpt</TableCell> {/* Short preview of review */}
            <TableCell align="right">More</TableCell> {/* Link to full review */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map over reviews and display each row */}
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author} {/* Author name */}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell> {/* Shortened review content */}
              <TableCell>
                {/* Link to full review page with state */}
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                      review: r,
                      movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}