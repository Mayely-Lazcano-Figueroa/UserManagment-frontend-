'use client';
import Link from "next/link";
import RegistroGoogle from "../signUp/registroServicios/registroGoogle";
import RegistroForm from "../../../controlC/HU1/RequesterForm/page";
import GithubButton from "@/app/components/auth/botonRegistro/buttonGithub";
import DiscordButton from "@/app/components/auth/botonRegistro/buttonDiscord";

export default function SignUp() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-blue-50 animate-fadeInUp">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Regístrate en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            Servineo
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-center text-gray-600 mb-8 text-sm">
          Crea tu cuenta como requester y empieza a publicar tus servicios
        </p>

        {/* Formulario principal */}
        <RegistroForm />

        {/* Separador */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-400 text-sm">o continúa con</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Botones de redes sociales */}
        <div className="flex flex-col items-center space-y-3 mt-3">
          <RegistroGoogle />
          <GithubButton />
          <DiscordButton />
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start mt-5 text-sm text-gray-600">
          <input
            type="checkbox"
            className="mt-1 mr-2 accent-blue-500 focus:ring-2 focus:ring-blue-300 rounded"
          />
          <p>
            Al registrarte aceptas los{" "}
            <Link
              href="../HU1/RequesterForm/Terminosycondiciones"
              className="underline text-blue-500 hover:text-blue-400 transition"
            >
              términos de uso
            </Link>
            .
          </p>
        </div>

        {/* Enlace de inicio de sesión */}
        <p className="mt-6 text-center text-gray-700 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="../HU4/login"
            className="text-blue-500 hover:text-blue-400 font-semibold hover:underline transition"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
