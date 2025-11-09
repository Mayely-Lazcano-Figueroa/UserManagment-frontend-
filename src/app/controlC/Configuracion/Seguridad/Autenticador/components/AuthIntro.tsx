// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthIntro.tsx
"use client";

import React from "react";

type Props = {
  onStart: () => void;
  loading?: boolean;
};

export default function AuthIntro({ onStart, loading = false }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        En vez de esperar a que lleguen mensajes de texto, puedes obtener códigos de verificación desde una aplicación de autenticación.
      </p>

      <ul className="list-disc ml-6 text-sm text-gray-700">
        <li>Abre Google Authenticator en tu teléfono.</li>
        <li>Toca el icono <span className="font-semibold">+</span> y elige "Escanear un código QR".</li>
      </ul>

      <div className="text-center mt-4">
        <button
          onClick={onStart}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l2 2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.28 18.9l.06-.06A1.65 1.65 0 004.67 17c-.02-.33-.08-.66-.18-.97A2 2 0 013.8 12c0-.34.03-.67.09-.99.1-.31.16-.64.18-.97a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008.5 4.67c.33.02.66.08.97.18.31.1.64.16.97.18.34.02.67.03 1.01.03s.67-.01 1.01-.03c.33-.02.66-.08.97-.18.31-.1.64-.16.97-.18a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06c.36.35.55.83.5 1.32z" />
          </svg>
          Configurar autenticador
        </button>
      </div>
    </div>
  );
}
