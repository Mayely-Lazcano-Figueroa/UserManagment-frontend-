// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthQRModal.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
  onNext: (qrDataUrl: string | null) => void; // llama para abrir el modal de verificación
};

export default function AuthQRModal({ open, onClose, onNext }: Props) {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setQr(null);
      setMessage(null);
      setLoading(false);
    }
  }, [open]);

  async function handleGenerate() {
    try {
      setLoading(true);
      setMessage(null);

      // Ajusta API_BASE si necesitas apuntar a otro servidor (NEXT_PUBLIC_API_URL)
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
      const url = API_BASE ? `${API_BASE}/api/twofactor/generate` : "/api/twofactor/generate";

      const res = await axios.post(url, {}, { withCredentials: true });
      if (res.data?.qr) {
        setQr(res.data.qr);
      } else {
        setMessage("No se recibió QR del servidor.");
      }
    } catch (err: any) {
      console.error("generate qr error", err);
      setMessage(err?.response?.data?.message || err?.message || "Error generando QR");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-gray-50 border rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Configurar aplicación de autenticación</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="min-h-[220px] flex flex-col items-center gap-4">
          {!qr && (
            <>
              <p className="text-sm text-gray-700 text-center">Escanea un código QR con Google Authenticator.</p>
              {message && <p className="text-sm text-red-600">{message}</p>}
              <button onClick={handleGenerate} disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">
                {loading ? "Generando..." : "Generar QR"}
              </button>
            </>
          )}

          {qr && (
            <>
              <div className="w-48 h-48 bg-white p-3 rounded shadow-inner border">
                <img src={qr} alt="QR" className="w-full h-full object-contain" />
              </div>
              <p className="text-sm text-gray-600 text-center">Escanea el QR con Google Authenticator. Luego pulsa Siguiente.</p>
              {message && <p className="text-sm text-red-600">{message}</p>}
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 rounded border text-red-600">Cancelar</button>

          <div>
            <button
              onClick={() => onNext(qr)}
              className="px-4 py-2 rounded bg-purple-600 text-white"
              disabled={!qr}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
