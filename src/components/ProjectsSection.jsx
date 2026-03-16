import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A modern shopping experience with 3D product visualization and smooth animations.',
        tag: 'Web App',
        gradient: 'gradient-1',
        icon: '🛒',
        link: 'https://ecommerce-website-clean.vercel.app/',
        thumbnail: '/feature projects images/ecommerce website.png',
    },
    {
        title: 'AI Chatbot',
        description: 'An intelligent AI chatbot integration with seamless conversational experience.',
        tag: 'AI App',
        gradient: 'gradient-2',
        icon: '🤖',
        link: 'https://ai-chatbot-integration-gamma.vercel.app/',
        thumbnail: '/feature projects images/ai chatbot.png',
    },
    {
        title: 'Mekong Landing Page',
        description: 'A sleek and modern landing page with engaging visuals and smooth interactions.',
        tag: 'Landing Page',
        gradient: 'gradient-3',
        icon: '🎨',
        link: 'https://mekong-lyart.vercel.app/',
        thumbnail: '/feature projects images/mekong.png',
    },
    {
        title: 'Tonle Sab Landing Page',
        description: 'A beautifully crafted landing page with immersive design and fluid animations.',
        tag: 'Landing Page',
        gradient: 'gradient-4',
        icon: '💳',
        link: 'https://tonle-sab.vercel.app/',
        thumbnail: '/feature projects images/tonle sab.png',
    },
    {
        title: 'MiniShopKH',
        description: 'A full-featured Cambodian e-commerce platform with product listings, cart management, and a smooth checkout experience.',
        tag: 'E-Commerce',
        gradient: 'gradient-5',
        icon: '🛍️',
        link: 'https://minishopkh.lol/',
        thumbnail: '/feature projects images/minishop kh .png',
    },
]

export default function ProjectsSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Label: letter-spacing collapse (wide → tight typographic reveal)
            gsap.fromTo('.projects-label',
                { opacity: 0, letterSpacing: '18px', y: 20 },
                {
                    scrollTrigger: {
                        trigger: '.projects-section',
                        start: 'top 80%',
                        toggleActions: 'play reverse play reverse',
                    },
                    opacity: 1,
                    letterSpacing: '4px',
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )

            // Title: scaleX stretch collapse (horizontal squeeze-in)
            gsap.fromTo('.projects-title',
                { opacity: 0, scaleX: 1.25, y: 20, transformOrigin: 'center center' },
                {
                    scrollTrigger: {
                        trigger: '.projects-section',
                        start: 'top 80%',
                        toggleActions: 'play reverse play reverse',
                    },
                    opacity: 1,
                    scaleX: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'elastic.out(1, 0.75)',
                    delay: 0.18,
                }
            )

            // Cards: alternating slide directions — odd from left, even from right
            document.querySelectorAll('.project-card').forEach((card, i) => {
                const fromLeft = i % 2 === 0
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: fromLeft ? -90 : 90,
                        rotation: fromLeft ? -1.2 : 1.2,
                        scale: 0.97,
                    },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 87%',
                            end: 'bottom 15%',
                            toggleActions: 'play reverse play reverse',
                        },
                        opacity: 1,
                        x: 0,
                        rotation: 0,
                        scale: 1,
                        duration: 0.85,
                        ease: 'power3.out',
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="projects-section section" ref={sectionRef} id="projects">
            <div className="section-inner">
                <div className="projects-header">
                    <p className="projects-label">Selected Work</p>
                    <h2 className="projects-title">Featured Projects</h2>
                </div>
                <div className="projects-list">
                    {projects.map((project, i) => {
                        const CardWrapper = project.link ? 'a' : 'div'
                        const cardProps = project.link
                            ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                            : {}
                        return (
                            <CardWrapper className="project-card" key={i} {...cardProps}>
                                <div className={`project-card-bg ${project.gradient}`}>
                                    {project.thumbnail && (
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="project-card-thumbnail"
                                        />
                                    )}
                                </div>
                                {!project.thumbnail && (
                                    <div className="project-card-icon">{project.icon}</div>
                                )}
                                <div className="project-card-content">
                                    <span className="project-tag">{project.tag}</span>
                                    <h3 className="project-card-title">{project.title}</h3>
                                    <p className="project-card-desc">{project.description}</p>
                                </div>
                            </CardWrapper>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
