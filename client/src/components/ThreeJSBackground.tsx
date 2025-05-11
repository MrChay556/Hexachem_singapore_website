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

    // Professional color scheme with blue tones for a corporate feel
    const colors = [
      new THREE.Color(0x2563eb),  // Blue-600
      new THREE.Color(0x3b82f6),  // Blue-500
      new THREE.Color(0x60a5fa),  // Blue-400
    ];

    // Create elegant flowing particles system
    const particles: THREE.Mesh[] = [];
    const particlesCount = 200;
    
    // Create a field of particles that will move in a wavy pattern
    for (let i = 0; i < particlesCount; i++) {
      // Create a small sphere with random size
      const size = 0.05 + Math.random() * 0.15;
      const geometry = new THREE.SphereGeometry(size, 12, 12);
      
      // Select a color from our palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create a material with transparency
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.4
      });
      
      // Create the particle
      const particle = new THREE.Mesh(geometry, material);
      
      // Position within a spherical field
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi) - 10; // Offset to bring closer to camera
      
      // Store animation parameters
      particle.userData = {
        originalPosition: particle.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.8,
        amplitude: 0.3 + Math.random() * 0.7,
        distance: particle.position.length()
      };
      
      // Add to scene and store reference
      animationGroup.add(particle);
      particles.push(particle);
    }
    
    // Create connecting lines for a professional network effect
    const lines: THREE.Line[] = [];
    const lineCount = 30;
    
    for (let i = 0; i < lineCount; i++) {
      // Select two random particles to connect, but only if they're close enough
      const p1Index = Math.floor(Math.random() * particles.length);
      
      // Find particles that are within a reasonable distance
      const possibleConnections = particles
        .map((p, idx) => ({ 
          idx, 
          distance: particles[p1Index].position.distanceTo(p.position) 
        }))
        .filter(c => c.idx !== p1Index && c.distance < 8)
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
        opacity: 0.2
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
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Update particles
      particles.forEach(particle => {
        const { originalPosition, phase, speed, amplitude } = particle.userData;
        
        // Make particles move in a gentle wave pattern
        const waveX = Math.sin(time * 0.3 + phase) * amplitude;
        const waveY = Math.cos(time * 0.2 + phase) * amplitude;
        const waveZ = Math.sin(time * 0.4 + phase * 2) * amplitude;
        
        particle.position.x = originalPosition.x + waveX;
        particle.position.y = originalPosition.y + waveY;
        particle.position.z = originalPosition.z + waveZ;
        
        // Slowly pulsate opacity for a subtle effect
        const material = particle.material as THREE.MeshBasicMaterial;
        material.opacity = 0.2 + (Math.sin(time * speed + phase) + 1) * 0.2;
      });
      
      // Update connecting lines
      lines.forEach(line => {
        const { pointIndex1, pointIndex2 } = line.userData;
        
        // Update line positions to match connected particles
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
      
      // Subtle rotation of the entire group
      animationGroup.rotation.y = Math.sin(time * 0.1) * 0.2;
      animationGroup.rotation.x = Math.sin(time * 0.08) * 0.1;
      
      // Render scene
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
      particles.forEach(particle => {
        particle.geometry.dispose();
        (particle.material as THREE.Material).dispose();
      });
      
      lines.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [canvasId]);
  
  return <div id={canvasId} ref={containerRef} className="molecule-canvas absolute inset-0"></div>;
}
