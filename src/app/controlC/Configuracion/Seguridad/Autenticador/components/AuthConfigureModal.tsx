// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthConfigureModal.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AuthIntro from "./AuthIntro";
import AuthQR from "./AuthQR";
import AuthStatusBadge from "./AuthStatusBadge";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthConfigureModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"intro" | "qr" | "verify" | "done">("intro");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [addedAt, setAddedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep("intro");
      setQrDataUrl(null);
      setToken("");
      setMessage(null);
      setBackupCodes(null);
      setLoading(false);
    }
  }, [open]);

  // Si usas JWT en localStorage, ponlo en headers:
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function handleStart() {
    setMessage(null);
    try {
      setLoading(true);
      const res = await axios.post("/api/twofactor/generate", {}, { withCredentials: true });
      if (res.data?.qr) {
        setQrDataUrl(res.data.qr);
        setStep("qr");
      } else {
        setMessage("No se recibió QR del servidor.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Error generando QR");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e?: React.FormEvent) {
    e?.preventDefault();
    if (!token) return setMessage("Introduce el código de 6 dígitos");
    try {
      setLoading(true);
      setMessage(null);
      const res = await axios.post("/api/twofactor/verify", { token }, { withCredentials: true });
      if (res.data?.backupCodes) {
        setBackupCodes(res.data.backupCodes);
      }
      // opcional: setAddedAt con fecha actual
      setAddedAt(new Date().toLocaleDateString());
      setStep("done");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || err?.response?.data?.error || "Código inválido");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />

      <div className="relative z-10 w-full max-w-lg mx-4 bg-gray-50 border rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Configurar aplicación de autenticación</h3>
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 p-1 rounded">✕</button>
        </div>

        <div className="min-h-[220px]">
          {step === "intro" && <AuthIntro onStart={handleStart} loading={loading} />}

          {step === "qr" && (
            <AuthQR
              qrDataUrl={qrDataUrl}
              onNext={() => setStep("verify")}
              onBack={() => setStep("intro")}
              loading={loading}
              message={message}
            />
          )}

          {step === "verify" && (
            <form onSubmit={handleVerify} className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-700">Introduce el código de seis dígitos que se muestra en la aplicación.</span>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  className="mt-2 block w-full border rounded p-2"
                />
              </label>

              {message && <p className="text-sm text-red-600">{message}</p>}

              <div className="flex items-center justify-between mt-3">
                <button type="button" onClick={() => setStep("qr")} className="px-4 py-2 rounded border">←</button>
                <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white">Verificar</button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-3">
              <div className="text-sm text-green-700">Autenticador activado correctamente.</div>
              <AuthStatusBadge addedAt={addedAt} onManage={() => {}} />

              <div>
                <p className="text-sm text-gray-700 mt-2">Backup codes (guárdalos en un lugar seguro). Cada código se usa una sola vez.</p>
                <ul className="list-disc ml-6 mt-2 font-mono">
                  {backupCodes?.map((c) => (
                    <li key={c} className="text-sm">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={handleCancel} className="px-4 py-2 rounded border text-sm text-red-600">Cancelar</button>

          <div>
            {step === "intro" && null}
            {step === "qr" && null}
            {step === "verify" && null}
            {step === "done" && (
              <button onClick={handleCancel} className="px-4 py-2 rounded bg-green-600 text-white">Listo</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
