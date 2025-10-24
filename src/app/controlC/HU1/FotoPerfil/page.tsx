
"use client";
import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function FotoPerfil() {
  const [foto, setFoto] = useState<string | null>(null);
  interface ManejarCambioEvent extends React.ChangeEvent<HTMLInputElement> { }
  const manejarCambio = (e: ManejarCambioEvent) => {
    const archivo: File | undefined = e.target.files?.[0];
    if (archivo) {
      setFoto(URL.createObjectURL(archivo));
    }
  };

  const eliminarFoto = () => setFoto(null);

  const continuar = async () => {
    if (!foto) return;

    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      alert("No se encontró el usuario");
      return;
    }

    const formData = new FormData();
    formData.append("usuarioId", usuarioId);
    formData.append("fotoPerfil", foto);

    try {
      const response = await fetch("http://localhost:8000/src/modules/controlC/HU1/FotoPerfil", {
        method: "POST",
        body: JSON.stringify({
          usuarioId,
          fotoPerfil: foto, // o URL si ya la subes al servidor
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Foto actualizada correctamente");
        window.location.href = "/ctrlC/UbicacionRequester";
      } else {
        // 🛑 AGREGAR ESTO para ver la respuesta real del servidor
        const errorText = await response.text();
        console.error("Respuesta detallada del servidor:", errorText);

        alert(`Error al subir la foto. Código: ${response.status}. Revisa la consola para más detalles.`);

      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };


  return (

    <div className="flex justify-center items-center min-h-screen bg-[#759AE0]">
      <div
        className="
         bg-gradient-to-br from-[#FFF8E7] to-[#F1E7C8]
        p-6 rounded-2xl 
        shadow-[0_10px_25px_rgba(0,0,0,0.25)]
        w-[400px] text-center 
        transform transition-all duration-300
        hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-xl font-semibold mb-2 text-black">Foto de perfil</h2>
        <p className="text-sm text-gray-600 mb-4">
          Sube una foto tuya para que otros te reconozcan.
        </p>
        <hr style={{ border: "1px solid #d1d5db", width: "80%" }} />
        <p className="text-sm text-gray-600 mb-4">
          Puedes elegir desde tu dispositivo.
        </p>

        { }
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {foto ? (
              <img
                src={foto}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-full h-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>

          <input
            id="input-foto"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={manejarCambio}
          />
          { }
          <div className="flex gap-2">
            <label
              htmlFor="input-foto"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-[#1491cc]"
            >
              {foto ? "Cambiar foto" : "Subir foto"}
            </label>
            { }
            {foto && (
              <button
                onClick={eliminarFoto}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
        { }
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-[#ff0000] text-white rounded-full hover:bg-[#ff0000]"
          >
            Atrás
          </button>

          { }
          <button
            onClick={continuar}
            disabled={!foto}
            className={`px-4 py-2 rounded-full text-white transition-colors ${foto
              ? "bg-[#2B31E0] hover:bg-[#1491cc]"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
// src/app/HU1/ctrlC/FotoPerfil/page.tsx
/*
"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function FotoPerfil() {
  // Es mejor guardar el archivo File si quieres usarlo directamente en el handleSubmit
  // Pero para simplicidad y mantener tu estado de 'foto' como URL:
  const [foto, setFoto] = useState<string | null>(null);

  // No es necesario definir una interfaz extra, solo usa React.ChangeEvent<HTMLInputElement>
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo: File | undefined = e.target.files?.[0];
    if (archivo) {
      // Guardamos la URL temporal para la previsualización
      setFoto(URL.createObjectURL(archivo));
    }
  };

  const eliminarFoto = () => setFoto(null);

  // 🛑 REEMPLAZA TU FUNCIÓN 'continuar' ORIGINAL CON ESTA VERSIÓN CORREGIDA 🛑
  const continuar = async () => {
    // 1. Obtener el archivo real usando el ID del input
    const inputElement = document.getElementById("input-foto") as HTMLInputElement;
    const archivo = inputElement?.files?.[0]; // Obtener el archivo real (objeto File)

    if (!archivo) {
      alert("Por favor, selecciona una foto antes de continuar.");
      return;
    }

    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      alert("No se encontró el usuario. ¿Terminaste el registro anterior?");
      return;
    }

    const formData = new FormData();
    formData.append("usuarioId", usuarioId);
    formData.append("fotoPerfil", archivo); // 🛑 CLAVE: Enviar el objeto File real

    try {
      const response = await fetch("http://localhost:8000/api/controlC/HU1/FotoPerfil", {
        method: "PUT",
        // 🛑 CLAVE: ENVIAR formData DIRECTAMENTE
        body: formData,
        // NO incluyas headers: { "Content-Type": "application/json" }
        // El navegador se encarga de establecer 'Content-Type': 'multipart/form-data' automáticamente.
      });

      if (response.ok) {
        alert("Foto actualizada correctamente");
        // 🛑 Redirigir AHORA que la subida fue exitosa
        window.location.href = "/HU1/ctrlC/UbicacionRequester"; // Asegúrate de que la ruta sea correcta (incluí /HU1 si es parte de la estructura)
      } else {
        // Intenta obtener un mensaje de error del backend si es posible
        const errorData = await response.text();
        console.error("Error del servidor:", errorData);
        alert(`Error al subir la foto: ${response.status} - ${errorData.substring(0, 50)}...`);
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor.");
    }
  };
  // ------------------------------------------------------------------------------------

  return (
   
    <div className="flex justify-center items-center min-h-screen bg-[#759AE0]">
      <div
        className="
                bg-gradient-to-br from-[#FFF8E7] to-[#F1E7C8]
                p-6 rounded-2xl 
                shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                w-[400px] text-center 
                transform transition-all duration-300
                hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
        {}
        <h2 className="text-xl font-semibold mb-2 text-black">Foto de perfil</h2>
        <p className="text-sm text-gray-600 mb-4">
          Sube una foto tuya para que otros te reconozcan.
        </p>
        <hr style={{ border: "1px solid #d1d5db", width: "80%" }} />
        <p className="text-sm text-gray-600 mb-4">
          Puedes elegir desde tu dispositivo.
        </p>

        {}
        <div className="flex flex-col items-center gap-4">
          {}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {foto ? (
              <img
                src={foto}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-full h-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>

          <input
            id="input-foto"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={manejarCambio}
          />
          {}
          <div className="flex gap-2">
            <label
              htmlFor="input-foto"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-[#1491cc]"
            >
              {foto ? "Cambiar foto" : "Subir foto"}
            </label>
            {}
            {foto && (
              <button
                onClick={eliminarFoto}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
        {}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-[#ff0000] text-white rounded-full hover:bg-[#ff0000]"
          >
            Atrás
          </button>

          {}
          <button
            onClick={continuar} // Llama a la nueva función
            disabled={!foto}
            className={`px-4 py-2 rounded-full text-white transition-colors ${foto
              ? "bg-[#2B31E0] hover:bg-[#1491cc]"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}*/

