import {
  Box,
  Container,
  Typography,
  Stack,
  Fade,
} from "@mui/material";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PartnerCard } from "./PartnerCard";

export function PartnersSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <Fade in={visible} timeout={800}>
      <Box
        ref={ref}
        sx={{
          backgroundColor: "#f5f7fa",
          py: 14,
        }}
      >
        <Container>
          {/* TITULO */}
          <Stack spacing={2} textAlign="center" mb={10}>
            <Typography variant="h4" fontWeight={800}>
              Socios estratégicos
            </Typography>

            <Typography
              color="text.secondary"
              maxWidth={600}
              mx="auto"
            >
              Una red sólida que garantiza operación, tecnología y
              cobertura internacional
            </Typography>
          </Stack>

          {/* CARDS */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={6}
            justifyContent="center"
          >
            <PartnerCard
              title="Operadores Logísticos"
              text="Red de transporte certificada con cobertura nacional."
            />
            <PartnerCard
              title="Tecnología"
              text="Infraestructura digital escalable y segura."
            />
            <PartnerCard
              title="Empresas Globales"
              text="Alianzas estratégicas en mercados internacionales."
            />
          </Stack>
        </Container>
      </Box>
    </Fade>
  );
}
