// src/app/controlC/HU6/hooks/useDevices.tsx
//Obtener los dispositivos del usuario.
//Manejar el cierre de sesión en un dispositivo.
//Controlar si se puede agregar un nuevo dispositivo (límite 3).

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface Device {
  deviceId: string;
  type: "desktop" | "tablet" | "mobile";
  browser?: string;
  lastActive: string;
  location?: string;
}

export const useDevices = () => {
  const { data: session } = useSession();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentDeviceId = typeof window !== "undefined" ? localStorage.getItem("deviceId") : null;

  const fetchDevices = async () => {
    // Ensure we have a session user; prefer an explicit id if present, otherwise fall back to email.
    if (!session?.user) return;

    const userId = (session.user as any).id ?? session.user.email;
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices?userId=${encodeURIComponent(String(userId))}`);
      if (!res.ok) throw new Error("Error al obtener dispositivos");
      const data: Device[] = await res.json();
      setDevices(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const logoutDevice = async (deviceId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/${deviceId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al cerrar sesión");
      setDevices(devices.filter(d => d.deviceId !== deviceId));
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  };

  const canAddDevice = devices.length < 3;

  useEffect(() => {
    fetchDevices();
  }, [session]);

  return {
    devices,
    loading,
    error,
    currentDeviceId,
    fetchDevices,
    logoutDevice,
    canAddDevice,
  };
};
