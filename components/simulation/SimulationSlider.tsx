"use client";

import { motion } from "framer-motion";
import { MATERIAL_LIST, useSimulationStore } from "@/store/simulationStore";

const scenarios = [
  { id: "educativo", title: "Instituciones educativas", detail: "Estima volumen compacto diario con flujo variable de estudiantes." },
  { id: "comercial", title: "Centros comerciales", detail: "Ajusta compactacion por picos horarios y temporadas." },
  { id: "municipal", title: "Sistema urbano municipal", detail: "Proyecta reduccion de rutas de recoleccion innecesarias." },
] as const;

function numberFormat(value: number, digits = 2) {
  return value.toFixed(digits);
}

export default function SimulationSlider() {
  const { params, derived, isPlaying, modeDemo, activeScenario, setParam, applyPreset, togglePlay, setModeDemo, setActiveScenario } =
    useSimulationStore();

  const scenarioInputs =
    activeScenario === "educativo"
      ? { ciclos: 26, volumen: 0.013, eficiencia: 0.82 }
      : activeScenario === "comercial"
        ? { ciclos: 75, volumen: 0.022, eficiencia: 0.78 }
        : { ciclos: 120, volumen: 0.027, eficiencia: 0.74 };

  const reducedVolume = scenarioInputs.ciclos * scenarioInputs.volumen * derived.compactability * scenarioInputs.eficiencia;
  const totalWork = scenarioInputs.ciclos * derived.work;
  const collectionReduction = Math.min(65, reducedVolume * 12);

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
          Ajusta variables reales del compactador y observa en tiempo real la ventaja mecanica, energia y comportamiento por material.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-xl max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => applyPreset("informe")} className="px-3 py-2 rounded-md text-sm bg-background/50 border border-white/10 hover:border-accent-neon/60">
              Preset informe base
            </button>
            <button onClick={() => applyPreset("maximaCompresion")} className="px-3 py-2 rounded-md text-sm bg-background/50 border border-white/10 hover:border-accent-neon/60">
              Preset maxima compresion
            </button>
            <button onClick={() => applyPreset("bajoEsfuerzo")} className="px-3 py-2 rounded-md text-sm bg-background/50 border border-white/10 hover:border-accent-neon/60">
              Preset bajo esfuerzo
            </button>
            <button onClick={togglePlay} className="px-3 py-2 rounded-md text-sm bg-accent-neon text-background font-semibold">
              {isPlaying ? "Pausar ciclo" : "Reproducir ciclo"}
            </button>
            <button onClick={() => setModeDemo(!modeDemo)} className="px-3 py-2 rounded-md text-sm bg-background/50 border border-white/10 hover:border-accent-neon/60">
              {modeDemo ? "Modo demo activo" : "Modo demo inactivo"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Posicion de la palanca ({params.leverPosition}%)</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.leverPosition}
                  onChange={(e) => setParam("leverPosition", Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-accent-neon"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-muted-foreground">
                  L1 brazo largo (m)
                  <input type="number" min={0.2} max={1.5} step={0.01} value={params.l1} onChange={(e) => setParam("l1", Math.max(0.2, Number(e.target.value)))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
                <label className="text-sm text-muted-foreground">
                  L2 brazo corto (m)
                  <input type="number" min={0.05} max={0.6} step={0.01} value={params.l2} onChange={(e) => setParam("l2", Math.max(0.05, Number(e.target.value)))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
                <label className="text-sm text-muted-foreground">
                  Fuerza de entrada (N)
                  <input type="number" min={40} max={250} step={1} value={params.inputForce} onChange={(e) => setParam("inputForce", Number(e.target.value))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
                <label className="text-sm text-muted-foreground">
                  Friccion total (N)
                  <input type="number" min={0} max={140} step={1} value={params.frictionForce} onChange={(e) => setParam("frictionForce", Number(e.target.value))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
                <label className="text-sm text-muted-foreground">
                  Masa de placa (kg)
                  <input type="number" min={0.5} max={8} step={0.1} value={params.plateMass} onChange={(e) => setParam("plateMass", Number(e.target.value))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
                <label className="text-sm text-muted-foreground">
                  Desplazamiento (m)
                  <input type="number" min={0.08} max={0.6} step={0.01} value={params.displacement} onChange={(e) => setParam("displacement", Number(e.target.value))} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground" />
                </label>
              </div>
              <label className="text-sm text-muted-foreground block">
                Material a compactar
                <select value={params.materialId} onChange={(e) => setParam("materialId", e.target.value as typeof params.materialId)} className="mt-1 w-full rounded-md bg-background/60 border border-white/10 p-2 text-foreground">
                  {MATERIAL_LIST.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-xs text-muted-foreground">{MATERIAL_LIST.find((item) => item.id === params.materialId)?.description}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-background/50 border border-white/10">
                  <p className="text-muted-foreground text-sm">Ventaja mecanica</p>
                  <p className="text-xl font-bold text-accent-electric">{numberFormat(derived.vm)}:1</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-white/10">
                  <p className="text-muted-foreground text-sm">Fs ideal</p>
                  <p className="text-xl font-bold text-foreground">{numberFormat(derived.outputForceIdeal, 0)} N</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-white/10">
                  <p className="text-muted-foreground text-sm">Fs real util</p>
                  <p className="text-xl font-bold text-accent-neon">{numberFormat(derived.usefulForce, 0)} N</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-white/10">
                  <p className="text-muted-foreground text-sm">Trabajo por ciclo</p>
                  <p className="text-xl font-bold text-foreground">{numberFormat(derived.work, 1)} J</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/40 border border-white/10">
                <p className="text-sm text-muted-foreground mb-2">Calculadora de ventaja mecanica (L1/L2)</p>
                <p className="text-lg font-semibold text-accent-neon">
                  Tu fuerza se multiplica por {numberFormat(derived.vm)}x y la salida ideal llega a {numberFormat(derived.outputForceIdeal, 0)} N.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Formula: VM = L1/L2, Fs = Fe x VM. Incluye perdidas por peso y friccion para estimar fuerza util real.</p>
              </div>

              <div className="p-4 rounded-lg bg-background/40 border border-white/10">
                <p className="text-sm text-muted-foreground mb-3">Simulador de escenarios operativos</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => setActiveScenario(scenario.id)}
                      className={`px-3 py-2 rounded-md text-sm border ${activeScenario === scenario.id ? "bg-accent-neon text-background border-accent-neon" : "bg-background/50 border-white/10 hover:border-accent-neon/60"}`}
                    >
                      {scenario.title}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{scenarios.find((scenario) => scenario.id === activeScenario)?.detail}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-md bg-background/50 border border-white/10">
                    <p className="text-xs text-muted-foreground">Volumen reducido diario</p>
                    <p className="font-semibold text-accent-neon">{numberFormat(reducedVolume, 3)} m3</p>
                  </div>
                  <div className="p-3 rounded-md bg-background/50 border border-white/10">
                    <p className="text-xs text-muted-foreground">Trabajo mecanico total</p>
                    <p className="font-semibold text-foreground">{numberFormat(totalWork, 0)} J/dia</p>
                  </div>
                  <div className="p-3 rounded-md bg-background/50 border border-white/10">
                    <p className="text-xs text-muted-foreground">Reduccion de recoleccion</p>
                    <p className="font-semibold text-accent-electric">{numberFormat(collectionReduction, 1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-center gap-8 h-24">
            <div className="flex flex-col items-center">
              <div className="w-2 bg-accent-electric rounded-full transition-all" style={{ height: `${22 + (params.leverPosition / 100) * 40}px` }} />
              <span className="text-xs text-muted-foreground mt-2">Palanca</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 bg-accent-neon rounded-full transition-all" style={{ height: `${24 + (derived.usefulForce / 650) * 48}px` }} />
              <span className="text-xs text-muted-foreground mt-2">Fuerza util</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 rounded-full transition-all" style={{ height: `${20 + derived.compactability * 38}px`, backgroundColor: MATERIAL_LIST.find((item) => item.id === params.materialId)?.color }} />
              <span className="text-xs text-muted-foreground mt-2">Compactabilidad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
