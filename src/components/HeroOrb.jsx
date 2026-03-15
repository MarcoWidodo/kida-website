import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ darkMode }) {
  const meshRef = useRef()
  
  // Color palette based on theme
  const colors = useMemo(() => ({
    primary: darkMode ? '#B83A4B' : '#8C1515',     // Cardinal red
    secondary: darkMode ? '#59B3A9' : '#279989',   // Palo Verde
    tertiary: darkMode ? '#F9A44A' : '#E98300'     // Poppy
  }), [darkMode])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })
  
  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={colors.primary}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={colors.secondary}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={colors.tertiary}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Ambient particles */}
      <Particles count={100} darkMode={darkMode} />
    </group>
  )
}

function Particles({ count, darkMode }) {
  const ref = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 2
      
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        size: Math.random() * 0.03 + 0.01
      })
    }
    return temp
  }, [count])
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
    }
  })
  
  return (
    <group ref={ref}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial 
            color={darkMode ? '#F4F4F4' : '#8C1515'} 
            transparent 
            opacity={0.6} 
          />
        </mesh>
      ))}
    </group>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-cardinal/20 animate-pulse" />
    </div>
  )
}

export default function HeroOrb({ darkMode }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#F9A44A" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#279989" />
          <AnimatedSphere darkMode={darkMode} />
        </Canvas>
      </Suspense>
    </div>
  )
}
