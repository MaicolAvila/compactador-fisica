"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const INPUT_FORCE = 120; // N
const MIN_MA = 1;
const MAX_MA = 6;

export default function SimulationSlider() {
  const [leverPosition, setLeverPosition] = useState(50); // 0-100
  const ma = MIN_MA + (leverPosition / 100) * (MAX_MA - MIN_MA);
  const outputForce = Math.round(INPUT_FORCE * ma);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
        >
          Simulador interactivo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Mueve la palanca y observa cómo cambian la fuerza de salida y la ventaja mecánica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-xl max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <label className="block text-sm text-muted-foreground mb-2">Posición de la palanca</label>
            <input
              type="range"
              min={0}
              max={100}
              value={leverPosition}
              onChange={(e) => setLeverPosition(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-accent-neon"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/50 border border-white/10">
              <p className="text-muted-foreground text-sm">Fuerza de entrada</p>
              <p className="text-xl font-bold text-foreground">{INPUT_FORCE} N</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-white/10">
              <p className="text-muted-foreground text-sm">Fuerza de salida</p>
              <p className="text-xl font-bold text-accent-neon">{outputForce} N</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-white/10">
              <p className="text-muted-foreground text-sm">Ventaja mecánica</p>
              <p className="text-xl font-bold text-accent-electric">{ma.toFixed(2)}:1</p>
            </div>
          </div>

          {/* Representación 2D de vectores */}
          <div className="mt-8 flex items-end justify-center gap-8 h-24">
            <div className="flex flex-col items-center">
              <div className="w-2 bg-accent-electric rounded-full transition-all" style={{ height: `${20 + (leverPosition / 100) * 30}px` }} />
              <span className="text-xs text-muted-foreground mt-2">Entrada</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 bg-accent-neon rounded-full transition-all" style={{ height: `${30 + (outputForce / 600) * 50}px` }} />
              <span className="text-xs text-muted-foreground mt-2">Salida</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
