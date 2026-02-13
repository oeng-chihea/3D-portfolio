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
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
            })

            tl.to('.contact-label', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
            })
                .to('.contact-title', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.3')
                .to('.contact-description', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.4')
                .to('.contact-email', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.4')
                .to('.contact-socials', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.4')
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="contact-section section" ref={sectionRef} id="contact">
            <div className="contact-inner">
                <p className="contact-label">Get In Touch</p>
                <h2 className="contact-title">
                    Let's Work<br />Together
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
