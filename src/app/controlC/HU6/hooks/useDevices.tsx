// frontend/hooks/useDevices.ts
import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Device {
  deviceId: string;
  type: 'desktop' | 'tablet' | 'mobile';
  browser?: string;
  os?: string;
  location: string;
  lastActive: string;
  createdAt: string;
}

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);

  // Obtener token de autenticación (ajusta según tu sistema de auth)
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  // Obtener dispositivos
  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      const response = await fetch(`${API_URL}/devices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener dispositivos');
      }

      const data = await response.json();
      setDevices(data.devices || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Registrar dispositivo actual
  const registerDevice = useCallback(async (location?: string) => {
    try {
      const token = getAuthToken();

      const response = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(data.message || 'Límite de dispositivos alcanzado');
        }
        throw new Error(data.error || 'Error al registrar dispositivo');
      }

      setCurrentDeviceId(data.device.deviceId);

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('deviceId', data.device.deviceId);
      }

      await fetchDevices();
      return data.device;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [fetchDevices]);

  // Cerrar sesión en un dispositivo
  const logoutDevice = useCallback(async (deviceId: string) => {
    try {
      const token = getAuthToken();

      const response = await fetch(`${API_URL}/devices/${deviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }

      const data = await response.json();

      // Si es el dispositivo actual, limpiar localStorage
      if (typeof window !== 'undefined') {
        const storedDeviceId = localStorage.getItem('deviceId');
        if (storedDeviceId === deviceId) {
          localStorage.removeItem('deviceId');
        }
      }

      await fetchDevices();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [fetchDevices]);

  // Actualizar última actividad
  const updateActivity = useCallback(async (deviceId: string) => {
    try {
      const token = getAuthToken();

      await fetch(`${API_URL}/devices/${deviceId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Error al actualizar actividad:', err);
    }
  }, []);

  // Verificar si este dispositivo está registrado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDeviceId = localStorage.getItem('deviceId');
      if (storedDeviceId) {
        setCurrentDeviceId(storedDeviceId);
      }
    }
  }, []);

  // Cargar dispositivos al montar
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchDevices();
    }
  }, [fetchDevices]);

  // Actualizar actividad periódicamente
  useEffect(() => {
    if (currentDeviceId) {
      const interval = setInterval(() => {
        updateActivity(currentDeviceId);
      }, 5 * 60 * 1000); // Cada 5 minutos

      return () => clearInterval(interval);
    }
  }, [currentDeviceId, updateActivity]);

  return {
    devices,
    loading,
    error,
    currentDeviceId,
    registerDevice,
    logoutDevice,
    fetchDevices,
    canAddDevice: devices.length < 3,
  };
}