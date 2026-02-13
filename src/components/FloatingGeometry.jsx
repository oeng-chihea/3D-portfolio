import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingImage({
    url,
    position,
    scale = 1,
    aspectRatio = 1,
    rotationSpeed = 0.15,
    floatSpeed = 0.3,
    floatRange = 0.3,
    scrollProgress = 0,
    scrollMultiplier = 5,
}) {
    const meshRef = useRef()
    const texture = useTexture(url)

    // Keep texture crisp
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime()

        // Smooth floating motion
        meshRef.current.position.y =
            position[1] + Math.sin(t * floatSpeed) * floatRange
        meshRef.current.position.x =
            position[0] + Math.cos(t * floatSpeed * 0.6) * (floatRange * 0.3)

        // Very subtle rotation — keeps the image readable
        meshRef.current.rotation.y = Math.sin(t * rotationSpeed) * 0.15
        meshRef.current.rotation.z = Math.cos(t * rotationSpeed * 0.4) * 0.04

        // Scroll parallax
        meshRef.current.position.y -= scrollProgress * scrollMultiplier
    })

    const width = 2 * scale * aspectRatio
    const height = 2 * scale

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.92}
                side={THREE.DoubleSide}
                toneMapped={false}
                depthWrite={false}
            />
        </mesh>
    )
}

// All tech stack images with individual positions & sizes
const images = [
    {
        url: '/images/images.png',           // React logo
        position: [-4.5, 1.8, -1],
        scale: 0.7,
        aspectRatio: 1,
        floatSpeed: 0.3,
        floatRange: 0.35,
        rotationSpeed: 0.12,
        scrollMultiplier: 7,
    },
    {
        url: '/images/nextjs-logo.webp',     // Next.js logo
        position: [4.2, 1.2, -1.5],
        scale: 0.5,
        aspectRatio: 2.2,
        floatSpeed: 0.25,
        floatRange: 0.3,
        rotationSpeed: 0.1,
        scrollMultiplier: 5,
    },
    {
        url: '/images/Node.js_logo.svg.webp', // Node.js logo
        position: [-3, -2.5, -0.5],
        scale: 0.45,
        aspectRatio: 1.8,
        floatSpeed: 0.35,
        floatRange: 0.25,
        rotationSpeed: 0.14,
        scrollMultiplier: 6,
    },
    {
        url: '/images/images.jfif',          // Supabase logo
        position: [3.5, -2, -2],
        scale: 0.4,
        aspectRatio: 2.5,
        floatSpeed: 0.28,
        floatRange: 0.3,
        rotationSpeed: 0.18,
        scrollMultiplier: 8,
    },
    {
        url: '/images/images (1).png',       // Express JS logo
        position: [0.8, 3.5, -2.5],
        scale: 0.38,
        aspectRatio: 2.2,
        floatSpeed: 0.32,
        floatRange: 0.2,
        rotationSpeed: 0.16,
        scrollMultiplier: 9,
    },
    {
        url: '/images/images (2).png',       // Vercel logo
        position: [5.5, -0.5, -1],
        scale: 0.45,
        aspectRatio: 2,
        floatSpeed: 0.22,
        floatRange: 0.28,
        rotationSpeed: 0.13,
        scrollMultiplier: 6,
    },
    {
        url: '/images/images (3).png',       // Tailwind CSS logo
        position: [-5, -0.8, -2],
        scale: 0.42,
        aspectRatio: 2.3,
        floatSpeed: 0.27,
        floatRange: 0.32,
        rotationSpeed: 0.11,
        scrollMultiplier: 7,
    },
    {
        url: '/images/neon.png',             // Neon logo
        position: [-1.5, -3.5, -1.5],
        scale: 0.4,
        aspectRatio: 2.4,
        floatSpeed: 0.33,
        floatRange: 0.22,
        rotationSpeed: 0.15,
        scrollMultiplier: 8,
    },
    {
        url: '/images/postgresql.png',       // PostgreSQL logo
        position: [1.8, -3, -0.8],
        scale: 0.55,
        aspectRatio: 1,
        floatSpeed: 0.29,
        floatRange: 0.28,
        rotationSpeed: 0.17,
        scrollMultiplier: 5,
    },
]

export default function FloatingGeometry({ scrollProgress = 0 }) {
    return (
        <group>
            {images.map((img, i) => (
                <FloatingImage
                    key={i}
                    url={img.url}
                    position={img.position}
                    scale={img.scale}
                    aspectRatio={img.aspectRatio}
                    rotationSpeed={img.rotationSpeed}
                    floatSpeed={img.floatSpeed}
                    floatRange={img.floatRange}
                    scrollProgress={scrollProgress}
                    scrollMultiplier={img.scrollMultiplier}
                />
            ))}
        </group>
    )
}
