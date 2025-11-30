"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaFormProps {
  onVerified?: (success: boolean) => void;
}

const ReCaptchaForm: React.FC<ReCaptchaFormProps> = ({ onVerified }) => {
  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);

  return (
    <div>
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={(value) => {
          setToken(value);
          onVerified?.(true); // Habilita botones inmediatamente
        }}
        onExpired={() => {
          setToken(null);
          onVerified?.(false); // Deshabilita todo al expirar
          captchaRef.current?.reset(); // Limpia el captcha visual
        }}
      />
    </div>
  );
};

export default ReCaptchaForm;
