import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import theme from '../../styles/theme';

// 3D Technology Globe component that can be reused across different pages
const TechGlobe = ({ mousePosition, position = [0, 0, 0], scale = 1, rotating = true }) => {
  const globeRef = useRef();
  const globeRadius = 1.5 * scale;
  
  // Create tech points around the globe
  const techPoints = useMemo(() => {
    const points = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);
      
      points.push({ position: [x, y, z], size: Math.random() * 0.05 + 0.02 });
    }
    
    return points;
  }, [globeRadius]);
  
  // Animation for the globe
  useFrame(({ clock }) => {
    if (globeRef.current) {
      const time = clock.getElapsedTime();
      
      if (rotating) {
        globeRef.current.rotation.y = time * 0.1;
      }
      
      // Respond to mouse movement if provided
      if (mousePosition && mousePosition.current) {
        const { x, y } = mousePosition.current;
        globeRef.current.rotation.x = y * 0.2;
        globeRef.current.rotation.z = x * 0.1;
      }
    }
  });
  
  return (
    <group ref={globeRef} position={position}>
      {/* Globe surface */}
      <mesh>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshPhysicalMaterial
          color={theme.colors.background}
          roughness={0.4}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          opacity={0.8}
          transparent
          wireframe
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh scale={globeRadius * 0.95}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={theme.colors.primary}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Tech points on the globe */}
      {techPoints.map((point, i) => (
        <mesh key={i} position={point.position} scale={point.size}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? theme.colors.primary : '#ffffff'}
            emissive={i % 2 === 0 ? theme.colors.primary : '#ffffff'}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      
      {/* Orbiting circles */}
      <CircleOrbit radius={globeRadius * 1.2} rotation={[0, 0, 0]} color={theme.colors.primary} />
      <CircleOrbit radius={globeRadius * 1.3} rotation={[Math.PI/2, 0, 0]} color={theme.colors.accent} />
    </group>
  );
};

// Orbiting circle for the globe
const CircleOrbit = ({ radius, rotation, color }) => {
  const curve = useMemo(() => {
    const ellipseCurve = new THREE.EllipseCurve(
      0, 0,             // Center x, y
      radius, radius,   // x radius, y radius
      0, 2 * Math.PI,   // Start angle, end angle
      false,            // Clockwise
      0                 // Rotation
    );
    
    const points = ellipseCurve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);
  
  return (
    <group rotation={rotation}>
      <line geometry={curve}>
        <lineBasicMaterial color={color} opacity={0.5} transparent linewidth={1} />
      </line>
    </group>
  );
};

export default TechGlobe;
export { CircleOrbit };
