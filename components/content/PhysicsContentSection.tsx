"use client";

import { motion } from "framer-motion";
import { useSimulationStore } from "@/store/simulationStore";

export default function PhysicsContentSection() {
  const { params, derived, currentMaterial } = useSimulationStore();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
        >
          Como funciona la fisica del compactador
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto"
        >
          Modelo cuasi-estatico basado en palanca de segundo genero: las aceleraciones son pequenas y domina el equilibrio de fuerzas.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-accent-neon">1) Ventaja mecanica</h3>
            <p className="text-sm text-muted-foreground mb-3">La ley de momentos define cuanta fuerza se amplifica en el piston.</p>
            <p className="text-sm mb-2">VM = L1 / L2 = {params.l1.toFixed(2)} / {params.l2.toFixed(2)} = {derived.vm.toFixed(2)}</p>
            <p className="text-sm">Fs ideal = Fe x VM = {params.inputForce.toFixed(0)} x {derived.vm.toFixed(2)} = {derived.outputForceIdeal.toFixed(0)} N</p>
          </article>

          <article className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-accent-electric">2) Perdidas y trabajo util</h3>
            <p className="text-sm text-muted-foreground mb-3">No toda la fuerza llega al residuo: parte se pierde en peso de placa y friccion.</p>
            <p className="text-sm mb-2">Fs real = Fs ideal - (m x g) - Ff = {derived.outputForceReal.toFixed(0)} N</p>
            <p className="text-sm mb-2">Fuerza util material = {derived.usefulForce.toFixed(0)} N ({(derived.efficiency * 100).toFixed(1)}% de eficiencia)</p>
            <p className="text-sm">Trabajo por ciclo = Futil x d = {derived.work.toFixed(1)} J</p>
          </article>

          <article className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-[#ffd166]">3) Conservacion de energia</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Eentrada = Ep + Edeformacion + Efriccion. El objetivo es maximizar energia de deformacion y minimizar perdidas por friccion.
            </p>
            <p className="text-sm mb-2">Material activo: {currentMaterial.name}</p>
            <p className="text-sm mb-2">Umbral de fluencia aprox: {currentMaterial.yieldForce.toFixed(0)} N</p>
            <p className="text-sm">Indice de compactabilidad actual: {(derived.compactability * 100).toFixed(1)}%</p>
          </article>
        </div>

        <div className="glass p-6 rounded-xl mt-6">
          <h3 className="text-lg font-semibold mb-3">Casos de uso real del informe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background/40 border border-white/10 rounded-lg p-4">
              <p className="font-semibold mb-1">Instituciones educativas</p>
              <p className="text-muted-foreground">Disminuye volumen acumulado y frecuencia de vaciado en zonas de alto trafico.</p>
            </div>
            <div className="bg-background/40 border border-white/10 rounded-lg p-4">
              <p className="font-semibold mb-1">Centros comerciales</p>
              <p className="text-muted-foreground">Permite ajustar rutas segun demanda real por horario y temporada.</p>
            </div>
            <div className="bg-background/40 border border-white/10 rounded-lg p-4">
              <p className="font-semibold mb-1">Sistema urbano municipal</p>
              <p className="text-muted-foreground">Conecta ciclos de compactacion con planificacion de recoleccion inteligente.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
