"use client";
import React, { useState } from "react";
import { Github } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../userManagement/hooks/usoAutentificacion";

export default function GithubButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { setUser } = useAuth();

  const handleGithub = () => {
    setLoading(true);

    const popup = window.open(
      `${BASE_URL}/auth/github`,
      "GitHubLogin",
      "width=600,height=700"
    );
    if (!popup) {
      toast.error("No se pudo abrir la ventana de GitHub");
      setLoading(false);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== BASE_URL) return;
      const data = event.data;

      if (data.type === "GITHUB_AUTH_SUCCESS") {
        toast.success("Autenticación con GitHub exitosa");
        // Guardar token
        localStorage.setItem("servineo_token", data.token);

        // Guardar usuario y actualizar contexto
        if (data.user) {
          localStorage.setItem("servineo_user", JSON.stringify(data.user));
          setUser(data.user);
          sessionStorage.setItem(
            "toastMessage",
            `¡Bienvenido, ${data.user.name}!`
          );
        }sessionStorage.setItem("toastMessage", `¡Bienvenido, ${data.user.name}!`);

        // Redirigir según si es la primera vez
        if (data.isFirstTime) {
          router.push("/userManagement/requester/signUp/registroUbicacion");
        } else {
          router.push("/");
        }

        window.removeEventListener("message", handleMessage);
        setLoading(false);
        popup.close();
      }

      if (data.type === "GITHUB_AUTH_ERROR") {
        toast.error(data.message || "Error en autenticación con GitHub");
        window.removeEventListener("message", handleMessage);
        setLoading(false);
        popup.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleGithub}
        disabled={loading}
        className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg shadow-sm text-black transition-colors"
      >
        <Github size={24} className="text-black" />
        {loading ? "Cargando..." : "Continuar con GitHub"}
      </button>
    </div>
  );
}
