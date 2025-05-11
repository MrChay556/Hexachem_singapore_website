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
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;

    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Molecule colors
    const colors = [
      new THREE.Color(0x1F4B8A), // Deep Navy
      new THREE.Color(0x1A6AA2), // Royal Blue
      new THREE.Color(0x0EA5E9)  // Sky blue
    ];

    // Create molecules
    const molecules: THREE.Mesh[] = [];
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Function to create a single molecule (sphere)
    function createMolecule(position: THREE.Vector3, size: number, color: THREE.Color) {
      const geometry = new THREE.SphereGeometry(size, 24, 24);
      const material = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.7 
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      
      // Add connecting lines between atoms if not the first molecule
      if (molecules.length > 0) {
        const randomMolecule = molecules[Math.floor(Math.random() * molecules.length)];
        const points = [
          new THREE.Vector3(position.x, position.y, position.z),
          new THREE.Vector3(
            randomMolecule.position.x, 
            randomMolecule.position.y, 
            randomMolecule.position.z
          )
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.3 
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        moleculeGroup.add(line);
      }
      
      moleculeGroup.add(sphere);
      molecules.push(sphere);
      
      // Add properties for individual rotation
      sphere.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005
        }
      };
      
      return sphere;
    }

    // Create several molecules
    for (let i = 0; i < 15; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      
      const size = 0.3 + Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      createMolecule(position, size, color);
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate the entire molecule group slowly
      moleculeGroup.rotation.x += 0.001;
      moleculeGroup.rotation.y += 0.002;
      
      // Rotate individual molecules
      molecules.forEach(molecule => {
        const { rotationSpeed } = molecule.userData;
        molecule.rotation.x += rotationSpeed.x;
        molecule.rotation.y += rotationSpeed.y;
        molecule.rotation.z += rotationSpeed.z;
      });
      
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
      molecules.forEach(molecule => {
        molecule.geometry.dispose();
        (molecule.material as THREE.Material).dispose();
      });
    };
  }, [canvasId]);

  return <div id={canvasId} ref={containerRef} className="molecule-canvas"></div>;
}
