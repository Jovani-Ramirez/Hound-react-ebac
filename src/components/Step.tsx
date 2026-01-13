import { Box, Typography } from "@mui/material";

export function Step({ number, text }: { number: string; text: string }) {
  return (
    <Box
      sx={{
        minWidth: 240,
        p: 4,
        borderRadius: 5,
        backgroundColor: "white",
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary"
        mb={1}
      >
        {number}
      </Typography>
      <Typography fontWeight={600}>{text}</Typography>
    </Box>
  );
}
