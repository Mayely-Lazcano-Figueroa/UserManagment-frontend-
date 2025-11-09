// src/app/controlC/Configuracion/Seguridad/Autenticador/components/AuthStatusBadge.tsx
"use client";

import React from "react";

type Props = {
  addedAt?: string | null;
  onManage?: () => void;
};

export default function AuthStatusBadge({ addedAt, onManage }: Props) {
  return (
    <div className="border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
          {/* icon QR */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="8" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
            <rect x="13" y="13" width="4" height="4" rx="1" />
          </svg>
        </div>

        <div>
          <div className="text-sm font-medium">Tu autenticador</div>
          <div className="text-xs text-gray-500">Authenticator</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm text-gray-500">{addedAt ? `Agregada: ${addedAt}` : ""}</div>
        {onManage && (
          <button onClick={onManage} className="mt-2 px-3 py-1 rounded border text-sm text-blue-600">Gestionar</button>
        )}
      </div>
    </div>
  );
}
