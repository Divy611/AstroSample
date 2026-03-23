import gsap from "gsap";
import { PASTEL_COLORS } from "./values";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

function ShootingStar({ id, onDone }) {
    const startX = useRef(`${Math.random() * 80 + 5}%`).current;
    const startY = useRef(`${Math.random() * 30}%`).current;
    const angleDeg = useRef(Math.random() * 40 + 20).current;
    const angleRad = (angleDeg * Math.PI) / 180;
    const distance = useRef(Math.random() * 300 + 250).current;
    const deltaX = Math.cos(angleRad) * distance;
    const deltaY = Math.sin(angleRad) * distance;
    const trailLength = useRef(Math.random() * 80 + 60).current;
    const thickness = useRef(Math.random() * 1.5 + 0.5).current;
    const duration = useRef(Math.random() * 1.2 + 1.5).current;
    return (
        <motion.div key={id} initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1, 0], x: deltaX, y: deltaY }} transition={{ duration, ease: 'easeIn', times: [0, 0.1, 0.7, 1] }} onAnimationComplete={onDone} style={{
            position: 'absolute',
            top: startY,
            left: startX,
            width: `${trailLength}px`,
            height: `${thickness}px`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgba(196,181,253,0) 0%, rgba(167,139,250,0.5) 40%, rgba(251,207,232,0.9) 100%)',
            boxShadow: '0 0 6px 1px rgba(196,181,253,0.4), 0 0 12px 2px rgba(167,139,250,0.2)',
            rotate: `${angleDeg}deg`,
            transformOrigin: 'right center',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
        }} />
    );
}

export function StarField() {
    const nextId = useRef(0);
    const timeoutRef = useRef(null);
    const [shootingStars, setShootingStars] = useState([]);

    const stars = useRef(
        Array.from({ length: 100 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 1.8 + 0.4,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
            color: PASTEL_COLORS[i % PASTEL_COLORS.length],
        }))
    ).current;

    useEffect(() => {
        const scheduleNext = () => {
            const delay = Math.random() * 8000 + 5000;
            timeoutRef.current = setTimeout(() => {
                const id = nextId.current++;
                setShootingStars((prev) => {
                    if (prev.length >= 2) return prev;
                    return [...prev, id];
                });
                scheduleNext();
            }, delay);
        };
        scheduleNext();
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const removeStar = (id) => {
        setShootingStars((prev) => prev.filter((s) => s !== id));
    };

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {stars.map((s) => <motion.div key={s.id} animate={{ opacity: [0.05, 0.6, 0.05] }} transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: s.top, left: s.left, width: `${s.size}px`, height: `${s.size}px`, borderRadius: '50%', background: s.color }} />)}
            <AnimatePresence>{shootingStars.map((id) => <ShootingStar key={id} id={id} onDone={() => removeStar(id)} />)}</AnimatePresence>
        </div>
    );
}

export function SectionLabel({ children }) {
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span>✦</span> {children}
        </div>
    );
}


export function ServiceCard({ service, index }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                    delay: index * 0.08,
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={cardRef} initial="rest" whileHover={{ y: -8, borderColor: 'rgba(167,139,250,0.45)', boxShadow: `0 20px 60px ${service.glow}`, transition: { duration: 0.3, ease: 'easeOut' } }} style={{
            background: service.gradient,
            border: '1.5px solid rgba(167,139,250,0.18)',
            borderRadius: '20px',
            padding: '2rem',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(124,92,191,0.06)',
            willChange: 'transform',
        }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 10px rgba(167,139,250,0.35))' }}>{service.icon}</div>
            <h3 style={{ color: '#2d2438', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{service.title}</h3>
            <p style={{ color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.75 }}>{service.desc}</p>
            <motion.div whileHover={{ x: 4 }} style={{ marginTop: '1.25rem', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content' }}>Learn more <span>→</span></motion.div>
        </motion.div>
    );
}