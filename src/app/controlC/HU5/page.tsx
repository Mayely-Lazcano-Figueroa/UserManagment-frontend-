/*'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../HU3/hooks/usoAutentificacion'
import { obtenerDatosUsuarioLogueado } from '../../userManagement/lib/services/editNumber'

const RequesterEditForm = dynamic(() => import('../../components/editProfile/RequesterEditForm'), { ssr: false })

interface RequesterDataState {
  requesterId: string
  phone: string
  direction: string
  coordinates: [number, number]
}

const INITIAL_DATA: RequesterDataState = {
  requesterId: '',
  phone: '',
  direction: '',
  coordinates: [0, 0],
}

export default function EditProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const [profileData, setProfileData] = useState<RequesterDataState>(INITIAL_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProfileData = useCallback(async () => {
    if (authLoading || !user) return

    setLoading(true)
    setError(null)

    try {
      const rawData = await obtenerDatosUsuarioLogueado()

      // 🔹 Mapear correctamente los datos de la API a nuestro estado
      const data: RequesterDataState = {
        requesterId: rawData.requesterId,
        phone: rawData.telefono || '',
        direction: rawData.ubicacion?.direccion || '',
        coordinates: [
          rawData.ubicacion?.lat || 0,
          rawData.ubicacion?.lng || 0,
        ],
      }

      setProfileData(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar los datos del perfil.'
      setError(message)
      setProfileData(INITIAL_DATA)
    } finally {
      setLoading(false)
    }
  }, [authLoading, user])

  useEffect(() => {
    loadProfileData()
  }, [loadProfileData])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary text-lg animate-pulse">Cargando datos del perfil...</p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background p-8 text-center flex items-center justify-center">
        <div className="bg-card rounded-3xl shadow-lg p-6 border border-border max-w-md w-full backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-6 text-destructive">
            {user ? 'Error de Carga' : 'Acceso Denegado'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {user ? `No se pudo cargar el perfil: ${error}` : 'Por favor, inicie sesión para ver esta página.'}
          </p>
          {user && (
            <button
              onClick={loadProfileData}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Reintentar Carga
            </button>
          )}
          {!user && (
            <button 
              onClick={() => window.location.href = '/controlC/HU4/login'}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Ir al Login
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      
      {/* 🔹 Contenido principal - Solo título y formulario }
      <main className="flex-grow p-5 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          Editar Perfil
        </h1>

        <div className="bg-card rounded-3xl shadow-lg p-6 border border-border w-full backdrop-blur-sm">
          <RequesterEditForm />
        </div>
      </main>

      {/* 🔹 Footer }
      <footer className="text-center p-4 text-muted-foreground text-sm border-t border-border bg-card/70 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Servineo
      </footer>
    </div>
  )
}*/