import React from 'react';
import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI spinner component

// Define and export the CircularIndeterminate functional component
export default function CircularIndeterminate() {
  return (
    // Main container div for the spinner
    // sx prop is being used here (typically works with Material-UI components like Box)
    <div sx={{
        display: 'flex', // Use flex layout
        justifyContent: "center", // Center content horizontally
        '& > * + *': { // Add spacing between multiple children
          marginLeft: '2em', // 2em space between spinners
        }}}>
      <CircularProgress /> {/* First spinner */}
      <CircularProgress /> {/* Second spinner */}
    </div>
  );
}
