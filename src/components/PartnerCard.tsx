import { Box, Typography, Stack } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import HubIcon from "@mui/icons-material/Hub";
import PublicIcon from "@mui/icons-material/Public";
import type { JSX } from "@emotion/react/jsx-runtime";

const iconsMap: Record<string, JSX.Element> = {
  "Operadores Logísticos": <BusinessIcon fontSize="large" />,
  "Tecnología": <HubIcon fontSize="large" />,
  "Empresas Globales": <PublicIcon fontSize="large" />,
};

interface Props {
  title: string;
  text: string;
}

export function PartnerCard({ title, text }: Props) {
  return (
    <Box
      sx={{
        width: 320,
        p: 5,
        borderRadius: 5,
        backgroundColor: "white",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        transition: "all 0.35s ease",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        {/* ICON */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #091e3f, #6ac6de)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {iconsMap[title]}
        </Box>

        {/* TEXT */}
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Typography color="text.secondary">
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}
