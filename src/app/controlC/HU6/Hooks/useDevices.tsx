"use client";
import { useState, useEffect } from "react";

interface Device {
    deviceId: string;
    type: string;
    browser?: string;
    location?: string;
    lastActive: string;
}

export function useDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDeviceId, setCurrentDeviceId] = useState<string>("");
    const [canAddDevice, setCanAddDevice] = useState(true);
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    // genera o obtiene deviceId del localStorage
    const getOrCreateDeviceId = () => {
        let id = localStorage.getItem("deviceId");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("deviceId", id);
        }
        return id;
    };

    // obtener dispositivos del usuario
    const fetchDevices = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem("userId"); // <-- asegúrate de guardar esto al hacer login
            const res = await fetch(`${BASE_URL}/api/controlC/devices/${userId}`);
            if (!res.ok) throw new Error("Error al obtener dispositivos");
            const data = await res.json();
            setDevices(data);
            setCanAddDevice(data.length < 3);
        }
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // cerrar sesión en un dispositivo específico
    const logoutDevice = async (deviceId: string) => {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`${BASE_URL}/api/controlC/devices/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, deviceId }),
        });
        if (!res.ok) throw new Error("No se pudo cerrar la sesión");
        await fetchDevices(); // actualizar lista
    };

    useEffect(() => {
        const id = getOrCreateDeviceId();
        setCurrentDeviceId(id);
        fetchDevices();
    }, []);

    return {
        devices,
        loading,
        error,
        currentDeviceId,
        logoutDevice,
        canAddDevice,
    };
}
