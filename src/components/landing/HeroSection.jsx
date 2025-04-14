import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Line, Html, Float, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import theme from '../../styles/theme';

// Node component representing technologies in the network
const Node = ({ position, size, color, pulse, nodeData, mousePosition, ...props }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Animate the node based on mouse and time
  useFrame(({ clock }) => {
    if (ref.current) {
      // Subtle floating animation
      const time = clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.05;
      
      // Subtle scaling for pulse effect if enabled
      if (pulse) {
        const pulseFactor = 0.05;
        setScale(1 + Math.sin(time * 0.8) * pulseFactor);
      }
      
      // Respond to mouse movement slightly
      if (mousePosition.current) {
        const mouseInfluence = 0.1;
        const { x, y } = mousePosition.current;
        ref.current.position.x = position[0] + (x * 2 - 1) * mouseInfluence;
        ref.current.position.z = position[2] + (y * 2 - 1) * mouseInfluence;
      }
    }
  });
  
  return (
    <group ref={ref} {...props}>
      {/* Main sphere */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.6}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={[size * 1.2, size * 1.2, size * 1.2]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.15 : 0.05}
        />
      </mesh>
      
      {/* Label for node if provided */}
      {nodeData?.label && hovered && (
        <Html
          position={[0, size * 1.5, 0]}
          center
          style={{
            color: '#ffffff',
            fontSize: '12px',
            fontFamily: theme.fonts.primary,
            backgroundColor: 'rgba(13, 13, 13, 0.7)',
            padding: '6px 10px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'scale(1.5)',
          }}
        >
          {nodeData.label}
        </Html>
      )}
    </group>
  );
};

// Connection line between nodes
const Connection = ({ startPosition, endPosition, thickness = 0.02, color }) => {
  // Create a curve between the two points
  const points = useMemo(() => {
    // Create a simple line between the two points
    return [new THREE.Vector3(...startPosition), new THREE.Vector3(...endPosition)];
  }, [startPosition, endPosition]);
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={thickness * 100} // Line component expects lineWidth in pixels
      opacity={0.6}
      transparent
      dashed={false}
    />
  );
};

// CodeStrand component for DNA Helix
const CodeStrand = ({ strandIndex, color, mousePosition }) => {
  const strandRef = useRef();
  const pointsCount = 80; // Number of nucleotides in the strand
  const radius = 2.5;
  const strandOffset = strandIndex * Math.PI; // Offset for second strand
  const verticalSpacing = 0.3;
  
  // Generate points for the helix strand
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / 8) * Math.PI * 2 + strandOffset;
      const x = Math.cos(angle) * radius;
      const y = i * verticalSpacing - (pointsCount * verticalSpacing) / 2; // Centering
      const z = Math.sin(angle) * radius;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, pointsCount, verticalSpacing, strandOffset]);
  
  // Create a smooth curve through the points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);
  
  // Animation for the strands
  useFrame(({ clock }) => {
    if (strandRef.current) {
      const time = clock.getElapsedTime();
      // Rotate the entire strand slowly
      strandRef.current.rotation.y = time * 0.1;
      
      // React to mouse movement
      if (mousePosition && mousePosition.current) {
        const { x, y } = mousePosition.current;
        // Tilt based on mouse position
        strandRef.current.rotation.x = y * 0.2;
        strandRef.current.rotation.z = x * 0.2;
      }
    }
  });
  
  // Generate nucleotide positions along the curve
  const nucleotides = useMemo(() => {
    const result = [];
    for (let i = 0; i < 20; i++) { // Fewer nucleotides than points for performance
      const t = i / 19; // Normalized position along the curve (0-1)
      result.push({
        position: curve.getPoint(t),
        index: i,
      });
    }
    return result;
  }, [curve]);
  
  return (
    <group ref={strandRef}>
      {/* Main strand curve */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Nucleotides along the strand */}
      {nucleotides.map((nucleotide, index) => (
        <Nucleotide 
          key={`${strandIndex}-${index}`}
          position={nucleotide.position}
          color={index % 2 === 0 ? theme.colors.primary : '#ffffff'}
          size={0.12}
          pulse={index % 4 === 0}
          mousePosition={mousePosition}
        />
      ))}
    </group>
  );
};

// Nucleotide component (base pairs for DNA)
const Nucleotide = ({ position, size, color, pulse }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Animate the nucleotide based on time
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      
      // Subtle pulsing for some nucleotides
      if (pulse) {
        const pulseFactor = 0.2;
        setScale(1 + Math.sin(time * 0.8) * pulseFactor);
      }
    }
  });
  
  return (
    <group ref={ref} position={[position.x, position.y, position.z]}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <boxGeometry args={[size, size * 0.3, size]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      
      {/* Connecting lines between strands (base pairs) */}
      {hovered && (
        <mesh scale={size * 2.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.15}
          />
        </mesh>
      )}
    </group>
  );
};

