'use client';
import { useState } from 'react';

interface AuthenticatorTOTPModalProps {
  showModal: boolean;
  setShowModal: () => void; // cierra este modal
  regresarSesionModal: () => void; // abre modal de sesión
  email: string;
}

export default function AuthenticatorTOTPModal({
  showModal,
  setShowModal,
  regresarSesionModal,
  email
}: AuthenticatorTOTPModalProps) {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);

  if (!showModal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora no hacemos nada con el código
  };

  // Colores para las letras de "Google Authenticator"
  const colors = ['text-blue-500','text-red-500','text-yellow-500','text-blue-500','text-green-500','text-red-500','text-yellow-500'];
  const text = 'Google Authenticator';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[520px] rounded-lg shadow-lg p-8">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-servineo-500 mb-1">
          <span className="text-servineo-400">Servineo</span>
        </h2>
        <p className="text-2xl font-bold text-center text-servineo-500 mb-6">
          Authenticator App
        </p>

        {/* Texto lateral izquierdo */}
        <p className="block text-sm font-semibold text-gray-600 mb-10">
          Bienvenido {email}!!
        </p>

        {/* Texto centrado */}
        <p className="block text-sm font-semibold text-gray-600 mb-2 mt-4 text-center">
          Ingrese el código que muestra en
        </p>

        {/* Google Authenticator con letras coloreadas */}
        <p className="text-center mb-6 text-2xl font-bold">
          {text.split('').map((char, idx) => {
            const colorClass = colors[idx % colors.length];
            return (
              <span key={idx} className={colorClass}>
                {char}
              </span>
            );
          })}
        </p>

        {/* Formulario del código */}
        <form
          onSubmit={handleSubmit}
          className={`bg-white rounded-lg w-[420px] p-6 shadow-lg border mx-auto transition-all duration-300 ${shake ? 'animate-shake border-red-400' : ''}`}
        >
          <h3 className="text-lg font-semibold mb-2 text-center">Ingresa el código de autenticador</h3>
          <p className="text-sm text-gray-600 mb-4 text-center">Introduce los 6 dígitos que muestra tu app de autenticación.</p>

          <input
            autoFocus
            inputMode="numeric"
            pattern="[0-9]*"
            value={code}
            onChange={handleChange}
            className={`w-full p-2 border rounded mb-2 font-mono text-lg text-center tracking-widest transition-all ${
              errorMsg ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="••••••"
          />

          {errorMsg && <div className="text-red-600 text-sm mb-3 text-center font-medium">{errorMsg}</div>}

          {/* Botones */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleVolver}
              className="flex-1 rounded-md bg-[#E5F4FB] px-4 py-2 text-[#1A223F] font-semibold hover:bg-[#2BDDE0]/20"
            >
              Volver
            </button>

            <button
              type="submit"
              className="flex-1 rounded-md bg-[#1A223F] px-4 py-2 text-white font-semibold hover:bg-[#2B31E0]"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function handleVolver() {
    setShowModal();       // cierra este modal
    regresarSesionModal(); // vuelve a modal de sesión
  }
}
