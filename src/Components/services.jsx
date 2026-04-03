import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, CelestialField } from './widgets';
import { OUR_SERVICES, PROCESS_STEPS, WHATSAPP_URL } from './values';

gsap.registerPlugin(ScrollTrigger);

function AstroTicker() {
    const tickerRef = useRef(null);

    useEffect(() => {
        const el = tickerRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.to('.services-ticker-inner', {
                xPercent: -50,
                duration: 26,
                repeat: -1,
                ease: 'none',
            });
        }, el);
        return () => ctx.revert();
    }, []);

    const items = [
        '☿ Jyotish', '𝕹 Numerology', '⌂ Vastu', '✦ Birth Chart',
        '△ Name Correction', '◈ Property Analysis', '☽ Transit Reading',
        '☉ Life Path', '∞ Relationship Numbers', '⎈ Space Energetics',
        '☿ Jyotish', '𝕹 Numerology', '⌂ Vastu', '✦ Birth Chart',
        '△ Name Correction', '◈ Property Analysis', '☽ Transit Reading',
        '☉ Life Path', '∞ Relationship Numbers', '⎈ Space Energetics',
    ];

    return (
        <div ref={tickerRef} style={{ borderTop: '1px solid rgba(167,139,250,0.18)', borderBottom: '1px solid rgba(167,139,250,0.18)', background: 'rgba(245,240,255,0.55)', padding: '0.85rem 0', overflow: 'hidden' }}>
            <div className="services-ticker-inner" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
                {items.map((item, i) => <span key={i} style={{ color: i % 3 === 0 ? '#7c5cbf' : i % 3 === 1 ? '#4a6080' : 'rgba(124,92,191,0.45)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.92rem' }}>{item}</span>)}
            </div>
        </div>
    );
}

