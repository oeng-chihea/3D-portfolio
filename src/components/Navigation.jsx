export default function Navigation() {
    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="nav">
            <a href="#" className="nav-logo">
                port<span>folio</span>
            </a>
            <ul className="nav-links">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }}>Work</a></li>
                <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills') }}>Skills</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a></li>
            </ul>
        </nav>
    )
}
