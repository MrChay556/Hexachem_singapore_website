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
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 30;

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

    // Create a group to hold all animated elements
    const animationGroup = new THREE.Group();
    scene.add(animationGroup);

    // Chemical-themed color scheme with blue tones
    const moleculeColors = [
      new THREE.Color(0x1d4ed8),  // Deep blue for water molecules
      new THREE.Color(0x3b82f6),  // Blue for basic molecules
    ];
    
    // Different colors for different chemical bonds
    const bondColors = [
      new THREE.Color(0x60a5fa),  // Lighter blue for single bonds
      new THREE.Color(0x93c5fd),  // Very light blue for energized molecules
    ];

    // Mouse interaction variables
    const mouse = new THREE.Vector2();
    let mousePosition = new THREE.Vector3();
    
    // Create chemical compound structures
    const molecules: THREE.Group[] = [];
    const bonds: THREE.Line[] = [];
    const compoundCount = 8; // Create several chemical compounds

    // Create chemical structures that represent actual molecules
    function createChemicalCompound(position: THREE.Vector3, size: number, complexity: number) {
      const compound = new THREE.Group();
      compound.position.copy(position);
      
      // Create a molecular structure based on common chemical arrangements
      // Complexity determines how many atoms in the structure
      const atomPositions: THREE.Vector3[] = [];
      const atomCount = 3 + Math.floor(Math.random() * complexity);
      
      // Create center atom
      atomPositions.push(new THREE.Vector3(0, 0, 0));
      
      // Add surrounding atoms in a 3D arrangement
      if (complexity <= 4) {
        // Simple tetrahedral structure (like methane CH4)
        const tetrahedralAngles = [
          new THREE.Vector3(1, 1, 1).normalize(),
          new THREE.Vector3(-1, -1, 1).normalize(),
          new THREE.Vector3(1, -1, -1).normalize(),
          new THREE.Vector3(-1, 1, -1).normalize()
        ];
        
        for (let i = 0; i < Math.min(atomCount - 1, 4); i++) {
          const pos = tetrahedralAngles[i].clone().multiplyScalar(size);
          atomPositions.push(pos);
        }
      } else {
        // More complex structure (like benzene ring)
        // Create a ring in the XY plane
        const ringAtomCount = Math.min(6, atomCount - 1);
        for (let i = 0; i < ringAtomCount; i++) {
          const angle = (Math.PI * 2 / ringAtomCount) * i;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          atomPositions.push(new THREE.Vector3(x, y, 0));
        }
        
        // Add some atoms above/below the ring for 3D effect
        if (atomCount > 7) {
          atomPositions.push(new THREE.Vector3(0, 0, size));
          atomPositions.push(new THREE.Vector3(0, 0, -size));
        }
      }
      
      // Create atoms (spheres) for each position
      const atoms: THREE.Mesh[] = [];
      atomPositions.forEach((pos, idx) => {
        // First atom is usually larger (carbon or central atom)
        const atomSize = idx === 0 ? size * 0.4 : size * 0.3;
        const geometry = new THREE.SphereGeometry(atomSize, 16, 16);
        
        // Choose color based on position (simulating different elements)
        const color = idx === 0 ? 
          moleculeColors[0] : 
          moleculeColors[Math.floor(Math.random() * moleculeColors.length)];
        
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.3
        });
        
        const atom = new THREE.Mesh(geometry, material);
        atom.position.copy(pos);
        
        // Animation parameters
        atom.userData = {
          originalPosition: pos.clone(),
          phase: Math.random() * Math.PI * 2,
          frequency: 0.2 + Math.random() * 0.2,
          amplitude: size * 0.05,
          element: idx === 0 ? 'C' : (Math.random() > 0.5 ? 'O' : 'H'),
          originalColor: color.clone()
        };
        
        compound.add(atom);
        atoms.push(atom);
      });
      
      // Create bonds between atoms
      for (let i = 1; i < atoms.length; i++) {
        // Connect each atom to the center atom
        createBond(atoms[0], atoms[i], compound);
        
        // Create some bonds between outer atoms for ring structures
        if (complexity > 4 && i < atoms.length - 1 && i % 2 === 1) {
          createBond(atoms[i], atoms[i + 1], compound);
        }
      }
      
      // Store animation parameters for the compound
      compound.userData = {
        rotationAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        rotationSpeed: 0.1 + Math.random() * 0.2,
        originalPosition: position.clone(),
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.1 + Math.random() * 0.1,
        driftAmplitude: 0.5 + Math.random() * 0.5
      };
      
      molecules.push(compound);
      animationGroup.add(compound);
      
      return compound;
    }
    
    // Create a bond between two atoms
    function createBond(atom1: THREE.Mesh, atom2: THREE.Mesh, parent: THREE.Group) {
      const points = [
        atom1.position,
        atom2.position
      ];
      
      const bondColor = bondColors[Math.floor(Math.random() * bondColors.length)];
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: bondColor,
        transparent: true,
        opacity: 0.3
      });
      
      const bond = new THREE.Line(geometry, material);
      bond.userData = {
        atom1: atom1,
        atom2: atom2,
        originalColor: bondColor.clone()
      };
      
      parent.add(bond);
      bonds.push(bond);
      
      return bond;
    }
    
    // Create chemical compounds at random positions
    for (let i = 0; i < compoundCount; i++) {
      // Position randomly in 3D space with some separation
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      
      const position = new THREE.Vector3(x, y, z);
      const size = 1 + Math.random() * 1.5;
      const complexity = 3 + Math.floor(Math.random() * 5); // 3-7 atoms
      
      createChemicalCompound(position, size, complexity);
    }
    
    // Mouse move event handler for highlighting nearest molecule
    const onMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate mouse position relative to the canvas
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
      
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mousePosition = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Highlight nearest molecule to mouse position
      let nearestMolecule = null;
      let minDistance = Infinity;
      
      molecules.forEach(molecule => {
        const dist = mousePosition.distanceTo(molecule.position);
        if (dist < minDistance) {
          minDistance = dist;
          nearestMolecule = molecule;
        }
        
        // Reset all molecules first
        molecule.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshBasicMaterial;
            material.opacity = 0.3 + Math.random() * 0.2;
          } else if (child instanceof THREE.Line) {
            const material = child.material as THREE.LineBasicMaterial;
            material.opacity = 0.3;
          }
        });
      });
      
      // Highlight the nearest molecule if it's close enough
      if (nearestMolecule && minDistance < 10) {
        nearestMolecule.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshBasicMaterial;
            material.opacity = 0.8; // Make atoms more visible
          } else if (child instanceof THREE.Line) {
            const material = child.material as THREE.LineBasicMaterial;
            material.opacity = 0.7; // Make bonds more visible
          }
        });
      }
    };
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Animate each molecular compound
      molecules.forEach(molecule => {
        const { 
          rotationAxis, 
          rotationSpeed,
          originalPosition,
          driftPhase,
          driftSpeed,
          driftAmplitude
        } = molecule.userData;
        
        // Rotate the molecule around its axis
        molecule.rotateOnAxis(rotationAxis, rotationSpeed * 0.01);
        
        // Gentle floating motion
        const driftX = Math.sin(time * driftSpeed + driftPhase) * driftAmplitude;
        const driftY = Math.cos(time * driftSpeed + driftPhase * 2) * driftAmplitude;
        
        molecule.position.x = originalPosition.x + driftX;
        molecule.position.y = originalPosition.y + driftY;
        
        // Animate individual atoms within each molecule
        molecule.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            const { 
              originalPosition, 
              phase, 
              frequency, 
              amplitude 
            } = child.userData;
            
            // Vibration effect for atoms (subtle)
            const vibrationX = Math.sin(time * frequency + phase) * amplitude;
            const vibrationY = Math.cos(time * frequency + phase * 2) * amplitude;
            const vibrationZ = Math.sin(time * frequency * 1.5 + phase) * amplitude;
            
            child.position.x = originalPosition.x + vibrationX;
            child.position.y = originalPosition.y + vibrationY;
            child.position.z = originalPosition.z + vibrationZ;
          }
        });
      });
      
      // Very subtle overall animation effect
      animationGroup.rotation.y = Math.sin(time * 0.05) * 0.05;
      
      // Render scene
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Register mouse event listener
    window.addEventListener('mousemove', onMouseMove);
    
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
      window.removeEventListener('mousemove', onMouseMove);
      
      // Dispose geometries and materials
      molecules.forEach(molecule => {
        molecule.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          } else if (child instanceof THREE.Line) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      });
    };
  }, [canvasId]);
  
  return <div 
    id={canvasId} 
    ref={containerRef} 
    className="molecule-canvas absolute inset-0"
    title="Chemical compounds animation"
  ></div>;
}
