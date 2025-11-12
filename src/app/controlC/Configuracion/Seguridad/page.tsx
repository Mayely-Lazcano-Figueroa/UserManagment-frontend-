'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SeguridadPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl w-full">
      <h2 className="text-xl font-semibold text-center mb-2">Seguridad</h2>
      <p className="text-sm text-center text-gray-600 mb-8">
        Opciones y recomendaciones que te ayudan a proteger tu cuenta
      </p>

      {/* ✅ Usamos grid para 2 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {/* Card 1: Cambiar contraseña */}
        <button
          onClick={() => router.push('/controlC/HU8')}
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out bg-white text-gray-800 cursor-pointer min-w-[220px]"
        >
          <div className="p-2 rounded-md bg-blue-50">
            <img
              src="/icons/edit-pass.png"
              alt="Cambiar contraseña"
              className="w-8 h-8 object-contain text-blue-600"
            />
          </div>
          <span className="font-medium">Cambiar contraseña</span>
        </button>

        {/* Card 2: Dispositivos vinculados */}
        <button
          onClick={() =>
            router.push('/controlC/Configuracion/Seguridad/Inicios')
          }
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out bg-white text-gray-800 cursor-pointer min-w-[220px]"
        >
          <div className="p-2 rounded-md bg-blue-50">
            <img
              src="/icons/logins.png"
              alt="Dispositivos vinculados"
              className="w-6 h-6 object-contain text-blue-600"
            />
          </div>
          <span className="font-medium">Inicios de sesión</span>
        </button>

        {/* 🆕 Card 3: Authenticator */}
        <button
          onClick={() =>
            router.push('/controlC/Configuracion/Seguridad/Authenticator')
          }
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out bg-white text-gray-800 cursor-pointer min-w-[220px]"
        >
          <div className="p-2 rounded-md bg-blue-50">
            <img
              src="/icons/authenticator.png"
              alt="Authenticator"
              className="w-6 h-6 object-contain text-blue-600"
            />
          </div>
          <span className="font-medium">Authenticator</span>
        </button>
      </div>
    </div>
  );
}
