import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";

function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.x += d * 1.5;
  });
  return (
    <mesh ref={ref} position={position} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.9, 0.35, 24, 64]} />
      <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

function RimDisc({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.x += d * 1.5;
  });
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.7, 0.7, 0.05, 12]} />
      <meshStandardMaterial
        color="#d4a84c"
        metalness={1}
        roughness={0.15}
        emissive="#a87a2a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Emblem() {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[1.6, 0.06, 32, 128]} />
          <meshStandardMaterial
            color="#e8c478"
            metalness={1}
            roughness={0.1}
            emissive="#d4a84c"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.06, 32, 128]} />
          <meshStandardMaterial
            color="#e8c478"
            metalness={1}
            roughness={0.1}
            emissive="#d4a84c"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.6, 0]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={1.2}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.3}
            color="#fff6d6"
          />
        </mesh>
      </group>
    </Float>
  );
}

export function WheelScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 5, 5]} intensity={32} angle={0.4} penumbra={1} color="#ffd28a" />
      <spotLight position={[-5, -3, 3]} intensity={20} angle={0.5} penumbra={1} color="#fff" />
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <group rotation={[0.2, 0.4, 0]}>
          <Wheel position={[0, 0, 0]} />
          <RimDisc position={[0, 0, 0]} />
        </group>
      </Float>
      <Environment preset="night" />
    </Canvas>
  );
}

export function EmblemScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#ffd28a" />
      <pointLight position={[-5, -2, -3]} intensity={20} color="#a87a2a" />
      <Emblem />
      <Environment preset="warehouse" />
    </Canvas>
  );
}
