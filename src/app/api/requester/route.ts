import { NextRequest, NextResponse } from 'next/server';
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
}

//ahora mismo integrado