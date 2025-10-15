/*'use client'   //modificado Martes 21:55

import { useState } from 'react'

type Props = {
  requesterId: string
  initialPhone?: string
  initialLocation?: string
  onSaved?: () => void
}

export default function RequesterEditForm({ requesterId, initialPhone = '', initialLocation = '', onSaved }: Props) {
  const [phone, setPhone] = useState(initialPhone)
  const [location, setLocation] = useState(initialLocation)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/requester', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: requesterId, phone, location })
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Error al guardar')
      }

      setLoading(false)
      onSaved?.()
      // opcional: mostrar toast o mensaje
    } catch (err: any) {
      setLoading(false)
      setError(err.message || 'Error desconocido')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+591 7xxxxxxx"
          className="mt-1 block w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ubicación</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ciudad, Dirección"
          className="mt-1 block w-full rounded-md border px-3 py-2"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button type="submit" disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}*/

//Martes 00:19
'use client'

import { useState } from 'react'

type Props = {
  requesterId: string
  initialPhone?: string
  initialLocation?: string
  onSaved?: (updatedPhone: string, updatedLocation: string) => void
}

export default function RequesterEditForm({
  requesterId,
  initialPhone = '',
  initialLocation = '',
  onSaved
}: Props) {
  // Inicializar el número quitando el código de país
  const initialNumeric = initialPhone.replace('+591', '').trim()

  const [phone, setPhone] = useState(initialNumeric)
  const [location, setLocation] = useState(initialLocation)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Validación dinámica: solo números, máximo 15 dígitos
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    setPhone(value)

    if (value.length > 15) {
      setError('El número de teléfono debe tener entre 8 y 15 caracteres.')
    } else {
      setError(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    if (phone.length < 8 || phone.length > 15) {
      setError('El número de teléfono debe tener entre 8 y 15 caracteres.')
      setLoading(false)
      return
    }

    const formattedPhone = `+591 ${phone}`

    try {
      const res = await fetch('/api/requester', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: requesterId, phone: formattedPhone, location }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || 'Error al guardar los datos')

      setSuccess('Perfil actualizado correctamente')
      onSaved?.(formattedPhone, location)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 w-full max-w-md bg-white p-6 rounded-xl shadow"
    >
      {/* --- TELÉFONO --- */}
      <div>
        <label className="block text-sm font-medium">Número de teléfono</label>
        <div className="flex items-center gap-2">
          {/* Código de país fijo */}
          <span className="text-gray-600 font-medium">+591</span>
          <input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Ingresa tu número"
            className="mt-1 block flex-1 rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            maxLength={15}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* --- UBICACIÓN --- */}
      <div>
        <label className="block text-sm font-medium">Ubicación</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ciudad, Dirección"
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* --- MENSAJES --- */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      {/* --- BOTÓN GUARDAR --- */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}
