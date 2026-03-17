import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const NAV_SUGGESTIONS = [
    { label: 'Home', path: '/', icon: '✦', desc: 'Return to the beginning' },
    { label: 'Services', path: '/services', icon: '♈', desc: 'Explore our offerings' },
    { label: 'Readings', path: '/readings', icon: '☽', desc: 'Browse cosmic articles' },
    { label: 'Contact', path: '/contact', icon: '◈', desc: 'Reach out to us' },
];


function StarField() {
    const stars = useRef(
        Array.from({ length: 100 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2.5 + 0.5,
            delay: Math.random() * 6,
            duration: Math.random() * 4 + 2,
        }))
    ).current;

    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {stars.map((s) => (
                <motion.div key={s.id} animate={{ opacity: [0.05, 0.7, 0.05] }} transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }} style={{
                    position: 'absolute', top: s.top, left: s.left,
                    width: `${s.size}px`, height: `${s.size}px`,
                    borderRadius: '50%', background: '#fff',
                }} />
            ))}
        </div>
    );
}

function OrbitRing({ size, duration, reverse = false, dotColor = '#c084fc', opacity = 0.25 }) {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: `${size}px`, height: `${size}px`, marginTop: `-${size / 2}px`, marginLeft: `-${size / 2}px`, borderRadius: '50%', border: `1px dashed rgba(139,92,246,${opacity})`, pointerEvents: 'none' }}>
            <motion.div animate={{ rotate: reverse ? -360 : 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }} style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            }}
            >
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: dotColor, marginTop: '-4px',
                    boxShadow: `0 0 12px ${dotColor}`,
                }} />
            </motion.div>
        </div>
    );
}

const cardVariants = {
    rest: { y: 0, borderColor: 'rgba(139,92,246,0.2)' },
    hover: {
        y: -6,
        borderColor: 'rgba(192,132,252,0.5)',
        boxShadow: '0 16px 50px rgba(124,58,237,0.28)',
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
            )
                .fromTo(titleRef.current,
                    { opacity: 0, y: 35 },
                    { opacity: 1, y: 0, duration: 0.8 }, '-=0.4'
                )
                .fromTo(subtitleRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7 }, '-=0.4'
                )
                .fromTo('.not-found-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.3'
                );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{
            background: '#050212', minHeight: '100vh',
            color: '#e2d9f3', fontFamily: "'Inter', sans-serif",
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '6rem 1.5rem', position: 'relative',
            overflow: 'hidden', textAlign: 'center',
        }}
        >
            <StarField />
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(219,39,119,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '820px' }}>
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 3.5rem', flexShrink: 0 }}>
                    <OrbitRing size={220} duration={22} dotColor="#c084fc" opacity={0.18} />
                    <OrbitRing size={160} duration={15} reverse dotColor="#f472b6" opacity={0.2} />
                    <OrbitRing size={100} duration={9} dotColor="#67e8f9" opacity={0.25} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(192,132,252,0.2) 60%, transparent 80%)',
                        boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ fontSize: '1.6rem', display: 'inline-block', filter: 'drop-shadow(0 0 10px rgba(192,132,252,0.9))' }}>✦</motion.span>
                    </div>
                </div>
                <div ref={codeRef}>
                    <div style={{ fontSize: 'clamp(6rem, 18vw, 11rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.9, letterSpacing: '-0.04em', background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(192,132,252,0.5) 50%, rgba(124,58,237,0.3) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', userSelect: 'none', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.4))' }}>404</div>
                </div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }} style={{
                    width: '80px', height: '2px', margin: '0 auto 1.75rem',
                    background: 'linear-gradient(90deg, transparent, #c084fc, transparent)',
                    borderRadius: '2px',
                }}
                />
                <h1 ref={titleRef} style={{
                    fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 800,
                    fontFamily: "'Cormorant Garamond', serif",
                    lineHeight: 1.2, marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #ffffff 30%, #c084fc)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}
                >Not Found!
                </h1>
                <p ref={subtitleRef} style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.85,
                    color: 'rgba(200,185,230,0.6)', maxWidth: '440px',
                    margin: '0 auto 3.5rem', fontWeight: 400,
                }}
                >
                    Even the stars occasionally wander off their charted paths.
                    The page you're seeking doesn't exist — but your journey needn't end here.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(124,58,237,0.6)' }} whileTap={{ scale: 0.97 }} style={{
                            padding: '0.85rem 2.2rem',
                            background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                            border: 'none', borderRadius: '50px',
                            color: '#fff', fontSize: '0.95rem', fontWeight: 700,
                            cursor: 'pointer', letterSpacing: '0.04em',
                            boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                        }}
                        >Return Home ✦
                        </motion.button>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(139,92,246,0.28)' }} whileTap={{ scale: 0.97 }} style={{
                            padding: '0.85rem 2.2rem',
                            background: 'transparent',
                            border: '1px solid rgba(139,92,246,0.4)',
                            borderRadius: '50px', color: 'rgba(200,185,230,0.8)',
                            fontSize: '0.95rem', fontWeight: 500,
                            cursor: 'pointer', letterSpacing: '0.04em',
                        }}
                        >Contact Us
                        </motion.button>
                    </Link>
                </div>
                <div ref={cardsRef}>
                    <div style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.4))' }} />Or navigate to
                        <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, rgba(192,132,252,0.4), transparent)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
                        {NAV_SUGGESTIONS.map((nav) => (
                            <Link key={nav.path} to={nav.path} style={{ textDecoration: 'none' }}>
                                <motion.div className="not-found-card" variants={cardVariants} initial="rest" whileHover="hover" style={{
                                    background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(192,132,252,0.03))',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    borderRadius: '18px', padding: '1.4rem 1.2rem',
                                    cursor: 'pointer', willChange: 'transform',
                                    textAlign: 'center',
                                }}
                                >
                                    <div style={{
                                        fontSize: '1.5rem', marginBottom: '0.6rem',
                                        filter: 'drop-shadow(0 0 8px rgba(192,132,252,0.5))',
                                    }}>{nav.icon}</div>
                                    <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{nav.label}</div>
                                    <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>{nav.desc}</div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} style={{
                    marginTop: '4rem', color: 'rgba(200,185,230,0.25)',
                    fontSize: '0.78rem', letterSpacing: '0.08em',
                    fontStyle: 'italic',
                }}
                >"Not all who wander are lost — but this URL certainly is." ✦
                </motion.p>
            </div>
        </div>
    );
}
