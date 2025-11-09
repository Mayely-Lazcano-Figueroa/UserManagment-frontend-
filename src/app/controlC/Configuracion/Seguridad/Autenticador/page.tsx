"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Edit, Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../HU3/hooks/usoAutentificacion";
import UserMenu from "../../../HU3/components/UI/menuUsuario";
import { useState } from "react";
import AuthConfigureModal from "./components/AuthConfigureModal"; // <-- asegurate la ruta

export default function AutenticadorIntroPage() {
  const { user } = useAuth();
  const router = useRouter();

  type SafeUser = { name?: string; email?: string; url_photo?: string };
  const safeUser = (user as SafeUser) ?? null;

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Control del modal
  const [modalOpen, setModalOpen] = useState(false);

  function getInitials(name: string) {
    const clean = (name || "").trim();
    if (!clean) return "U";
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header (igual a las demás secciones) */}
      <header
        className="flex justify-between items-center px-10 py-6 shadow-sm border-b border-white/20 text-white"
        style={{
          background: "linear-gradient(135deg, #2B31E0 0%, #1AA7ED 50%, #5E2BE0 100%)",
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
                  <img
                    src={safeUser.url_photo}
                    alt={safeUser.name ?? safeUser.email ?? "Usuario"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold text-white">
                    {getInitials(safeUser.name ?? safeUser.email ?? "")}
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

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar (igual que Configuración) */}
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
                    pathname === "/controlC/HU5"
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600 hover:font-semibold"
                  }`}
                >
                  <img src="/icons/edit-config.png" alt="Editar Perfil" className="w-6 h-6" />
                  Editar Perfil
                </button>
              </Link>

              <Link href="/controlC/Configuracion/Seguridad" className="block">
                <button
                  className={`cursor-pointer flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-all duration-300 ease-out ${
                    pathname === "/controlC/Configuracion/Seguridad"
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600 hover:font-semibold"
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

        {/* Main content: intro to authenticator */}
        <main className="flex-1 flex items-start justify-center p-8">
          <div className="w-full max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition cursor-pointer"
                aria-label="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">Aplicación authenticator</h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-6">
                En vez de esperar a que lleguen mensajes de texto, puedes obtener códigos de verificación desde una
                aplicación de autenticación.
              </p>

              <p className="text-center text-sm text-gray-600 mb-6">
                Primero, descarga Google Authenticator desde{" "}
                <a className="text-blue-600 hover:underline" href="https://play.google.com/store" target="_blank" rel="noreferrer">
                  Google Play Store
                </a>{" "}
                o desde{" "}
                <a className="text-blue-600 hover:underline" href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
                  App Store
                </a>{" "}
                de iOS.
              </p>

              <div className="flex justify-center">
                {/* Ahora abrimos el modal en vez de navegar a otra página */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-3 px-5 py-2 border border-red-200 rounded-lg bg-white hover:shadow-md transition-all duration-250 ease-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l2 2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.28 18.9l.06-.06A1.65 1.65 0 004.67 17c-.02-.33-.08-.66-.18-.97A2 2 0 013.8 12c0-.34.03-.67.09-.99.1-.31.16-.64.18-.97a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008.5 4.67c.33.02.66.08.97.18.31.1.64.16.97.18.34.02.67.03 1.01.03s.67-.01 1.01-.03c.33-.02.66-.08.97-.18.31-.1.64-.16.97-.18a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06c.36.35.55.83.5 1.32z" />
                  </svg>
                  <span className="text-sm text-gray-700">Configurar autenticador</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal component */}
      <AuthConfigureModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
