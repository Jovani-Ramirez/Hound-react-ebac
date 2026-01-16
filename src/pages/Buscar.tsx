import { useState, type JSX } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Chip,
  Divider,
  Fade,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import type { Guia } from "../models/Guia.interface";
import { useAppSelector } from "../hooks/guias";

/* ================= COMPONENT ================= */

export const Buscar = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Guia | null>(null);
  const [searched, setSearched] = useState(false);

  const guias = useAppSelector((state) => state.guias.items);

  const handleSearch = () => {
    const found = guias.find(
      (g) => g.numero.trim() === query.trim()
    );

    setResult(found || null);
    setSearched(true);
  };

  const estadoColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "success";
      case "En tránsito":
        return "warning";
      default:
        return "default";
    }
  };

  /* ================= UI ================= */

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #091e3f, #6ac6de)",
          color: "white",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <Container maxWidth="sm">
          <Stack spacing={3} textAlign="center">
            <LocalShippingIcon sx={{ fontSize: 56, mx: "auto" }} />

            <Typography variant="h4" fontWeight={800}>
              Rastrea tu envío
            </Typography>

            <Typography sx={{ opacity: 0.9 }}>
              Consulta el estado de tu guía en tiempo real con
              Hound Express
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Número de guía"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  px: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #091e3f, #2563eb)",
                }}
              >
                <SearchIcon />
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ================= RESULT ================= */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={searched}>
          <Box>
            {result ? (
              <Paper
                sx={{
                  p: 5,
                  borderRadius: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
              >
                <Stack spacing={4}>
                  {/* HEADER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={800} fontSize={20}>
                      Guía #{result.numero}
                    </Typography>

                    <Chip
                      label={result.estado}
                      color={estadoColor(result.estado)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>

                  <Divider />

                  {/* ROUTE */}
                  <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    <RouteItem
                      icon={<PlaceIcon />}
                      label="Origen"
                      value={result.origen}
                    />
                    <RouteItem
                      icon={<PlaceIcon />}
                      label="Destino"
                      value={result.destino}
                    />
                  </Stack>

                  <Divider />

                  {/* DETAILS */}
                  <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    <Detail
                      icon={<AssignmentTurnedInIcon />}
                      label="Destinatario"
                      value={result.destinatario}
                    />
                    <Detail
                      icon={<EventIcon />}
                      label="Fecha de envío"
                      value={result.fecha}
                    />
                  </Stack>

                  {/* FOOTER */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    color="primary.main"
                  >
                    <LocalShippingIcon />
                    <Typography fontWeight={600}>
                      Seguimiento activo
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            ) : (
              searched && (
                <Paper
                  sx={{
                    p: 6,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    <SentimentDissatisfiedIcon fontSize="large" />
                    <Typography fontWeight={700}>
                      No se encontró la guía
                    </Typography>
                    <Typography color="text.secondary">
                      Verifica el número o registra una nueva guía
                    </Typography>

                    <Button variant="outlined" href="/registro">
                      Registrar guía
                    </Button>
                  </Stack>
                </Paper>
              )
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

/* ================= SUB COMPONENTS ================= */

function RouteItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flex={1}>
      <Box color="primary.main">{icon}</Box>
      <Box>
        <Typography fontSize={12} color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={700}>{value}</Typography>
      </Box>
    </Stack>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flex={1}>
      <Box color="primary.main">{icon}</Box>
      <Box>
        <Typography fontSize={12} color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={700}>{value}</Typography>
      </Box>
    </Stack>
  );
}
