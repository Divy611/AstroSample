import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
    Services: [
        { label: 'Astrology', path: '/services' },
        { label: 'Numerology', path: '/services' },
        { label: 'Vastu Shastra', path: '/services' },
        { label: 'Tarot Readings', path: '/services' },
        { label: 'Kundli Matching', path: '/services' },
    ],
    Explore: [
        { label: 'About Us', path: '/about' },
        { label: 'Readings', path: '/readings' },
        { label: 'Contact', path: '/contact' },
        { label: 'Book a Reading', path: '/contact' },
        { label: 'Privacy Policy', path: '/privacy' },
    ],
};

const SOCIAL_ICONS = [
    { label: 'Instagram', icon: '📸', href: 'https://instagram.com' },
    { label: 'YouTube', icon: '▶️', href: 'https://youtube.com' },
    { label: 'Twitter', icon: '𝕏', href: 'https://x.com' },
    { label: 'Facebook', icon: '𝑓', href: 'https://facebook.com' },
];

function getMoonPhase() {
    const MOON_PHASES = [
        { label: 'New Moon', icon: '🌑' },
        { label: 'Waxing Crescent', icon: '🌒' },
        { label: 'First Quarter', icon: '🌓' },
        { label: 'Waxing Gibbous', icon: '🌔' },
        { label: 'Full Moon', icon: '🌕' },
        { label: 'Waning Gibbous', icon: '🌖' },
        { label: 'Last Quarter', icon: '🌗' },
        { label: 'Waning Crescent', icon: '🌘' },
    ];
    const day = new Date().getDate();
    return MOON_PHASES[Math.floor((day / 30) * 8) % 8];
}

function CosmicWidget() {
    const [tick, setTick] = useState(0);//eslint-disable-line
    const moonPhase = useRef(getMoonPhase()).current;

    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(id);
    }, []);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.1rem' }}>
                <h4 style={{ color: '#7c5cbf', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Current Sky</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                    <span style={{ color: '#9585b0', fontSize: '0.68rem', letterSpacing: '0.06em' }}>LIVE</span>
                </div>
            </div>
            <div style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#9585b0', fontSize: '0.75rem' }}>{dateStr}</span>
                <span style={{ color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em' }}>{timeStr}</span>
            </div>
            <div style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.14)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>{moonPhase.icon}</span>
                <div>
                    <div style={{ color: '#9585b0', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Moon Phase</div>
                    <div style={{ color: '#2d2438', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.1rem' }}>{moonPhase.label}</div>
                </div>
            </div>
        </div >
    );
}

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
        <footer ref={footerRef} style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f5f0ff 100%)', borderTop: '1px solid rgba(167,139,250,0.18)', padding: '5rem 1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '260px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,181,253,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    <div className="footer-col">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff', boxShadow: '0 4px 14px rgba(124,92,191,0.22)' }}>✦</div>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(90deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif" }}>Purple Celestia</span>
                            </div>
                        </Link>
                        <p style={{ color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '240px' }}>Ancient wisdom meets modern insight. Discover your cosmic path through astrology, numerology &amp; Vastu.</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            {SOCIAL_ICONS.map(({ label, icon, href }) => (
                                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.15, boxShadow: '0 4px 18px rgba(124,92,191,0.25)' }} style={{
                                    width: '38px', height: '38px', borderRadius: '50%',
                                    border: '1.5px solid rgba(167,139,250,0.28)',
                                    background: 'rgba(167,139,250,0.07)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.9rem', textDecoration: 'none', color: '#7c5cbf',
                                    transition: 'border-color 0.2s',
                                }}>{icon}</motion.a>
                            ))}
                        </div>
                    </div>
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category} className="footer-col">
                            <h4 style={{ color: '#7c5cbf', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem', margin: '0 0 1.25rem' }}>{category}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {links.map(({ label, path }) => (
                                    <li key={label}>
                                        <Link to={path} style={{ textDecoration: 'none' }}>
                                            <motion.span whileHover={{ x: 4, color: '#7c5cbf' }} style={{
                                                color: '#9585b0', fontSize: '0.875rem',
                                                display: 'inline-block',
                                                cursor: 'pointer', transition: 'color 0.2s',
                                            }}>{label}</motion.span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="footer-col"><CosmicWidget /></div>
                </div>
                <div style={{ height: '1px', marginBottom: '2rem', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ color: '#9585b0', fontSize: '0.8rem', margin: 0 }}>© {new Date().getFullYear()} Purple Celestia. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Privacy Policy', path: '/privacy' },
                            { label: 'Terms of Use', path: '/terms' },
                            { label: 'Contact', path: '/contact' },
                        ].map(({ label, path }) => (
                            <Link key={label} to={path} style={{ textDecoration: 'none' }}>
                                <motion.span whileHover={{ color: '#c084fc' }} style={{
                                    color: '#7c5cbf', fontSize: '0.78rem',
                                    cursor: 'pointer', transition: 'color 0.2s',
                                }}>{label}</motion.span>
                            </Link>
                        ))}
                    </div>
                    <p style={{ color: 'rgba(124,92,191,0.4)', fontSize: '0.8rem', letterSpacing: '0.04em', margin: 0 }}>✦</p>
                </div>
            </div>
        </footer>
    );
}