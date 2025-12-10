import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext"; // Context for managing favorites
import { Link } from "react-router"; // Link for navigation to other pages
import Card from "@mui/material/Card"; // Card container for each movie
import CardActions from "@mui/material/CardActions"; // Container for buttons/actions
import CardContent from "@mui/material/CardContent"; // Container for main content
import CardMedia from "@mui/material/CardMedia"; // Component for displaying images
import CardHeader from "@mui/material/CardHeader"; // Header of card (title + avatar)
import Button from "@mui/material/Button"; // MUI Button
import Typography from "@mui/material/Typography"; // Text display
import FavoriteIcon from "@mui/icons-material/Favorite"; // Favorite heart icon
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone"; // Calendar icon for release date
import StarRateIcon from "@mui/icons-material/StarRate"; // Star icon for rating
import IconButton from "@mui/material/IconButton"; // Button for icon-only actions
import Grid from "@mui/material/Grid"; // Grid layout
import Avatar from '@mui/material/Avatar'; // Avatar for showing favorite icon
import img from '../../images/film-poster-placeholder.png'; // Placeholder image if poster missing

export default function MovieCard({ movie, action }) { 

  const { favorites, addToFavorites } = useContext(MoviesContext); // Access favorites and add function

  // Check if the movie is in favorites and set a flag on the movie object
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  // Function to handle adding movie to favorites
  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card sx={{ backgroundColor: '#ffffffff' }} >
      {/* Card header with optional avatar if favorite */}
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon /> {/* Shows a red heart if movie is favorite */}
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title} {/* Movie title */}
          </Typography>
        }
      />

      {/* Movie poster image */}
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // TMDB poster
            : img // fallback placeholder
        }
      />

      {/* Movie details like release date and rating */}
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" /> {/* Calendar icon */}
              {(movie.release_date).split("-").reverse().join("-")} {/* Reformatted date */}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {/* Rating star icon */}
              {"  "} {movie.vote_average}{" "} {/* Movie rating */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* Action buttons including custom action passed via props */}
      <CardActions disableSpacing>
        {action(movie)} {/* Any custom action passed from parent component */}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="small" color="primary">
            More Info ... {/* Navigate to movie detail page */}
          </Button>
        </Link>

        <Link to={`/movies/${movie.id}/credits`}>
          <Button variant="outlined" size="small" color="primary">
            Credits ... {/* Navigate to movie credits page */}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}