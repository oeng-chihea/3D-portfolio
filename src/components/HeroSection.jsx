import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TYPING_WORDS = ['Portfolio', 'Workspace']

function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) {
    const [displayText, setDisplayText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    const tick = useCallback(() => {
        const currentWord = words[wordIndex]

        if (!isDeleting) {
            setDisplayText(currentWord.substring(0, displayText.length + 1))
            if (displayText.length + 1 === currentWord.length) {
                setTimeout(() => setIsDeleting(true), pauseDuration)
                return
            }
        } else {
            setDisplayText(currentWord.substring(0, displayText.length - 1))
            if (displayText.length - 1 === 0) {
                setIsDeleting(false)
                setWordIndex((prev) => (prev + 1) % words.length)
                return
            }
        }
    }, [displayText, isDeleting, wordIndex, words, pauseDuration])

    useEffect(() => {
        const speed = isDeleting ? deletingSpeed : typingSpeed
        const timer = setTimeout(tick, speed)
        return () => clearTimeout(timer)
    }, [tick, isDeleting, typingSpeed, deletingSpeed])

    return displayText
}

export default function HeroSection() {
    const sectionRef = useRef()
    const typedWord = useTypingAnimation(TYPING_WORDS, 110, 70, 2200)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Make parent visible, animate each child separately
            gsap.set('.hero-center', { opacity: 1, y: 0 })

            // Unique initial states per element
            gsap.set('.hero-eyebrow', { opacity: 0, clipPath: 'inset(0 100% 0 0)' })
            gsap.set('.hero-title', { opacity: 0, y: 70, rotationX: 14, transformPerspective: 1200 })
            gsap.set('.hero-cta', { opacity: 0, scale: 0.8, y: 20 })
            gsap.set('.hero-scroll-indicator', { opacity: 0 })

            const tl = gsap.timeline({ delay: 1.2 })

            // Eyebrow: clip-path wipe from left (curtain reveal)
            tl.to('.hero-eyebrow', {
                opacity: 1,
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.8,
                ease: 'power3.out',
            })
            // Title: 3D tilt-up from below
            .to('.hero-title', {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.1,
                ease: 'power3.out',
            }, '-=0.4')
            // CTA: scale-bounce in
            .to('.hero-cta', {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: 'back.out(1.7)',
            }, '-=0.5')
            // Scroll indicator: simple fade
            .to('.hero-scroll-indicator', {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
            }, '-=0.3')

            // Scroll parallax fade-out
            gsap.to('.hero-section', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
                opacity: 0,
                y: -100,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="hero-section" ref={sectionRef} id="hero">
            <div className="hero-center">
                <p className="hero-eyebrow">Creative Developer &amp; Designer</p>
                <h1 className="hero-title">
                    Welcome to my<br />
                    <span className="hero-typed-wrapper">
                        <span className="highlight">{typedWord}</span>
                        <span className="hero-cursor">|</span>
                    </span>
                </h1>
                <a href="#projects" className="hero-cta" onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                    View My Work <span className="arrow">→</span>
                </a>
            </div>

            <div className="hero-divider" />

            <div className="hero-scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    )
}
