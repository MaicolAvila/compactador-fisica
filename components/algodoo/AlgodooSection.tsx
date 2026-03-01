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
} from "recharts";

const compactionData = [
  { displacement: 0, force: 0 },
  { displacement: 10, force: 120 },
  { displacement: 20, force: 280 },
  { displacement: 30, force: 400 },
  { displacement: 40, force: 480 },
  { displacement: 50, force: 480 },
];

const cards = [
  { label: "Fuerza de entrada", value: "120 N", unit: "N" },
  { label: "Fuerza de salida", value: "312.38 N", unit: "N" },
  { label: "Ventaja mecánica", value: "4:1", unit: "" },
];

export default function AlgodooSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 rounded-xl h-[320px]"
        >
          <p className="text-muted-foreground text-sm mb-4">Curva de compactación (Fuerza vs Desplazamiento)</p>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={compactionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="displacement" stroke="#737373" tick={{ fill: "#a3a3a3" }} />
              <YAxis stroke="#737373" tick={{ fill: "#a3a3a3" }} />
              <Tooltip
                contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                labelStyle={{ color: "#00ff88" }}
              />
              <Line type="monotone" dataKey="force" stroke="#00ff88" strokeWidth={2} dot={{ fill: "#00ff88" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
