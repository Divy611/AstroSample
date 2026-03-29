import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { PASTEL_COLORS, GLYPHS, GLYPH_COLORS } from "./values";
import { Link } from 'react-router-dom/cjs/react-router-dom';

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
    return <motion.div key={id} initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1, 0], x: deltaX, y: deltaY }} transition={{ duration, ease: 'easeIn', times: [0, 0.1, 0.7, 1] }} onAnimationComplete={onDone} style={{ position: 'absolute', top: startY, left: startX, width: `${trailLength}px`, height: `${thickness}px`, borderRadius: '999px', background: 'linear-gradient(90deg, rgba(196,181,253,0) 0%, rgba(167,139,250,0.5) 40%, rgba(251,207,232,0.9) 100%)', boxShadow: '0 0 6px 1px rgba(196,181,253,0.4), 0 0 12px 2px rgba(167,139,250,0.2)', rotate: `${angleDeg}deg`, transformOrigin: 'right center', pointerEvents: 'none', willChange: 'transform, opacity' }} />;
}

export function StarField() {
    const nextId = useRef(0);
    const timeoutRef = useRef(null);
    const [shootingStars, setShootingStars] = useState([]);

    const stars = useRef(
        Array.from({ length: 100 }, (_, i) => ({
            id: i,
            delay: Math.random() * 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 1.8 + 0.4,
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

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function resolveColor(template, alpha) {
    return template.replace('{a}', alpha.toFixed(2));
}

function GlyphParticle({ particle }) {
    return <motion.div animate={{ opacity: [0, particle.peakOpacity, particle.peakOpacity * 0.7, 0], y: [0, -particle.drift], rotate: [0, particle.spin], scale: [0.7, 1, 0.9, 0.7] }} transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.7, 1] }} style={{ position: 'absolute', top: particle.top, left: particle.left, fontSize: `${particle.size}rem`, color: resolveColor(particle.colorTemplate, particle.peakOpacity), pointerEvents: 'none', userSelect: 'none', willChange: 'transform, opacity', lineHeight: 1, textShadow: `0 0 ${particle.size * 8}px ${resolveColor(particle.colorTemplate, 0.3)}` }}>{particle.glyph}</motion.div>;
}

function AmbientRing({ ring }) {
    return <motion.div animate={{ opacity: [0, ring.peakOpacity, ring.peakOpacity * 0.5, 0], scale: [0.9, 1.05, 0.9], rotate: [0, ring.spin] }} transition={{ duration: ring.duration, delay: ring.delay, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: ring.top, left: ring.left, width: `${ring.size}px`, height: `${ring.size}px`, borderRadius: '50%', border: `1.5px solid ${resolveColor(ring.colorTemplate, ring.peakOpacity)}`, boxShadow: `0 0 ${ring.size * 0.08}px ${resolveColor(ring.colorTemplate, ring.peakOpacity * 0.5)}`, pointerEvents: 'none', willChange: 'transform, opacity', transform: 'translate(-50%, -50%)' }} />;
}

export function ShootingArc({ id, onDone }) {
    const startX = useRef(`${randomBetween(5, 80)}%`).current;
    const startY = useRef(`${randomBetween(5, 40)}%`).current;
    const angleDeg = useRef(randomBetween(20, 55)).current;
    const angleRad = (angleDeg * Math.PI) / 180;
    const distance = useRef(randomBetween(220, 380)).current;
    const deltaX = Math.cos(angleRad) * distance;
    const deltaY = Math.sin(angleRad) * distance;
    const length = useRef(randomBetween(80, 130)).current;
    const thickness = useRef(randomBetween(1.5, 2.5)).current;
    const duration = useRef(randomBetween(1.4, 2.4)).current;
    const isSaffron = useRef(Math.random() > 0.5).current;

    const trailGradient = isSaffron
        ? 'linear-gradient(90deg, rgba(217,119,6,0) 0%, rgba(217,119,6,0.45) 40%, rgba(245,158,11,0.95) 100%)'
        : 'linear-gradient(90deg, rgba(109,40,217,0) 0%, rgba(124,92,191,0.5) 40%, rgba(109,40,217,0.95) 100%)';
    const trailShadow = isSaffron
        ? '0 0 6px 2px rgba(217,119,6,0.45), 0 0 14px 3px rgba(245,158,11,0.2)'
        : '0 0 6px 2px rgba(109,40,217,0.45), 0 0 14px 3px rgba(124,92,191,0.2)';

    return <motion.div key={id} initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1, 0], x: deltaX, y: deltaY }} transition={{ duration, ease: 'easeIn', times: [0, 0.08, 0.72, 1] }} onAnimationComplete={onDone} style={{ position: 'absolute', top: startY, left: startX, width: `${length}px`, height: `${thickness}px`, borderRadius: '999px', background: trailGradient, boxShadow: trailShadow, rotate: `${angleDeg}deg`, transformOrigin: 'right center', pointerEvents: 'none', willChange: 'transform, opacity' }} />;
}

