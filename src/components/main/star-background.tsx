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
    // Rotação orbital contínua
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 25;
      pointsRef.current.rotation.y -= delta / 30;
    }

    // Parallax 3D suave reagindo ao cursor do mouse
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.25;
      const targetRotX = -state.pointer.y * 0.25;

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

// 2. Estrelas Cadentes (Shooting Stars / Meteoros 3D 100% livres de artefatos)
const ShootingStars = () => {
  const linesRef = useRef<LineSegments | null>(null);
  const maxMeteors = 3;

  // Estado dos meteoros ativos
  const meteors = useMemo(() => {
    return Array.from({ length: maxMeteors }).map(() => ({
      active: false,
      x: 9999,
      y: 9999,
      z: 9999,
      dx: 0,
      dy: 0,
      dz: 0,
      length: 0.22,
      progress: 1,
      delay: 1 + Math.random() * 3,
    }));
  }, []);

  // Inicializa fora do frustum para evitar listras pretas na origem (0,0,0)
  const [positions] = useState(() => {
    const arr = new Float32Array(maxMeteors * 2 * 3);
    arr.fill(9999);
    return arr;
  });

  const [colors] = useState(() => new Float32Array(maxMeteors * 2 * 3));

  useFrame((_state, delta) => {
    let needsUpdate = false;

    meteors.forEach((meteor, i) => {
      const idx = i * 6;

      if (!meteor.active) {
        meteor.delay -= delta;
        if (meteor.delay <= 0) {
          // Spawn de meteoro
          meteor.active = true;
          meteor.x = (Math.random() - 0.3) * 2;
          meteor.y = 0.8 + Math.random() * 0.4;
          meteor.z = (Math.random() - 0.5) * 0.6;

          const angle = Math.PI * (1.15 + Math.random() * 0.15); // ~210 graus
          const speed = 1.3 + Math.random() * 0.8;
          meteor.dx = Math.cos(angle) * speed;
          meteor.dy = Math.sin(angle) * speed;
          meteor.dz = (Math.random() - 0.5) * 0.15;
          meteor.length = 0.16 + Math.random() * 0.12;
          meteor.progress = 0;
        } else {
          // Mantém fora da tela enquanto inativo
          positions[idx] = 9999;
          positions[idx + 1] = 9999;
          positions[idx + 2] = 9999;
          positions[idx + 3] = 9999;
          positions[idx + 4] = 9999;
          positions[idx + 5] = 9999;
        }
      } else {
        needsUpdate = true;
        meteor.progress += delta * 1.6;
        meteor.x += meteor.dx * delta;
        meteor.y += meteor.dy * delta;
        meteor.z += meteor.dz * delta;

        const speedMag = Math.hypot(meteor.dx, meteor.dy);
        const tailX = meteor.x - (meteor.dx / speedMag) * meteor.length;
        const tailY = meteor.y - (meteor.dy / speedMag) * meteor.length;
        const tailZ = meteor.z - (meteor.dz / speedMag) * meteor.length;

        positions[idx] = meteor.x;
        positions[idx + 1] = meteor.y;
        positions[idx + 2] = meteor.z;

        positions[idx + 3] = tailX;
        positions[idx + 4] = tailY;
        positions[idx + 5] = tailZ;

        // Fading suave de brilho (Curva Gaussiana para evitar cortes bruscos)
        const alpha = Math.sin(Math.min(Math.PI, Math.max(0, meteor.progress * Math.PI)));

        // Cabeça brilhante (ouro quente/branco)
        colors[idx] = 1.0 * alpha;
        colors[idx + 1] = 0.9 * alpha;
        colors[idx + 2] = 0.6 * alpha;

        // Cauda suave
        colors[idx + 3] = 0.6 * alpha * 0.3;
        colors[idx + 4] = 0.4 * alpha * 0.3;
        colors[idx + 5] = 0.9 * alpha * 0.3;

        if (meteor.progress >= 1 || meteor.y < -1.1) {
          meteor.active = false;
          meteor.delay = 2.5 + Math.random() * 4;
          // Reseta para fora da tela instantaneamente
          positions[idx] = 9999;
          positions[idx + 1] = 9999;
          positions[idx + 2] = 9999;
          positions[idx + 3] = 9999;
          positions[idx + 4] = 9999;
          positions[idx + 5] = 9999;
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
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
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
