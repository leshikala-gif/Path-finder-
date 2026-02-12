import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import RubiksCube from './RubiksCube'

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Camera />
    </div>
  )
}

function Camera() {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.3} />
      
      {/* Environment for realistic reflections */}
      <Environment preset="city" />
      
      {/* The floating Rubik's cube */}
      <RubiksCube />
      
      {/* Orbit controls for user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
      />
    </Canvas>
  )
}