'use client';

import { useState } from 'react';

interface AuthenticatorCodigoModalProps {
  showModal: boolean;
  cerrarModal: () => void;
  volverATOTP: () => void;
  email: string;
}

export default function AuthenticatorCodigoModal({
  showModal,
  cerrarModal,
  volverATOTP,
  email
}: AuthenticatorCodigoModalProps) {

  const [codigo, setCodigo] = useState('');

  if (!showModal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Solo letras y números
    setCodigo(value.slice(0, 10)); // Máximo 10 caracteres
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[520px] rounded-lg shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-servineo-500 mb-1">
          <span className="text-servineo-400">Servineo</span>
        </h2>

        <p className="text-2xl font-bold text-center text-servineo-500 mb-6">
          Authenticator App
        </p>

        <p className="block text-sm font-semibold text-gray-600 mb-2">
          Ingresar con código de recuperación
        </p>

        <form className="bg-white rounded-lg w-[420px] p-6 shadow-lg border mx-auto mt-2">

          <p className="text-sm text-gray-600 mb-4 text-center">
            Ingresa uno de los códigos de recuperación que se te otorgó al momento
            de configurar inicio de sesión con Authenticator.
          </p>

          <input
            placeholder="Ingrese un código de recuperación"
            value={codigo}
            onChange={handleChange}
            maxLength={10}
            className="w-full border border-gray-300 rounded-xl p-3.5 text-gray-800
                       text-center font-mono focus:outline-none focus:ring-2
                       focus:ring-servineo-400 focus:border-servineo-300 transition"
            required
          />

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                cerrarModal();
                volverATOTP();
              }}
              className="flex-1 rounded-md bg-[#E5F4FB] px-4 py-2 text-[#1A223F] font-semibold hover:bg-[#2BDDE0]/20"
            >
              Volver
            </button>

            <button
              type="button"
              className="flex-1 rounded-md bg-[#1A223F] px-4 py-2 text-white font-semibold hover:bg-[#2B31E0]"
            >
              Ingresar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}