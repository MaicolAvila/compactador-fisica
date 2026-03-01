"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const CompactorCanvas = dynamic(() => import("./CompactorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted/20 rounded-xl">
      <span className="text-accent-neon animate-pulse">Cargando modelo 3D...</span>
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Compactador de Basura{" "}
            <span className="text-accent-neon">Manual</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Proyecto de ingeniería y física: ventaja mecánica 4:1. Reduce el volumen de residuos con una palanca y un pistón. Sostenible y educativo.
          </p>
          <motion.a
            href="#algodoo"
            className="inline-block px-8 py-3 rounded-lg bg-accent-neon text-background font-semibold btn-glow hover:shadow-glow-hover transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver resultados
          </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden bg-muted/20 border border-white/10"
        >
          <CompactorCanvas />
        </motion.div>
      </div>
    </section>
  );
}
