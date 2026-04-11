import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { CelestialField } from './widgets';
import { GRADIENT_PRIMARY } from './values';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const NAV_SUGGESTIONS = [
    { label: 'Home', path: '/', icon: '✦', desc: 'Return to the beginning' },
    { label: 'Services', path: '/services', icon: '♈', desc: 'Explore our offerings' },
    { label: 'Readings', path: '/readings', icon: '☽', desc: 'Browse cosmic articles' },
    { label: 'Contact', path: '/contact', icon: '◈', desc: 'Reach out to us' },
];

function OrbitRing({ size, duration, reverse = false, dotColor = '#7c5cbf', opacity = 0.22 }) {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: `${size}px`, height: `${size}px`, marginTop: `-${size / 2}px`, marginLeft: `-${size / 2}px`, borderRadius: '50%', border: `1px dashed rgba(124,92,191,${opacity})`, pointerEvents: 'none' }}>
            <motion.div animate={{ rotate: reverse ? -360 : 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, marginTop: '-4px', boxShadow: `0 0 8px 2px ${dotColor}66` }} />
            </motion.div>
        </div>
    );
}

const cardVariants = {
    rest: { y: 0, borderColor: 'rgba(167,139,250,0.18)' },
    hover: {
        y: -6,
        borderColor: 'rgba(124,92,191,0.45)',
        boxShadow: '0 16px 40px rgba(124,92,191,0.14)',
        transition: { duration: 0.28, ease: 'easeOut' },
    },
};

export default function NotFound() {
    const codeRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);
    const subtitleRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(codeRef.current,
                { opacity: 0, scale: 0.6, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.9, delay: 0.1 }
            ).fromTo(titleRef.current,
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.8 }, '-=0.4'
            ).fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 }, '-=0.4'
            ).fromTo('.not-found-card',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.3'
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{ background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 45%, #fff8f5 100%)', minHeight: '100vh', color: '#2d2438', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            {/*<StarField/>*/}<CelestialField />
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(219,39,119,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '820px' }}>
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 3.5rem', flexShrink: 0 }}>
                    <OrbitRing size={220} duration={22} dotColor="#7c5cbf" opacity={0.2} />
                    <OrbitRing size={160} duration={15} reverse dotColor="#be185d" opacity={0.22} />
                    <OrbitRing size={100} duration={9} dotColor="#6366f1" opacity={0.28} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(196,181,253,0.15) 60%, transparent 80%)', boxShadow: '0 0 30px rgba(124,92,191,0.25), 0 0 60px rgba(124,92,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ fontSize: '1.6rem', display: 'inline-block', color: '#7c5cbf', filter: 'drop-shadow(0 0 6px rgba(124,92,191,0.7))' }}>✦</motion.span>
                    </div>
                </div>
                <div ref={codeRef}>
                    <div style={{ fontSize: 'clamp(6rem, 18vw, 11rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.9, letterSpacing: '-0.04em', background: 'linear-gradient(135deg, rgba(61,43,107,0.55) 0%, rgba(124,92,191,0.9) 50%, rgba(167,139,250,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', userSelect: 'none', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 20px rgba(124,92,191,0.2))' }}>404</div>
                </div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }} style={{ width: '80px', height: '2px', margin: '0 auto 1.75rem', background: 'linear-gradient(90deg, transparent, #7c5cbf, transparent)', borderRadius: '2px' }} />
                <h1 ref={titleRef} style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1rem', background: 'linear-gradient(135deg, #3d2b6b 30%, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Not Found!</h1>
                <p ref={subtitleRef} style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.85, color: '#6b5c8a', maxWidth: '440px', margin: '0 auto 3.5rem', fontWeight: 400 }}>Even the stars occasionally wander off their charted paths. The page you're seeking doesn't exist — but your journey needn't end here.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(124,92,191,0.35)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 2.2rem', background: GRADIENT_PRIMARY, border: 'none', borderRadius: '50px', color: '#fff', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(124,92,191,0.28)' }}>Return Home ✦</motion.button>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(124,92,191,0.15)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 2.2rem', background: 'transparent', border: '1.5px solid rgba(124,92,191,0.35)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', transition: 'border-color 0.2s' }}>Contact Us</motion.button>
                    </Link>
                </div>
                <div ref={cardsRef}>
                    <div style={{ color: '#7c5cbf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, rgba(124,92,191,0.35))' }} /> Or navigate to <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, rgba(124,92,191,0.35), transparent)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
                        {NAV_SUGGESTIONS.map((nav) => (
                            <Link key={nav.path} to={nav.path} style={{ textDecoration: 'none' }}>
                                <motion.div className="not-found-card" variants={cardVariants} initial="rest" whileHover="hover" style={{ background: 'rgba(245,240,255,0.7)', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '18px', padding: '1.4rem 1.2rem', cursor: 'pointer', willChange: 'transform', textAlign: 'center', boxShadow: '0 2px 12px rgba(124,92,191,0.06)' }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem', color: '#7c5cbf', filter: 'drop-shadow(0 2px 6px rgba(124,92,191,0.35))' }}>{nav.icon}</div>
                                    <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{nav.label}</div>
                                    <div style={{ color: '#9585b0', fontSize: '0.75rem' }}>{nav.desc}</div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} style={{ marginTop: '4rem', color: '#b8a8cc', fontSize: '0.78rem', letterSpacing: '0.08em', fontStyle: 'italic' }}>"Not all who wander are lost — but this URL certainly is." ✦</motion.p>
            </div>
        </div>
    );
}