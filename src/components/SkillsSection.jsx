import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const skillCategories = [
    {
        id: 'languages',
        label: 'Language',
        color: '#5ba4f5',
        skills: [
            { name: 'JavaScript', img: `${DEVICON}/javascript/javascript-original.svg` },
            { name: 'HTML',       img: `${DEVICON}/html5/html5-original.svg` },
            { name: 'CSS',        img: `${DEVICON}/css3/css3-original.svg` },
            { name: 'PHP',        img: `${DEVICON}/php/php-original.svg` },
            { name: 'TypeScript', img: `${DEVICON}/typescript/typescript-original.svg` },
        ],
    },
    {
        id: 'frameworks',
        label: 'Frameworks & Libraries',
        color: '#00cec9',
        skills: [
            { name: 'Next.js',             img: '/TechStack images/next.webp',    large: true, local: '/TechStack images/next.webp' },
            { name: 'React.js',            img: '/TechStack images/react_js.png' },
            { name: 'Laravel',             img: `${DEVICON}/laravel/laravel-original.svg` },
            { name: 'Angular',             img: `${DEVICON}/angular/angular-original.svg` },
            { name: 'Node.js + Express',   img: '/TechStack images/node_js.webp' },
            { name: 'Vue.js',              img: `${DEVICON}/vuejs/vuejs-original.svg` },
            { name: 'React Native (Expo)', img: '/TechStack images/react_js.png' },
            { name: 'Three.js',            img: '/TechStack images/three_js.png', large: true, local: '/TechStack images/three_js.png' },
            { name: 'Tailwind CSS',        img: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
        ],
    },
    {
        id: 'api',
        label: 'API & Backend',
        color: '#fd79a8',
        skills: [
            { name: 'REST APIs',              img: `${DEVICON}/fastapi/fastapi-original.svg` },
            { name: 'GraphQL',               img: `${DEVICON}/graphql/graphql-plain.svg` },
            { name: 'Facebook Messenger API', img: `${DEVICON}/facebook/facebook-original.svg` },
            { name: 'Gmail API',              img: `${DEVICON}/google/google-original.svg` },
            { name: 'OpenAI / Gemini API',    img: `${DEVICON}/openal/openal-plain.svg`, fallback: true },
        ],
    },
    {
        id: 'database',
        label: 'Database',
        color: '#a29bfe',
        skills: [
            { name: 'Supabase',    img: '/TechStack images/supabase.jpg',    large: true },
            { name: 'Neon',        img: '/TechStack images/neon.png',         large: true },
            { name: 'PostgreSQL',  img: '/TechStack images/postgresql.webp',  large: true },
        ],
    },
    {
        id: 'deployment',
        label: 'Deployment',
        color: '#55efc4',
        skills: [
            { name: 'Vercel',   img: '/TechStack images/vercel.webp', large: true, local: '/TechStack images/vercel.webp' },
            { name: 'Netlify',  img: `${DEVICON}/netlify/netlify-original.svg` },
            { name: 'Render',   img: null },
        ],
    },
    {
        id: 'vcs',
        label: 'Version Control',
        color: '#fdcb6e',
        skills: [
            { name: 'Git',    img: `${DEVICON}/git/git-original.svg` },
            { name: 'GitHub', img: `${DEVICON}/github/github-original.svg`, invert: true },
        ],
    },
]

export default function SkillsSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.skills-label', { opacity: 0, y: 20 })
            gsap.set('.skills-title', { opacity: 0, y: 30 })
            gsap.set('.cat-label-col', { opacity: 0, x: -40 })
            gsap.set('.cat-line', { scaleX: 0, transformOrigin: 'left center' })
            gsap.set('.cat-languages .skill-tag',   { opacity: 0, x: -50 })
            gsap.set('.cat-frameworks .skill-tag',  { opacity: 0, rotationY: 90, transformPerspective: 800 })
            gsap.set('.cat-api .skill-tag',         { opacity: 0, x: 60, filter: 'blur(8px)' })
            gsap.set('.cat-database .skill-tag',    { opacity: 0, scale: 0, rotation: -120 })
            gsap.set('.cat-deployment .skill-tag',  { opacity: 0, y: 70 })
            gsap.set('.cat-vcs .skill-tag',         { opacity: 0, y: 30, skewX: 30 })

            gsap.to('.skills-label', {
                scrollTrigger: { trigger: '.skills-section', start: 'top 70%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            })
            gsap.to('.skills-title', {
                scrollTrigger: { trigger: '.skills-section', start: 'top 70%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
            })
            gsap.to('.cat-label-col', {
                scrollTrigger: { trigger: '.skills-categories', start: 'top 75%', toggleActions: 'play none none reverse' },
                opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            })
            gsap.to('.cat-line', {
                scrollTrigger: { trigger: '.skills-categories', start: 'top 75%', toggleActions: 'play none none reverse' },
                scaleX: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.25,
            })

            // 1. LANGUAGES — slide from left
            gsap.to('.cat-languages .skill-tag', {
                scrollTrigger: { trigger: '.cat-languages', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            })
            // 2. FRAMEWORKS — 3D Y-axis flip
            gsap.to('.cat-frameworks .skill-tag', {
                scrollTrigger: { trigger: '.cat-frameworks', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, rotationY: 0, duration: 0.6, stagger: 0.09, ease: 'back.out(1.7)',
            })
            // 3. API & BACKEND — slide from right with blur
            gsap.to('.cat-api .skill-tag', {
                scrollTrigger: { trigger: '.cat-api', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.09, ease: 'power2.out',
            })
            // 4. DATABASE — scale up with spin
            gsap.to('.cat-database .skill-tag', {
                scrollTrigger: { trigger: '.cat-database', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, scale: 1, rotation: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.7)',
            })
            // 5. DEPLOYMENT — elastic bounce
            gsap.to('.cat-deployment .skill-tag', {
                scrollTrigger: { trigger: '.cat-deployment', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'elastic.out(1, 0.5)',
            })
            // 6. VERSION CONTROL — skew straighten
            gsap.to('.cat-vcs .skill-tag', {
                scrollTrigger: { trigger: '.cat-vcs', start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, skewX: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out',
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
                <div className="skills-categories">
                    {skillCategories.map((cat, catIdx) => (
                        <div className={`skill-category cat-${cat.id}`} key={cat.id}>
                            <div className="cat-label-col">
                                <span className="cat-index">0{catIdx + 1}</span>
                                <h3 className="cat-name" style={{ color: cat.color }}>{cat.label}</h3>
                            </div>
                            <div
                                className="cat-line"
                                style={{ background: `linear-gradient(90deg, ${cat.color}60, transparent)` }}
                            />
                            <div className="cat-tags">
                                {cat.skills.map((skill, skillIdx) => (
                                    <span
                                        className="skill-tag"
                                        key={skillIdx}
                                        style={{ '--tag-color': cat.color }}
                                    >
                                        {skill.img && !skill.fallback ? (
                                            <img
                                                className={`skill-tag-img${skill.large ? ' skill-tag-img--large' : ''}`}
                                                src={skill.img}
                                                alt={skill.name}
                                                style={skill.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
                                                onError={(e) => {
                                                    if (skill.local && e.currentTarget.src !== window.location.origin + skill.local) {
                                                        e.currentTarget.src = skill.local
                                                    } else {
                                                        e.currentTarget.style.display = 'none'
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <span
                                                className="skill-tag-initial"
                                                style={{ background: cat.color }}
                                            >
                                                {skill.name.charAt(0)}
                                            </span>
                                        )}
                                        <span className="skill-tag-name">{skill.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
