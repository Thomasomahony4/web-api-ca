import React from "react";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner'; // Custom loading spinner component
import Card from "@mui/material/Card"; // MUI Card component for layout
import CardMedia from "@mui/material/CardMedia"; // For displaying images inside Card
import CardContent from "@mui/material/CardContent"; // For card content sections
import Typography from "@mui/material/Typography"; // For text elements
import InputLabel from "@mui/material/InputLabel"; // Label for Select input
import MenuItem from "@mui/material/MenuItem"; // Options inside Select
import TextField from "@mui/material/TextField"; // Text input
import SearchIcon from "@mui/icons-material/Search"; // Icon for search
import FormControl from "@mui/material/FormControl"; // Wrapper for inputs
import Select from "@mui/material/Select"; // Dropdown select
import { getGenres } from "../../api/tmdb-api"; // API call to get movie genres
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg' // Fallback / decorative image

// Styling for form controls (TextField & Select)
const formControl = {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

// Main component for filtering movies
export default function FilterMoviesCard(props) {

    // Fetch genres from the API using react-query
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'], // unique key for this query
        queryFn: getGenres, // function to fetch data
    });

    // Show loading spinner while fetching
    if (isPending) {
        return <Spinner />;
    }

    // Show error message if API request fails
    if (isError) {
        return <h1>{error.message}</h1>;
    }

    // Extract genres from API response
    const genres = data.genres;

    // Ensure "All" option is at the beginning
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    // Generic handler to propagate user input changes to parent
    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    // Handler for text search changes
    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    // Handler for genre selection changes
    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    // Render the filter card UI
    return (
        <Card
            sx={{
                backgroundColor: "#2474bf" // card background color
            }}
            variant="outlined">
            
            {/* Top Card Content */}
            <CardContent>
                {/* Card title with search icon */}
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>

                {/* Text search input */}
                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter} // Controlled input
                    onChange={handleTextChange} // Calls parent handler on change
                />

                {/* Genre dropdown */}
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        defaultValue=""
                        value={props.genreFilter} // Controlled input
                        onChange={handleGenreChange} // Calls parent handler on change
                    >
                        {/* Populate Select options from genres array */}
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </CardContent>

            {/* Image section of card */}
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />

            {/* Bottom Card Content */}
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                    <br />
                </Typography>
            </CardContent>
        </Card>
    );
}