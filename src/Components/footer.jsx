import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
    Services: ['Astrology', 'Numerology', 'Vastu Shastra', 'Tarot Readings', 'Kundli Matching'],
    Explore: ['About Us', 'Blog', 'Testimonials', 'FAQs', 'Privacy Policy'],
};

const SOCIAL_ICONS = [
    { label: 'Instagram', icon: '📸', href: '#' },
    { label: 'YouTube', icon: '▶️', href: '#' },
    { label: 'Twitter', icon: '𝕏', href: '#' },
    { label: 'Facebook', icon: '𝑓', href: '#' },
];

export default function Footer() {
    const footerRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer-col',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 90%',
                    },
                }
            );
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} style={{ background: 'linear-gradient(180deg, #050212 0%, #0a0520 100%)', borderTop: '1px solid rgba(139, 92, 246, 0.18)', padding: '5rem 1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    <div className="footer-col" style={{ gridColumn: 'span 1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 0 14px rgba(139, 92, 246, 0.4)' }}>✦</div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(90deg, #e2d9f3, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif" }}>Nakshatra</span>
                        </div>
                        <p style={{ color: 'rgba(200, 185, 230, 0.6)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '240px' }}>Ancient wisdom meets modern insight. Discover your cosmic path through astrology, numerology & Vastu.</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            {SOCIAL_ICONS.map(({ label, icon, href }) => (
                                <motion.a key={label} href={href} aria-label={label} whileHover={{ scale: 1.15, boxShadow: '0 0 16px rgba(139, 92, 246, 0.5)' }} style={{
                                    width: '38px', height: '38px', borderRadius: '50%',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    background: 'rgba(139, 92, 246, 0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.9rem', textDecoration: 'none', color: '#c084fc',
                                    transition: 'border-color 0.2s',
                                }}
                                >{icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category} className="footer-col">
                            <h4 style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{category}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {links.map((link) => (
                                    <li key={link}>
                                        <motion.a href="#" whileHover={{ x: 4, color: '#c084fc' }} style={{
                                            color: 'rgba(200, 185, 230, 0.6)', fontSize: '0.875rem',
                                            textDecoration: 'none', display: 'inline-block',
                                            transition: 'color 0.2s',
                                        }}
                                        >{link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="footer-col">
                        <h4 style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Our Newsletter</h4>
                        <p style={{ color: 'rgba(200, 185, 230, 0.6)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>Receive lunar forecasts, horoscopes & exclusive insights.</p>
                        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <input type="email" placeholder="your@email.com" required style={{
                                background: 'rgba(139, 92, 246, 0.08)',
                                border: '1px solid rgba(139, 92, 246, 0.25)',
                                borderRadius: '8px', padding: '0.65rem 1rem',
                                color: '#e2d9f3', fontSize: '0.85rem', outline: 'none',
                                transition: 'border-color 0.2s',
                            }} onFocus={(e) => (e.target.style.borderColor = 'rgba(192, 132, 252, 0.6)')} onBlur={(e) => (e.target.style.borderColor = 'rgba(139, 92, 246, 0.25)')} />
                            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124, 58, 237, 0.45)' }} whileTap={{ scale: 0.97 }} type="submit" style={{
                                background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                                border: 'none', borderRadius: '8px',
                                padding: '0.65rem', color: '#fff',
                                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                                letterSpacing: '0.05em',
                            }}
                            >Subscribe ✦
                            </motion.button>
                        </form>
                    </div>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.25), transparent)', marginBottom: '2rem' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ color: 'rgba(200, 185, 230, 0.4)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Nakshatra. All rights reserved.</p>
                    <p style={{ color: 'rgba(200, 185, 230, 0.3)', fontSize: '0.8rem', letterSpacing: '0.04em' }}>✦ Aligned with the cosmos</p>
                </div>
            </div>
        </footer>
    );
}
