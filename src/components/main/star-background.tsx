"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useMemo } from "react";
import type { Points as PointsType, Group, LineSegments } from "three";
import * as THREE from "three";

// 1. Campo Estelar Interativo com Parallax 3D Suave
export const StarBackground = (props: PointsInstancesProps) => {
  const pointsRef = useRef<PointsType | null>(null);
  const groupRef = useRef<Group | null>(null);

  // 5000 estrelas em esfera 3D profunda
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.25 }),
  );

  useFrame((state, delta) => {
    // Rotação orbital cósmica contínua
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 25;
      pointsRef.current.rotation.y -= delta / 30;
    }

    // Parallax 3D suave reagindo ao cursor do mouse
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.25;
      const targetRotX = -state.pointer.y * 0.25;

      // Interpolação suave (lerp) para sensação de inércia cósmica
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={pointsRef}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.0024}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
};

// 2. Estrelas Cadentes (Shooting Stars / Meteoros 3D)
const ShootingStars = () => {
  const linesRef = useRef<LineSegments | null>(null);
  const maxMeteors = 3;

  // Estado dos meteoros ativos
  const meteors = useMemo(() => {
    return Array.from({ length: maxMeteors }).map(() => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      dx: 0,
      dy: 0,
      dz: 0,
      length: 0.25,
      progress: 1,
      speed: 0.02,
      delay: Math.random() * 4,
    }));
  }, []);

  const [positions] = useState(() => new Float32Array(maxMeteors * 2 * 3));
  const [colors] = useState(() => new Float32Array(maxMeteors * 2 * 3));

  useFrame((_state, delta) => {
    let needsUpdate = false;

    meteors.forEach((meteor, i) => {
      if (!meteor.active) {
        meteor.delay -= delta;
        if (meteor.delay <= 0) {
          // Spawn de meteoro em posição aleatória superior
          meteor.active = true;
          meteor.x = (Math.random() - 0.3) * 2;
          meteor.y = 0.8 + Math.random() * 0.5;
          meteor.z = (Math.random() - 0.5) * 0.8;
          // Trajetória diagonal rápida
          const angle = Math.PI * (1.15 + Math.random() * 0.15); // ~210 graus
          const speed = 1.4 + Math.random() * 1.0;
          meteor.dx = Math.cos(angle) * speed;
          meteor.dy = Math.sin(angle) * speed;
          meteor.dz = (Math.random() - 0.5) * 0.2;
          meteor.length = 0.18 + Math.random() * 0.15;
          meteor.progress = 0;
        }
      } else {
        needsUpdate = true;
        meteor.progress += delta * 1.8;
        meteor.x += meteor.dx * delta;
        meteor.y += meteor.dy * delta;
        meteor.z += meteor.dz * delta;

        // Cabeça e cauda do meteoro
        const idx = i * 6;
        const headX = meteor.x;
        const headY = meteor.y;
        const headZ = meteor.z;

        const tailX = meteor.x - (meteor.dx / Math.hypot(meteor.dx, meteor.dy)) * meteor.length;
        const tailY = meteor.y - (meteor.dy / Math.hypot(meteor.dx, meteor.dy)) * meteor.length;
        const tailZ = meteor.z;

        positions[idx] = headX;
        positions[idx + 1] = headY;
        positions[idx + 2] = headZ;

        positions[idx + 3] = tailX;
        positions[idx + 4] = tailY;
        positions[idx + 5] = tailZ;

        // Fading do brilho
        const alpha = Math.sin(Math.min(Math.PI, meteor.progress * Math.PI));
        const colIdx = i * 6;
        // Cabeça brilhante (ouro/branco)
        colors[colIdx] = 1.0 * alpha;
        colors[colIdx + 1] = 0.9 * alpha;
        colors[colIdx + 2] = 0.6 * alpha;

        // Cauda transparente (azul/roxo suave)
        colors[colIdx + 3] = 0.5 * alpha * 0.3;
        colors[colIdx + 4] = 0.7 * alpha * 0.3;
        colors[colIdx + 5] = 1.0 * alpha * 0.3;

        if (meteor.progress >= 1 || meteor.y < -1.2) {
          meteor.active = false;
          meteor.delay = 2.5 + Math.random() * 4.5; // Intervalo para o próximo
        }
      }
    });

    if (linesRef.current && needsUpdate) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        linewidth={2}
        depthWrite={false}
      />
    </lineSegments>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
        <ShootingStars />
      </Suspense>
    </Canvas>
  </div>
);
