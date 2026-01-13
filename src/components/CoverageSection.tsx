import {
  Box,
  Container,
  Typography,
  Stack,
  Fade,
} from "@mui/material";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Region } from "./Region";

export function CoverageSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <Fade in={visible} timeout={800}>
      <Box
        ref={ref}
        sx={{
          py: 14,
          backgroundColor: "#f8fafc",
        }}
      >
        <Container>
          {/* TEXTO */}
          <Stack spacing={2} textAlign="center" mb={10}>
            <Typography variant="h4" fontWeight={800}>
              Presencia internacional
            </Typography>

            <Typography
              color="text.secondary"
              maxWidth={620}
              mx="auto"
            >
              Operamos con socios estratégicos y tecnología integrada
              en las principales regiones logísticas del mundo.
            </Typography>
          </Stack>

          {/* REGIONES */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={8}
            justifyContent="center"
            alignItems="center"
          >
            <Region name="América" />
            <Region name="Europa" />
            <Region name="Asia" />
          </Stack>
        </Container>
      </Box>
    </Fade>
  );
}
