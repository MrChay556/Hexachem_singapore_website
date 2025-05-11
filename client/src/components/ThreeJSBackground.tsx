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

    // Enhanced molecule colors with vibrant palette that matches the hero design
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
    
    // Create the geometric pattern for the molecular complex
    const createComplexMolecular = () => {
      // Create a base pattern using a hex grid layout with 3D positioning
      // This will form a complex hexagonal lattice structure
      
      // Create central structure (hexagon-inspired arrangement)
      const centralPoints = [];
      const radius = 5; // Smaller radius to keep structure more compact
      const height = 3; // Reduced height for a more centered view
      
      // Generate central hexagonal pattern points
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        centralPoints.push(new THREE.Vector3(
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          (Math.random() - 0.5) * height
        ));
      }
      
      // Add a center point
      centralPoints.push(new THREE.Vector3(0, 0, 0));
      
      // Add more complex structure around the hexagon
      const totalPoints = 20; // Total atoms
      const structurePoints = [...centralPoints];
      
      // Add additional atoms to create a more complex structure
      for (let i = centralPoints.length; i < totalPoints; i++) {
        // Position new atoms relative to existing ones
        const referenceIdx = Math.floor(Math.random() * structurePoints.length);
        const referencePoint = structurePoints[referenceIdx];
        
        // Create new position with smaller random offset for more centralized structure
        const newPos = new THREE.Vector3(
          referencePoint.x + (Math.random() - 0.5) * 3.5,
          referencePoint.y + (Math.random() - 0.5) * 3.5,
          referencePoint.z + (Math.random() - 0.5) * 2
        );
        
        structurePoints.push(newPos);
      }
      
      // Create atoms at each point with varying sizes
      structurePoints.forEach((point, index) => {
        // Core atoms are larger
        const isCore = index < centralPoints.length;
        const size = isCore ? 0.4 + Math.random() * 0.2 : 0.2 + Math.random() * 0.25;
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
      
      // Create bonds between atoms
      for (let i = 0; i < atoms.length; i++) {
        // Each atom will connect to 2-4 nearby atoms
        const connectionsCount = Math.floor(2 + Math.random() * 2);
        
        for (let c = 0; c < connectionsCount; c++) {
          // Find a nearby atom to connect to
          const distances = atoms.map((atom, idx) => {
            if (idx === i) return Infinity; // Don't connect to self
            return atoms[i].position.distanceTo(atom.position);
          });
          
          // Get index of one of the closest atoms, but add some randomness
          // so it's not always the absolute closest
          const sortedIndices = distances
            .map((dist, idx) => ({ dist, idx }))
            .sort((a, b) => a.dist - b.dist)
            .map(item => item.idx);
          
          // Pick from the closest 5 atoms or fewer if not enough atoms
          const pickRange = Math.min(5, sortedIndices.length);
          if (pickRange <= 0) continue;
          
          const targetIdx = sortedIndices[Math.floor(Math.random() * pickRange)];
          
          // Create a line between atoms
          const points = [
            atoms[i].position,
            atoms[targetIdx].position
          ];
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.2
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData = {
            startIdx: i,
            endIdx: targetIdx
          };
          
          linesGroup.add(line);
          connections.push(line);
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
          color: 0x60a5fa, // Bright blue particle
          transparent: true,
          opacity: 0.25
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
