"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo } from "react";
import { useSimulationStore } from "@/store/simulationStore";

function toCsv(rows: Record<string, number | string>[]) {
  if (!rows.length) {
    return "";
  }
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((header) => String(row[header])).join(","));
  return [headers.join(","), ...lines].join("\n");
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function AlgodooSection() {
  const { params, derived, compactionCurve, workCurve, efficiencyCurve, materialComparisonCurve, currentMaterial } = useSimulationStore();

  const cards = useMemo(
    () => [
      { label: "Fuerza de entrada", value: `${params.inputForce.toFixed(0)} N` },
      { label: "Fuerza de salida ideal", value: `${derived.outputForceIdeal.toFixed(0)} N` },
      { label: "Fuerza util real", value: `${derived.usefulForce.toFixed(0)} N` },
      { label: "Ventaja mecanica", value: `${derived.vm.toFixed(2)}:1` },
      { label: "Trabajo por ciclo", value: `${derived.work.toFixed(1)} J` },
      { label: "Eficiencia", value: `${(derived.efficiency * 100).toFixed(1)}%` },
    ],
    [derived, params.inputForce],
  );

  return (
    <section id="algodoo" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
        >
          Resultados Algodoo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Curvas dinamicas en tiempo real para {currentMaterial.name.toLowerCase()}. Ajusta los controles del simulador y compara respuesta de fuerza, trabajo y eficiencia.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <p className="text-muted-foreground text-sm mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-accent-neon">{card.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 rounded-xl h-[320px]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">Fuerza vs desplazamiento</p>
              <button className="text-xs px-2 py-1 rounded border border-white/15 hover:border-accent-neon/60" onClick={() => downloadCsv("fuerza_desplazamiento.csv", toCsv(compactionCurve))}>
                Exportar CSV
              </button>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={compactionCurve} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="displacement" stroke="#737373" tick={{ fill: "#a3a3a3" }} label={{ value: "m", position: "insideBottomRight", fill: "#737373" }} />
                <YAxis stroke="#737373" tick={{ fill: "#a3a3a3" }} label={{ value: "N", angle: -90, position: "insideLeft", fill: "#737373" }} />
                <Tooltip contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} labelStyle={{ color: currentMaterial.color }} />
                <Line type="monotone" dataKey="force" stroke={currentMaterial.color} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 rounded-xl h-[320px]">
            <p className="text-muted-foreground text-sm mb-4">Trabajo acumulado vs tiempo</p>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={workCurve} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#737373" tick={{ fill: "#a3a3a3" }} label={{ value: "s", position: "insideBottomRight", fill: "#737373" }} />
                <YAxis stroke="#737373" tick={{ fill: "#a3a3a3" }} label={{ value: "J", angle: -90, position: "insideLeft", fill: "#737373" }} />
                <Tooltip contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} labelStyle={{ color: "#00d4ff" }} />
                <Line type="monotone" dataKey="work" stroke="#00d4ff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 rounded-xl h-[320px]">
            <p className="text-muted-foreground text-sm mb-4">Eficiencia vs friccion</p>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={efficiencyCurve} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="friction" stroke="#737373" tick={{ fill: "#a3a3a3" }} label={{ value: "N", position: "insideBottomRight", fill: "#737373" }} />
                <YAxis stroke="#737373" tick={{ fill: "#a3a3a3" }} domain={[0, 1]} label={{ value: "eta", angle: -90, position: "insideLeft", fill: "#737373" }} />
                <Tooltip contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} labelStyle={{ color: "#ffd166" }} />
                <Line type="monotone" dataKey="efficiency" stroke="#ffd166" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 rounded-xl h-[320px]">
            <p className="text-muted-foreground text-sm mb-4">Comparativa de materiales</p>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={materialComparisonCurve} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="displacement" stroke="#737373" tick={{ fill: "#a3a3a3" }} />
                <YAxis stroke="#737373" tick={{ fill: "#a3a3a3" }} />
                <Tooltip contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="papel" stroke="#00ff88" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="plastico" stroke="#00d4ff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="metal" stroke="#ffd166" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
