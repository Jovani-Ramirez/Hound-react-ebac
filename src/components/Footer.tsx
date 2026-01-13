import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#091e3f",
        color: "white",
      }}
    >
      <Container sx={{ py: 6 }}>
        <Stack spacing={4}>
          {/* ================= TOP ================= */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={4}
          >
            {/* BRAND */}
            <Stack spacing={2} maxWidth={360}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocalShippingIcon />
                <Typography variant="h6" fontWeight={700}>
                  Hound Express
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                La velocidad de un sabueso, la precisión de un rastreador.
                Plataforma moderna para el seguimiento y control de envíos.
              </Typography>
            </Stack>

            {/* LINKS */}
            <Stack direction="row" spacing={6}>
              <FooterColumn
                title="Plataforma"
                links={[
                  "Inicio",
                  "Registro",
                  "Estado General",
                  "Lista de Guías",
                  "Buscar Guía",
                ]}
              />

              <FooterColumn
                title="Legal"
                links={[
                  "Términos y condiciones",
                  "Política de privacidad",
                ]}
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

          {/* ================= BOTTOM ================= */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} Hound Express. Todos los derechos
              reservados.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

/* ================= COMPONENTES ================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={600}>{title}</Typography>

      {links.map((link) => (
        <Link
          key={link}
          href="#"
          underline="none"
          sx={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 14,
            "&:hover": {
              color: "#6ac6de",
            },
          }}
        >
          {link}
        </Link>
      ))}
    </Stack>
  );
}
