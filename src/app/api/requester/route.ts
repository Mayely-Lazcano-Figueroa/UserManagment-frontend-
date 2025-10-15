/*import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/mongoClient';
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest) {
  try {
    const { id, telefono, ubicacion } = await req.json();

    if (!id || !telefono || !ubicacion) {
      return NextResponse.json({ message: 'Faltan datos requeridos' }, { status: 400 });
    }

    const db = await connectDB();

    // Buscamos el perfil del usuario por usuarioId
    const perfil = await db.collection('perfiles').findOne({ usuarioId: new ObjectId(id) });
    if (!perfil) {
      return NextResponse.json({ message: 'Perfil no encontrado' }, { status: 404 });
    }

    // Actualizamos los campos
    await db.collection('perfiles').updateOne(
      { usuarioId: new ObjectId(id) },
      {
        $set: {
          telefono,
          'ubicacion.direccion': ubicacion,
          actualizadoEl: new Date(),
        },
      }
    );

    return NextResponse.json({ message: 'Perfil actualizado correctamente' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'Error desconocido' }, { status: 500 });
  }
}*/

//ahora mismo integrado

//codigo de Martes 00:00
// frontend-1er sprint\UserManagment-frontend-\src\app\api\requester\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/mongoClient';
import { ObjectId } from 'mongodb';

/**
 * GET → Obtener el perfil del usuario por su ID
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Falta id del usuario' }, { status: 400 });
    }

    const db = await connectDB();

    // Buscar el perfil del usuario
    const perfil = await db.collection('perfiles').findOne({ usuarioId: new ObjectId(id) });

    if (!perfil) {
      // Si no hay perfil, devolvemos valores vacíos para evitar errores en el frontend
      return NextResponse.json({
        phone: '',
        location: '',
      });
    }

    // Retornar datos actuales con nombres compatibles con el frontend
    return NextResponse.json({
      phone: perfil.telefono ?? '', // Evita que salga "undefined"
      location: perfil.ubicacion?.direccion ?? '', // Si no hay ubicación, devuelve vacío
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'Error desconocido' }, { status: 500 });
  }
}

/**
 * PUT → Actualizar teléfono y ubicación del usuario
 */
export async function PUT(req: NextRequest) {
  try {
    const { id, phone, location } = await req.json();

    // Validar datos requeridos
    if (!id || phone === undefined || location === undefined) {
      return NextResponse.json({ message: 'Faltan datos requeridos' }, { status: 400 });
    }

    const db = await connectDB();

    // 🔹 Validación de teléfono duplicado
    const existingPhone = await db.collection('perfiles').findOne({
      telefono: phone,
      usuarioId: { $ne: new ObjectId(id) } // excluye al usuario actual
    });

    if (existingPhone) {
      return NextResponse.json({ message: 'Este número ya está en uso' }, { status: 400 });
    }

    // Buscar perfil existente
    const perfil = await db.collection('perfiles').findOne({ usuarioId: new ObjectId(id) });
    if (!perfil) {
      // Si no existe, creamos uno nuevo
      await db.collection('perfiles').insertOne({
        usuarioId: new ObjectId(id),
        telefono: phone,
        ubicacion: { direccion: location },
        creadoEl: new Date(),
        actualizadoEl: new Date(),
      });
      return NextResponse.json({ message: 'Perfil creado correctamente' });
    }

    // Si existe, actualizar campos
    await db.collection('perfiles').updateOne(
      { usuarioId: new ObjectId(id) },
      {
        $set: {
          telefono: phone,
          'ubicacion.direccion': location,
          actualizadoEl: new Date(),
        },
      }
    );

    return NextResponse.json({ message: 'Perfil actualizado correctamente' });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'Error desconocido' }, { status: 500 });
  }
}



