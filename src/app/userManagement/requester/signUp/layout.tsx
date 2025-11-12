'use client';

import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Falta configurar NEXT_PUBLIC_GOOGLE_CLIENT_ID en .env");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
      >
        {children}
      </div>
    </GoogleOAuthProvider>
  );
}
