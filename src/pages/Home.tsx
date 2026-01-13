import { Box, Container, Typography, Button, Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Feature } from "../components/Feature";
import { CoverageSection } from "../components/CoverageSection";
import { ClientsSection } from "../components/ClientsSection";
import { PartnersSection } from "../components/PartnersSection";

import banner from "../assets/banner.jpeg"

export default function Home() {
  return (
    <>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a2540, #6ac6de)",
          color: "white",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        }}
      >
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={8}
            alignItems="center"
          >
            <Box maxWidth={560}>
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Seguimiento de Paquetes
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                La velocidad de un sabueso,
                <br />
                la precisión de un rastreador.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    color: "#0a2540",
                    fontWeight: 700,
                    px: 4,
                    borderRadius: 3,
                  }}
                >
                  Registrar guía
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    borderRadius: 3,
                  }}
                >
                  Buscar envío
                </Button>
              </Stack>
            </Box>

            <Box
              component="img"
              src={banner}
              alt="Hound Express"
              sx={{
                width: "100%",
                maxWidth: 440,
                borderRadius: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
              }}
            />
          </Stack>
        </Container>
      </Box>

      {/* ================= FEATURES ================= */}
      <Container sx={{ py: 10 }}>
        <Stack spacing={3} textAlign="center" mb={8}>
          <Typography variant="h4" fontWeight={800}>
            ¿Por qué Hound Express?
          </Typography>
          <Typography color="text.secondary" maxWidth={640} mx="auto">
            Control total de tus envíos con información confiable y en tiempo
            real.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          justifyContent="center"
        >
          <Feature
            icon={<SpeedIcon fontSize="large" />}
            title="Rápido"
            description="Consulta el estado de tus paquetes en segundos."
          />
          <Feature
            icon={<TrackChangesIcon fontSize="large" />}
            title="Preciso"
            description="Información clara y siempre actualizada."
          />
          <Feature
            icon={<LocalShippingIcon fontSize="large" />}
            title="Seguro"
            description="Seguimiento completo de principio a fin."
          />
        </Stack>
      </Container>

      {/* ================= CLIENTES ================= */}
      <ClientsSection />

      {/* ================= COVERAGE ================= */}
      <CoverageSection />

      {/* ================= PARTNERS ================= */}
      <PartnersSection />

      {/* ================= CTA ================= */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #0a2540, #6ac6de)",
          color: "white",
          textAlign: "center",
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            Empieza a rastrear tus envíos hoy
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#0a2540",
              fontWeight: 700,
              px: 6,
              borderRadius: 4,
            }}
          >
            Comenzar ahora
          </Button>
        </Stack>
      </Box>
    </>
  );
}
