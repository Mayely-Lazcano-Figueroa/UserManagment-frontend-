'use client';
import { useState } from 'react';
import { api, ApiResponse } from '../../lib/api';
import { Eye, EyeOff } from 'lucide-react';
import LoginGoogle from "../signIn/LoginGoogle";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/usoAutentificacion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPass, setMostrarPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: ApiResponse<any> = await api.post('/auth/login', { email, password });
      if (res.success && res.data) {
        const data = res.data;
        localStorage.setItem("servineo_token", data.token);
        localStorage.setItem("servineo_user", JSON.stringify(data.user));
        setUser(data.user);
        const mensajeExito = data.message || `¡Cuenta Creada Exitosamente! Bienvenido, ${data.user.name}!`;
        sessionStorage.setItem("toastMessage", mensajeExito);
        router.push('/');
      } else {
        const mensajeError =
          res.message || res.data?.message || res.error || 'Credenciales inválidas o error en el servidor.';
        toast.error(mensajeError, { position: "top-center", autoClose: 3000, theme: "colored" });
      }
    } catch (err: any) {
      toast.error(`Error: ${err?.message ?? 'No se pudo conectar con el servidor.'}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-foreground">
      {/* Fondo ultra sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base sólida del tema */}
        <div className="absolute inset-0 bg-background" />
        {/* Degradado casi imperceptible */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        {/* Patrón MUY tenue */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]" />
      </div>

      {/* Card de Login */}
      <div className="w-full max-w-sm bg-card/95 backdrop-blur-sm rounded-3xl shadow-lg p-10 border border-border/70">
        {/* Título con gradiente MUY leve */}
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">
          Iniciar sesión <span className="sr-only">Servineo</span>
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">Modo requester</p>

        <form onSubmit={manejarLogin} className="flex flex-col gap-5">
          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Correo electrónico*
            </label>
            <input
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl p-3.5 text-foreground bg-background border border-border
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
              required
              autoComplete="email"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Contraseña*
            </label>
            <div className="relative">
              <input
                type={mostrarPass ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl p-3.5 pr-10 text-foreground bg-background border border-border
                           focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setMostrarPass(!mostrarPass)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary/80 transition"
                aria-label={mostrarPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Enlace auxiliar */}
          <div className="flex justify-end items-center">
            <Link href="/userManagement/requester/signIn/forgotpass" className="text-primary/90 hover:text-primary underline-offset-2 hover:underline text-sm font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón ingresar (color suave) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl p-3.5 mt-2 font-semibold text-primary-foreground
                       bg-primary/90 hover:bg-primary transition-all duration-300
                       shadow-sm hover:shadow disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        {/* Separador */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-border/70" />
          <span className="px-2 text-muted-foreground text-sm">o</span>
          <div className="flex-1 h-px bg-border/70" />
        </div>

        {/* Botón Google */}
        <div className="mt-4">
          <LoginGoogle
            onMensajeChange={(msg, tipo) =>
              tipo === 'error'
                ? toast.error(msg, { position: 'top-center', theme: 'colored' })
                : null
            }
          />
        </div>

        {/* Registro */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => router.push('../FormularioRegistro')}
            className="text-primary/90 hover:text-primary font-medium underline-offset-2 hover:underline"
          >
            Regístrate
          </button>
        </p>
      </div>

      {/* Toasts */}
      <ToastContainer />
    </main>
  );
}
