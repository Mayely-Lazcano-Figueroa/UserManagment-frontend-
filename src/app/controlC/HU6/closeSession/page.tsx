'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDevices } from '../hooks/useDevices';
import { formatDistanceToNow } from '../lib/utils';
import { Button } from "@/app/controlC/HU6/ui/button";
import { Card, CardContent } from "@/app/controlC/HU6/ui/card";
import { ArrowLeft, Laptop, Monitor, Smartphone, AlertCircle } from "lucide-react";

export default function CloseSessionPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    sessions,
    loading,
    error,
    currentDeviceId,
    fetchSessions,
    closeAllOtherSessions,
  } = useDevices(userId);

  useEffect(() => {
    // Obtener el userId del localStorage o contexto de autenticación
    const storedUserId = localStorage.getItem('userId') || localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchSessions();
      // Refrescar cada 30 segundos
      const interval = setInterval(() => {
        fetchSessions();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const handleCloseAllSessions = async () => {
    const result = await closeAllOtherSessions();
    setShowConfirmation(false);
    
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    const type = deviceType.toLowerCase();
    if (type.includes('mobile') || type.includes('android')) {
      return <Smartphone className="w-6 h-6" />;
    }
    if (type.includes('tablet') || type.includes('ipad')) {
      return <Monitor className="w-6 h-6" />;
    }
    if (type.includes('laptop') || type.includes('desktop') || type.includes('windows') || type.includes('mac')) {
      return <Laptop className="w-6 h-6" />;
    }
    return <Laptop className="w-6 h-6" />;
  };

  const activeSessions = sessions.filter((s) => s.isActive);
  const otherSessions = activeSessions.filter((s) => s.deviceId !== currentDeviceId);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sesión no detectada
          </h2>
          <p className="text-gray-600">
            Por favor, inicia sesión para ver tus dispositivos activos.
          </p>
        </div>
      </div>
    );
  }

  if (loading && activeSessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dispositivos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
      {/* Notificación de éxito */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <AlertCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold">Configuración</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => router.push('/controlC/HU5')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
          >
            ✏️ Editar Perfil
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md bg-indigo-100 text-indigo-600 font-medium">
            🔒 Seguridad
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <button
          onClick={() => router.push("/controlC/Configuracion")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </button>

        <h1 className="text-2xl font-semibold mb-2">Gestión de Sesiones</h1>
        <p className="text-gray-600 mb-6">
          Tienes la sesión iniciada en estos dispositivos. Puedes cerrar sesiones en otros dispositivos para mantener tu cuenta segura.
        </p>

        {/* Información importante */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Importante:</strong> Al cerrar sesiones, se desconectarán todos
                los dispositivos excepto el actual. Las personas que usen esos
                dispositivos deberán iniciar sesión nuevamente.
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Alerta de límite de dispositivos */}
        {activeSessions.length >= 3 && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Has alcanzado el límite de 3 dispositivos conectados.
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Sesiones activas</p>
            <p className="text-2xl font-bold text-gray-800">{activeSessions.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Otros dispositivos</p>
            <p className="text-2xl font-bold text-gray-800">{otherSessions.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Dispositivo actual</p>
            <p className="text-2xl font-bold text-green-600">✓</p>
          </div>
        </div>

        {/* Botón para cerrar todas las sesiones */}
        {otherSessions.length > 0 && (
          <Button
            onClick={() => setShowConfirmation(true)}
            disabled={loading}
            className="w-full bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 mb-6"
          >
            {loading ? 'Cerrando sesiones...' : 'Cerrar sesiones en otros dispositivos'}
          </Button>
        )}

        {otherSessions.length === 0 && activeSessions.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-6">
            <p className="text-gray-600">
              No hay otras sesiones activas. Solo este dispositivo está conectado.
            </p>
          </div>
        )}

        {/* Lista de sesiones activas */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sesiones Activas ({activeSessions.length})
          </h2>

          {activeSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay dispositivos conectados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <Card
                  key={session._id}
                  className={`border ${
                    session.deviceId === currentDeviceId
                      ? 'border-green-400 bg-green-50'
                      : 'border-blue-200'
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-700">
                        {getDeviceIcon(session.deviceType)}
                      </div>
                      <div>
                        <p className="font-medium flex items-center">
                          {session.deviceName}
                          {session.deviceId === currentDeviceId && (
                            <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                              Este dispositivo
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {session.browser} • {session.deviceType}
                        </p>
                        <p className="text-sm text-gray-500">
                          IP: {session.ipAddress}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Última actividad: {formatDistanceToNow(session.lastActivity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">¿Cerrar sesiones?</h2>
            <p className="text-gray-600 mb-4">
              Esta acción cerrará todas las sesiones activas en otros dispositivos (
              {otherSessions.length} {otherSessions.length === 1 ? 'sesión' : 'sesiones'}
              ). Las personas que usen esos dispositivos tendrán que volver a iniciar sesión.
            </p>
            <div className="flex justify-around">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCloseAllSessions}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={loading}
              >
                {loading ? 'Cerrando...' : 'Sí, cerrar sesiones'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}