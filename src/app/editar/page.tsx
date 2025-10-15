'use client'

import RequesterEditForm from '@/controlC/RequesterEditForm'
import { useSearchParams } from 'next/navigation'

export default function EditarPage() {
  const searchParams = useSearchParams()
  const usuarioId = searchParams.get('id') || ''  // recibimos id por query param
  const initialPhone = searchParams.get('phone') || ''
  const initialLocation = searchParams.get('location') || ''

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Editar datos del usuario</h1>

      <RequesterEditForm
        requesterId={usuarioId}
        initialPhone={initialPhone}
        initialLocation={initialLocation}
        onSaved={() => alert('Cambios guardados correctamente')}
      />
    </main>
  )
}
