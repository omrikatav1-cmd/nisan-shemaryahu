"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SignaturePadLib from "signature_pad";

type SignaturePadProps = {
  onSignature: (base64: string) => void;
  label?: string;
  width?: number;
  height?: number;
};

export default function SignaturePad({
  onSignature,
  label = "חתימה",
  width = 400,
  height = 200,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);

  const handleEnd = useCallback(() => {
    if (!padRef.current || padRef.current.isEmpty()) return;
    onSignature(padRef.current.toDataURL("image/png"));
  }, [onSignature]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pad = new SignaturePadLib(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
      penColor: "#1E293B",
    });

    pad.addEventListener("endStroke", handleEnd);
    padRef.current = pad;

    return () => {
      pad.removeEventListener("endStroke", handleEnd);
      pad.off();
      padRef.current = null;
    };
  }, [handleEnd]);

  const handleClear = () => {
    padRef.current?.clear();
    onSignature("");
  };

  return (
    <motion.div
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <span className="text-sm font-semibold text-[#F1F5F9]">{label}</span>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-[0.625rem] border border-white/10 bg-white cursor-crosshair w-full max-w-full"
        style={{ touchAction: "none", height }}
      />

      <button
        type="button"
        onClick={handleClear}
        className="self-start text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
      >
        נקה חתימה
      </button>
    </motion.div>
  );
}
