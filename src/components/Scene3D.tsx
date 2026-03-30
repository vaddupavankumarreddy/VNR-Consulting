import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed, size }: { position: [number, number, number]; color: string; speed: number; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1.5}>
      <mesh position={position} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 32, 64]} />
        <MeshDistortMaterial color={color} distort={0.2} speed={3} roughness={0.3} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position}>
        <octahedronGeometry args={[0.5]} />
        <MeshDistortMaterial color={color} distort={0.15} speed={2} roughness={0.1} metalness={0.95} />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} className="!absolute inset-0">
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#4d9de0" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#e84393" />
      <pointLight position={[0, 3, 3]} intensity={0.8} color="#f5943b" />

      <FloatingSphere position={[-2.5, 1.2, -1]} color="#3b82d9" speed={1.5} size={0.7} />
      <FloatingSphere position={[2.8, -0.8, -2]} color="#e84393" speed={1.2} size={0.5} />
      <FloatingSphere position={[0.5, 2, -1.5]} color="#f5943b" speed={1.8} size={0.4} />
      <FloatingTorus position={[-1.5, -1.5, -1]} color="#3b82d9" speed={1} />
      <FloatingOctahedron position={[2, 1.5, -0.5]} color="#f5943b" speed={1.3} />
      <FloatingOctahedron position={[-2, 0, 0]} color="#e84393" speed={1.6} />
    </Canvas>
  );
}
