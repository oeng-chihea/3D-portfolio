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
        link: 'https://ecommerce-website-steel-ten.vercel.app/',
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
]

export default function ProjectsSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pop-up animation for header
            gsap.fromTo('.projects-label', 
                { opacity: 0, scale: 0.5, y: 30 },
                {
                    scrollTrigger: {
                        trigger: '.projects-section',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'back.out(1.7)',
                }
            )

            gsap.fromTo('.projects-title',
                { opacity: 0, scale: 0.5, y: 40 },
                {
                    scrollTrigger: {
                        trigger: '.projects-section',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: 0.15,
                }
            )

            // Pop-up animation for each card
            document.querySelectorAll('.project-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, scale: 0.7, y: 60 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play reverse play reverse',
                        },
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: 'back.out(1.4)',
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
