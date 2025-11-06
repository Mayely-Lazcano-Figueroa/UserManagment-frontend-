"use client";

import { useState } from "react";
import { Button } from "@/app/controlC/HU6/ui/button";
import { Card, CardContent } from "@/app/controlC/HU6/ui/card";
import { ArrowLeft, Laptop, Monitor, Smartphone } from "lucide-react";

interface Device {
  id: string;
  type: "dispositivo 1" | "dispositivo 2" | "dispositivo 3";
  location: string;
  lastActive: string;
}

export default function SeguridadPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", type: "dispositivo 1", location: "Ubicación 1", lastActive: "xx/xx/2025" },
    { id: "2", type: "dispositivo 2", location: "Ubicación 2", lastActive: "xx/xx/2025" },
    { id: "3", type: "dispositivo 3", location: "Ubicación 3", lastActive: "xx/xx/2025" },
  ]);

  // Elimina un dispositivo individual
  const handleLogout = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  // Cierra sesión en todos los dispositivos
  const handleLogoutAll = () => {
    setDevices([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "dispositivo 1":
        return <Laptop className="w-6 h-6" />;
      case "dispositivo 2":
        return <Monitor className="w-6 h-6" />;
      case "dispositivo 3":
        return <Smartphone className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
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
        <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </button>

        <h1 className="text-2xl font-semibold mb-2">Inicios de sesión</h1>
        <p className="text-gray-600 mb-6">
          Tienes la sesión iniciada en estos dispositivos
        </p>

        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id} className="border border-blue-200">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-gray-700">{getIcon(device.type)}</div>
                  <div>
                    <p className="font-medium">{device.type}</p>
                    <p className="text-sm text-gray-500">{device.location}</p>
                    <p className="text-xs text-gray-400">
                      Última vez: {device.lastActive}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="bg-red-100 text-red-600 border border-red-300 hover:bg-red-200"
                  onClick={() => handleLogout(device.id)}
                >
                  Cerrar sesión
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botón para cerrar todas las sesiones */}
        {devices.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="destructive"
              className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-md"
              onClick={handleLogoutAll}
            >
              Cerrar sesión en todos los dispositivos
            </Button>
          </div>
        )}

        {/* Mensaje si hay 3 dispositivos */}
        {devices.length >= 3 && (
          <div className="mt-4 text-center">
            <p className="text-red-600 font-medium">
              ⚠️ No se puede añadir más dispositivos (máximo 3 permitidos)
            </p>
          </div>
        )}

        <footer className="text-sm text-gray-400 mt-10 flex justify-between">
          <p>Términos</p>
          <p>Ayuda</p>
        </footer>
      </main>
    </div>
  );
}
