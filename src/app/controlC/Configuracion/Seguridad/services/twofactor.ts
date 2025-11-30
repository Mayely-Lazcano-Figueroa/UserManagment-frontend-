import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/controlC';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('servineo_token');
}

const client = axios.create({
  baseURL: `${API_BASE}/2fa`,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((cfg) => {
  const token = getAuthToken();
  if (token) {
    cfg.headers = cfg.headers ?? {};
    (cfg.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return cfg;
});

export async function generateQr() {
  const res = await client.post('/generate');
  return res.data; // { qrDataUrl, issuer }
}

// src/app/controlC/Configuracion/Seguridad/services/twofactor.ts
export async function verifyToken(token: string) {
  const res = await client.post('/verify', { token });
  return res.data; // { recoveryCodes: [...] }
}



export async function disable2fa() {
  const res = await client.post('/disable');
  return res.data;
}
