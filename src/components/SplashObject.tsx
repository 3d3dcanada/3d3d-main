import { Edges, Float, RoundedBox } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group as ThreeGroup, Mesh as ThreeMesh } from 'three';
import { MeshBasicMaterial, MeshStandardMaterial, Quaternion, Vector3 } from 'three';

import type { SplashAccent, SplashObjectKind } from '../data/splashSections';

interface SplashObjectProps {
  kind: SplashObjectKind;
  accent: SplashAccent;
  label: string;
  active: boolean;
  focused: boolean;
  opacity: number;
  onHoverChange: (hovered: boolean) => void;
}

type PointTuple = [number, number, number];

const ACCENT_HEX: Record<SplashAccent, string> = {
  teal: '#40C4C4',
  magenta: '#E84A8A',
  orange: '#FF6B2B',
};

const BODY_HEX: Record<SplashObjectKind, string> = {
  market: '#E6EDF8',
  services: '#D3DCF0',
  network: '#DEE8F8',
  learn: '#F3ECF6',
  about: '#EBEEF5',
};

const NETWORK_POINTS: PointTuple[] = [
  [0, 0.88, 0.28],
  [-0.88, 0.18, 0.46],
  [0.94, 0.2, 0.38],
  [0, -0.56, -0.84],
];

function surfaceMaterial(
  color: string,
  accentHex: string,
  emphasis: number,
  opacity: number,
  metalness = 0.24,
  roughness = 0.4,
) {
  return {
    color,
    metalness,
    roughness,
    emissive: accentHex,
    emissiveIntensity: emphasis,
    transparent: opacity < 0.995,
    opacity,
  };
}

function Connector({
  start,
  end,
  accentHex,
  opacity,
}: {
  start: PointTuple;
  end: PointTuple;
  accentHex: string;
  opacity: number;
}) {
  const { quaternion, length, position } = useMemo(() => {
    const startVec = new Vector3(...start);
    const endVec = new Vector3(...end);
    const direction = endVec.clone().sub(startVec);
    const midpoint = startVec.clone().add(endVec).multiplyScalar(0.5);
    const connectorQuat = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction.clone().normalize(),
    );

    return {
      quaternion: connectorQuat,
      length: direction.length(),
      position: midpoint.toArray() as PointTuple,
    };
  }, [end, start]);

  return (
    <mesh position={position} quaternion={quaternion} castShadow receiveShadow>
      <cylinderGeometry args={[0.035, 0.035, length, 10]} />
      <meshStandardMaterial
        color="#111823"
        emissive={accentHex}
        emissiveIntensity={0.18}
        metalness={0.4}
        roughness={0.38}
        transparent={opacity < 0.995}
        opacity={opacity}
      />
    </mesh>
  );
}

