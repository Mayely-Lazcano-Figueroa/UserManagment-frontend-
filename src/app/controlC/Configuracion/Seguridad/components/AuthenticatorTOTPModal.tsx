'use client';
import { Dispatch, SetStateAction } from 'react';

interface AuthenticatorTOTPModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  regresarSesionModal: () => void;
}

export default function AuthenticatorTOTPModal({
  showModal,
  setShowModal,
  regresarSesionModal
}: AuthenticatorTOTPModalProps) {
  if (!showModal) return null;

  const handleCerrar = () => {
    setShowModal(false);
    regresarSesionModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-servineo-500 mb-6">Authenticator TOTP</h2>
        <button
          onClick={handleCerrar}
          className="rounded-md bg-[#1A223F] px-6 py-3 text-white font-semibold hover:bg-[#2B31E0]"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