export function CelestialField() {
    const nextId = useRef(0);
    const timeoutRef = useRef(null);
    const [arcs, setArcs] = useState([]);//eslint-disable-line

    const glyphParticles = useRef(
        Array.from({ length: 48 }, (_, i) => ({
            id: i,
            delay: randomBetween(0, 9),
            drift: randomBetween(20, 60),
            spin: randomBetween(-30, 30),
            size: randomBetween(1.4, 3.2),
            duration: randomBetween(6, 14),
            top: `${randomBetween(2, 94)}%`,
            left: `${randomBetween(2, 94)}%`,
            glyph: GLYPHS[i % GLYPHS.length],
            peakOpacity: randomBetween(0.32, 0.58),
            colorTemplate: GLYPH_COLORS[i % GLYPH_COLORS.length],
        }))
    ).current;

    const rings = useRef(
        Array.from({ length: 10 }, (_, i) => ({
            id: i,
            delay: randomBetween(0, 12),
            spin: randomBetween(-45, 45),
            size: randomBetween(100, 280),
            duration: randomBetween(8, 20),
            top: `${randomBetween(8, 90)}%`,
            left: `${randomBetween(8, 90)}%`,
            peakOpacity: randomBetween(0.18, 0.38),
            colorTemplate: GLYPH_COLORS[i % GLYPH_COLORS.length],
        }))
    ).current;

    useEffect(() => {
        const scheduleNext = () => {
            const delay = randomBetween(3000, 8000);
            timeoutRef.current = setTimeout(() => {
                const id = nextId.current++;
                setArcs((prev) => (prev.length >= 3 ? prev : [...prev, id]));
                scheduleNext();
            }, delay);
        };
        scheduleNext();
        return () => clearTimeout(timeoutRef.current);
    }, []);

    //const removeArc = (id) => setArcs((prev) => prev.filter((a) => a !== id));

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {rings.map((r) => <AmbientRing key={r.id} ring={r} />)}
            {glyphParticles.map((p) => <GlyphParticle key={p.id} particle={p} />)}
            <AnimatePresence>
                {/* {arcs.map((id) => (
                    <ShootingArc key={id} id={id} onDone={() => removeArc(id)} />
                ))} */}
            </AnimatePresence>
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
        <motion.div ref={cardRef} initial="rest" whileHover={{ y: -8, borderColor: 'rgba(167,139,250,0.45)', boxShadow: `0 20px 60px ${service.glow}`, transition: { duration: 0.3, ease: 'easeOut' } }} style={{ background: service.gradient, border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 24px rgba(124,92,191,0.06)', willChange: 'transform' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 10px rgba(167,139,250,0.35))' }}>{service.icon}</div>
            <h3 style={{ color: '#2d2438', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{service.title}</h3>
            <p style={{ color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.75 }}>{service.desc}</p>
            <Link to='/services'>
                <motion.div whileHover={{ x: 4 }} style={{ marginTop: '1.25rem', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content' }}>Learn more <span>→</span></motion.div>
            </Link>
        </motion.div>
    );
}