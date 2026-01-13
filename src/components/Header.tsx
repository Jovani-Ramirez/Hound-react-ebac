import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logoAzulBlancoHE.png"
import logoAzul from "../assets/logo-Hound_Express-bg-white.png"
const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Registro", path: "/registro" },
  { label: "Estado", path: "/estado" },
  { label: "Guías", path: "/lista" },
  { label: "Buscar", path: "/buscar" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <Toolbar
          sx={{
            minHeight: 76,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={logo}
              alt="Hound Express"
              height={34}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Hound Express
            </Typography>
          </Box>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {menuItems.map((item) => (
              <Typography
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    width: "100%",
                    height: 2,
                    backgroundColor: "secondary.main",
                    transform: "scaleX(0)",
                    transition: "transform 0.25s ease",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                  "&.active": {
                    color: "secondary.main",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* MOBILE BUTTON */}
          <IconButton
            color="inherit"
            sx={{ display: { md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
        }}
      >
        <Box p={3}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <img
              src={logoAzul}
              alt="Hound Express"
              height={28}
            />
            <Typography fontWeight={600}>Hound Express</Typography>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.active": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
