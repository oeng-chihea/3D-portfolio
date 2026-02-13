import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'Crafting immersive digital worlds with code & creativity'

export default function AboutSection() {
    const sectionRef = useRef()
    const titleRef = useRef()
    const contentRef = useRef()
    const imageRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true })

            // Title slides in from the left
            tl.fromTo(titleRef.current,
                { x: -300, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )
            // Content slides in from the left
            .fromTo(contentRef.current,
                { x: -300, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                '-=0.6'
            )
            // Image slides in from the right
            .fromTo(imageRef.current,
                { x: 300, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                '-=0.8'
            )

            // Restart animation every time the section enters the viewport
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 85%',
                end: 'bottom 15%',
                onEnter: () => tl.restart(),
                onEnterBack: () => tl.restart(),
                onLeave: () => tl.pause(0),
                onLeaveBack: () => tl.pause(0),
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="about-section section" ref={sectionRef} id="about">
            <div className="section-inner">
                <h2
                    className="about-title"
                    style={{ fontSize: 'clamp(4rem, 7.2vw, 8rem)', minHeight: '1.2em' }}
                    ref={titleRef}
                >
                    <span className="about-title-white">{HEADLINE.replace('code & creativity', '')}</span>
                    <span className="about-highlight">code &amp; creativity</span>
                </h2>
                <div className="about-split">
                    {/* Left: Content */}
                    <div className="about-content" ref={contentRef}>
                        <p className="about-label">About Me</p>
                        <p className="about-description">
                            I'm a full-stack developer with a deep passion for creating memorable
                            web experiences. I combine technical expertise with artistic vision to
                            build interfaces that don't just work — they <em>inspire</em>. From
                            interactive 3D environments to silky-smooth animations, I bring ideas
                            to life through code.
                        </p>
                        <p className="about-description">
                            Specializing in modern frameworks like React and Next.js, I craft scalable
                            applications with seamless user experiences. Whether it's building dynamic
                            backends with Node.js, designing stunning interfaces with Tailwind CSS, or
                            integrating real-time databases, I thrive on turning complex challenges into
                            elegant solutions.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <div className="stat-number">2+</div>
                                <div className="stat-label">Years Exp</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">20+</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Dedication</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="about-image-wrapper" ref={imageRef}>
                        <div className="about-image-container">
                            <img
                                src="/images/photo_2023-12-13_23-03-15.jpg"
                                alt="About Me"
                                className="about-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
