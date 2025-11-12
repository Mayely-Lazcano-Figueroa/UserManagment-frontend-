/*'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useAuth } from '../HU3/hooks/usoAutentificacion'
import { useRouter } from 'next/navigation'

const ChangePasswordForm = dynamic(() => import('../../components/editProfile/ChangePasswordForm'), { ssr: false })

export default function ChangePasswordPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isChanging, setIsChanging] = useState(false)

  // Callback cuando se cancela
  const handleCancel = () => {
    router.back()
  }

  // Callback cuando se guarda exitosamente
  const handleSaved = () => {
    setIsChanging(false)
    setTimeout(() => {
      router.back()
    }, 1500)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary text-lg animate-pulse">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-8 text-center flex items-center justify-center">
        <div className="bg-card rounded-3xl shadow-lg p-6 border border-border max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-destructive">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-6">Por favor, inicie sesión para ver esta página.</p>
          <button 
            onClick={() => router.push('/controlC/HU4/login')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
          >
            Ir al Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      
      {/* 🔹 Contenido principal - Solo título y formulario }
      <main className="flex-grow p-5 max-w-2xl mx-auto w-full flex flex-col items-center justify-center">
        
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          Cambiar Contraseña
        </h1>

        <div className="bg-card rounded-3xl shadow-lg p-6 border border-border w-full backdrop-blur-sm">
          <ChangePasswordForm 
            onCancel={handleCancel}
            onSaved={handleSaved}
          />
        </div>
      </main>

      {/* 🔹 Footer }
      <footer className="text-center p-4 text-muted-foreground text-sm border-t border-border bg-card/70 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Servineo
      </footer>
    </div>
  )
}*/