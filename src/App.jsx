import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import Chat from "./components/Chat";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b1129",
      }}
    >
      <Paper elevation={3} sx={{ width: { xs: "100%", sm: 600 }, p: 3 }}>
        
        <Box
          component="img"
          src="/logo.png"
          alt="Artefact Logo"
          sx={{
            display: "block",
            mx: "auto",
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            mb: 2,
          }}
        />

        <Typography variant="h4" gutterBottom align="center">
          Artefact AI Agent
        </Typography>

        <Chat />
      </Paper>
    </Box>
  );
}

export default App;
