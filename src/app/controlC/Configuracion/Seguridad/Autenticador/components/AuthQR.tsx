// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthQR.tsx
"use client";

import React from "react";

type Props = {
  qrDataUrl?: string | null;
  onNext: () => void;
  onBack?: () => void;
  loading?: boolean;
  message?: string | null;
};

export default function AuthQR({ qrDataUrl, onNext, onBack, loading = false, message }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-56 h-56 bg-white p-4 rounded shadow-inner border">
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="QR para autenticador" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">QR no disponible</div>
        )}
      </div>

      <p className="text-sm text-gray-600 text-center">
        Escanea este QR con la aplicación Google Authenticator. Luego haz clic en Siguiente.
      </p>

      {message && <p className="text-sm text-red-600">{message}</p>}

      <div className="flex items-center gap-3">
        <button onClick={onBack} className="px-4 py-2 rounded border" disabled={loading}>Cancelar</button>
        <button onClick={onNext} className="px-4 py-2 rounded bg-purple-600 text-white" disabled={loading}>Siguiente</button>
      </div>
    </div>
  );
}
