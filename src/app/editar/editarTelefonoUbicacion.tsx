/*'use client';
import { useState } from 'react';

export default function PerfilPage() {
  const [editingField, setEditingField] = useState<'telefono' | 'ubicacion' | null>(null);
  const [telefono, setTelefono] = useState('••••••••••••');
  const [ubicacion, setUbicacion] = useState('Cochabamba, Cercado');
  const [mapa] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-4 py-8">
      
      {/* Encabezado *///}
      /*<header className="w-full max-w-2xl flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-blue-700">Servineo</h1>
        <h2 className="text-xl font-semibold text-gray-700">Perfil</h2>
        <span className="text-sm text-gray-500 italic">Editar perfil</span>
      </header>

      {/* Contenedor principal *///}
      /*<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-8">
        
        {/* Teléfono *///}
       /* <section>
          <label className="block text-gray-600 text-sm font-medium mb-1">Número de teléfono</label>
          {editingField === 'telefono' ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Guardar
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3">
              <span className="text-gray-800">{telefono}</span>
              <button
                onClick={() => setEditingField('telefono')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Editar número
              </button>
            </div>
          )}
        </section>

        {/* Ubicación *///}
        /*<section>
          <label className="block text-gray-600 text-sm font-medium mb-1">Ubicación</label>
          {editingField === 'ubicacion' ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Guardar
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3">
              <span className="text-gray-800">{ubicacion}</span>
              <button
                onClick={() => setEditingField('ubicacion')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Editar ubicación
              </button>
            </div>
          )}
        </section>

        {/* Mapa *///}
        /*<section>
          <label className="block text-gray-600 text-sm font-medium mb-2">Mapa de ubicación</label>
          {mapa ? (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic">
              [ Mapa de ubicación ]
            </div>
          ) : (
            <p className="text-gray-500 italic">Mapa no disponible</p>
          )}
        </section>
      </div>
    </div>
  );
}*/

'use client';
import { useState } from 'react';

type PerfilPageProps = {
  usuarioId: string; // ID del usuario logueado
};

export default function PerfilPage({ usuarioId }: PerfilPageProps) {
  const [editingField, setEditingField] = useState<'telefono' | 'ubicacion' | null>(null);
  const [telefono, setTelefono] = useState('••••••••••••');
  const [ubicacion, setUbicacion] = useState('Cochabamba, Cercado');
  const [mapa] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para guardar los cambios
  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/requester', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: usuarioId, telefono, ubicacion }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Error al guardar');
      }

      setEditingField(null);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-4 py-8">
      {/* Encabezado */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-blue-700">Servineo</h1>
        <h2 className="text-xl font-semibold text-gray-700">Perfil</h2>
        <span className="text-sm text-gray-500 italic">Editar perfil</span>
      </header>

      {/* Contenedor principal */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-8">
        {/* Teléfono */}
        <section>
          <label className="block text-gray-600 text-sm font-medium mb-1">Número de teléfono</label>
          {editingField === 'telefono' ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3">
              <span className="text-gray-800">{telefono}</span>
              <button
                onClick={() => setEditingField('telefono')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Editar número
              </button>
            </div>
          )}
        </section>

        {/* Ubicación */}
        <section>
          <label className="block text-gray-600 text-sm font-medium mb-1">Ubicación</label>
          {editingField === 'ubicacion' ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3">
              <span className="text-gray-800">{ubicacion}</span>
              <button
                onClick={() => setEditingField('ubicacion')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Editar ubicación
              </button>
            </div>
          )}
        </section>

        {/* Mapa */}
        <section>
          <label className="block text-gray-600 text-sm font-medium mb-2">Mapa de ubicación</label>
          {mapa ? (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic">
              [ Mapa de ubicación ]
            </div>
          ) : (
            <p className="text-gray-500 italic">Mapa no disponible</p>
          )}
        </section>

        {/* Error */}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}



