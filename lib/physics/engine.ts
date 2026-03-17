import { MATERIALS, MaterialId } from "@/lib/physics/materials";

const GRAVITY = 9.8;

export type SimulationParams = {
  l1: number;
  l2: number;
  inputForce: number;
  frictionForce: number;
  plateMass: number;
  displacement: number;
  leverPosition: number;
  materialId: MaterialId;
};

export type SimulationResults = {
  vm: number;
  outputForceIdeal: number;
  outputForceReal: number;
  outputForceAtLever: number;
  usefulForce: number;
  lossesForce: number;
  work: number;
  efficiency: number;
  compactability: number;
};

export type CurvePoint = {
  displacement: number;
  force: number;
};

export type TimeWorkPoint = {
  time: number;
  work: number;
};

export type EfficiencyPoint = {
  friction: number;
  efficiency: number;
};

type MaterialComparisonPoint = {
  displacement: number;
  papel: number;
  plastico: number;
  metal: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const round = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export function computeMechanicalAdvantage(l1: number, l2: number) {
  if (l2 <= 0) {
    return 0;
  }
  return l1 / l2;
}

export function computeSimulation(params: SimulationParams): SimulationResults {
  const vm = computeMechanicalAdvantage(params.l1, params.l2);
  const outputForceIdeal = params.inputForce * vm;
  const lossesForce = params.plateMass * GRAVITY + params.frictionForce;
  const outputForceReal = Math.max(0, outputForceIdeal - lossesForce);
  const leverFactor = 0.55 + (params.leverPosition / 100) * 0.45;
  const outputForceAtLever = outputForceReal * leverFactor;
  const material = MATERIALS[params.materialId];
  const usefulForce = outputForceAtLever * material.efficiencyFactor;
  const work = usefulForce * params.displacement;
  const efficiency = outputForceIdeal > 0 ? usefulForce / outputForceIdeal : 0;
  const compactability = clamp(usefulForce / (material.yieldForce + material.stiffness * 0.45), 0, 1.5);

  return {
    vm: round(vm),
    outputForceIdeal: round(outputForceIdeal),
    outputForceReal: round(outputForceReal),
    outputForceAtLever: round(outputForceAtLever),
    usefulForce: round(usefulForce),
    lossesForce: round(lossesForce),
    work: round(work),
    efficiency: round(efficiency, 3),
    compactability: round(compactability, 3),
  };
}

export function createCompactionCurve(params: SimulationParams, points = 26): CurvePoint[] {
  const simulation = computeSimulation(params);
  const material = MATERIALS[params.materialId];
  const safePoints = Math.max(8, points);

  return Array.from({ length: safePoints }, (_, index) => {
    const fraction = index / (safePoints - 1);
    const displacement = params.displacement * fraction;
    const resistance = material.yieldForce + material.stiffness * fraction ** 1.4;
    const force = Math.min(simulation.outputForceAtLever, resistance);
    return {
      displacement: round(displacement, 3),
      force: round(force),
    };
  });
}

export function createWorkVsTimeCurve(params: SimulationParams, points = 30): TimeWorkPoint[] {
  const curve = createCompactionCurve(params, points);
  const safeDisplacement = Math.max(params.displacement, 0.01);

  return curve.map((point) => {
    const progress = point.displacement / safeDisplacement;
    const time = progress * 2;
    const work = point.force * point.displacement;
    return {
      time: round(time, 2),
      work: round(work),
    };
  });
}

export function createEfficiencyVsFrictionCurve(params: SimulationParams, points = 18): EfficiencyPoint[] {
  const safePoints = Math.max(8, points);
  const maxFriction = 140;

  return Array.from({ length: safePoints }, (_, index) => {
    const friction = (maxFriction / (safePoints - 1)) * index;
    const outputForceIdeal = params.inputForce * computeMechanicalAdvantage(params.l1, params.l2);
    const losses = params.plateMass * GRAVITY + friction;
    const real = Math.max(0, outputForceIdeal - losses);
    const efficiency = outputForceIdeal > 0 ? real / outputForceIdeal : 0;
    return {
      friction: round(friction),
      efficiency: round(efficiency, 3),
    };
  });
}

export function createMaterialComparisonCurve(params: SimulationParams, points = 24): MaterialComparisonPoint[] {
  const safePoints = Math.max(8, points);
  const base = computeSimulation(params).outputForceAtLever;

  return Array.from({ length: safePoints }, (_, index) => {
    const fraction = index / (safePoints - 1);
    const displacement = params.displacement * fraction;

    const buildForce = (id: MaterialId) => {
      const model = MATERIALS[id];
      const resistance = model.yieldForce + model.stiffness * fraction ** 1.4;
      return round(Math.min(base, resistance));
    };

    return {
      displacement: round(displacement, 3),
      papel: buildForce("papel"),
      plastico: buildForce("plastico"),
      metal: buildForce("metal"),
    };
  });
}
