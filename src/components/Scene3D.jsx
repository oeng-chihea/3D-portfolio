import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

export default function Scene3D({ scrollProgress = 0 }) {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }}
            >
                <color attach="background" args={['#0a0a0f']} />
                <fog attach="fog" args={['#0a0a0f', 8, 30]} />

                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.15} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} color="#5ba4f5" />
                    <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#00cec9" />
                    <pointLight position={[0, 3, 0]} intensity={0.5} color="#2d7aed" distance={12} />

                    {/* Environment */}
                    <Environment preset="night" />
                    <Stars radius={100} depth={80} count={3000} factor={3} saturation={0.5} fade speed={1} />

                    {/* 3D Elements */}
                    <FloatingGeometry scrollProgress={scrollProgress} />
                    <ParticleField count={1500} scrollProgress={scrollProgress} />

                    {/* Post-processing */}
                    <EffectComposer>
                        <Bloom
                            intensity={0.6}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                        <Vignette
                            offset={0.3}
                            darkness={0.7}
                            blendFunction={BlendFunction.NORMAL}
                        />
                        <ChromaticAberration
                            offset={new THREE.Vector2(0.0005, 0.0005)}
                            blendFunction={BlendFunction.NORMAL}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
