import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 2000, scrollProgress = 0 }) {
    const meshRef = useRef()
    const lightRef = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const speeds = new Float32Array(count)

        const colorPalette = [
            new THREE.Color('#2d7aed'),
            new THREE.Color('#5ba4f5'),
            new THREE.Color('#00cec9'),
            new THREE.Color('#fd79a8'),
            new THREE.Color('#ffffff'),
        ]

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b

            sizes[i] = Math.random() * 3 + 0.5
            speeds[i] = Math.random() * 0.5 + 0.1
        }

        return { positions, colors, sizes, speeds }
    }, [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()
        const geometry = meshRef.current.geometry
        const posArray = geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const speed = particles.speeds[i]

            posArray[i3 + 1] += Math.sin(time * speed + i) * 0.002
            posArray[i3] += Math.cos(time * speed * 0.5 + i) * 0.001
        }

        geometry.attributes.position.needsUpdate = true

        // Rotate entire particle system based on scroll
        meshRef.current.rotation.y = scrollProgress * Math.PI * 0.5
        meshRef.current.rotation.x = scrollProgress * Math.PI * 0.15

        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(time * 0.3) * 5
            lightRef.current.position.z = Math.cos(time * 0.3) * 5
        }
    })

    return (
        <>
            <points ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={count}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            <pointLight ref={lightRef} color="#2d7aed" intensity={2} distance={15} />
        </>
    )
}
