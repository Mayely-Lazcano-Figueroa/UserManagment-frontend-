"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaFormProps {
  /** callback que recibe si el captcha es válido o no */
  onVerified?: (success: boolean) => void;
}

const ReCaptchaForm: React.FC<ReCaptchaFormProps> = ({ onVerified }) => {
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      onVerified?.(false); // No válido
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/controlC/recaptcha/verify-recaptcha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();
      const success = data.success ?? false;

      onVerified?.(success); 
    } catch (err) {
      onVerified?.(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={(value) => setToken(value)}
      />
      <button disabled={!token}>Enviar</button>
    </form>
  );
};

export default ReCaptchaForm;