// Connection component is defined above and used for strand connections

// Main DNA Helix component
const DNAHelix = ({ mousePosition }) => {
  // Group ref to animate the entire helix
  const helixRef = useRef();
  
  // Animation for floating effect
  useFrame(({ clock }) => {
    if (helixRef.current) {
      const time = clock.getElapsedTime();
      // Gentle floating movement
      helixRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
  });
  
  // Code snippets to display across the DNA
  const codeSnippets = [
    "function DevLabs() {",
    "  return (",
    "    <Innovation />",
    "  );",
    "}",
    "const Future = {}",
    "Future.build()",
    "async Learning()",
    "class Developer",
    "import 'skills'",
    "export success"
  ];
  
  return (
    <group ref={helixRef}>
      {/* Two DNA strands with offset positioning */}
      <CodeStrand strandIndex={0} color={theme.colors.primary} mousePosition={mousePosition} />
      <CodeStrand strandIndex={1} color={theme.colors.accent} mousePosition={mousePosition} />
      
      {/* Floating code snippets around the helix */}
      {codeSnippets.map((snippet, index) => (
        <Float 
          key={index}
          speed={1} 
          rotationIntensity={0.5} 
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 6
          ]}
        >
          <Text
            fontSize={0.3}
            color={index % 2 === 0 ? theme.colors.primary : '#ffffff'}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
          >
            {snippet}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// 3D Technology Globe component
const TechGlobe = ({ mousePosition, position = [5, 0, 0] }) => {
  const globeRef = useRef();
  const globeRadius = 1.5;
  
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
      globeRef.current.rotation.y = time * 0.1;
      
      // Respond to mouse movement
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

// Simple stars in the background
const Stars = ({ count = 500 }) => {
  // Generate star positions and sizes
  const stars = useMemo(() => {
    const temp = [];
    const sphereRadius = 20;
    
    for (let i = 0; i < count; i++) {
      // Distribute stars on a sphere much larger than our network
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = sphereRadius * (0.8 + Math.random() * 0.2);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({
        id: `star-${i}`,
        position: [x, y, z],
        size: Math.random() * 0.05 + 0.01,
        color: Math.random() < 0.1 ? theme.colors.primary : '#ffffff'
      });
    }
    return temp;
  }, [count]);
  
  return (
    <group>
      {stars.map(star => (
        <mesh key={star.id} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color={star.color} />
        </mesh>
      ))}
    </group>
  );
};

// Scene setup with DNA Helix and Tech Globe visualization
const Scene = ({ mousePosition }) => {
  return (
    <>
      <color attach="background" args={[theme.colors.background]} />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
      
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#ffffff"
      />
      
      {/* Accent colored lights */}
      <pointLight
        position={[-5, 0, -5]}
        intensity={0.4}
        color={theme.colors.primary}
        distance={20}
      />
      
      <pointLight
        position={[3, -3, 2]}
        intensity={0.3}
        color={theme.colors.accent}
        distance={15}
      />
      
      {/* Soft environment light */}
      <Environment preset="city" />
      
      {/* Background stars */}
      <Stars />
      
      {/* Suspense for 3D elements */}
      <Suspense fallback={null}>
        {/* Main DNA Helix visualization */}
        <DNAHelix mousePosition={mousePosition} />
        
        {/* 3D Technology Globe - positioned to the side */}
        <TechGlobe mousePosition={mousePosition} position={[8, 0, 0]} />
      </Suspense>
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true} // Enable rotation for more interactivity
        rotateSpeed={0.2}
        dampingFactor={0.1}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

const HeroSection = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Track mouse movement for interactive 3D element
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Check if device is mobile for responsive design
  const isMobile = window.innerWidth < 768;
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        height: '100vh',
        position: 'relative',
        background: theme.colors.background,
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]} // Lower resolution on mobile for performance
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Allow interaction with content underneath
          background: 'transparent',
        }}
        gl={{ alpha: true }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Content Overlay */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: theme.colors.secondary,
            fontFamily: theme.fonts.secondary,
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            textShadow: `0 0 15px ${theme.colors.primary}, 0 0 30px rgba(0, 0, 0, 0.6)`,
            maxWidth: '800px',
          }}
        >
          Welcome to DevLabs
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.primary,
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.2rem, 2vw, 1.8rem)',
            lineHeight: 1.6,
            maxWidth: '700px',
            marginBottom: '2.5rem',
          }}
        >
          Empowering Developers to shape the future through collaborative learning, innovation, and hands-on experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.8rem 2rem',
              backgroundColor: 'transparent',
              color: theme.colors.secondary,
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: '30px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0] 
        }}
        transition={{ 
          delay: 1.5,
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: theme.colors.text,
          opacity: 0.7,
        }}
      >
        <span style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Scroll Down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
