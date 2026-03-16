import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
    const sectionRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            })

            // Label: zoom-out blur dissolve (appears large + blurry, shrinks into place)
            tl.fromTo('.contact-label',
                { opacity: 0, scale: 2.2, filter: 'blur(10px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }
            )
            // Title line 1: slide in from left
            .fromTo('.contact-line-1',
                { opacity: 0, x: -70 },
                { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
                '-=0.2'
            )
            // Title line 2: slide in from right (opposite direction)
            .fromTo('.contact-line-2',
                { opacity: 0, x: 70 },
                { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
                '-=0.55'
            )
            // Description: blur-fade rise from below
            .fromTo('.contact-description',
                { opacity: 0, y: 30, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
                '-=0.4'
            )
            // Email: clip-path wipe from left (curtain reveal)
            .fromTo('.contact-email',
                { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
                '-=0.4'
            )
            // Socials: elastic bounce-in stagger from below
            .fromTo('.social-link',
                { opacity: 0, y: 35, scale: 0.5 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(2)' },
                '-=0.4'
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="contact-section section" ref={sectionRef} id="contact">
            <div className="contact-inner">
                <p className="contact-label">Get In Touch</p>
                <h2 className="contact-title">
                    <span className="contact-line-1">Let's Work</span>
                    <br />
                    <span className="contact-line-2">Together</span>
                </h2>
                <p className="contact-description">
                    Have a project in mind or just want to say hello? I'm always open to
                    discussing new opportunities and creative ideas.
                </p>
                <a href="https://mail.google.com/mail/?view=cm&to=liiheaoeng@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-email">
                    liiheaoeng@gmail.com <span className="arrow">→</span>
                </a>
                <div className="contact-socials">
                    <a href="#" className="social-link" title="GitHub">GH</a>
                    <a href="#" className="social-link" title="LinkedIn">LI</a>
                    <a href="#" className="social-link" title="Twitter">TW</a>
                    <a href="#" className="social-link" title="Dribbble">DR</a>
                </div>
            </div>
        </section>
    )
}
