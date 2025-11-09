"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/app/controlC/HU6/ui/button";
import { Card, CardContent } from "@/app/controlC/HU6/ui/card";
import { ArrowLeft, Laptop, Monitor, Smartphone, AlertCircle } from "lucide-react";
import { useDevices } from "../hooks/useDevices";
import { useSession } from "next-auth/react";

export default function SeguridadPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { 
    devices, 
    loading, 
    error, 
    currentDeviceId,
    logoutDevice,
    canAddDevice 
  } = useDevices();

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mostrar notificación temporal
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  // Manejar confirmación de cierre de sesión
  const handleLogoutConfirm = async () => {
    if (!selectedDevice) return;

    setIsLoggingOut(true);
    try {
      await logoutDevice(selectedDevice.deviceId);
      
      // Si es el dispositivo actual, redirigir al login
      if (selectedDevice.deviceId === currentDeviceId) {
        showNotification("Tu sesión ha sido cerrada");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        showNotification(`Sesión cerrada en ${getDeviceTypeName(selectedDevice.type)}`);
      }
      
      setSelectedDevice(null);
    } catch (err: any) {
      showNotification(err.message || "Error al cerrar sesión");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Laptop className="w-6 h-6" />;
      case "tablet":
        return <Monitor className="w-6 h-6" />;
      case "mobile":
        return <Smartphone className="w-6 h-6" />;
      default:
        return <Laptop className="w-6 h-6" />;
    }
  };

  const getDeviceTypeName = (type: string) => {
    switch (type) {
      case "desktop":
        return "Computadora";
      case "tablet":
        return "Tablet";
      case "mobile":
        return "Móvil";
      default:
        return "Dispositivo";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
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
      {/* Notificación */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <AlertCircle className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold">Configuración</h2>
        <nav className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">
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
          onClick={() => router.push("/controlC/Configuracion/Seguridad")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </button>

        <h1 className="text-2xl font-semibold mb-2">Inicios de sesión</h1>
        <p className="text-gray-600 mb-6">
          Tienes la sesión iniciada en estos dispositivos
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {!canAddDevice && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Has alcanzado el límite de 3 dispositivos conectados.
          </div>
        )}

        {devices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay dispositivos conectados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {devices.map((device) => (
              <Card 
                key={device.deviceId} 
                className={`border ${
                  device.deviceId === currentDeviceId 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-blue-200'
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-700">{getIcon(device.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{getDeviceTypeName(device.type)}</p>
                        {device.deviceId === currentDeviceId && (
                          <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                            Este dispositivo
                          </span>
                        )}
                      </div>
                      {device.browser && (
                        <p className="text-sm text-gray-500">{device.browser}</p>
                      )}
                      <p className="text-sm text-gray-500">{device.location}</p>
                      <p className="text-xs text-gray-400">
                        Última vez: {formatDate(device.lastActive)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-100 text-red-600 border border-red-300 hover:bg-red-200"
                    onClick={() => setSelectedDevice(device)}
                  >
                    Cerrar sesión
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <footer className="text-sm text-gray-400 mt-10 flex justify-between">
          <p>Términos</p>
          <p>Ayuda</p>
        </footer>
      </main>

      {/* Modal de confirmación */}
      {selectedDevice && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">¿Cerrar sesión?</h2>
            <p className="text-gray-600 mb-4">
              {selectedDevice.deviceId === currentDeviceId 
                ? "Cerrarás tu sesión actual y serás redirigido al login."
                : `Se cerrará la sesión en ${getDeviceTypeName(selectedDevice.type)}.`
              }
            </p>
            <div className="flex justify-around">
              <Button
                onClick={() => setSelectedDevice(null)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={isLoggingOut}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleLogoutConfirm}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Cerrando..." : "Aceptar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}