function MarketObject({
  accentHex,
  bodyHex,
  glow,
  opacity,
  focused,
}: {
  accentHex: string;
  bodyHex: string;
  glow: number;
  opacity: number;
  focused: boolean;
}) {
  const wheelLeftRef = useRef<ThreeMesh>(null);
  const wheelRightRef = useRef<ThreeMesh>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const speed = focused ? 1.2 : 0.3;
    if (wheelLeftRef.current) wheelLeftRef.current.rotation.x += dt * speed;
    if (wheelRightRef.current) wheelRightRef.current.rotation.x += dt * speed;
  });

  return (
    <group>
      <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.38, 1.06]} />
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow, opacity, 0.18, 0.46)} />
        <Edges color={accentHex} threshold={20} />
      </mesh>

      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.12, 0.22, 0.72]} />
        <meshStandardMaterial {...surfaceMaterial('#0E1520', accentHex, glow * 0.8, opacity, 0.42, 0.28)} />
      </mesh>

      {[-0.44, 0, 0.44].map((offset) => (
        <mesh key={`slat-${offset}`} position={[offset, 0.08, 0.54]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 0.48, 0.08]} />
          <meshStandardMaterial {...surfaceMaterial('#111826', accentHex, glow * 0.6, opacity, 0.36, 0.34)} />
        </mesh>
      ))}

      <mesh position={[0.48, 0.6, 0]} rotation={[0, 0, -0.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.92, 10]} />
        <meshStandardMaterial {...surfaceMaterial('#B7C4D9', accentHex, glow * 0.8, opacity)} />
      </mesh>

      <mesh position={[0.16, 0.86, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <torusGeometry args={[0.34, 0.05, 10, 22, Math.PI]} />
        <meshStandardMaterial {...surfaceMaterial('#DCE6F6', accentHex, glow * 0.8, opacity, 0.26, 0.3)} />
      </mesh>

      <mesh
        ref={wheelLeftRef}
        position={[-0.48, -0.52, 0.34]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[0.18, 0.045, 10, 20]} />
        <meshStandardMaterial
          color="#091017"
          emissive={accentHex}
          emissiveIntensity={glow * 0.45}
          metalness={0.48}
          roughness={0.28}
          transparent={opacity < 0.995}
          opacity={opacity}
        />
      </mesh>
      <mesh
        ref={wheelRightRef}
        position={[0.48, -0.52, 0.34]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[0.18, 0.045, 10, 20]} />
        <meshStandardMaterial
          color="#091017"
          emissive={accentHex}
          emissiveIntensity={glow * 0.45}
          metalness={0.48}
          roughness={0.28}
          transparent={opacity < 0.995}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

function ServicesObject({
  accentHex,
  bodyHex,
  glow,
  opacity,
  focused,
}: {
  accentHex: string;
  bodyHex: string;
  glow: number;
  opacity: number;
  focused: boolean;
}) {
  const nozzleRef = useRef<ThreeMesh>(null);

  useFrame(({ clock }) => {
    if (!nozzleRef.current) return;
    const amplitude = focused ? 0.06 : 0.02;
    nozzleRef.current.position.y = -0.02 + Math.sin(clock.elapsedTime * 2.2) * amplitude;
  });

  const postPositions: PointTuple[] = [
    [-0.46, 0.18, -0.42],
    [0.46, 0.18, -0.42],
    [-0.46, 0.18, 0.42],
    [0.46, 0.18, 0.42],
  ];

  return (
    <group>
      <RoundedBox args={[1.45, 0.18, 1.18]} radius={0.08} smoothness={4} position={[0, -0.54, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial('#0D131C', accentHex, glow * 0.65, opacity, 0.44, 0.28)} />
      </RoundedBox>

      <RoundedBox args={[1.05, 0.08, 0.92]} radius={0.06} smoothness={4} position={[0, -0.28, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow * 0.85, opacity, 0.22, 0.36)} />
        <Edges color={accentHex} threshold={18} />
      </RoundedBox>

      {postPositions.map((post, index) => (
        <mesh key={`post-${index}`} position={post} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.18, 10]} />
          <meshStandardMaterial {...surfaceMaterial('#D6E2F4', accentHex, glow * 0.7, opacity)} />
        </mesh>
      ))}

      <RoundedBox args={[1.14, 0.08, 0.12]} radius={0.04} smoothness={4} position={[0, 0.76, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial('#DDE7F6', accentHex, glow * 0.75, opacity)} />
      </RoundedBox>

      <RoundedBox args={[0.98, 0.08, 0.1]} radius={0.04} smoothness={4} position={[0, 0.26, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial('#DCE6F7', accentHex, glow * 0.9, opacity)} />
      </RoundedBox>

      <RoundedBox args={[0.2, 0.16, 0.16]} radius={0.04} smoothness={4} position={[0, 0.16, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial('#0F1520', accentHex, glow * 1.1, opacity, 0.5, 0.22)} />
      </RoundedBox>

      <mesh ref={nozzleRef} position={[0, -0.02, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.08, 0.2, 12]} />
        <meshStandardMaterial {...surfaceMaterial('#FCEDE8', accentHex, glow * 1.05, opacity, 0.16, 0.38)} />
      </mesh>

      <mesh position={[0.64, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.16, 0.05, 10, 20]} />
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow * 0.7, opacity, 0.28, 0.34)} />
      </mesh>
    </group>
  );
}

function NetworkObject({
  accentHex,
  bodyHex,
  glow,
  opacity,
  focused,
}: {
  accentHex: string;
  bodyHex: string;
  glow: number;
  opacity: number;
  focused: boolean;
}) {
  const ringRef = useRef<ThreeMesh>(null);
  const nodesRef = useRef<ThreeGroup>(null);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * (focused ? 0.3 : 0.1);
    }
    if (nodesRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2.4) * (focused ? 0.1 : 0.04);
      nodesRef.current.children.forEach((child) => {
        child.scale.setScalar(s);
      });
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.44, 0]} />
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow, opacity, 0.24, 0.34)} />
        <Edges color={accentHex} threshold={16} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.08, 0.035, 8, 64]} />
        <meshStandardMaterial
          color="#0B111A"
          emissive={accentHex}
          emissiveIntensity={glow * 0.45}
          metalness={0.5}
          roughness={0.24}
          transparent={opacity < 0.995}
          opacity={opacity}
        />
      </mesh>

      {NETWORK_POINTS.map((point, index) => (
        <Connector key={`connector-${index}`} start={[0, 0, 0]} end={point} accentHex={accentHex} opacity={opacity} />
      ))}

      <group ref={nodesRef}>
        {NETWORK_POINTS.map((point, index) => (
          <mesh key={`node-${index}`} position={point} castShadow receiveShadow>
            <sphereGeometry args={[0.14, 18, 18]} />
            <meshStandardMaterial {...surfaceMaterial('#F2F7FF', accentHex, glow * 1.05, opacity, 0.18, 0.32)} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function LearnObject({
  accentHex,
  bodyHex,
  glow,
  opacity,
  focused,
}: {
  accentHex: string;
  bodyHex: string;
  glow: number;
  opacity: number;
  focused: boolean;
}) {
  const coverLeftRef = useRef<ThreeGroup>(null);
  const coverRightRef = useRef<ThreeGroup>(null);

  useFrame(({ clock }) => {
    const flutter = Math.sin(clock.elapsedTime * 3) * (focused ? 0.03 : 0.01);
    if (coverLeftRef.current) coverLeftRef.current.rotation.z = 0.08 + flutter;
    if (coverRightRef.current) coverRightRef.current.rotation.z = -0.08 - flutter;
  });

  return (
    <group rotation={[0.08, 0, -0.04]}>
      <group ref={coverLeftRef} rotation={[0, 0.18, 0.08]}>
        <RoundedBox args={[0.9, 0.14, 1.2]} radius={0.06} smoothness={4} position={[-0.4, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...surfaceMaterial('#0D1520', accentHex, glow * 0.75, opacity, 0.36, 0.28)} />
        </RoundedBox>
      </group>

      <group ref={coverRightRef} rotation={[0, -0.18, -0.08]}>
        <RoundedBox args={[0.9, 0.14, 1.2]} radius={0.06} smoothness={4} position={[0.4, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...surfaceMaterial('#101926', accentHex, glow * 0.75, opacity, 0.36, 0.28)} />
        </RoundedBox>
      </group>

      <RoundedBox args={[0.9, 0.09, 1.05]} radius={0.04} smoothness={4} position={[0, 0.04, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow * 0.95, opacity, 0.14, 0.52)} />
        <Edges color={accentHex} threshold={20} />
      </RoundedBox>

      <mesh position={[0.06, 0.12, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.52, 0.08]} />
        <meshStandardMaterial {...surfaceMaterial(accentHex, accentHex, glow, opacity, 0.18, 0.34)} />
      </mesh>
    </group>
  );
}

function AboutObject({
  accentHex,
  bodyHex,
  glow,
  opacity,
  focused,
}: {
  accentHex: string;
  bodyHex: string;
  glow: number;
  opacity: number;
  focused: boolean;
}) {
  const beaconRef = useRef<ThreeMesh>(null);
  const orbitRingRef = useRef<ThreeMesh>(null);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    if (beaconRef.current) {
      const mat = beaconRef.current.material;
      if (mat instanceof MeshStandardMaterial) {
        mat.emissiveIntensity = glow * 1.15 * (1 + Math.sin(clock.elapsedTime * 2) * (focused ? 0.3 : 0.1));
      }
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z += dt * (focused ? 0.25 : 0.08);
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.88, 0.88, 0.24, 36]} />
        <meshStandardMaterial {...surfaceMaterial(bodyHex, accentHex, glow * 0.8, opacity, 0.32, 0.3)} />
        <Edges color={accentHex} threshold={20} />
      </mesh>

      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 36]} />
        <meshStandardMaterial {...surfaceMaterial('#111927', accentHex, glow, opacity, 0.4, 0.24)} />
      </mesh>

      <mesh ref={beaconRef} position={[0, 0.36, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial {...surfaceMaterial('#F5F8FE', accentHex, glow * 1.15, opacity, 0.18, 0.34)} />
      </mesh>

      <RoundedBox args={[0.16, 0.54, 0.14]} radius={0.05} smoothness={4} position={[0, -0.08, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...surfaceMaterial('#EEF4FD', accentHex, glow * 1.05, opacity, 0.16, 0.34)} />
      </RoundedBox>

      <mesh ref={orbitRingRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.08]} castShadow receiveShadow>
        <torusGeometry args={[1.08, 0.04, 8, 56]} />
        <meshStandardMaterial
          color="#0B1118"
          emissive={accentHex}
          emissiveIntensity={glow * 0.55}
          metalness={0.52}
          roughness={0.22}
          transparent={opacity < 0.995}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

/** Traverses a group and oscillates emissiveIntensity on all MeshStandardMaterial children */
function GlowPulse({
  focused,
  active,
  children,
}: {
  focused: boolean;
  active: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<ThreeGroup>(null);
  const baseIntensities = useRef(new WeakMap<MeshStandardMaterial, number>());

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const pulse = focused
      ? 1 + Math.sin(clock.elapsedTime * Math.PI) * 0.3
      : active
        ? 1 + Math.sin(clock.elapsedTime * Math.PI) * 0.1
        : 1;

    groupRef.current.traverse((child) => {
      if (!('material' in child)) return;
      const mat = (child as ThreeMesh).material;
      if (!(mat instanceof MeshStandardMaterial)) return;

      if (!baseIntensities.current.has(mat)) {
        baseIntensities.current.set(mat, mat.emissiveIntensity);
      }
      const base = baseIntensities.current.get(mat) ?? mat.emissiveIntensity;
      mat.emissiveIntensity = base * pulse;
    });
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function SplashObject({
  kind,
  accent,
  label,
  active,
  focused,
  opacity,
  onHoverChange,
}: SplashObjectProps) {
  const accentHex = ACCENT_HEX[accent];
  const bodyHex = BODY_HEX[kind];
  const glow = focused ? 1 : active ? 0.62 : 0.24;
  const ringOpacity = focused ? 0.5 : active ? 0.28 : 0.14;
  const ringRef = useRef<ThreeMesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const mat = ringRef.current.material;
    if (mat instanceof MeshBasicMaterial) {
      const pulse = focused ? 1 + Math.sin(clock.elapsedTime * Math.PI) * 0.3 : 1;
      mat.opacity = ringOpacity * opacity * pulse;
    }
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHoverChange(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHoverChange(false);
  };

  return (
    <group
      aria-label={label}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Float
        speed={focused ? 2 : 1.4}
        rotationIntensity={focused ? 0.35 : 0.18}
        floatIntensity={focused ? 0.5 : 0.28}
      >
        <GlowPulse focused={focused} active={active}>
          {kind === 'market' && (
            <MarketObject accentHex={accentHex} bodyHex={bodyHex} glow={glow} opacity={opacity} focused={focused} />
          )}
          {kind === 'services' && (
            <ServicesObject accentHex={accentHex} bodyHex={bodyHex} glow={glow} opacity={opacity} focused={focused} />
          )}
          {kind === 'network' && (
            <NetworkObject accentHex={accentHex} bodyHex={bodyHex} glow={glow} opacity={opacity} focused={focused} />
          )}
          {kind === 'learn' && (
            <LearnObject accentHex={accentHex} bodyHex={bodyHex} glow={glow} opacity={opacity} focused={focused} />
          )}
          {kind === 'about' && (
            <AboutObject accentHex={accentHex} bodyHex={bodyHex} glow={glow} opacity={opacity} focused={focused} />
          )}
        </GlowPulse>
      </Float>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]} receiveShadow>
        <ringGeometry args={[0.72, 0.94, 48]} />
        <meshBasicMaterial
          color={accentHex}
          transparent
          opacity={ringOpacity * opacity}
        />
      </mesh>
    </group>
  );
}
