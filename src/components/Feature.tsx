import { Box, Card, CardContent, Typography } from "@mui/material";

export function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        width: 320,
        borderRadius: 5,
        transition: "all 0.3s ease",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", p: 5 }}>
        <Box sx={{ color: "#6ac6de", mb: 2 }}>{icon}</Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
