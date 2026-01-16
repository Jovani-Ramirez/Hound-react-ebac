import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Guia {
  numero: string;
  origen: string;
  destino: string;
  destinatario: string;
  fecha: string;
  estado: string;
}

export interface GuiasState {
  items: Guia[];
}

const initialState: GuiasState = {
  items: [],
};

const guiasSlice = createSlice({
  name: "guias",
  initialState,
  reducers: {
    addGuia(state, action: PayloadAction<Guia>) {
      state.items.push(action.payload);
    },

    updateGuiaEstado(
      state,
      action: PayloadAction<{ numero: string; estado: string }>
    ) {
      const guia = state.items.find(
        (g) => g.numero === action.payload.numero
      );
      if (guia) {
        guia.estado = action.payload.estado;
      }
    },

    deleteGuia(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (g) => g.numero !== action.payload
      );
    },
  },
});

export const {
  addGuia,
  updateGuiaEstado,
  deleteGuia,
} = guiasSlice.actions;

export default guiasSlice.reducer;
