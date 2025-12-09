import React, { useState } from "react";
import AppBar from "@mui/material/AppBar"; // Material-UI top navigation bar
import Toolbar from "@mui/material/Toolbar"; // Container for AppBar content
import Typography from "@mui/material/Typography"; // For text headings
import IconButton from "@mui/material/IconButton"; // Button for menu icon
import Button from "@mui/material/Button"; // Standard button
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon
import MenuItem from "@mui/material/MenuItem"; // Single item in dropdown menu
import Menu from "@mui/material/Menu"; // Dropdown menu container
import { useNavigate } from "react-router"; // Hook for programmatic navigation
import { styled } from '@mui/material/styles'; // For custom styling
import { useTheme } from "@mui/material/styles"; // Access MUI theme
import useMediaQuery from "@mui/material/useMediaQuery"; // Detect screen size

// Offset div to prevent content from being hidden behind fixed AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Tracks the anchor element for the menu
  const open = Boolean(anchorEl); // Boolean to check if menu is open

  const theme = useTheme(); // Access MUI theme
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen is mobile size
  
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Define the navigation menu options
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Trending", path: "/movies/trending" },
    { label: "Rated", path: "/movies/rated" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  // Function to handle menu item selection
  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null); // Close menu
    navigate(pageURL); // Navigate to selected page
  };

  // Function to open the menu on mobile
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          {/* Application title */}
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          {/* Conditional rendering based on screen size */}
          {isMobile ? (
            <>
              {/* Mobile menu icon button */}
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              {/* Dropdown menu for mobile */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {/* Map each menu option to a MenuItem */}
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {/* Desktop: show buttons directly */}
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Spacer to offset fixed AppBar */}
      <Offset />
    </>
  );
};

export default SiteHeader;