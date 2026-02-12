import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

// Colors for an unsolved Rubik's cube
const colors = {
  red: '#DC2626',      // Right face
  orange: '#F97316',   // Left face
  white: '#FFFFFF',    // Top face
  yellow: '#EAB308',   // Bottom face
  green: '#22C55E',    // Front face
  blue: '#3B82F6'      // Back face
}

// Create a single cubelet (small cube)
function Cubelet({ position, colors: cubeletColors }) {
  const meshRef = useRef()
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial 
        attach="material-0" color={cubeletColors.right}
        roughness={0.3} metalness={0.1}
      />
      <meshStandardMaterial 
        attach="material-1" color={cubeletColors.left}
        roughness={0.3} metalness={0.1}
      />
      <meshStandardMaterial 
        attach="material-2" color={cubeletColors.top}
        roughness={0.3} metalness={0.1}
      />
      <meshStandardMaterial 
        attach="material-3" color={cubeletColors.bottom}
        roughness={0.3} metalness={0.1}
      />
      <meshStandardMaterial 
        attach="material-4" color={cubeletColors.front}
        roughness={0.3} metalness={0.1}
      />
      <meshStandardMaterial 
        attach="material-5" color={cubeletColors.back}
        roughness={0.3} metalness={0.1}
      />
    </mesh>
  )
}

// Create the entire 3x3x3 Rubik's cube
export default function RubiksCube() {
  const groupRef = useRef()
  
  // Floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  // Pre-defined scrambled configuration for unsolved state
  const cubelets = useMemo(() => {
    return [
      // Bottom layer (y = -1)
      { position: [-1, -1, -1], colors: { right: '#1a1a1a', left: colors.orange, top: '#1a1a1a', bottom: colors.yellow, front: '#1a1a1a', back: colors.blue }},
      { position: [0, -1, -1], colors: { right: '#1a1a1a', left: '#1a1a1a', top: colors.red, bottom: colors.yellow, front: '#1a1a1a', back: colors.blue }},
      { position: [1, -1, -1], colors: { right: '#1a1a1a', left: '#1a1a1a', top: colors.white, bottom: colors.yellow, front: colors.green, back: colors.blue }},
      { position: [-1, -1, 0], colors: { right: colors.red, left: colors.orange, top: colors.green, bottom: colors.yellow, front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, -1, 0], colors: { right: colors.blue, left: '#1a1a1a', top: colors.red, bottom: colors.yellow, front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, -1, 0], colors: { right: colors.red, left: colors.orange, top: colors.blue, bottom: colors.yellow, front: colors.green, back: '#1a1a1a' }},
      { position: [-1, -1, 1], colors: { right: colors.red, left: colors.orange, top: colors.orange, bottom: colors.yellow, front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, -1, 1], colors: { right: colors.red, left: colors.orange, top: colors.green, bottom: colors.yellow, front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, -1, 1], colors: { right: colors.red, left: colors.orange, top: colors.blue, bottom: colors.yellow, front: colors.green, back: '#1a1a1a' }},
      
      // Middle layer (y = 0)
      { position: [-1, 0, -1], colors: { right: '#1a1a1a', left: colors.green, top: '#1a1a1a', bottom: '#1a1a1a', front: '#1a1a1a', back: colors.blue }},
      { position: [0, 0, -1], colors: { right: colors.yellow, left: '#1a1a1a', top: '#1a1a1a', bottom: '#1a1a1a', front: '#1a1a1a', back: colors.blue }},
      { position: [1, 0, -1], colors: { right: colors.red, left: '#1a1a1a', top: colors.orange, bottom: '#1a1a1a', front: colors.green, back: colors.blue }},
      { position: [-1, 0, 0], colors: { right: colors.blue, left: colors.orange, top: colors.green, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, 0, 0], colors: { right: colors.red, left: colors.orange, top: '#1a1a1a', bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, 0, 0], colors: { right: colors.red, left: colors.blue, top: colors.white, bottom: colors.yellow, front: colors.green, back: '#1a1a1a' }},
      { position: [-1, 0, 1], colors: { right: colors.green, left: colors.orange, top: colors.red, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, 0, 1], colors: { right: colors.red, left: colors.blue, top: colors.blue, bottom: colors.yellow, front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, 0, 1], colors: { right: colors.white, left: colors.orange, top: colors.white, bottom: '#1a1a1a', front: colors.green, back: '#1a1a1a' }},
      
      // Top layer (y = 1)
      { position: [-1, 1, -1], colors: { right: '#1a1a1a', left: colors.orange, top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: colors.yellow }},
      { position: [0, 1, -1], colors: { right: colors.green, left: '#1a1a1a', top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: colors.blue }},
      { position: [1, 1, -1], colors: { right: colors.red, left: '#1a1a1a', top: colors.white, bottom: '#1a1a1a', front: colors.green, back: colors.orange }},
      { position: [-1, 1, 0], colors: { right: colors.blue, left: colors.orange, top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, 1, 0], colors: { right: colors.green, left: colors.red, top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, 1, 0], colors: { right: colors.red, left: colors.blue, top: colors.white, bottom: '#1a1a1a', front: colors.green, back: '#1a1a1a' }},
      { position: [-1, 1, 1], colors: { right: colors.yellow, left: colors.orange, top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [0, 1, 1], colors: { right: colors.red, left: colors.yellow, top: colors.white, bottom: '#1a1a1a', front: '#1a1a1a', back: '#1a1a1a' }},
      { position: [1, 1, 1], colors: { right: colors.red, left: colors.orange, top: colors.white, bottom: '#1a1a1a', front: colors.green, back: '#1a1a1a' }}
    ]
  }, [])

  return (
    <group ref={groupRef}>
      {cubelets.map((cubelet, index) => (
        <Cubelet 
          key={index}
          position={cubelet.position}
          colors={cubelet.colors}
        />
      ))}
    </group>
  )
}