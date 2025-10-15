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

/*'use client';
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
      {/* Encabezado *///}
     /* <header className="w-full max-w-2xl flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-blue-700">Servineo</h1>
        <h2 className="text-xl font-semibold text-gray-700">Perfil</h2>
        <span className="text-sm text-gray-500 italic">Editar perfil</span>
      </header>

      {/* Contenedor principal *///}
      //<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-8">
       // {/* Teléfono */}
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

        {/* Ubicación *///}
      /*  <section>
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

        {/* Mapa *///}
     /*   <section>
          <label className="block text-gray-600 text-sm font-medium mb-2">Mapa de ubicación</label>
          {mapa ? (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic">
              [ Mapa de ubicación ]
            </div>
          ) : (
            <p className="text-gray-500 italic">Mapa no disponible</p>
          )}
        </section>

        {/* Error *///}
     /*   {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}*/

/*'use client'    //modificado martes 21:53
import { useEffect, useState } from 'react'
import RequesterEditForm from '@/controlC/RequesterEditForm'

type PerfilPageProps = {
  usuarioId: string
}

export default function PerfilPage({ usuarioId }: PerfilPageProps) {
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔹 Obtener datos desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`/api/requester?id=${usuarioId}`)
        if (!res.ok) throw new Error('Error al obtener datos del usuario')
        const data = await res.json()
        setPhone(data.phone || '')
        setLocation(data.location || '')
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [usuarioId])

  if (loading) return <p className="text-center mt-8">Cargando perfil...</p>
  if (error) return <p className="text-center text-red-600 mt-8">⚠️ {error}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>

      {!editing ? (
        <div className="space-y-3 w-full max-w-md bg-white p-6 rounded-xl shadow">
          <p><strong>Teléfono:</strong> {phone || 'No definido'}</p>
          <p><strong>Ubicación:</strong> {location || 'No definida'}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar datos
          </button>
        </div>
      ) : (
        <RequesterEditForm
          requesterId={usuarioId}
          initialPhone={phone || ''}
          initialLocation={location || ''}
          onSaved={() => {
            setEditing(false)
            // 🔄 Actualizar datos visibles después de guardar
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }}
        />
      )}
    </div>
  )
}*/


/*'use client'    //modificado martes 22:58
import { useEffect, useState } from 'react'
import RequesterEditForm from '@/controlC/RequesterEditForm'

type PerfilPageProps = {
  usuarioId: string
}

export default function PerfilPage({ usuarioId }: PerfilPageProps) {
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔹 Obtener datos desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/requester?id=${usuarioId}`)
        if (!res.ok) throw new Error('Error al obtener datos del usuario')
        const data = await res.json()
        setPhone(data.telefono || '')
        setLocation(data.ubicacion || '')
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [usuarioId])

  if (loading) return <p className="text-center mt-8">Cargando perfil...</p>
  if (error) return <p className="text-center text-red-600 mt-8">⚠️ {error}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>

      {!editing ? (
        <div className="space-y-3 w-full max-w-md bg-white p-6 rounded-xl shadow">
          <p><strong>Teléfono:</strong> {phone || 'No definido'}</p>
          <p><strong>Ubicación:</strong> {location || 'No definida'}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar datos
          </button>
        </div>
      ) : (
        <RequesterEditForm
          requesterId={usuarioId}
          initialPhone={phone}
          initialLocation={location}
          onSaved={(updatedPhone?: string, updatedLocation?: string) => {
            setEditing(false)
            // 🔄 Actualizar datos visibles automáticamente
            if (updatedPhone) setPhone(updatedPhone)
            if (updatedLocation) setLocation(updatedLocation)
          }}
        />
      )}
    </div>
  )
}*/

'use client'

import { useEffect, useState } from 'react'
import RequesterEditForm from '@/controlC/RequesterEditForm'

type PerfilPageProps = {
  usuarioId: string
  onLogout: () => void
}

export default function PerfilPage({ usuarioId, onLogout }: PerfilPageProps) {
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [masked, setMasked] = useState(true) // 🔹 Teléfono enmascarado en la vista de solo lectura

  // 🔹 Obtener datos del usuario
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`/api/requester?id=${usuarioId}`)
        if (!res.ok) throw new Error('Error al obtener datos del usuario')
        const data = await res.json()
        setPhone(data.phone || '')
        setLocation(data.location || '')
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [usuarioId])

  // 🔹 Toggle enmascaramiento en la vista de solo lectura
  const toggleMasked = () => setMasked(!masked)
  const displayedPhone = masked
    ? phone
      ? `${phone.slice(0, 2)}${'*'.repeat(Math.max(0, phone.length - 2))}`
      : ''
    : phone

  if (loading) return <p className="text-center mt-8">Cargando perfil...</p>
  if (error) return <p className="text-center text-red-600 mt-8">⚠️ {error}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>

      {!editing ? (
        <div className="space-y-3 w-full max-w-md bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p>
              <strong>Teléfono:</strong> {displayedPhone || 'No definido'}
            </p>
            {/* 🔹 Botón para mostrar/ocultar número antes de editar */}
            {phone && (
              <button
                onClick={toggleMasked}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                {masked ? 'Mostrar' : 'Ocultar'}
              </button>
            )}
          </div>
          <p><strong>Ubicación:</strong> {location || 'No definida'}</p>
          <div className="flex gap-2 mt-3">
            {/* Botón para editar datos */}
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar datos
            </button>

            {/* Botón para volver (cerrar sesión) */}
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <RequesterEditForm
          requesterId={usuarioId}
          initialPhone={phone || ''}
          initialLocation={location || ''}
          onSaved={() => {
            setEditing(false)
            setTimeout(() => window.location.reload(), 500)
          }}
        />
      )}
    </div>
  )
}


