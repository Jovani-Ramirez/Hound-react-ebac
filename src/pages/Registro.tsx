import { useState, type FormEvent, type JSX } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Paper,
  Dialog,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Zoom,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import type { Guia } from "../models/Guia.interface";
import { useAppDispatch } from "../hooks/guias";
import { addGuia } from "../store/guiasSlice";

/* ================= COMPONENT ================= */

export default function Registro(): JSX.Element {
  const dispatch = useAppDispatch();

  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const [openAlert, setOpenAlert] = useState(false);
  const [copied, setCopied] = useState(false);
  const [guiaRegistrada, setGuiaRegistrada] = useState("");

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const nuevaGuia: Guia = {
      numero: data.numero as string,
      origen: data.origen as string,
      destino: data.destino as string,
      destinatario: data.destinatario as string,
      estado: data.estado as string,
      fecha: fecha ? fecha.format("YYYY-MM-DD") : "",
    };

    dispatch(addGuia(nuevaGuia));

    setGuiaRegistrada(nuevaGuia.numero);
    setOpenAlert(true);

    e.currentTarget.reset();
    setFecha(dayjs());

    setTimeout(() => {
      setOpenAlert(false);
    }, 4000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(guiaRegistrada);
    setCopied(true);
  };

  /* ================= UI ================= */

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={6}>
          {/* ================= LEFT BRANDING ================= */}
          <Box
            sx={{
              flex: 1,
              borderRadius: 6,
              p: 5,
              color: "white",
              background: "linear-gradient(135deg, #091e3f, #6ac6de)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" fontWeight={800} mb={2}>
              Hound Express
            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.9 }} mb={4}>
              La velocidad de un sabueso,
              <br />
              la precisión de un rastreador.
            </Typography>

            <Stack spacing={2}>
              <Feature
                icon={<LocalShippingIcon />}
                text="Registro rápido de envíos"
              />
              <Feature
                icon={<TrackChangesIcon />}
                text="Seguimiento centralizado"
              />
              <Feature
                icon={<VerifiedIcon />}
                text="Información segura y confiable"
              />
            </Stack>
          </Box>

          {/* ================= FORM ================= */}
          <Paper elevation={10} sx={{ flex: 1, borderRadius: 6, p: 5 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Registrar guía
                </Typography>
                <Typography color="text.secondary">
                  Captura los datos del envío
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField name="numero" label="Número de guía" required />
                  <TextField name="origen" label="Origen" required />
                  <TextField name="destino" label="Destino" required />
                  <TextField
                    name="destinatario"
                    label="Destinatario"
                    required
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de envío"
                      value={fecha}
                      onChange={(newValue) => setFecha(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    name="estado"
                    label="Estado"
                    select
                    defaultValue="Pendiente"
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="En tránsito">En tránsito</MenuItem>
                    <MenuItem value="Entregado">Entregado</MenuItem>
                  </TextField>

                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{
                      py: 1.6,
                      borderRadius: 3,
                      fontWeight: 700,
                      background: "linear-gradient(90deg, #091e3f, #2563eb)",
                    }}
                  >
                    Registrar envío
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* ================= SUCCESS MODAL ================= */}
      <Dialog
        open={openAlert}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: 6,
            px: 4,
            py: 5,
            textAlign: "center",
            maxWidth: 420,
          },
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 30px rgba(34,197,94,0.4)",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 56, color: "white" }} />
          </Box>

          <Typography variant="h5" fontWeight={800}>
            ¡Guía registrada!
          </Typography>

          <Typography color="text.secondary">
            El envío fue guardado correctamente.
          </Typography>

          <Box
            sx={{
              px: 3,
              py: 1,
              borderRadius: 3,
              backgroundColor: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography fontWeight={600}>#{guiaRegistrada}</Typography>

            <Tooltip title="Copiar">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpenAlert(false)}
            sx={{
              py: 1.4,
              borderRadius: 3,
              fontWeight: 700,
              background: "linear-gradient(90deg, #091e3f, #2563eb)",
            }}
          >
            Continuar
          </Button>
        </Stack>
      </Dialog>

      {/* ================= COPIED SNACKBAR ================= */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success" variant="filled">
          Número copiado al portapapeles
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ================= FEATURE ================= */

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography fontWeight={500}>{text}</Typography>
    </Stack>
  );
}
