import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
    { name: 'React', image: '/TechStack images/react_js.png', level: 'Expert' },
    { name: 'Three.js', image: '/TechStack images/three_js.png', level: 'Advanced' },
    { name: 'Supabase', image: '/TechStack images/supabase.jpg', level: 'Advanced' },
    { name: 'Node.js', image: '/TechStack images/node_js.webp', level: 'Advanced' },
    { name: 'Neon', image: '/TechStack images/neon.png', level: 'Advanced' },
    { name: 'Vercel', image: '/TechStack images/vercel.webp', level: 'Advanced' },
    { name: 'Next.js', image: '/TechStack images/next.webp', level: 'Expert' },
    { name: 'Express.js', image: '/TechStack images/express_js.png', level: 'Advanced' },
    { name: 'PostgreSQL', image: '/TechStack images/postgresql.webp', level: 'Advanced' },
]

export default function SkillsSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.skills-label', {
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
            })

            gsap.to('.skills-title', {
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2,
            })

            gsap.to('.skill-card', {
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="skills-section section" ref={sectionRef} id="skills">
            <div className="section-inner">
                <div className="skills-header">
                    <p className="skills-label">Expertise</p>
                    <h2 className="skills-title">Skills & Technologies</h2>
                </div>
                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <div className="skill-card" key={i}>
                            <img className="skill-icon-img" src={skill.image} alt={skill.name} />
                            <h3 className="skill-name">{skill.name}</h3>
                            <p className="skill-level">{skill.level}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
