import type { JSX } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  LinearProgress,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { RootState } from "../store";

/* ================= COMPONENT ================= */

export const Estado = (): JSX.Element => {
  const guias = useSelector(
    (state: RootState) => state.guias.items
  );

  const pendientes = guias.filter(
    (g: { estado: string }) => g.estado === "Pendiente"
  ).length;

  const transito = guias.filter(
    (g: { estado: string }) => g.estado === "En tránsito"
  ).length;

  const entregados = guias.filter(
    (g: { estado: string }) => g.estado === "Entregado"
  ).length;

  const total = guias.length;

  const percent = (value: number) =>
    total === 0 ? 0 : Math.round((value * 100) / total);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack spacing={6}>
          {/* ================= HEADER ================= */}
          <Box>
            <Typography variant="h4" fontWeight={800}>
              Estado de los envíos
            </Typography>
            <Typography color="text.secondary">
              Dashboard de análisis y métricas
            </Typography>
          </Box>

          {/* ================= KPI CARDS ================= */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <StatCard
              title="Pendientes"
              value={pendientes}
              percent={percent(pendientes)}
              color="warning"
              icon={<PendingActionsIcon />}
            />
            <StatCard
              title="En tránsito"
              value={transito}
              percent={percent(transito)}
              color="info"
              icon={<LocalShippingIcon />}
            />
            <StatCard
              title="Entregados"
              value={entregados}
              percent={percent(entregados)}
              color="success"
              icon={<CheckCircleIcon />}
            />
          </Stack>

          {/* ================= DISTRIBUTION BAR ================= */}
          <Paper sx={{ p: 5, borderRadius: 4 }}>
            <Stack spacing={3}>
              <Typography fontWeight={700}>
                Distribución general de estados
              </Typography>

              <Stack
                direction="row"
                sx={{
                  height: 14,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${percent(pendientes)}%`,
                    bgcolor: "warning.main",
                  }}
                />
                <Box
                  sx={{
                    width: `${percent(transito)}%`,
                    bgcolor: "info.main",
                  }}
                />
                <Box
                  sx={{
                    width: `${percent(entregados)}%`,
                    bgcolor: "success.main",
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={3}>
                <Legend
                  color="warning.main"
                  label={`Pendiente (${percent(pendientes)}%)`}
                />
                <Legend
                  color="info.main"
                  label={`En tránsito (${percent(transito)}%)`}
                />
                <Legend
                  color="success.main"
                  label={`Entregado (${percent(entregados)}%)`}
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

/* ================= SUB COMPONENTS ================= */

function StatCard({
  title,
  value,
  percent,
  color,
  icon,
}: {
  title: string;
  value: number;
  percent: number;
  color: "warning" | "info" | "success";
  icon: JSX.Element;
}) {
  return (
    <Paper sx={{ flex: 1, p: 4, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: `${color}.light`,
              color: `${color}.dark`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography fontWeight={700}>{title}</Typography>
        </Stack>

        <Typography variant="h3" fontWeight={800}>
          {value}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={percent}
          color={color}
          sx={{ height: 8, borderRadius: 5 }}
        />
        <Typography color="text.secondary">
          {percent}% del total
        </Typography>
      </Stack>
    </Paper>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
      <Typography fontSize={14}>{label}</Typography>
    </Stack>
  );
}
