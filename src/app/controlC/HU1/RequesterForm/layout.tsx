// app/controlC/HU6/closeSession/layout.tsx
import React from "react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </section>
  )
}
