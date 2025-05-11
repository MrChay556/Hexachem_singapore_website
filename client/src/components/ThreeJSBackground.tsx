import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJSBackgroundProps {
  canvasId: string;
}

export default function ThreeJSBackground({ canvasId }: ThreeJSBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 1; // Slight offset to center the view better

    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced molecule colors with vibrant palette that matches the blue theme
    const colors = [
      new THREE.Color(0x3b82f6),  // Blue-500
      new THREE.Color(0x2563eb),  // Blue-600
      new THREE.Color(0x1d4ed8),  // Blue-700
      new THREE.Color(0x60a5fa),  // Blue-400
      new THREE.Color(0x93c5fd)   // Blue-300
    ];

    // Groups
    const atomsGroup = new THREE.Group();
    const linesGroup = new THREE.Group();
    const complexMoleculeGroup = new THREE.Group();
    
    scene.add(complexMoleculeGroup);
    complexMoleculeGroup.add(atomsGroup);
    complexMoleculeGroup.add(linesGroup);
    
    // Store references
    const atoms: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const movingParticles: THREE.Mesh[] = [];
    
    // Create a hexagonal benzene ring network - perfect for Hexachem
    const createComplexMolecular = () => {
      const structures = [];
      
      // Create multiple hexagonal rings arranged in a visually interesting pattern
      const createHexagonalRing = (centerX: number, centerY: number, centerZ: number, size: number, rotation = 0) => {
        const ringPoints = [];
        const hexRadius = size;
        
        // Create hexagon vertices
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + rotation;
          ringPoints.push(new THREE.Vector3(
            centerX + hexRadius * Math.cos(angle),
            centerY + hexRadius * Math.sin(angle),
            centerZ + (Math.random() - 0.5) * 0.5
          ));
        }
        
        // Add all points to the structure
        structures.push(...ringPoints);
        
        return ringPoints;
      };
      
      // Create a network of connected hexagonal structures
      // Primary ring at center
      const mainRing = createHexagonalRing(0, 0, 0, 7);
      
      // Create surrounding rings
      const ringPositions = [
        { x: 11, y: 0, z: 0, size: 5, rotation: Math.PI / 6 },
        { x: -11, y: 0, z: 0, size: 5, rotation: Math.PI / 4 },
        { x: 6, y: 9, z: 0, size: 4, rotation: Math.PI / 5 },
        { x: -6, y: 9, z: 0, size: 4, rotation: Math.PI / 2 },
        { x: 6, y: -9, z: 0, size: 4, rotation: Math.PI / 3 },
        { x: -6, y: -9, z: 0, size: 4, rotation: Math.PI / 7 }
      ];
      
      const secondaryRings = ringPositions.map(pos => 
        createHexagonalRing(pos.x, pos.y, pos.z, pos.size, pos.rotation)
      );
      
      // Add some smaller connecting rings
      const minorRingPositions = [
        { x: 3.5, y: 4.5, z: 0, size: 2, rotation: Math.PI / 8 },
        { x: -3.5, y: 4.5, z: 0, size: 2, rotation: Math.PI / 9 },
        { x: 3.5, y: -4.5, z: 0, size: 2, rotation: Math.PI / 10 },
        { x: -3.5, y: -4.5, z: 0, size: 2, rotation: Math.PI / 11 }
      ];
      
      const tertiaryRings = minorRingPositions.map(pos => 
        createHexagonalRing(pos.x, pos.y, pos.z, pos.size, pos.rotation)
      );
      
      // Add connection nodes at strategic points
      const connectionNodes = [
        new THREE.Vector3(14, 5, 0),
        new THREE.Vector3(-14, -5, 0),
        new THREE.Vector3(12, -7, 0),
        new THREE.Vector3(-12, 7, 0),
        new THREE.Vector3(0, 12, 0),
        new THREE.Vector3(0, -12, 0)
      ];
      
      structures.push(...connectionNodes);
      
      // Get all the structure points
      const structurePoints = structures;
      
      // Create atoms at each point with varying sizes
      structurePoints.forEach((point, index) => {
        // Main rings have larger atoms
        const isMainRing = index < mainRing.length;
        const size = isMainRing ? 0.4 + Math.random() * 0.2 : 0.2 + Math.random() * 0.25;
        const atomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Create sphere for each atom
        const geometry = new THREE.SphereGeometry(size, 28, 28);
        const material = new THREE.MeshBasicMaterial({
          color: atomColor,
          transparent: true,
          opacity: 0.3
        });
        
        const atom = new THREE.Mesh(geometry, material);
        atom.position.copy(point);
        
        // Store movement properties in userData
        atom.userData = {
          originalPosition: point.clone(),
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.05 + Math.random() * 0.1,
          frequency: 0.3 + Math.random() * 0.5,
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          )
        };
        
        atomsGroup.add(atom);
        atoms.push(atom);
      });
      
      // Create more deliberate, structured bonds that form a clear hexagonal pattern
      // First, connect atoms within each ring to form complete hexagons
      const connectedPairs = new Set(); // Track connections to avoid duplicates
      
      // Helper to create a unique key for a pair of indices
      const getPairKey = (a: number, b: number) => (a < b) ? `${a}-${b}` : `${b}-${a}`;
      
      // Helper to create connections
      const createConnection = (fromIdx: number, toIdx: number) => {
        const pairKey = getPairKey(fromIdx, toIdx);
        if (connectedPairs.has(pairKey)) return; // Skip if already connected
        
        connectedPairs.add(pairKey);
        
        // Create a line between atoms
        const points = [
          atoms[fromIdx].position,
          atoms[toIdx].position
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.35 // Make lines more visible
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.userData = {
          startIdx: fromIdx,
          endIdx: toIdx
        };
        
        linesGroup.add(line);
        connections.push(line);
      };
      
      // Connect atoms in each ring to form hexagons
      // Each atom in a hexagon connects to its two neighbors
      for (let i = 0; i < atoms.length; i++) {
        // Find closest two neighbors for rings
        const distances = atoms.map((atom, idx) => {
          if (idx === i) return Infinity; // Don't connect to self
          return atoms[i].position.distanceTo(atom.position);
        });
        
        const sortedIndices = distances
          .map((dist, idx) => ({ dist, idx }))
          .sort((a, b) => a.dist - b.dist)
          .map(item => item.idx);
        
        // Connect to the two closest points to form ring segments
        if (sortedIndices.length >= 2) {
          createConnection(i, sortedIndices[0]);
          createConnection(i, sortedIndices[1]);
        }
        
        // Create connections between rings - connect to a third point if it's not too far
        if (sortedIndices.length >= 3 && distances[sortedIndices[2]] < 10) {
          createConnection(i, sortedIndices[2]);
        }
        
        // Add some long-distance connections for network effect
        if (Math.random() < 0.1 && sortedIndices.length > 5) {
          const farIdx = sortedIndices[Math.floor(sortedIndices.length * 0.7 + Math.random() * 0.3)];
          createConnection(i, farIdx);
        }
      }
      
      // Add flowing particles along the lines to represent electron flow
      connections.forEach((connection, idx) => {
        if (Math.random() > 0.7) return; // Only add particles to some connections
        
        const startAtom = atoms[connection.userData.startIdx];
        const endAtom = atoms[connection.userData.endIdx];
        
        // Create small particles
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa, // Blue-400 particle
          transparent: true,
          opacity: 0.3
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Initial position is at the start atom
        particle.position.copy(startAtom.position);
        
        // Store animation data
        particle.userData = {
          startPos: startAtom.position.clone(),
          endPos: endAtom.position.clone(),
          progress: Math.random(), // Start at random position along path
          speed: 0.005 + Math.random() * 0.01
        };
        
        linesGroup.add(particle);
        movingParticles.push(particle);
      });
    };
    
    // Create the complex molecular structure
    createComplexMolecular();
    
    // Initial placement of the complex - centered in view
    complexMoleculeGroup.rotation.x = Math.PI * 0.1;
    complexMoleculeGroup.rotation.y = Math.PI * 0.05;
    complexMoleculeGroup.position.y = 0; // Center vertically
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Slow, gentler rotation of the entire structure
      complexMoleculeGroup.rotation.y = Math.sin(elapsedTime * 0.04) * 0.15 + Math.PI * 0.05;
      complexMoleculeGroup.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1 + Math.PI * 0.1;
      
      // Animate individual atoms with subtle "breathing" movement
      atoms.forEach(atom => {
        const { originalPosition, phase, amplitude, frequency } = atom.userData;
        
        // Calculate small oscillation around original position
        const oscillation = Math.sin(elapsedTime * frequency + phase) * amplitude;
        const direction = originalPosition.clone().normalize();
        
        atom.position.copy(originalPosition.clone().add(
          direction.multiplyScalar(oscillation)
        ));
        
        // Subtle rotation
        atom.rotation.x += atom.userData.rotationSpeed.x;
        atom.rotation.y += atom.userData.rotationSpeed.y;
        atom.rotation.z += atom.userData.rotationSpeed.z;
      });
      
      // Update line positions to match atoms
      connections.forEach(line => {
        const startAtom = atoms[line.userData.startIdx];
        const endAtom = atoms[line.userData.endIdx];
        
        const positions = line.geometry.attributes.position.array as Float32Array;
        
        // Update line start position
        positions[0] = startAtom.position.x;
        positions[1] = startAtom.position.y;
        positions[2] = startAtom.position.z;
        
        // Update line end position
        positions[3] = endAtom.position.x;
        positions[4] = endAtom.position.y;
        positions[5] = endAtom.position.z;
        
        line.geometry.attributes.position.needsUpdate = true;
      });
      
      // Animate particles moving along connections
      movingParticles.forEach(particle => {
        const { startPos, endPos, speed } = particle.userData;
        
        // Update progress
        particle.userData.progress += speed;
        if (particle.userData.progress > 1) {
          particle.userData.progress = 0;
        }
        
        // Calculate position along the line
        const progress = particle.userData.progress;
        particle.position.lerpVectors(startPos, endPos, progress);
      });
      
      // Render the scene
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials
      atoms.forEach(atom => {
        atom.geometry.dispose();
        (atom.material as THREE.Material).dispose();
      });
      
      connections.forEach(connection => {
        connection.geometry.dispose();
        (connection.material as THREE.Material).dispose();
      });
      
      movingParticles.forEach(particle => {
        particle.geometry.dispose();
        (particle.material as THREE.Material).dispose();
      });
    };
  }, [canvasId]);
  
  return <div id={canvasId} ref={containerRef} className="molecule-canvas absolute inset-0"></div>;
}
