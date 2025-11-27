"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Laptop, Smartphone, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";
import { toast } from "sonner";
import { useAuth } from "../../../../Components/requester/auth/usoAutentificacion";

interface Dispositivo {
  _id: string;
  userId: string;
  os: string;
  type: string;
  lastLogin: string;
}

const API_URL = "http://192.168.1.8:8000";

export default function DispositivosVinculados() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState<string | null>(null); // id del dispositivo a cerrar

  const detectarDispositivo = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    const os = result.os.name || "Desconocido";
    let type = "desktop";
    if (result.device.type === "mobile") type = "mobile";
    if (result.device.type === "tablet") type = "tablet";
    return { os, type };
  };

  const obtenerDispositivos = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:8000/devices/${user.id}`);
      const data = await res.json();
      setDispositivos(data);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar los dispositivos.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const registrarDispositivo = useCallback(async () => {
    if (!user) return;
    const { os, type } = detectarDispositivo();
    try {
      const res = await fetch(`http://localhost:8000/devices/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, os, type }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Error al registrar dispositivo");
      toast.success("Dispositivo vinculado/actualizado ✔");
      obtenerDispositivos();
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar dispositivo");
    }
  }, [user, obtenerDispositivos]);

  const cerrarSesionDispositivo = async (_id: string) => {
    try {
      await fetch(`http://localhost:8000/devices/${_id}`, { method: "DELETE" });
      toast.success("Sesión cerrada correctamente ✔");
      setModalVisible(null);
      logout?.();
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo cerrar la sesión.");
    }
  };

  const cerrarTodasSesiones = async () => {
    try {
      await fetch(`http://localhost:8000/devices/all/${user?.id}`, { method: "DELETE" });
      toast.success("Todas las sesiones cerradas ✔");
      logout?.();
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cerrar todas las sesiones.");
    }
  };

  useEffect(() => {
    if (user) registrarDispositivo();
  }, [user, registrarDispositivo]);

  const iconoPorTipo = (type: string) => {
    switch (type) {
      case "mobile": return <Smartphone size={28} />;
      case "tablet": return <Monitor size={28} />;
      default: return <Laptop size={28} />;
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col items-center">
      <button
        className="flex items-center mb-5 text-blue-500 hover:text-blue-700 self-start"
        onClick={() => router.push("/requesterEdit")}
      >
        <ArrowLeft className="mr-2" /> Volver
      </button>

      <h1 className="text-2xl font-semibold mb-4">Dispositivos vinculados</h1>

      <button
        onClick={cerrarTodasSesiones}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar todas las sesiones
      </button>

      <div className="space-y-4 w-full">
        {dispositivos.map((dispositivo) => (
          <div key={dispositivo._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center space-x-3">
              {iconoPorTipo(dispositivo.type)}
              <div>
                <p className="font-medium">{dispositivo.os}</p>
                <p className="text-xs text-gray-500">
                  Último acceso: {new Date(dispositivo.lastLogin).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalVisible(dispositivo._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>

            {/* Modal */}
            {modalVisible === dispositivo._id && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
                  <p className="mb-4">¿Deseas cerrar sesión en este dispositivo?</p>
                  <div className="flex justify-around">
                    <button
                      onClick={() => setModalVisible(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => cerrarSesionDispositivo(dispositivo._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
