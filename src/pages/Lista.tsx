import { useState, type JSX } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Stack,
  Fade,
  Zoom,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useAppDispatch, useAppSelector } from "../hooks/guias";
import {
  deleteGuia,
  updateGuiaEstado,
} from "../store/guiasSlice";
import type { Guia } from "../models/Guia.interface";

/* ================= COMPONENT ================= */

export const Lista = (): JSX.Element => {
  const dispatch = useAppDispatch();

  /* 🔥 Redux state */
  const guias = useAppSelector((state) => state.guias.items);

  /* UI state */
  const [selected, setSelected] = useState<Guia | null>(null);
  const [estado, setEstado] = useState("");

  const [editDialog, setEditDialog] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  /* ================= ACTIONS ================= */

  const openEdit = (guia: Guia) => {
    setSelected(guia);
    setEstado(guia.estado);
    setEditDialog(true);
  };

  const saveEdit = () => {
    if (!selected) return;

    dispatch(
      updateGuiaEstado({
        numero: selected.numero,
        estado,
      })
    );

    setEditDialog(false);
    setConfirmEdit(false);
    setSuccessMsg("Estado actualizado correctamente");
    setSuccess(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    dispatch(deleteGuia(selected.numero));

    setConfirmDelete(false);
    setSuccessMsg("Guía eliminada correctamente");
    setSuccess(true);
  };

  const estadoColor = (estado: string) => {
    if (estado === "Entregado") return "success";
    if (estado === "En tránsito") return "warning";
    return "default";
  };

  /* ================= UI ================= */

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4" fontWeight={800}>
              Listado de Guías
            </Typography>
            <Typography color="text.secondary">
              Administra y actualiza el estado de tus envíos
            </Typography>
          </Box>

          {guias.length === 0 ? (
            <Fade in>
              <Box
                sx={{
                  height: 360,
                  backgroundColor: "white",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Zoom in>
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: 90, color: "primary.main" }}
                  />
                </Zoom>
                <Typography fontWeight={700}>
                  No hay guías registradas
                </Typography>
              </Box>
            </Fade>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Guía</strong></TableCell>
                    <TableCell>Origen</TableCell>
                    <TableCell>Destino</TableCell>
                    <TableCell>Destinatario</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guias.map((g) => (
                    <TableRow key={g.numero} hover>
                      <TableCell>{g.numero}</TableCell>
                      <TableCell>{g.origen}</TableCell>
                      <TableCell>{g.destino}</TableCell>
                      <TableCell>{g.destinatario}</TableCell>
                      <TableCell>{g.fecha}</TableCell>
                      <TableCell>
                        <Chip
                          label={g.estado}
                          color={estadoColor(g.estado)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => openEdit(g)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelected(g);
                            setConfirmDelete(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </Container>

      {/* ================= EDIT ================= */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Editar estado</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="En tránsito">En tránsito</MenuItem>
            <MenuItem value="Entregado">Entregado</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setConfirmEdit(true)}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= CONFIRM EDIT ================= */}
      <ConfirmDialog
        open={confirmEdit}
        title="¿Guardar cambios?"
        onCancel={() => setConfirmEdit(false)}
        onConfirm={saveEdit}
      />

      {/* ================= CONFIRM DELETE ================= */}
      <ConfirmDialog
        open={confirmDelete}
        title="¿Eliminar esta guía?"
        subtitle="Esta acción no se puede deshacer"
        danger
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />

      {/* ================= SUCCESS ================= */}
      <Dialog open={success} TransitionComponent={Zoom}>
        <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 48, color: "white" }} />
          </Box>
          <Typography fontWeight={800}>{successMsg}</Typography>
          <Button variant="contained" onClick={() => setSuccess(false)}>
            Continuar
          </Button>
        </Stack>
      </Dialog>
    </Box>
  );
};

/* ================= CONFIRM DIALOG ================= */

function ConfirmDialog({
  open,
  title,
  subtitle,
  danger,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} TransitionComponent={Zoom}>
      <Stack spacing={2} sx={{ p: 4 }}>
        <Typography fontWeight={800}>{title}</Typography>
        {subtitle && (
          <Typography color="text.secondary">{subtitle}</Typography>
        )}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancelar</Button>
          <Button
            variant="contained"
            color={danger ? "error" : "primary"}
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
