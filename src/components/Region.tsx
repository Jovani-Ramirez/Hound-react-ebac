import { Box, Typography, Stack } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

interface Props {
  name: string;
}

export function Region({ name }: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        minWidth: 220,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      {/* CÍRCULO */}
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #091e3f, #6ac6de)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <PublicIcon sx={{ color: "white", fontSize: 42 }} />
      </Box>

      {/* TEXTO */}
      <Typography fontWeight={700} fontSize={20}>
        {name}
      </Typography>

      <Typography
        fontSize={14}
        color="text.secondary"
        textAlign="center"
        maxWidth={200}
      >
        Cobertura logística y alianzas estratégicas
      </Typography>
    </Stack>
  );
}
