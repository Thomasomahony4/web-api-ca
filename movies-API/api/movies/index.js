import express from 'express';
import asyncHandler from 'express-async-handler';
import { getGenres, getMovies, getTrending, getRatedMovies, getUpcomingMovies, getMovie, getMovieCredits, getMovieReviews, getMovieImage } from '../tmdb-api'; 


const router = express.Router();

// movie routes to be added


router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
}));

router.get('/trending', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrending();
    res.status(200).json(trendingMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const UpcomingMovies = await getUpcomingMovies();
    res.status(200).json(UpcomingMovies);
}));

router.get('/rated', asyncHandler(async (req, res) => {
    const ratedMovies = await getRatedMovies();
    res.status(200).json(ratedMovies);
}));


// id related routers

router.get('/:id', asyncHandler(async (req, res) => {
    const Movie = await getMovie(req.params.id);
    res.status(200).json(Movie);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const Credits = await getMovieCredits(req.params.id);
    res.status(200).json(Credits);
}));

router.get('/:id/review', asyncHandler(async (req, res) => {
    const Review = await getMovieReviews(req.params.id);
    res.status(200).json(Review);
}));

router.get('/:id/image', asyncHandler(async (req, res) => {
    const Image = await getMovieImage(req.params.id);
    res.status(200).json(Image);
}));

export default router;
