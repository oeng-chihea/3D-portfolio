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
            // Typing
            setDisplayText(currentWord.substring(0, displayText.length + 1))
            if (displayText.length + 1 === currentWord.length) {
                setTimeout(() => setIsDeleting(true), pauseDuration)
                return
            }
        } else {
            // Deleting
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
            const tl = gsap.timeline({ delay: 1.2 })

            tl.to('.hero-center', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            })
                .to('.hero-scroll-indicator', {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                }, '-=0.4')

            // Parallax on scroll
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

            {/* Decorative divider line */}
            <div className="hero-divider" />

            <div className="hero-scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    )
}
