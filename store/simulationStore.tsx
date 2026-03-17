"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { MaterialId, MATERIAL_LIST, MATERIALS } from "@/lib/physics/materials";
import {
  computeSimulation,
  createCompactionCurve,
  createEfficiencyVsFrictionCurve,
  createMaterialComparisonCurve,
  createWorkVsTimeCurve,
  SimulationParams,
} from "@/lib/physics/engine";

type PresetId = "informe" | "maximaCompresion" | "bajoEsfuerzo";

export type ScenarioId = "educativo" | "comercial" | "municipal";

type SimulationStoreValue = {
  params: SimulationParams;
  isPlaying: boolean;
  modeDemo: boolean;
  activeScenario: ScenarioId;
  setParam: <K extends keyof SimulationParams>(key: K, value: SimulationParams[K]) => void;
  applyPreset: (presetId: PresetId) => void;
  togglePlay: () => void;
  setModeDemo: (value: boolean) => void;
  setActiveScenario: (scenario: ScenarioId) => void;
  derived: ReturnType<typeof computeSimulation>;
  compactionCurve: ReturnType<typeof createCompactionCurve>;
  workCurve: ReturnType<typeof createWorkVsTimeCurve>;
  efficiencyCurve: ReturnType<typeof createEfficiencyVsFrictionCurve>;
  materialComparisonCurve: ReturnType<typeof createMaterialComparisonCurve>;
  currentMaterial: (typeof MATERIAL_LIST)[number];
};

const DEFAULT_PARAMS: SimulationParams = {
  l1: 0.6,
  l2: 0.15,
  inputForce: 120,
  frictionForce: 22,
  plateMass: 2,
  displacement: 0.25,
  leverPosition: 50,
  materialId: "plastico",
};

const PRESETS: Record<PresetId, Partial<SimulationParams>> = {
  informe: {
    l1: 0.6,
    l2: 0.15,
    inputForce: 120,
    frictionForce: 22,
    plateMass: 2,
    displacement: 0.25,
    materialId: "plastico",
    leverPosition: 100,
  },
  maximaCompresion: {
    l1: 1.2,
    l2: 0.3,
    inputForce: 145,
    frictionForce: 10,
    plateMass: 2.8,
    displacement: 0.35,
    materialId: "metal",
    leverPosition: 100,
  },
  bajoEsfuerzo: {
    l1: 0.8,
    l2: 0.2,
    inputForce: 85,
    frictionForce: 18,
    plateMass: 1.8,
    displacement: 0.22,
    materialId: "papel",
    leverPosition: 65,
  },
};

const SimulationStoreContext = createContext<SimulationStoreValue | null>(null);

export function SimulationStoreProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modeDemo, setModeDemo] = useState(true);
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("educativo");

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = window.setInterval(() => {
      setParams((current) => {
        const nextPosition = current.leverPosition >= 100 ? 0 : current.leverPosition + 2;
        return {
          ...current,
          leverPosition: nextPosition,
        };
      });
    }, 80);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const value = useMemo<SimulationStoreValue>(() => {
    const derived = computeSimulation(params);
    return {
      params,
      isPlaying,
      modeDemo,
      activeScenario,
      setParam: (key, val) => {
        setParams((current) => ({
          ...current,
          [key]: val,
        }));
      },
      applyPreset: (presetId) => {
        setParams((current) => ({
          ...current,
          ...PRESETS[presetId],
        }));
      },
      togglePlay: () => setIsPlaying((current) => !current),
      setModeDemo,
      setActiveScenario,
      derived,
      compactionCurve: createCompactionCurve(params),
      workCurve: createWorkVsTimeCurve(params),
      efficiencyCurve: createEfficiencyVsFrictionCurve(params),
      materialComparisonCurve: createMaterialComparisonCurve(params),
      currentMaterial: MATERIALS[params.materialId as MaterialId],
    };
  }, [activeScenario, isPlaying, modeDemo, params]);

  return <SimulationStoreContext.Provider value={value}>{children}</SimulationStoreContext.Provider>;
}

export function useSimulationStore() {
  const context = useContext(SimulationStoreContext);
  if (!context) {
    throw new Error("useSimulationStore debe usarse dentro de SimulationStoreProvider");
  }
  return context;
}

export { MATERIAL_LIST };
