import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import theme from '../../styles/theme';

// Component for exploding view of tech elements
const ExplodingTechComponents = ({ position = [0, 0, 0], scale = 1, autoExplode = true }) => {
  const groupRef = useRef();
  const [exploded, setExploded] = useState(false);
  const [explodeFactor, setExplodeFactor] = useState(0);
  
  // Toggle explosion state every few seconds if autoExplode is true
  useEffect(() => {
    if (!autoExplode) return;
    
    const interval = setInterval(() => {
      setExploded(prev => !prev);
    }, 5000); // Toggle every 5 seconds
    
    return () => clearInterval(interval);
  }, [autoExplode]);
  
  // Animate the explosion factor
  useFrame(() => {
    if (exploded && explodeFactor < 1) {
      setExplodeFactor(prev => Math.min(prev + 0.01, 1));
    } else if (!exploded && explodeFactor > 0) {
      setExplodeFactor(prev => Math.max(prev - 0.01, 0));
    }
  });
  
  // Define tech components to display
  const techComponents = useMemo(() => [
    { 
      name: 'React', 
      model: <ComponentBox 
               size={[0.6, 0.6, 0.6]} 
               color={theme.colors.primary} 
               position={[0, 0, 0]} 
               explodeFactor={explodeFactor} 
               explodeDirection={[1, 0.5, 0.5]} 
             />
    },
    { 
      name: 'Node.js', 
      model: <ComponentBox 
               size={[0.5, 0.5, 0.5]} 
               color={theme.colors.accent} 
               position={[0, 0, 0]} 
               explodeFactor={explodeFactor} 
               explodeDirection={[-0.8, 0.7, 0.2]} 
             />
    },
    { 
      name: 'MongoDB', 
      model: <ComponentCylinder 
               args={[0.3, 0.3, 0.5, 16]} 
               color="#3FA037" 
               position={[0, 0, 0]} 
               explodeFactor={explodeFactor} 
               explodeDirection={[0.4, -0.9, 0.3]} 
             />
    },
    { 
      name: 'TypeScript', 
      model: <ComponentBox 
               size={[0.45, 0.45, 0.45]} 
               color="#007ACC" 
               position={[0, 0, 0]} 
               explodeFactor={explodeFactor} 
               explodeDirection={[-0.2, -0.6, -0.8]} 
             />
    },
    { 
      name: 'R3F', 
      model: <ComponentSphere 
               args={[0.25, 16, 16]} 
               color="#FF4500" 
               position={[0, 0, 0]} 
               explodeFactor={explodeFactor} 
               explodeDirection={[0.7, 0.1, -0.7]} 
             />
    },
  ], [explodeFactor]);
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {techComponents.map(component => component.model)}
    </group>
  );
};

// Box component that moves based on explosion factor
const ComponentBox = ({ size, color, position, explodeFactor, explodeDirection }) => {
  const meshRef = useRef();
  const initialPosition = new THREE.Vector3(...position);
  const targetPosition = new THREE.Vector3(
    position[0] + explodeDirection[0] * 2,
    position[1] + explodeDirection[1] * 2,
    position[2] + explodeDirection[2] * 2
  );
  
  // Calculate current position based on explosion factor
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(
        initialPosition,
        targetPosition,
        explodeFactor
      );
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.6} 
          roughness={0.2} 
          emissive={color} 
          emissiveIntensity={0.3} 
        />
      </mesh>
    </Float>
  );
};

// Cylinder component that moves based on explosion factor
const ComponentCylinder = ({ args, color, position, explodeFactor, explodeDirection }) => {
  const meshRef = useRef();
  const initialPosition = new THREE.Vector3(...position);
  const targetPosition = new THREE.Vector3(
    position[0] + explodeDirection[0] * 2,
    position[1] + explodeDirection[1] * 2,
    position[2] + explodeDirection[2] * 2
  );
  
  // Calculate current position based on explosion factor
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(
        initialPosition,
        targetPosition,
        explodeFactor
      );
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.008;
    }
  });
  
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.6} 
          roughness={0.2} 
          emissive={color} 
          emissiveIntensity={0.3} 
        />
      </mesh>
    </Float>
  );
};

// Sphere component that moves based on explosion factor
const ComponentSphere = ({ args, color, position, explodeFactor, explodeDirection }) => {
  const meshRef = useRef();
  const initialPosition = new THREE.Vector3(...position);
  const targetPosition = new THREE.Vector3(
    position[0] + explodeDirection[0] * 2,
    position[1] + explodeDirection[1] * 2,
    position[2] + explodeDirection[2] * 2
  );
  
  // Calculate current position based on explosion factor
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(
        initialPosition,
        targetPosition,
        explodeFactor
      );
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={args} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7} 
          roughness={0.2} 
          emissive={color} 
          emissiveIntensity={0.3} 
        />
      </mesh>
    </Float>
  );
};

export default ExplodingTechComponents;
export { ComponentBox, ComponentCylinder, ComponentSphere };
