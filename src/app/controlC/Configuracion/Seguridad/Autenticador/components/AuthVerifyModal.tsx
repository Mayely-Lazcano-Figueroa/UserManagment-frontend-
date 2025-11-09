// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthVerifyModal.tsx
"use client";

import { useState } from "react";
import axios from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
  onBack: () => void; // volver al modal QR
  initialQrPresent?: boolean; // opcional para UX
  onVerified: (backupCodes: string[] | null) => void; // callback al completar
};

export default function AuthVerifyModal({ open, onClose, onBack, onVerified, initialQrPresent }: Props) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function reset() {
    setToken("");
    setMessage(null);
    setLoading(false);
  }

  // limpiar al abrir/cerrar
  if (!open) {
    reset();
    return null;
  }

  async function handleVerify(e?: React.FormEvent) {
    e?.preventDefault();
    if (!token) return setMessage("Introduce el código de 6 dígitos");
    try {
      setLoading(true);
      setMessage(null);

      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
      const url = API_BASE ? `${API_BASE}/api/twofactor/verify` : "/api/twofactor/verify";

      const res = await axios.post(url, { token }, { withCredentials: true });
      if (res.data?.backupCodes) {
        onVerified(res.data.backupCodes);
      } else {
        onVerified(null);
      }
    } catch (err: any) {
      console.error("verify error", err);
      setMessage(err?.response?.data?.message || err?.response?.data?.error || "Código inválido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-gray-50 border rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Introduce el código</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <form onSubmit={handleVerify} className="space-y-3">
          <p className="text-sm text-gray-700">Introduce el código de seis dígitos que aparece en la aplicación.</p>

          <input
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            className="block w-full border rounded p-2"
          />

          {message && <p className="text-sm text-red-600">{message}</p>}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={onBack} className="px-4 py-2 rounded border">←</button>
              <button type="button" onClick={onClose} className="px-4 py-2 rounded border text-red-600">Cancelar</button>
            </div>

            <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white" disabled={loading}>
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
