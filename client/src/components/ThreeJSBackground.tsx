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
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;

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

    // Simple, elegant color scheme with blue tones
    const colors = [
      new THREE.Color(0x2563eb),  // Blue-600
      new THREE.Color(0x3b82f6),  // Blue-500
    ];

    // Create a raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mousePosition = new THREE.Vector3();
    
    // Track dynamic connections that respond to mouse movement
    const dynamicLines: THREE.Line[] = [];
    const dynamicLinesGroup = new THREE.Group();
    animationGroup.add(dynamicLinesGroup);

    // Create elegant flowing particles system
    const particles: THREE.Mesh[] = [];
    const particlesCount = 120;  // Reduced particle count for a cleaner look
    
    // Create a field of particles that will move in a wavy pattern
    for (let i = 0; i < particlesCount; i++) {
      // Create a small sphere with random size
      const size = 0.05 + Math.random() * 0.1; // Smaller particles
      const geometry = new THREE.SphereGeometry(size, 12, 12);
      
      // Select a color from our palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create a material with transparency
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.3 // More subtle opacity
      });
      
      // Create the particle
      const particle = new THREE.Mesh(geometry, material);
      
      // Position within a spherical field
      const radius = 12 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi) - 10; // Offset to bring closer to camera
      
      // Store animation parameters
      particle.userData = {
        originalPosition: particle.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.3, // Slower movement for a calmer effect
        amplitude: 0.2 + Math.random() * 0.3, // Less movement
        originalColor: color.clone(),
        originalSize: size
      };
      
      // Add to scene and store reference
      animationGroup.add(particle);
      particles.push(particle);
    }
    
    // Create connecting lines for a network effect
    const lines: THREE.Line[] = [];
    const lineCount = 50;  // Fewer connections for a cleaner look
    
    for (let i = 0; i < lineCount; i++) {
      // Select two random particles to connect, but only if they're close enough
      const p1Index = Math.floor(Math.random() * particles.length);
      
      // Find particles that are within a reasonable distance
      const possibleConnections = particles
        .map((p, idx) => ({ 
          idx, 
          distance: particles[p1Index].position.distanceTo(p.position) 
        }))
        .filter(c => c.idx !== p1Index && c.distance < 10)
        .sort((a, b) => a.distance - b.distance);
      
      // Skip if no nearby particles
      if (possibleConnections.length === 0) continue;
      
      const p2Index = possibleConnections[0].idx;
      
      // Create the line connecting two particles
      const points = [
        particles[p1Index].position,
        particles[p2Index].position
      ];
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.15 // More subtle opacity
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      
      // Store references to connected particles
      line.userData = {
        pointIndex1: p1Index,
        pointIndex2: p2Index
      };
      
      animationGroup.add(line);
      lines.push(line);
    }
    
    // Function to create subtle dynamic connections from mouse to nearby particles
    const createDynamicConnections = (mousePos: THREE.Vector3) => {
      // Clear previous dynamic connections
      dynamicLinesGroup.clear();
      dynamicLines.length = 0;
      
      // Find particles within a certain range of the mouse
      const maxConnectDistance = 5; // Shorter connection distance
      const maxConnections = 5;     // Fewer connections for subtlety
      
      const nearbyParticles = particles
        .map((particle, index) => ({
          index,
          distance: mousePos.distanceTo(particle.position)
        }))
        .filter(item => item.distance < maxConnectDistance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxConnections);
      
      // Create connections to nearby particles
      nearbyParticles.forEach(nearby => {
        const particle = particles[nearby.index];
        
        // Create line from mouse to particle
        const points = [mousePos, particle.position];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Fade opacity based on distance
        const opacity = 0.3 * (1 - nearby.distance / maxConnectDistance); // More subtle
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: opacity
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        dynamicLinesGroup.add(line);
        dynamicLines.push(line);
        
        // Subtle highlight for connected particles
        const particleMaterial = particle.material as THREE.MeshBasicMaterial;
        particleMaterial.opacity = 0.5;
        particle.scale.set(1.2, 1.2, 1.2); // More subtle scale effect
      });
    };
    
    // Mouse move event handler
    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Project mouse into 3D space
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mousePosition = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Create new dynamic connections
      createDynamicConnections(mousePosition);
    };
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Update particles with gentle wave motion
      particles.forEach(particle => {
        const { originalPosition, phase, speed, amplitude } = particle.userData;
        
        // Make particles move in a gentle wave pattern
        const waveX = Math.sin(time * 0.2 + phase) * amplitude;
        const waveY = Math.cos(time * 0.15 + phase) * amplitude;
        const waveZ = Math.sin(time * 0.25 + phase * 2) * amplitude;
        
        particle.position.x = originalPosition.x + waveX;
        particle.position.y = originalPosition.y + waveY;
        particle.position.z = originalPosition.z + waveZ;
        
        // Very subtle opacity pulsation
        const material = particle.material as THREE.MeshBasicMaterial;
        material.opacity = 0.15 + (Math.sin(time * speed + phase) + 1) * 0.15;
      });
      
      // Update connecting lines to match particle positions
      lines.forEach(line => {
        const { pointIndex1, pointIndex2 } = line.userData;
        
        // Update line positions
        const positions = line.geometry.attributes.position.array as Float32Array;
        
        // Start point
        positions[0] = particles[pointIndex1].position.x;
        positions[1] = particles[pointIndex1].position.y;
        positions[2] = particles[pointIndex1].position.z;
        
        // End point
        positions[3] = particles[pointIndex2].position.x;
        positions[4] = particles[pointIndex2].position.y;
        positions[5] = particles[pointIndex2].position.z;
        
        line.geometry.attributes.position.needsUpdate = true;
      });
      
      // Update dynamic lines connected to mouse position
      dynamicLines.forEach(line => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        
        // Update the mouse position endpoint
        positions[0] = mousePosition.x;
        positions[1] = mousePosition.y;
        positions[2] = mousePosition.z;
        
        line.geometry.attributes.position.needsUpdate = true;
      });
      
      // Very gentle rotation of the entire animation group
      animationGroup.rotation.y = Math.sin(time * 0.05) * 0.1;
      animationGroup.rotation.x = Math.sin(time * 0.04) * 0.05;
      
      // Render scene
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Register mouse event listeners
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
      particles.forEach(particle => {
        particle.geometry.dispose();
        (particle.material as THREE.Material).dispose();
      });
      
      lines.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      
      dynamicLines.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [canvasId]);
  
  return <div id={canvasId} ref={containerRef} className="molecule-canvas absolute inset-0"></div>;
}
