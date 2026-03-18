import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Readings', path: '/readings' },
    { label: 'Contact', path: '/contact' },
];

function useWindowWidth() {
    const [width, setWidth] = useState(() => window.innerWidth);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler, { passive: true });
        return () => window.removeEventListener('resize', handler);
    }, []);

    return width;
}

export default function Header() {
    const logoRef = useRef(null);
    const headerRef = useRef(null);
    const location = useLocation();
    const width = useWindowWidth();
    const isDesktop = width >= 768;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (isDesktop) setMenuOpen(false);
    }, [isDesktop]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                logoRef.current,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
        });
        return () => ctx.revert();
    }, []);

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20, pointerEvents: 'none' },
        visible: {
            opacity: 1, y: 0, pointerEvents: 'auto',
            transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.07, delayChildren: 0.05 },
        },
        exit: { opacity: 0, y: -10, pointerEvents: 'none', transition: { duration: 0.2 } },
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <header ref={headerRef} style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
            background: scrolled ? 'rgba(5,2,18,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(18px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
            boxShadow: scrolled ? '0 2px 30px rgba(139,92,246,0.12)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(139,92,246,0.15)' : '1px solid transparent',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(139,92,246,0.5)', fontSize: '18px' }}>✦</div>
                        <span style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.04em', background: 'linear-gradient(90deg, #e2d9f3, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif" }}>Nakshatra</span>
                    </div>
                </Link>
                {isDesktop && (
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {NAV_LINKS.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                                    <motion.div whileHover={{ color: '#c084fc' }} style={{
                                        padding: '0.4rem 1rem', borderRadius: '6px',
                                        fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em',
                                        color: isActive ? '#c084fc' : 'rgba(226,217,243,0.75)',
                                        cursor: 'pointer', position: 'relative',
                                        transition: 'color 0.2s ease',
                                    }}>
                                        {link.label}
                                        {isActive && (
                                            <motion.div layoutId="nav-indicator" style={{
                                                position: 'absolute', bottom: '-2px', left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '20px', height: '2px',
                                                background: 'linear-gradient(90deg, #7c3aed, #c084fc)',
                                                borderRadius: '2px',
                                            }} />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>
                )}
                {isDesktop
                    ? <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(139,92,246,0.6)' }} whileTap={{ scale: 0.97 }} style={{
                        padding: '0.5rem 1.4rem',
                        background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                        border: 'none', borderRadius: '30px',
                        color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                        letterSpacing: '0.05em', cursor: 'pointer',
                        boxShadow: '0 0 18px rgba(124,58,237,0.35)',
                    }}>Book a Reading
                    </motion.button>
                    : <button onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu" aria-expanded={menuOpen} style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px',
                    }}>
                        {[0, 1, 2].map((i) => (
                            <motion.span key={i} animate={menuOpen
                                ? i === 0 ? { rotate: 45, y: 7 }
                                    : i === 1 ? { opacity: 0, scaleX: 0 }
                                        : { rotate: -45, y: -7 }
                                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                            } style={{
                                display: 'block', width: '22px', height: '2px',
                                background: '#c084fc', borderRadius: '2px', transformOrigin: 'center',
                            }} />
                        ))}
                    </button>
                }
            </div>
            <AnimatePresence>
                {menuOpen && !isDesktop && (
                    <motion.div key="mobile-menu" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" style={{
                        position: 'absolute', top: '72px', left: 0, right: 0,
                        background: 'rgba(5,2,18,0.97)',
                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(139,92,246,0.2)',
                        padding: '1rem 1.5rem 1.5rem',
                    }}>
                        {NAV_LINKS.map((link) => (
                            <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                                <motion.div variants={mobileItemVariants} style={{
                                    padding: '0.85rem 0.5rem',
                                    borderBottom: '1px solid rgba(139,92,246,0.1)',
                                    color: location.pathname === link.path ? '#c084fc' : 'rgba(226,217,243,0.8)',
                                    fontSize: '1rem', fontWeight: 500, letterSpacing: '0.05em',
                                }}
                                >{link.label}
                                </motion.div>
                            </Link>
                        ))}
                        <motion.button variants={mobileItemVariants} whileTap={{ scale: 0.97 }} style={{
                            marginTop: '1rem', width: '100%', padding: '0.75rem',
                            background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                            border: 'none', borderRadius: '10px',
                            color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                            cursor: 'pointer', letterSpacing: '0.05em',
                        }}
                        >Book a Reading
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}