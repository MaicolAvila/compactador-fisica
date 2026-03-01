"use client";

import { useRef, Suspense, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "/models/compactor.glb";

type ModelGroupRef = React.RefObject<THREE.Group>;

class ModelErrorBoundary extends Component<
  { groupRef: ModelGroupRef; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <PlaceholderModel groupRef={this.props.groupRef} />;
    }
    return this.props.children;
  }
}

function GlbModel({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF(MODEL_URL);
  const innerRef = useRef<THREE.Group>(null);
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

function PlaceholderModel({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base del compactador */}
      <mesh ref={meshRef} position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.2, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Cilindro / pistón */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.45, 0.8, 16]} />
        <meshStandardMaterial color="#00ff88" metalness={0.3} roughness={0.6} emissive="#00ff88" emissiveIntensity={0.2} />
      </mesh>
      {/* Palanca */}
      <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function CompactorCanvas() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (groupRef.current) {
          groupRef.current.rotation.y = progress * Math.PI * 0.5;
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00ff88" />
        <pointLight position={[3, -1, 2]} intensity={0.3} color="#00d4ff" />
        <ModelErrorBoundary groupRef={groupRef}>
          <Suspense
            fallback={
              <group ref={groupRef}>
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshBasicMaterial color="#00ff88" wireframe />
                </mesh>
              </group>
            }
          >
            <GlbModel groupRef={groupRef} />
          </Suspense>
        </ModelErrorBoundary>
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