function VastuCompassSection() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.vastu-heading',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.to('.vastu-outer-ring', {
                rotation: 360, duration: 80, repeat: -1, ease: 'none', transformOrigin: '50% 50%',
            });
            gsap.to('.vastu-mid-ring', {
                rotation: -360, duration: 50, repeat: -1, ease: 'none', transformOrigin: '50% 50%',
            });
            gsap.to('.vastu-needle', {
                rotation: 8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
                transformOrigin: '50% 100%',
            });
            gsap.to('.vastu-core-glow', {
                opacity: 0.5, scale: 1.15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
                transformOrigin: '50% 50%',
            });
            gsap.fromTo('.vastu-dir',
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1, stagger: 0.12, duration: 0.6, ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.fromTo('.vastu-zone',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: '.vastu-zones', start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const directions = [
        { label: 'N', angle: 0, color: '#4a6080' },
        { label: 'NE', angle: 45, color: '#7c5cbf' },
        { label: 'E', angle: 90, color: '#6896c8' },
        { label: 'SE', angle: 135, color: '#a78bfa' },
        { label: 'S', angle: 180, color: '#4a6080' },
        { label: 'SW', angle: 225, color: '#7c5cbf' },
        { label: 'W', angle: 270, color: '#6896c8' },
        { label: 'NW', angle: 315, color: '#a78bfa' },
    ];

    const zones = [
        { dir: 'North-East (Ishan)', element: 'Water', purpose: 'Wisdom, clarity, spiritual growth' },
        { dir: 'South-East (Agneya)', element: 'Fire', purpose: 'Energy, finance, career momentum' },
        { dir: 'South-West (Nairutya)', element: 'Earth', purpose: 'Stability, relationships, grounding' },
        { dir: 'North-West (Vayavya)', element: 'Air', purpose: 'Support, communication, movement' },
        { dir: 'Centre (Brahmasthan)', element: 'Space', purpose: 'Balance point — never obstruct' },
    ];

    return (
        <section ref={ref} style={{ padding: '8rem 1.5rem', background: 'linear-gradient(180deg, #fdf9ff 0%, rgba(245,240,255,0.6) 100%)', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="vastu-heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <SectionLabel>Vastu Shastra</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Every space has a direction. Every direction has a purpose.</h2>
                    <p style={{ color: '#4a6080', fontSize: '0.97rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85 }}>Vastu is the ancient science of spatial alignment — mapping the energies of your home or workplace to the cardinal directions, and correcting imbalances without structural changes.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                            <div className="vastu-core-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)', pointerEvents: 'none' }} />
                            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                                <circle className="vastu-outer-ring" cx="150" cy="150" r="138" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="4 10" />
                                <circle className="vastu-mid-ring" cx="150" cy="150" r="100" stroke="rgba(104,150,200,0.25)" strokeWidth="1" strokeDasharray="3 7" />
                                <circle cx="150" cy="150" r="62" stroke="rgba(124,92,191,0.3)" strokeWidth="1.2" fill="rgba(167,139,250,0.04)" />
                                {directions.map((d) => {
                                    const rad = (d.angle - 90) * Math.PI / 180;
                                    const x1 = 150 + 108 * Math.cos(rad);
                                    const y1 = 150 + 108 * Math.sin(rad);
                                    const x2 = 150 + 122 * Math.cos(rad);
                                    const y2 = 150 + 122 * Math.sin(rad);
                                    const lx = 150 + 138 * Math.cos(rad);
                                    const ly = 150 + 138 * Math.sin(rad);
                                    return (
                                        <g key={d.label}>
                                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={d.color} strokeWidth={d.label.length === 1 ? 2 : 1} />
                                            <text x={lx} y={ly + 4} textAnchor="middle" fontSize={d.label.length === 1 ? '11' : '8'} fontWeight={d.label.length === 1 ? '700' : '500'} fill={d.color} className="vastu-dir" fontFamily="'Cormorant Garamond', serif">{d.label}</text>
                                        </g>
                                    );
                                })}
                                <line x1="150" y1="52" x2="150" y2="248" stroke="rgba(167,139,250,0.12)" strokeWidth="0.8" />
                                <line x1="52" y1="150" x2="248" y2="150" stroke="rgba(167,139,250,0.12)" strokeWidth="0.8" />
                                <g className="vastu-needle">
                                    <polygon points="150,78 154,150 150,158 146,150" fill="url(#needleGrad)" />
                                    <polygon points="150,222 154,150 150,142 146,150" fill="rgba(104,150,200,0.4)" />
                                </g>
                                <circle cx="150" cy="150" r="8" fill="rgba(245,240,255,1)"
                                    stroke="rgba(124,92,191,0.5)" strokeWidth="1.5" />
                                <circle cx="150" cy="150" r="3.5" fill="#7c5cbf" />
                                <defs>
                                    <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7c5cbf" />
                                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="vastu-zones" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {zones.map((z) => (
                            <motion.div key={z.dir} className="vastu-zone" whileHover={{ x: 6, borderColor: 'rgba(167,139,250,0.4)', boxShadow: '0 8px 30px rgba(124,92,191,0.08)' }} transition={{ duration: 0.22, ease: 'easeOut' }} style={{
                                padding: '1rem 1.25rem',
                                background: '#ffffff',
                                border: '1.5px solid rgba(167,139,250,0.15)',
                                borderRadius: '14px',
                                willChange: 'transform',
                                boxShadow: '0 2px 12px rgba(124,92,191,0.04)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '0.9rem' }}>{z.dir}</span>
                                    <span style={{ color: '#7c5cbf', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.15rem 0.6rem', borderRadius: '20px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>{z.element}</span>
                                </div>
                                <p style={{ color: '#4a6080', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{z.purpose}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function JyotishPlanetStrip() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.jyotish-heading',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.fromTo('.planet-card',
                { opacity: 0, y: 50, scale: 0.92 },
                {
                    opacity: 1, y: 0, scale: 1,
                    stagger: { each: 0.1, ease: 'power2.inOut' },
                    duration: 0.7, ease: 'back.out(1.4)',
                    scrollTrigger: { trigger: '.planet-row', start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.utils.toArray('.planet-symbol').forEach((sym, i) => {
                gsap.to(sym, {
                    y: -8, duration: 2.2 + i * 0.3, repeat: -1, yoyo: true,
                    ease: 'sine.inOut', delay: i * 0.2,
                });
            });
            gsap.fromTo('.orbit-line',
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 1.4, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                    transformOrigin: 'left center',
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const planets = [
        { symbol: '☉', name: 'Surya', role: 'Soul & identity', color: '#e8a020', glow: 'rgba(232,160,32,0.2)' },
        { symbol: '☽', name: 'Chandra', role: 'Mind & emotions', color: '#8fb8d8', glow: 'rgba(143,184,216,0.2)' },
        { symbol: '♂', name: 'Mangal', role: 'Drive & courage', color: '#c04040', glow: 'rgba(192,64,64,0.2)' },
        { symbol: '☿', name: 'Budha', role: 'Intellect & speech', color: '#4a9870', glow: 'rgba(74,152,112,0.2)' },
        { symbol: '♃', name: 'Guru', role: 'Wisdom & expansion', color: '#9070c0', glow: 'rgba(144,112,192,0.2)' },
        { symbol: '♀', name: 'Shukra', role: 'Beauty & pleasure', color: '#c070a0', glow: 'rgba(192,112,160,0.2)' },
        { symbol: '♄', name: 'Shani', role: 'Karma & discipline', color: '#6080a0', glow: 'rgba(96,128,160,0.2)' },
        { symbol: 'ℝ', name: 'Rahu', role: 'Desire & illusion', color: '#507070', glow: 'rgba(80,112,112,0.2)' },
        { symbol: 'ℂ', name: 'Ketu', role: 'Liberation & past life', color: '#806050', glow: 'rgba(128,96,80,0.2)' },
    ];

    return (
        <section ref={ref} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, #1a2d4a 0%, #1f1a3a 100%)', position: 'relative', overflow: 'hidden' }}>
            {[...Array(30)].map((_, i) => <div key={i} style={{ position: 'absolute', width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', top: `${5 + (i * 13 % 90)}%`, left: `${2 + (i * 19 % 96)}%`, animation: `starPulse ${2 + (i % 4)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s`, pointerEvents: 'none' }} />)}
            <style>{`@keyframes starPulse { 0%,100%{opacity:0.2} 50%{opacity:0.9} }`}</style>
            <div className="orbit-line" style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div className="jyotish-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <SectionLabel>Jyotish — Vedic Astrology</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #c4b5fd, #a78bfa, #6896c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Nine planets. One unique blueprint.</h2>
                    <p style={{ color: 'rgba(196,200,220,0.85)', fontSize: '0.97rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85 }}>Your birth chart is a snapshot of the sky at the exact moment you were born — a precise map of planetary positions that shapes your strengths, patterns, and timing.</p>
                </div>
                <div className="planet-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                    {planets.map((p, i) => (
                        <motion.div key={p.name} className="planet-card" whileHover={{ y: -10, boxShadow: `0 20px 40px ${p.glow}`, borderColor: `${p.color}55` }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '18px', padding: '1.5rem 1rem', textAlign: 'center', cursor: 'default', willChange: 'transform', backdropFilter: 'blur(8px)' }}>
                            <div className="planet-symbol" style={{ fontSize: '2.2rem', color: p.color, marginBottom: '0.75rem', filter: `drop-shadow(0 0 10px ${p.glow})`, display: 'block' }}>{p.symbol}</div>
                            <div style={{ color: 'rgba(220,225,240,0.95)', fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', marginBottom: '0.25rem' }}>{p.name}</div>
                            <div style={{ color: 'rgba(160,175,200,0.75)', fontSize: '0.72rem', lineHeight: 1.5 }}>{p.role}</div>
                        </motion.div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                    <p style={{ color: 'rgba(180,190,220,0.7)', fontSize: '0.83rem', letterSpacing: '0.06em', fontStyle: 'italic' }}>✦ A complete Jyotish reading analyses all nine planets, twelve houses, and their mutual interactions in your chart</p>
                </div>
            </div>
        </section>
    );
}

function ServiceGridCard({ service, index, onSelect, isActive }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 55 },
                {
                    delay: index * 0.09,
                    scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play reset play reset' },
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} onClick={() => onSelect(service)} whileHover={{ y: -10, borderColor: 'rgba(167,139,250,0.45)', boxShadow: `0 20px 56px ${service.glowColor}`, transition: { duration: 0.3, ease: 'easeOut' } }} style={{
            background: service.gradient, border: `1.5px solid ${isActive ? service.borderHover : 'rgba(167,139,250,0.18)'}`, borderRadius: '22px', padding: '2rem', cursor: 'pointer', willChange: 'transform', position: 'relative', overflow: 'hidden', boxShadow: isActive
                ? `0 8px 40px ${service.glowColor}, 0 0 0 1.5px ${service.accentColor}22`
                : '0 4px 24px rgba(124,92,191,0.06)', transition: 'box-shadow 0.3s, border-color 0.3s',
        }}>
            {isActive && <motion.div layoutId="active-dot" style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: '8px', height: '8px', borderRadius: '50%', background: service.accentColor, boxShadow: `0 0 8px ${service.accentColor}` }} />}
            <div style={{ fontSize: '2.4rem', marginBottom: '1.1rem', filter: `drop-shadow(0 4px 10px ${service.glowColor})` }}>{service.icon}</div>
            <h3 style={{ color: '#1e3a5f', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.02em' }}>{service.label}</h3>
            <p style={{ color: service.accentColor, fontSize: '0.78rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '0.85rem', opacity: 0.85 }}>{service.tagline}</p>
            <p style={{ color: '#4a6080', fontSize: '0.83rem', lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{service.desc}</p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: service.accentColor, fontSize: '0.82rem', fontWeight: 600 }}>View details <span style={{ fontSize: '0.9rem' }}>→</span></div>
        </motion.div>
    );
}

const panelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.07, delayChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const panelChildVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
};

function ServiceDetailPanel({ service, onClose }) {
    const panelRef = useRef(null);
    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [service.id]);

    return (
        <motion.div ref={panelRef} key={service.id} variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ background: service.gradient, border: `1.5px solid ${service.borderHover}`, borderRadius: '28px', padding: 'clamp(2rem, 4vw, 3.5rem)', position: 'relative', overflow: 'hidden', boxShadow: `0 24px 64px ${service.glowColor}`, marginTop: '3rem' }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`, pointerEvents: 'none', opacity: 0.35 }} />
            <motion.button whileHover={{ scale: 1.1, background: 'rgba(167,139,250,0.15)' }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(167,139,250,0.08)', border: '1.5px solid rgba(167,139,250,0.22)',
                color: '#7c5cbf', fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
            }}>x</motion.button>
            <motion.div variants={panelChildVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.75rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', flexShrink: 0, background: `linear-gradient(135deg, ${service.accentColor}22, ${service.accentColor}0a)`, border: `1.5px solid ${service.accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', filter: `drop-shadow(0 4px 12px ${service.glowColor})` }}>{service.icon}</div>
                <div>
                    <h3 style={{ color: '#1e3a5f', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.2rem' }}>{service.label}</h3>
                    <p style={{ color: service.accentColor, fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.9 }}>{service.tagline}</p>
                </div>
            </motion.div>
            <motion.p variants={panelChildVariants} style={{ color: '#4a6080', fontSize: '0.93rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>{service.desc}</motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                <motion.div variants={panelChildVariants}>
                    <h4 style={{ color: service.accentColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>Consultation Offerings</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {service.offerings.map((o) => (
                            <motion.div key={o.name} whileHover={{ x: 4, borderColor: `${service.accentColor}44` }} transition={{ duration: 0.2 }} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '0.85rem 1.1rem',
                                background: 'rgba(255,255,255,0.7)',
                                border: '1.5px solid rgba(167,139,250,0.15)',
                                borderRadius: '12px', gap: '1rem',
                                willChange: 'transform', backdropFilter: 'blur(6px)',
                            }}>
                                <div>
                                    <div style={{ color: '#1e3a5f', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.15rem' }}>{o.name}</div>
                                    <div style={{ color: '#7a94b0', fontSize: '0.75rem' }}>{o.duration}</div>
                                </div>
                                <div style={{ color: service.accentColor, fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', padding: '0.2rem 0.65rem', borderRadius: '20px', background: `${service.accentColor}12`, border: `1px solid ${service.accentColor}28` }}>{o.price}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <motion.div variants={panelChildVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h4 style={{ color: service.accentColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>What You'll Gain</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {service.benefits.map((b) => (
                                <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, background: `${service.accentColor}12`, border: `1px solid ${service.accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.accentColor, fontSize: '0.6rem', marginTop: '0.1rem' }}>✦</div>
                                    <span style={{ color: '#4a6080', fontSize: '0.875rem', lineHeight: 1.7 }}>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '18px', backdropFilter: 'blur(8px)' }}>
                        <div style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>Interested in this?</div>
                        <div style={{ color: '#7a94b0', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>Reach out on WhatsApp — I'll understand your requirement and suggest the best approach for you.</div>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${service.glowColor}` }} whileTap={{ scale: 0.97 }} style={{ width: '100%', padding: '0.8rem', background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}bb)`, borderRadius: '12px', color: '#fff', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Enquire on WhatsApp
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

const FAQS = [
    {
        q: 'How do I book a consultation?',
        a: "The easiest way is through WhatsApp. Just send a message, briefly describe your concern, and I'll suggest the right consultation for you. Payment details (UPI/NEFT) are shared after we align on the service.",
    },
    {
        q: 'How does a session take place?',
        a: 'All sessions are 60 minutes long and conducted via Zoom or WhatsApp — whichever you prefer. They are focused, structured, and personalised to your specific situation.',
    },
    {
        q: 'Do I need to know my exact birth time?',
        a: "For Jyotish (birth chart readings), an accurate birth time greatly enhances precision — ideally within 15 minutes. For Numerology and Vastu, birth time is not required.",
    },
    {
        q: 'What is your approach to consultations?',
        a: "I don't believe in vague predictions or creating dependency. Every session is structured and logical — focused on helping you understand what's happening and what to do next.",
    },
    {
        q: 'Can clients outside India book a session?',
        a: 'Yes. I have guided clients across India, USA, UK, Croatia, Germany, France, Mongolia, and Dubai. All sessions happen online, so location is never a barrier.',
    },
    {
        q: 'Is my personal information kept confidential?',
        a: 'Absolutely. All personal details shared during a consultation are kept strictly confidential and are never shared with any third party.',
    },
];

function FAQAccordion() {
    const [open, setOpen] = useState(null);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, i) => (
                <motion.div key={i} className="reveal-up" style={{ border: `1.5px solid ${open === i ? 'rgba(167,139,250,0.35)' : 'rgba(167,139,250,0.15)'}`, borderRadius: '16px', overflow: 'hidden', background: open === i ? 'rgba(245,240,255,0.7)' : '#ffffff', transition: 'background 0.25s, border-color 0.25s', boxShadow: open === i ? '0 4px 24px rgba(124,92,191,0.08)' : 'none' }}>
                    <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '1.2rem 1.5rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                        <span style={{ color: '#1e3a5f', fontSize: '0.93rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
                        <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: '#7c5cbf', fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                                <div style={{ padding: '0 1.5rem 1.4rem', color: '#4a6080', fontSize: '0.875rem', lineHeight: 1.8 }}>{faq.a}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}

export default function Services() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef();
    const processRef = useRef(null);
    const subtitleRef = useRef(null);
    const [activeService, setActiveService] = useState(null);

    useEffect(() => {
        ScrollTrigger.refresh();
    }, [activeService]);

    const handleSelectService = (service) => setActiveService((prev) => (prev?.id === service.id ? null : service));
    const handleClose = () => setActiveService(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .fromTo(titleRef.current, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, delay: 0.25 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.5');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal-up').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 45 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const el = processRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.process-step',
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{ background: '#faf9f7', minHeight: '100vh', color: '#1e3a5f', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                <CelestialField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ What I Offer</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #1e3a5f 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Structured Guidance.</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #6896c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Real-World Results.</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', lineHeight: 1.85, color: '#4a6080', maxWidth: '540px', margin: '0 auto', fontWeight: 400 }}>Numerology, Vastu, and Jyotish — each one a precise, logical lens designed to help you solve real challenges and make aligned decisions with confidence.</p>
                </div>
            </section>
            <AstroTicker />
            <section style={{ padding: '5rem 1.5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <SectionLabel>Choose Your Path</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.6rem' }}>Select a service to explore</h2>
                    <p style={{ color: '#7a94b0', fontSize: '0.9rem' }}>Click any card for full details, offerings, and pricing.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {OUR_SERVICES.map((s, i) => <ServiceGridCard key={s.id} service={s} index={i} onSelect={handleSelectService} isActive={activeService?.id === s.id} />)}
                </div>
                <AnimatePresence mode="wait" onExitComplete={() => { requestAnimationFrame(() => { ScrollTrigger.refresh(); }); }}>{activeService && <ServiceDetailPanel key={activeService.id} service={activeService} onClose={handleClose} />}</AnimatePresence>
            </section>
            <VastuCompassSection />
            <JyotishPlanetStrip />
            <section ref={processRef} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.7), transparent)', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <SectionLabel>Your Consultation Journey</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Simple. Personalised. Focused on Results.</h2>
                        <p style={{ color: '#7a94b0', fontSize: '0.92rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.75 }}>Here is exactly what happens from the moment you reach out.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(167,139,250,0.15)', borderRadius: '24px', overflow: 'hidden', border: '1.5px solid rgba(167,139,250,0.18)' }}>
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div key={step.num} className="process-step" whileHover={{ background: 'rgba(245,240,255,0.95)' }} transition={{ duration: 0.25 }} style={{ padding: '2.5rem 2rem', background: '#ffffff', position: 'relative' }}>
                                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(196,181,253,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '1rem', userSelect: 'none' }}>{step.num}</div>
                                <div style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</div>
                                <div style={{ color: '#4a6080', fontSize: '0.85rem', lineHeight: 1.75 }}>{step.desc}</div>
                                {i < PROCESS_STEPS.length - 1 && <div style={{ position: 'absolute', top: '50%', right: '-1px', transform: 'translateY(-50%)', width: '1px', height: '50%', background: 'linear-gradient(180deg, transparent, rgba(167,139,250,0.3), transparent)' }} />}
                            </motion.div>
                        ))}
                    </div>
                    <div className="reveal-up" style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        {[
                            { icon: '◈', text: 'Clear communication throughout' },
                            { icon: '✦', text: 'No generic readings — ever' },
                            { icon: '☽', text: 'Practical, usable guidance' },
                            { icon: '△', text: 'A safe, non-judgmental space' },
                        ].map((e) => (
                            <div key={e.text} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '1rem 1.25rem', background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.15)', borderRadius: '14px', boxShadow: '0 2px 12px rgba(124,92,191,0.04)' }}>
                                <span style={{ color: '#7c5cbf', fontSize: '0.9rem', flexShrink: 0 }}>{e.icon}</span>
                                <span style={{ color: '#4a6080', fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.5 }}>{e.text}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(124,92,191,0.3)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2.2rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 18px rgba(124,92,191,0.22)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Start Your Consultation on WhatsApp
                        </motion.a>
                    </div>
                </div>
            </section>
            <section style={{ padding: '2rem 1.5rem 7rem' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Common Questions</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Before You Reach Out</h2>
                    </div>
                    <FAQAccordion />
                </div>
            </section>
            <section style={{ padding: '0 1.5rem 8rem' }}>
                <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,92,191,0.15)' }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(135deg, rgba(245,240,255,0.95), rgba(255,248,255,0.98))', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,92,191,0.07)' }}>
                        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.28), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(186,230,253,0.25), transparent 70%)', pointerEvents: 'none' }} />
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '2.8rem', marginBottom: '1rem', display: 'inline-block', filter: 'drop-shadow(0 4px 10px rgba(167,139,250,0.35))' }}>☿</motion.div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.85rem' }}>Not Sure Where to Start?</h2>
                        <p style={{ color: '#4a6080', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 2.25rem' }}>Just start a conversation on WhatsApp. Share your concern or area of focus and I'll suggest the right consultation for you — no obligation, no pressure.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(124,92,191,0.4)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '0.97rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 22px rgba(124,92,191,0.3)' }}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Chat on WhatsApp
                            </motion.a>
                            <motion.a href="/about" whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.1)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2.5rem', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(167,139,250,0.35)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.97rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}>Learn About My Approach</motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}