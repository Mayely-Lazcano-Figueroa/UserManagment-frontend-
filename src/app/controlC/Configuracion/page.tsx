'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Edit, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../HU3/hooks/usoAutentificacion';
import UserMenu from '../HU3/components/UI/menuUsuario';
import { useState } from 'react';

export default function ConfiguracionPage() {
  const { user } = useAuth();
  const router = useRouter();

  type SafeUser = { name?: string; email?: string; url_photo?: string };
  const safeUser = (user as SafeUser) ?? null;

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para iniciales (igual que HomePage)
  function getInitials(name: string) {
    const clean = (name || '').trim();
    if (!clean) return 'U';
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Header con fondo degradado (igual al HomePage) */}
      

        {/* Contenido principal */}
        <main className="flex-1 flex flex-col items-center text-center p-8 relative">
          

          <div className="flex flex-col items-center justify-top flex-1 mt-10">
            {safeUser ? (
              <>
                {/* Avatar (foto o iniciales) */}
                <div className="mb-4">
                  {safeUser.url_photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={safeUser.url_photo}
                      alt="Foto de perfil"
                      className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover mb-4 shadow-sm"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-semibold text-blue-700 mb-4 shadow-sm border-4 border-blue-200">
                      {getInitials(safeUser.name ?? safeUser.email ?? '')}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Te damos la bienvenida,{' '}
                  <span className="text-blue-600">{safeUser.name ?? 'Usuario'}</span>
                </h2>
                <p className="text-gray-600 max-w-md">
                  Gestiona tu información, privacidad y seguridad para mejorar tu experiencia en{' '}
                  <strong>Servineo</strong>.
                </p>
              </>
            ) : (
              <p className="text-gray-600">Inicia sesión para ver tus configuraciones.</p>
            )}
          </div>
        </main>
      </div>
  );
}
