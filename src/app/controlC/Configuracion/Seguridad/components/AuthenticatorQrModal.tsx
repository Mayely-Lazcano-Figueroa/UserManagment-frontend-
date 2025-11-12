'use client';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  qrDataUrl?: string | null;
  onNext: () => void;
  loading?: boolean;
}

export default function AuthenticatorQrModal({ open, onClose, qrDataUrl, onNext, loading }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-[480px] p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-3">Configurar aplicación de autenticación</h3>
        <div className="text-sm text-gray-600 mb-4">
          <ul className="list-disc ml-5">
            <li>En la aplicación Google Authenticator, toca el icono <strong>+</strong>.</li>
            <li>Elige <strong>Escanear un código QR</strong>.</li>
          </ul>
        </div>

        <div className="flex items-center justify-center py-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt="QR 2FA" className="w-48 h-48 object-contain" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 border rounded">Cargando...</div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-sm bg-white text-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white disabled:opacity-60"
            disabled={!qrDataUrl || loading}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
