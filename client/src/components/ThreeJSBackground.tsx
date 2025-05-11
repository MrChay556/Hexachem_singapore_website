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
      new THREE.Color(0x93c5fd),  // Blue-300
    ];

    // Create a raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mousePosition = new THREE.Vector3();
    let intersectedParticle: THREE.Mesh | null = null;
    
    // Track dynamic connections that respond to mouse movement
    const dynamicLines: THREE.Line[] = [];
    const dynamicLinesGroup = new THREE.Group();
    animationGroup.add(dynamicLinesGroup);

    // Create elegant flowing particles system
    const particles: THREE.Mesh[] = [];
    const particlesCount = 250;  // Increased particle count for more interactivity
    
    // Create a field of particles that will move in a wavy pattern
    for (let i = 0; i < particlesCount; i++) {
      // Create a small sphere with random size
      const size = 0.05 + Math.random() * 0.2;
      const geometry = new THREE.SphereGeometry(size, 12, 12);
      
      // Select a color from our palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create a material with transparency
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.5
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
        distance: particle.position.length(),
        activated: false,
        highlight: false,
        originalColor: color.clone(),
        originalSize: size,
        connections: [] as number[]
      };
      
      // Add to scene and store reference
      animationGroup.add(particle);
      particles.push(particle);
    }
    
    // Create connecting lines for a network effect
    const lines: THREE.Line[] = [];
    const lineCount = 120;  // Increased for more connections
    
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
      
      // Store connection information in particles
      particles[p1Index].userData.connections.push(p2Index);
      particles[p2Index].userData.connections.push(p1Index);
      
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
        pointIndex2: p2Index,
        defaultOpacity: 0.2
      };
      
      animationGroup.add(line);
      lines.push(line);
    }
    
    // Function to create dynamic connections from mouse to nearby particles
    const createDynamicConnections = (mousePos: THREE.Vector3) => {
      // Clear previous dynamic connections
      dynamicLinesGroup.clear();
      dynamicLines.length = 0;
      
      // Find particles within a certain range of the mouse
      const maxConnectDistance = 7;
      const maxConnections = 10; // Limit connections for performance
      
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
        const opacity = 0.6 * (1 - nearby.distance / maxConnectDistance);
        const color = new THREE.Color(0x60a5fa);
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: opacity
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        dynamicLinesGroup.add(line);
        dynamicLines.push(line);
        
        // Highlight the connected particle
        const particleMaterial = particle.material as THREE.MeshBasicMaterial;
        particleMaterial.color.set(0x93c5fd);
        particleMaterial.opacity = 0.8;
        particle.scale.set(1.5, 1.5, 1.5);
        particle.userData.highlight = true;
      });
    };
    
    // Reset highlights when mouse moves away
    const resetHighlights = () => {
      particles.forEach(particle => {
        if (particle.userData.highlight) {
          const particleMaterial = particle.material as THREE.MeshBasicMaterial;
          particleMaterial.color.copy(particle.userData.originalColor);
          particleMaterial.opacity = 0.3 + Math.random() * 0.5;
          particle.scale.set(1, 1, 1);
          particle.userData.highlight = false;
        }
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
      
      // Reset previous highlights
      resetHighlights();
      
      // Create new dynamic connections
      createDynamicConnections(mousePosition);
    };
    
    // Mouse click event to activate particles and create connections
    const onMouseClick = () => {
      // Find particles close to the mouse position
      const maxDistance = 5;
      const clickedParticles = particles
        .filter(particle => particle.position.distanceTo(mousePosition) < maxDistance);
      
      if (clickedParticles.length > 0) {
        // Activate particle on click
        const particle = clickedParticles[0];
        particle.userData.activated = !particle.userData.activated;
        
        if (particle.userData.activated) {
          // Scale up and brighten when activated
          particle.scale.set(1.8, 1.8, 1.8);
          (particle.material as THREE.MeshBasicMaterial).color.set(0x0ea5e9);
          (particle.material as THREE.MeshBasicMaterial).opacity = 1.0;
          
          // Highlight all connected particles
          particle.userData.connections.forEach((connectedIdx: number) => {
            const connectedParticle = particles[connectedIdx];
            (connectedParticle.material as THREE.MeshBasicMaterial).color.set(0x7dd3fc);
            (connectedParticle.material as THREE.MeshBasicMaterial).opacity = 0.7;
            connectedParticle.scale.set(1.4, 1.4, 1.4);
          });
        } else {
          // Reset to original state
          particle.scale.set(1, 1, 1);
          (particle.material as THREE.MeshBasicMaterial).color.copy(particle.userData.originalColor);
          (particle.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.random() * 0.5;
          
          // Reset connected particles
          particle.userData.connections.forEach((connectedIdx: number) => {
            const connectedParticle = particles[connectedIdx];
            (connectedParticle.material as THREE.MeshBasicMaterial).color.copy(connectedParticle.userData.originalColor);
            (connectedParticle.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.random() * 0.5;
            connectedParticle.scale.set(1, 1, 1);
          });
        }
      }
    };
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Update particles with wave motion
      particles.forEach(particle => {
        if (particle.userData.highlight || particle.userData.activated) {
          // Don't move highlighted or activated particles
          return;
        }
        
        const { originalPosition, phase, speed, amplitude } = particle.userData;
        
        // Make particles move in a gentle wave pattern
        const waveX = Math.sin(time * 0.3 + phase) * amplitude;
        const waveY = Math.cos(time * 0.2 + phase) * amplitude;
        const waveZ = Math.sin(time * 0.4 + phase * 2) * amplitude;
        
        particle.position.x = originalPosition.x + waveX;
        particle.position.y = originalPosition.y + waveY;
        particle.position.z = originalPosition.z + waveZ;
        
        // Pulsate opacity for subtle effect
        if (!particle.userData.activated) {
          const material = particle.material as THREE.MeshBasicMaterial;
          material.opacity = 0.2 + (Math.sin(time * speed + phase) + 1) * 0.2;
        }
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
        
        // Highlight lines connected to activated particles
        const lineMaterial = line.material as THREE.LineBasicMaterial;
        if (particles[pointIndex1].userData.activated || particles[pointIndex2].userData.activated) {
          lineMaterial.opacity = 0.8;
          lineMaterial.color.set(0x38bdf8);
        } else {
          lineMaterial.opacity = line.userData.defaultOpacity;
          lineMaterial.color.set(0x3b82f6);
        }
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
      
      // Gentle rotation of the entire animation group
      animationGroup.rotation.y = Math.sin(time * 0.1) * 0.15;
      animationGroup.rotation.x = Math.sin(time * 0.08) * 0.1;
      
      // Render scene
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Register mouse event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    
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
      window.removeEventListener('click', onMouseClick);
      
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
  
  return (
    <div id={canvasId} ref={containerRef} className="molecule-canvas absolute inset-0 cursor-pointer" title="Interact with the particles">
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-blue-100 text-xs bg-blue-900/30 rounded-full px-3 py-1 pointer-events-none">
        Move mouse to interact • Click to highlight connections
      </div>
    </div>
  );
}
