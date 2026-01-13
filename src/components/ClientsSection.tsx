import {
  Box,
  Container,
  Typography,
  Stack,
  Fade,
} from "@mui/material";
import { useScrollReveal } from "../hooks/useScrollReveal";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PublicIcon from "@mui/icons-material/Public";

const clients = [
  { name: "Amazon", icon: <PublicIcon />, color: "#FF9900" },
  { name: "Mercado Libre", icon: <ShoppingBagIcon />, color: "#FFE600" },
  { name: "FedEx", icon: <LocalShippingIcon />, color: "#4D148C" },
  { name: "Shopify", icon: <StorefrontIcon />, color: "#95BF47" },
];

export function ClientsSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <Fade in={visible} timeout={800}>
      <Box
        ref={ref}
        sx={{
          py: 14,
          backgroundColor: "#f8fafc",
          overflow: "hidden",
        }}
      >
        <Container>
          {/* TEXTO */}
          <Stack spacing={2} textAlign="center" mb={10}>
            <Typography variant="h4" fontWeight={800}>
              Empresas que confían en nosotros
            </Typography>
            <Typography color="text.secondary" maxWidth={600} mx="auto">
              Socios estratégicos que mueven la logística global
            </Typography>
          </Stack>
        </Container>

        {/* CARRUSEL */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            spacing={10}
            sx={{
              width: "max-content",
              animation: "scroll 25s linear infinite",
              px: 6,
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <Stack
                key={`${client.name}-${index}`}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  minWidth: 260,
                  px: 5,
                  py: 3,
                  borderRadius: 4,
                  backgroundColor: "white",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 42,
                    color: client.color,
                  }}
                >
                  {client.icon}
                </Box>

                <Typography
                  fontWeight={700}
                  fontSize={22}
                  sx={{ color: "#091e3f" }}
                >
                  {client.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* KEYFRAMES */}
        <Box
          sx={{
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        />
      </Box>
    </Fade>
  );
}
