import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3D from './components/Scene3D'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)

  const handleScroll = useCallback((e) => {
    const progress = e.progress || 0
    setScrollProgress(progress)
    ScrollTrigger.update()
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', handleScroll)

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [handleScroll])

  return (
    <>
      <LoadingScreen />
      <Navigation />
      <Scene3D scrollProgress={scrollProgress} />
      <div className="content-overlay">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <footer className="footer">
          <p className="footer-text">© 2026 Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
