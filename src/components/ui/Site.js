import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  AppBar,
  IconButton,
  Button,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontSize: 22.4,
  },
  spacing: (factor) => `${1 * factor}rem`,
  palette: {
    primary: {
      main: purple[100],
    },
    secondary: {
      main: "#dbf436",
    },
  },
});

export default function Site() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ backgroundColor: "#f44336" }} position="fixed">
        <Container fixed>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: "1" }} variant="h5">
              Hello
            </Typography>
            <Box mr={3}>
              <Button color="inherit" variant="outlined">
                Log in
              </Button>
            </Box>
            <Button color="secondary" variant="contained">
              Sign in
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
