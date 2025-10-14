/*import { NextResponse } from "next/server";
import { connectDB } from "@/config/mongoClient";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { correo, password } = await request.json();

    if (!correo || !password) {
      return NextResponse.json(
        { message: "Correo y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Conexión a MongoDB
    const db = await connectDB();

    // 1️⃣ Buscar el perfil por correo
    const perfil = await db.collection("perfiles").findOne({ correo });

    if (!perfil) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // 2️⃣ Buscar credenciales asociadas
    const credenciales = await db.collection("credencialesAuth").findOne({
      usuarioId: new ObjectId(perfil._id),
    });

    if (!credenciales) {
      return NextResponse.json(
        { message: "No existen credenciales para este usuario" },
        { status: 401 }
      );
    }

    // 3️⃣ Comparar contraseñas (simple comparación, sin hash aún)
    if (password !== credenciales.hashPassword) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // ✅ Login exitoso
    return NextResponse.json(
      {
        message: "Login exitoso",
        usuarioId: perfil._id.toString(),
        nombre: perfil.nombreCompleto,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}*/

import { connectDB } from '@/config/mongoClient';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { correo, password } = await req.json();
    if (!correo || !password) {
      return new Response(JSON.stringify({ message: "Correo y contraseña requeridos" }), { status: 400 });
    }

    const db = await connectDB();
    const usuario = await db.collection("usuarios").findOne({ correo });

    if (!usuario) {
      return new Response(JSON.stringify({ message: "Usuario no encontrado" }), { status: 401 });
    }

    //const credenciales = await db.collection("credencialesAuth").findOne({ usuarioId: new ObjectId(usuario._id) });
    const credenciales = await db.collection("credencialesAuth").findOne({ usuarioId: usuario._id });


    if (!credenciales || credenciales.hashPassword !== password) {
      return new Response(JSON.stringify({ message: "Contraseña incorrecta" }), { status: 401 });
    }

    // Login exitoso, devolvemos usuarioId
    return new Response(JSON.stringify({ usuarioId: usuario._id.toString() }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al iniciar login" }), { status: 500 });
  }
}
