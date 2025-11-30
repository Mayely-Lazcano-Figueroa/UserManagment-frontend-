'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Componentes modales
import AuthenticatorQrModal from '../components/AuthenticatorQrModal';
import VerifyTokenModal from '../components/VerifyTokenModal';
import RecoveryModal from '../components/RecoveryModal';
import ConfirmDisableModal from '../components/ConfirmDisableModal';

// Servicio 2FA (asegúrate que exporta generateQr, verifyToken, disable2fa)
import { generateQr, verifyToken, disable2fa } from '../services/twofactor';

export default function AuthenticatorPage() {
  const router = useRouter();

  // Modales
  const [qrOpen, setQrOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [disableModalOpen, setDisableModalOpen] = useState(false);

  // Datos y estados
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

  // Estado local que marca si el usuario ya configuró 2FA
  const [configured, setConfigured] = useState<boolean>(false);
  const [configuredAt, setConfiguredAt] = useState<string | null>(null);

  useEffect(() => {
    // Intentar leer flag local (opcional: en producción consultar al backend)
    const flag = localStorage.getItem('servineo_twofactor_configured');
    const dateStr = localStorage.getItem('servineo_twofactor_configured_at');
    if (flag === 'true') {
      setConfigured(true);
      if (dateStr) setConfiguredAt(dateStr);
    }
  }, []);

  // Paso 1: Generar QR (backend)
  const handleConfigure = async () => {
    setLoading(true);
    setQrDataUrl(null);
    setQrOpen(true);
    try {
      const data = await generateQr();
      setQrDataUrl(data.qrDataUrl ?? null);
    } catch (err) {
      console.error('Error al generar QR', err);
      const errorMessage = err instanceof Error ? err.message : 'Error generando QR. Reintenta.';
      alert(errorMessage);
      setQrOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNextFromQr = () => {
    setQrOpen(false);
    setVerifyOpen(true);
  };

  // Paso 2: Verificar código de 6 dígitos
 // dentro de Authenticator/page.tsx
const handleVerify = async (token: string) => {
  setLoading(true);
  try {
    const res = await verifyToken(token); // si falla, lanza y el modal lo captura
    setRecoveryCodes(res.recoveryCodes || []);
    setVerifyOpen(false);
    setRecoveryOpen(true);

    setConfigured(true);
    const now = new Date().toISOString().slice(0, 10);
    setConfiguredAt(now);
    localStorage.setItem('servineo_twofactor_configured', 'true');
    localStorage.setItem('servineo_twofactor_configured_at', now);
  } finally {
    setLoading(false);
  }
};


  // Al confirmar que guardó los códigos: cerramos modal y nos quedamos en la misma página
  const handleRecoveryConfirm = () => {
  setRecoveryOpen(false);
  setRecoveryCodes(null); // 🔥 Limpia los códigos al cerrar el modal
};

  // Handler para desactivar 2FA (lamada a backend + UI)
 const handleDisableConfirm = async () => {
    setDisableLoading(true);
    try {
      await disable2fa();
      localStorage.removeItem('servineo_twofactor_configured');
      localStorage.removeItem('servineo_twofactor_configured_at');
      setConfigured(false);
      setConfiguredAt(null);
      setRecoveryCodes(null);
      // ✅ no cerramos el modal aquí, dejamos que el modal cambie a "done"
    } catch (err) {
      console.error('Error desactivando 2FA', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al desactivar 2FA';
      alert(errorMessage);
    } finally {
      setDisableLoading(false);
    }
  };


  return (
    <div className="min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back + Title */}
        <div className="flex items-center gap-4 py-6">
          <button
            onClick={() => router.back()}
            aria-label="Volver"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div>
            <h1 className="text-xl font-semibold">Aplicación authenticator</h1>
            <p className="text-sm text-gray-600">En vez de esperar a que lleguen mensajes de texto, puedes obtener códigos de verificación desde una aplicación de autenticación.</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 bg-white p-8 rounded border border-gray-100 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm text-gray-700 mb-6">
              Primero, descarga Google Authenticator desde{' '}
<a
  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.stopPropagation(); // evita que Next.js o React intercepte el click
  }}
  className="text-blue-600 underline hover:text-blue-800"
>
  Google Play Store
</a>

              o desde{' '}
<a
  href="https://apps.apple.com/es/app/google-authenticator/id388497605"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="text-blue-600 underline hover:text-blue-800"
>
  App Store
</a>

            </p>

            {/* Si ya configurado: mostrar card con papelera */}
            {configured ? (
              <div className="max-w-xl mx-auto p-4 border rounded shadow-sm flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded border">
                    <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="7" height="7" strokeWidth="1.5" />
                      <rect x="14" y="3" width="7" height="7" strokeWidth="1.5" />
                      <rect x="3" y="14" width="7" height="7" strokeWidth="1.5" />
                      <rect x="14" y="14" width="3" height="3" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Tu autenticador</div>
                        <div className="text-sm text-gray-500">Authenticator</div>
                      </div>
                      <div className="text-sm text-gray-500">Agregada: {configuredAt ?? '-'}</div>
                    </div>
                  </div>
                </div>

                {/* Botón papelera */}
                <div className="flex items-center gap-3">
                  <button
                    title="Desactivar 2FA"
                    onClick={() => setDisableModalOpen(true)}
                    className="p-2 rounded-md border hover:bg-red-50 transition bg-white"
                  >
                    <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={handleConfigure}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-red-200 hover:border-red-300 bg-white text-gray-800 shadow-sm"
                  disabled={loading}
                >
                  <span className="w-5 h-5 inline-flex items-center justify-center text-blue-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span>Configurar autenticador</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recovery codes (si acaban de generarse) */}
        {recoveryCodes && recoveryCodes.length > 0 && !recoveryOpen && (
          <div className="mt-6 max-w-3xl mx-auto transition-opacity duration-300 ">
            <div className="p-4 border rounded bg-yellow-50">
              <h3 className="font-semibold mb-2">Códigos de recuperación (guárdalos ahora)</h3>
              <p className="text-sm text-gray-600 mb-2">Se muestran una sola vez. Úsalos si pierdes acceso a tu app de autenticación.</p>
              <ul className="list-disc ml-6">
                {recoveryCodes.map((c) => (
                  <li key={c} className="font-mono">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      <AuthenticatorQrModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        qrDataUrl={qrDataUrl}
        onNext={handleNextFromQr}
        loading={loading}
      />

      <VerifyTokenModal
        open={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        onVerify={handleVerify}
        loading={loading}
      />

      <RecoveryModal
        open={recoveryOpen}
        codes={recoveryCodes}
        onClose={() => setRecoveryOpen(false)}
        onConfirm={handleRecoveryConfirm}
      />

     <ConfirmDisableModal
  open={disableModalOpen}
  onCancel={() => setDisableModalOpen(false)}
  onConfirm={handleDisableConfirm}
  onFinish={() => {
    // cuando el usuario presiona "Aceptar" tras éxito
    setRecoveryCodes(null); // limpiar visualmente los códigos
  }}
  loading={disableLoading}
/>
    </div>
  );
}
