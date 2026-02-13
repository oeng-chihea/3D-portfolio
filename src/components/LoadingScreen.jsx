import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
    const { progress } = useProgress()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => setLoaded(true), 800)
            return () => clearTimeout(timer)
        }
    }, [progress])

    return (
        <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
            <div className="loading-logo">Portfolio</div>
            <div className="loading-bar-container">
                <div className="loading-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="loading-percent">{Math.round(progress)}%</div>
        </div>
    )
}
