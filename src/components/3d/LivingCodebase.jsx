import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import theme from '../../styles/theme';

// Convert hex color to THREE.Color
const getThreeColor = (hexColor) => {
  return new THREE.Color(hexColor);
};

const CodeNode = ({ position, size, color, text, hovered, onHover }) => {
  const nodeRef = useRef();
  const [hover, setHover] = useState(false);
  const initialPos = useRef(position);
  const pulseSpeed = useRef(Math.random() * 0.5 + 0.2);
  
  // Hover effect
  useFrame((state, delta) => {
    if (nodeRef.current) {
      // Breathing animation
      nodeRef.current.scale.x = size[0] * (1 + Math.sin(state.clock.elapsedTime * pulseSpeed.current) * 0.05);
      nodeRef.current.scale.y = size[1] * (1 + Math.sin(state.clock.elapsedTime * pulseSpeed.current + 0.5) * 0.05);
      nodeRef.current.scale.z = size[2] * (1 + Math.sin(state.clock.elapsedTime * pulseSpeed.current + 1) * 0.05);
      
      // Hover effect
      nodeRef.current.material.emissiveIntensity = hover ? 1 : 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  
  return (
    <group position={position}>
      <Box
        ref={nodeRef}
        args={size}
        onPointerOver={(e) => { setHover(true); onHover(true); e.stopPropagation(); }}
        onPointerOut={(e) => { setHover(false); onHover(false); e.stopPropagation(); }}
      >
        <meshPhysicalMaterial
          color={getThreeColor(color)}
          emissive={getThreeColor(color)}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
          clearcoat={0.5}
          transparent
          opacity={0.8}
        />
      </Box>
      {(hover || hovered) && (
        <Text
          position={[0, size[1] / 2 + 0.2, 0]}
          fontSize={0.15}
          color={theme.colors.accent}
          anchorX="center"
          anchorY="bottom"
        >
          {text}
        </Text>
      )}
    </group>
  );
};

const Connection = ({ start, end, thickness = 0.02, color }) => {
  const connectionRef = useRef();
  const pulseSpeed = useRef(Math.random() * 0.3 + 0.2);
  
  useFrame((state) => {
    if (connectionRef.current) {
      connectionRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * pulseSpeed.current) * 0.2;
      connectionRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  
  // Calculate the midpoint between start and end points
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const midZ = (start[2] + end[2]) / 2;
  
  // Calculate distance between points
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  // Calculate rotation to align cylinder with points
  const rotationY = Math.atan2(dx, dz);
  const rotationZ = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
  
  return (
    <mesh
      ref={connectionRef}
      position={[midX, midY, midZ]}
      rotation={[0, rotationY, rotationZ]}
    >
      <cylinderGeometry args={[thickness, thickness, distance, 8]} />
      <meshPhysicalMaterial
        color={getThreeColor(color)}
        emissive={getThreeColor(color)}
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
};

const LivingCodebase = ({ mousePosition }) => {
  const groupRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);
  
  // Define code structure nodes
  const codeStructure = [
    { id: 'root', name: 'App', position: [0, 1.5, 0], size: [0.7, 0.3, 0.7], color: theme.colors.accent, connections: ['components', 'pages', 'styles'] },
    { id: 'components', name: 'Components', position: [-2, 0.5, -1], size: [0.6, 0.3, 0.6], color: theme.colors.primary, connections: ['ui', '3d'] },
    { id: 'pages', name: 'Pages', position: [0, 0, -2], size: [0.6, 0.3, 0.6], color: theme.colors.secondary, connections: ['api'] },
    { id: 'styles', name: 'Styles', position: [2, 0.5, -1], size: [0.6, 0.3, 0.6], color: theme.colors.highlight, connections: [] },
    { id: 'ui', name: 'UI', position: [-3, -0.5, -1.5], size: [0.4, 0.2, 0.4], color: theme.colors.primary, connections: [] },
    { id: '3d', name: '3D Objects', position: [-1.5, -0.5, -2], size: [0.4, 0.2, 0.4], color: theme.colors.primary, connections: [] },
    { id: 'api', name: 'API Routes', position: [0, -1, -3], size: [0.4, 0.2, 0.4], color: theme.colors.secondary, connections: [] },
    { id: 'utility', name: 'Utilities', position: [2.5, -0.5, -2], size: [0.4, 0.2, 0.4], color: theme.colors.highlight, connections: [] },
    // Additional nodes to make it more complex
    { id: 'state', name: 'State Management', position: [1, 0.8, -1], size: [0.5, 0.25, 0.5], color: theme.colors.success, connections: ['utility'] },
    { id: 'auth', name: 'Authentication', position: [-1, -0.3, -1.5], size: [0.5, 0.25, 0.5], color: theme.colors.warning, connections: ['api'] },
  ];
  
  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = () => {
      if (groupRef.current) {
        // Subtle rotation based on mouse position
        const rotX = (mousePosition.y / window.innerHeight - 0.5) * 0.2;
        const rotY = (mousePosition.x / window.innerWidth - 0.5) * 0.2;
        
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.05);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);
  
  // Create small data particles that flow along connections
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const initialParticles = [];
    for (let i = 0; i < 20; i++) {
      const sourceNode = codeStructure[Math.floor(Math.random() * codeStructure.length)];
      if (sourceNode.connections.length > 0) {
        const targetId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
        const targetNode = codeStructure.find(node => node.id === targetId);
        
        if (targetNode) {
          initialParticles.push({
            id: `particle-${i}`,
            source: sourceNode.position,
            target: targetNode.position,
            progress: Math.random(),
            speed: 0.2 + Math.random() * 0.3,
            color: sourceNode.color,
            size: 0.04 + Math.random() * 0.03
          });
        }
      }
    }
    setParticles(initialParticles);
  }, []);
  
  useFrame((state, delta) => {
    // Update particles
    setParticles(currentParticles => 
      currentParticles.map(particle => {
        // Update progress
        let progress = particle.progress + delta * particle.speed;
        if (progress >= 1) {
          // Reset particle with new source and target
          const sourceNode = codeStructure[Math.floor(Math.random() * codeStructure.length)];
          if (sourceNode.connections.length > 0) {
            const targetId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
            const targetNode = codeStructure.find(node => node.id === targetId);
            
            if (targetNode) {
              return {
                ...particle,
                source: sourceNode.position,
                target: targetNode.position,
                progress: 0,
                speed: 0.2 + Math.random() * 0.3,
                color: sourceNode.color,
                size: 0.04 + Math.random() * 0.03
              };
            }
          }
          // If no valid connection found, just reset progress
          return { ...particle, progress: 0 };
        }
        
        return { ...particle, progress };
      })
    );
  });
  
  // Rotating animation for the whole structure
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Render node connections */}
      {codeStructure.map(node => 
        node.connections.map(targetId => {
          const targetNode = codeStructure.find(n => n.id === targetId);
          if (targetNode) {
            return (
              <Connection 
                key={`${node.id}-${targetId}`}
                start={node.position}
                end={targetNode.position}
                color={node.color}
              />
            );
          }
          return null;
        })
      )}
      
      {/* Render code structure nodes */}
      {codeStructure.map(node => (
        <CodeNode 
          key={node.id}
          position={node.position}
          size={node.size}
          color={node.color}
          text={node.name}
          hovered={hoveredNode === node.id}
          onHover={(isHovering) => setHoveredNode(isHovering ? node.id : null)}
        />
      ))}
      
      {/* Render data flow particles */}
      {particles.map(particle => {
        // Interpolate position based on progress
        const x = particle.source[0] + (particle.target[0] - particle.source[0]) * particle.progress;
        const y = particle.source[1] + (particle.target[1] - particle.source[1]) * particle.progress;
        const z = particle.source[2] + (particle.target[2] - particle.source[2]) * particle.progress;
        
        return (
          <Sphere key={particle.id} position={[x, y, z]} args={[particle.size, 8, 8]}>
            <meshPhysicalMaterial
              color={getThreeColor(particle.color)}
              emissive={getThreeColor(particle.color)}
              emissiveIntensity={1}
              transparent
              opacity={0.7}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default LivingCodebase;
