import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // La URL que tienes en tu archivo .env
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor define MONGODB_URI en el archivo .env');
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usamos una variable global para mantener la conexión entre recargas
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En producción, se crea una nueva conexión cada vez
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/*export async function connectDB() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME); // El nombre de tu base de datos (.env)
  return db;    //antiguoooo
}*/

export async function connectDB() {
  const client = await clientPromise;
  const db = client.db("servineo_db"); // directamente el nombre de tu DB
  return db;
}