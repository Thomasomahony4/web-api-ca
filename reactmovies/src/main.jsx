import React from "react";
import { createRoot } from "react-dom/client"; // React 18 createRoot API
import { BrowserRouter, Route, Navigate, Routes } from "react-router"; // Routing components
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'; // React Query for data fetching
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Devtools for React Query
import HomePage from "./pages/homePage"; // Home page component
import MoviePage from "./pages/movieDetailsPage"; // Movie details page
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // Favorites page
import TrendingPage from "./pages/trendingPage"; // Trending movies page
import RatedPage from "./pages/ratedPage"; // Top-rated movies page
import UpcomingPage from "./pages/upcomingPage"; // Upcoming movies page
import MovieReviewPage from "./pages/movieReviewPage"; // Individual movie review page
import SiteHeader from './components/siteHeader'; // Site header (navigation bar)
import MoviesContextProvider from "./contexts/moviesContext"; // Context provider for global movie state
import AddMovieReviewPage from './pages/addMovieReviewPage'; // Page to add a movie review
import MovieCreditsPage from "./pages/movieCreditsPage"; // Page to show movie credits (cast/crew)

// Create a React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000, // Data considered fresh for 6 minutes
      refetchInterval: 360000, // Refetch data every 6 minutes
      refetchOnWindowFocus: false // Do not refetch when window regains focus
    },
  },
});

const App = () => {
  return (
    // Provide the React Query client to the app
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        {/* Site header visible on all pages */}
        <SiteHeader />
        {/* Provide global movie context to all child components */}
        <MoviesContextProvider>
          <Routes>
            {/* Define application routes */}
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingPage />} />
            <Route path="/movies/rated" element={<RatedPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/" element={<HomePage />} />
            {/* Catch-all route: redirect unknown URLs to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      {/* React Query devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// Render the React app into the root DOM element
const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);