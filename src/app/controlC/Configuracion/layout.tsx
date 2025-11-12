// src/app/controlC/Configuracion/layout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../HU3/hooks/usoAutentificacion';
import UserMenu from '../HU3/components/UI/menuUsuario';

type Props = { children: React.ReactNode };

export default function ConfiguracionLayout({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  type SafeUser = { name?: string; email?: string; url_photo?: string };
  const safeUser = (user as SafeUser) ?? null;

  function getInitials(name: string) {
    const clean = (name || '').trim();
    if (!clean) return 'U';
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header
        className="flex justify-between items-center px-10 py-6 shadow-sm border-b border-white/20 text-white"
        style={{
          background: 'linear-gradient(135deg, #2B31E0 0%, #1AA7ED 50%, #5E2BE0 100%)',
        }}
      >
        <h1 className="text-2xl font-bold tracking-wide">SERVINEO</h1>

        <div>
          {safeUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 focus:outline-none cursor-pointer"
                aria-expanded={menuOpen}
                aria-label="Abrir menú de usuario"
                title={safeUser.name ?? safeUser.email}
              >
                {safeUser.url_photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={safeUser.url_photo}
                    alt={safeUser.name ?? safeUser.email ?? 'Usuario'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {getInitials(safeUser.name ?? safeUser.email ?? '')}
                  </div>
                )}
              </button>

              <span className="hidden sm:inline-block font-medium text-white/95 select-none">
                {safeUser.name ?? safeUser.email}
              </span>

              <UserMenu open={menuOpen} onToggle={() => setMenuOpen((s) => !s)} />
            </div>
          ) : (
            <Link
              href="/controlC/HU4/login"
              className="px-6 py-3 text-lg text-white bg-[#2B31E0] rounded-lg font-medium hover:bg-[#1AA7ED] transition cursor-pointer"
            >
              Registrarse
            </Link>
          )}
        </div>
      </header>

      {/* Layout con aside + main */}
      <div className="flex flex-1">
        <aside className="w-64 bg-white p-6 flex flex-col justify-between relative shadow-md">
          <div className="absolute right-0 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-transparent via-gray-300/90 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <button
                  onClick={() => router.back()}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                  title="Volver"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                Configuración
              </h2>
            </div>

            <nav className="space-y-2">
              <Link href="/controlC/HU5" className="block">
                <button
                  className={`cursor-pointer flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-all duration-300 ease-out ${
                    pathname === '/controlC/HU5'
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'hover:bg-blue-50 hover:text-blue-600 hover:font-semibold'
                  }`}
                >
                  <img src="/icons/edit-config.png" alt="Editar Perfil" className="w-6 h-6" />
                  Editar Perfil
                </button>
              </Link>

              <Link href="/controlC/Configuracion/Seguridad" className="block">
                <button
                  className={`cursor-pointer flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-all duration-300 ease-out ${
                    pathname?.startsWith('/controlC/Configuracion/Seguridad')
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'hover:bg-blue-50 hover:text-blue-600 hover:font-semibold'
                  }`}
                >
                  <img src="/icons/seguridad-config.png" alt="Seguridad" className="w-7 h-7" />
                  Seguridad
                </button>
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center text-sm text-gray-500 border-t pt-4 gap-2">
            <Link href="#" className="hover:text-blue-600">
              Términos
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Ayuda
            </Link>
          </div>
        </aside>

        {/* Aquí se renderiza SOLO el main cambiante */}
        <main className="flex-1 flex flex-col items-center text-center p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
