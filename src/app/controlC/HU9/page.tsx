// src/app/controlC/HU9/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BASE_API =
  `${process.env.NEXT_PUBLIC_API_URL}/api/controlC`;

export default function RecuperacionCorreoPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(id);
    }
  }, [error]);

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError('El correo no puede estar vacío');
    if (!emailValid) return setError('Correo inválido');

    setLoading(true);
    const fallback = setTimeout(() => setError('Estamos tardando más de lo normal…'), 3000);

    try {
      const res = await fetch(`${BASE_API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('servineo_last_email', email);
        }
        router.push('/controlC/HU9/enlace-enviado');
      } else if (res.status === 404) {
        setError('El correo no está asociado a ninguna cuenta.');
      } else if (res.status === 429) {
        setError('Ya existe una solicitud en curso. Intenta nuevamente en 1 minuto.');
      } else {
        setError(data.message || 'Error al solicitar el enlace.');
      }
    } catch {
      setError('Error de conexión con el servidor.');
    } finally {
      clearTimeout(fallback);
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-foreground">
      {/* Fondo ultra sutil (casi plano) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]" />
      </div>

      <div className="w-full max-w-sm bg-card/95 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-border/70">
        {/* Título con gradiente leve */}
        <h1 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">
          Recuperación de acceso
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Te enviaremos un correo electrónico con un enlace para ingresar a tu cuenta.
        </p>

        <form onSubmit={handleEnviar} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl p-3.5 text-foreground bg-background border border-border
                       focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
            required
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
            autoComplete="email"
          />

          {error && (
            <p id="email-error" role="status" aria-live="polite" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!emailValid || loading}
            className={`w-full font-semibold rounded-xl p-3.5 mt-2 transition-all duration-300
              ${(!emailValid || loading)
                ? 'bg-primary/30 text-primary-foreground/70 cursor-not-allowed shadow-none'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'}`
            }
          >
            {loading ? 'Enviando...' : 'Enviar correo electrónico'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/controlC/HU4/login" className="text-primary hover:underline font-medium">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
