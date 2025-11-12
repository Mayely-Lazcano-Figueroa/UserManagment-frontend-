// src/app/controlC/HU5/page.tsx
'use client'; // si tu page usa hooks de cliente

import ConfiguracionLayout from '@/app/controlC/Configuracion/layout'; // ruta absoluta o relativa según tu tsconfig
import RequesterEditForm from './RequesterEditForm'; // o la ruta actual

export default function HU5PageWrapped() {
  return (
    <ConfiguracionLayout>
      <div className="max-w-4xl w-full text-left">
        <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
        <RequesterEditForm />
      </div>
    </ConfiguracionLayout>
  );
}
