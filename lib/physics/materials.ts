export type MaterialId = "papel" | "plastico" | "metal";

export type MaterialModel = {
  id: MaterialId;
  name: string;
  yieldForce: number;
  stiffness: number;
  efficiencyFactor: number;
  color: string;
  description: string;
};

export const MATERIALS: Record<MaterialId, MaterialModel> = {
  papel: {
    id: "papel",
    name: "Papel y carton",
    yieldForce: 220,
    stiffness: 260,
    efficiencyFactor: 0.92,
    color: "#00ff88",
    description: "Se compacta con baja resistencia inicial y buena recuperacion de volumen.",
  },
  plastico: {
    id: "plastico",
    name: "Plastico PET",
    yieldForce: 320,
    stiffness: 360,
    efficiencyFactor: 0.84,
    color: "#00d4ff",
    description: "Requiere mayor fuerza para deformacion permanente del residuo.",
  },
  metal: {
    id: "metal",
    name: "Latas de aluminio",
    yieldForce: 430,
    stiffness: 520,
    efficiencyFactor: 0.72,
    color: "#ffd166",
    description: "Material con mayor umbral de fluencia y menor reduccion volumetrica.",
  },
};

export const MATERIAL_LIST = Object.values(MATERIALS);
