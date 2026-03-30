import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CelestialField, SectionLabel, ServiceCard } from './widgets';
import { SERVICES, STATS, TESTIMONIALS, WHATSAPP_URL, HOW_IT_WORKS, WHY_ME, testimonialVariants } from './values';

gsap.registerPlugin(ScrollTrigger);

function OrrerySection() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.orrery-title',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.to('.orbit-ring-1', { rotation: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
            gsap.to('.orbit-ring-2', { rotation: -360, duration: 28, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
            gsap.to('.orbit-ring-3', { rotation: 360, duration: 42, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
            gsap.to('.orbit-symbol-a', { scale: 1.2, opacity: 0.7, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to('.orbit-symbol-b', { scale: 1.15, opacity: 0.65, duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
            gsap.to('.orbit-symbol-c', { scale: 1.25, opacity: 0.6, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
            gsap.to('.orrery-core', {
                boxShadow: '0 0 60px 20px rgba(167,139,250,0.35), 0 0 120px 40px rgba(167,139,250,0.12)',
                duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
            gsap.fromTo('.orrery-pillar',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: '.orrery-pillars', start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const disciplines = [
        { symbol: '𝕹', name: 'Numerology', sub: 'The science of numbers', color: '#7c5cbf' },
        { symbol: '⌂', name: 'Vastu', sub: 'The science of space', color: '#6896c8' },
        { symbol: '☿', name: 'Jyotish', sub: 'The science of light', color: '#a78bfa' },
    ];

    return (
        <section ref={ref} style={{ padding: '8rem 1.5rem', background: 'linear-gradient(180deg, #fdf8ff 0%, rgba(245,240,255,0.5) 50%, #faf9f7 100%)', position: 'relative', overflow: 'hidden' }}>
            {[...Array(18)].map((_, i) => <div key={i} style={{ position: 'absolute', width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, borderRadius: '50%', background: i % 3 === 0 ? 'rgba(167,139,250,0.5)' : i % 3 === 1 ? 'rgba(104,150,200,0.4)' : 'rgba(196,181,253,0.45)', top: `${10 + (i * 17 % 80)}%`, left: `${5 + (i * 23 % 90)}%`, animation: `twinkle ${2.5 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />)}
            <style>{`@keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }`}</style>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="orrery-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <SectionLabel>The Three Sciences</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Ancient Systems. Modern Clarity.</h2>
                    <p style={{ color: '#4a6080', fontSize: '0.97rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.8 }}>Three distinct disciplines, each a precise lens — together forming a complete map of your life's patterns.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem', position: 'relative' }}>
                    <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                        <svg className="orbit-ring-3" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 320 320">
                            <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(104,150,200,0.18)" strokeWidth="1" strokeDasharray="4 8" />
                            <text x="160" y="14" textAnchor="middle" fontSize="18" fill="rgba(104,150,200,0.65)" className="orbit-symbol-c">⌂</text>
                        </svg>
                        <svg className="orbit-ring-2" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 320 320">
                            <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(167,139,250,0.22)" strokeWidth="1" strokeDasharray="3 6" />
                            <text x="160" y="54" textAnchor="middle" fontSize="16" fill="rgba(167,139,250,0.7)" className="orbit-symbol-b">☿</text>
                        </svg>
                        <svg className="orbit-ring-1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 320 320">
                            <circle cx="160" cy="160" r="68" fill="none" stroke="rgba(124,92,191,0.3)" strokeWidth="1.5" strokeDasharray="2 5" />
                            <text x="160" y="94" textAnchor="middle" fontSize="15" fill="rgba(124,92,191,0.75)" className="orbit-symbol-a">𝕹</text>
                        </svg>
                        <div className="orrery-core" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(196,181,253,0.12))', border: '1.5px solid rgba(167,139,250,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 0 40px 10px rgba(167,139,250,0.2)' }}>✦</div>
                    </div>
                </div>
                <div className="orrery-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {disciplines.map((d) => (
                        <motion.div key={d.name} className="orrery-pillar" whileHover={{ y: -6, borderColor: `${d.color}44`, boxShadow: `0 18px 48px ${d.color}18` }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.16)', borderRadius: '22px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(124,92,191,0.06)', willChange: 'transform' }}>
                            <div style={{ fontSize: '3rem', color: d.color, marginBottom: '0.85rem', filter: `drop-shadow(0 4px 12px ${d.color}44)` }}>{d.symbol}</div>
                            <div style={{ color: '#1e3a5f', fontWeight: 800, fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.3rem' }}>{d.name}</div>
                            <div style={{ color: '#7a94b0', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{d.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function NumerologyStrip() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            const counters = el.querySelectorAll('.num-digit');
            counters.forEach((c) => {
                const target = parseInt(c.dataset.target, 10);
                gsap.fromTo(c,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play reset play reset' },
                    }
                );
            });
            gsap.to('.num-ticker', {
                xPercent: -50,
                duration: 22,
                repeat: -1,
                ease: 'none',
            });
            gsap.to('.num-hero-digit', {
                y: -12, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
            gsap.fromTo('.num-reveal',
                { opacity: 0, y: 35 },
                {
                    opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const tickerSymbols = ['1', '7', '☿', '3', '✦', '9', '𝕹', '4', '☽', '8', '△', '6', '◈', '2', '5', '☉', '11', '22'];
    const ticker = [...tickerSymbols, ...tickerSymbols];

    return (
        <section ref={ref} style={{ padding: '0', background: 'linear-gradient(135deg, #1a2d4a, #2d1f55)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ borderBottom: '1px solid rgba(167,139,250,0.2)', padding: '1.1rem 0', overflow: 'hidden' }}>
                <div className="num-ticker" style={{ display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {ticker.map((s, i) => <span key={i} style={{ color: i % 4 === 0 ? 'rgba(167,139,250,0.7)' : i % 4 === 1 ? 'rgba(104,150,200,0.6)' : i % 4 === 2 ? 'rgba(196,181,253,0.55)' : 'rgba(255,255,255,0.25)', fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '0.05em' }}>{s}</span>)}
                </div>
            </div>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="num-hero-digit" style={{ fontSize: 'clamp(8rem, 20vw, 14rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, background: 'linear-gradient(135deg, rgba(167,139,250,0.9), rgba(196,181,253,0.5), rgba(104,150,200,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 40px rgba(167,139,250,0.3))' }}>7</div>
                    <div style={{ color: 'rgba(167,139,250,0.7)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.75rem' }}>The Seeker's Number</div>
                </div>
                <div>
                    <div className="num-reveal" style={{ marginBottom: '1rem' }}>
                        <SectionLabel>Numerology</SectionLabel>
                    </div>
                    <h3 className="num-reveal" style={{ color: '#f0eeff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.25, marginBottom: '1.25rem' }}>Your date of birth contains a blueprint. I help you read it.</h3>
                    <p className="num-reveal" style={{ color: 'rgba(200,210,230,0.85)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '2rem' }}>Every name, every number, every date holds a frequency. Numerology decodes these patterns — revealing your core strengths, your recurring cycles, and your most aligned decisions.</p>
                    <div className="num-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            { label: 'Sessions Delivered', target: 1000, suffix: '+' },
                            { label: 'Countries Reached', target: 14, suffix: '' },
                            { label: 'Avg Session Length', target: 60, suffix: ' min' },
                            { label: 'Years of Practice', target: 8, suffix: '+' },
                        ].map((s) => (
                            <div key={s.label} style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                                    <span className="num-digit" data-target={s.target} style={{ color: '#c4b5fd', fontSize: '1.6rem', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>0</span>
                                    <span style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: 700 }}>{s.suffix}</span>
                                </div>
                                <div style={{ color: 'rgba(180,190,220,0.75)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(167,139,250,0.2)', padding: '1.1rem 0', overflow: 'hidden' }}>
                <div className="num-ticker" style={{ display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {[...ticker].reverse().map((s, i) => <span key={i} style={{ color: i % 3 === 0 ? 'rgba(104,150,200,0.55)' : i % 3 === 1 ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.18)', fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{s}</span>)}
                </div>
            </div>
        </section>
    );
}

function SacredGeometryDivider() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.to('.yantra-hex', { rotation: 360, duration: 60, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
            gsap.to('.yantra-tri', { rotation: -360, duration: 40, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
            gsap.to('.yantra-star', {
                scale: 1.08, opacity: 0.8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%',
            });
            gsap.to('.yantra-petal', {
                opacity: 0.5, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.3,
            });
            gsap.fromTo('.yantra-text',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} style={{ padding: '6rem 1.5rem', background: '#faf9f7', borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', overflow: 'hidden' }}>
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => <ellipse key={i} className="yantra-petal" cx={140 + 100 * Math.cos((angle * Math.PI) / 180)} cy={140 + 100 * Math.sin((angle * Math.PI) / 180)} rx="18" ry="30" transform={`rotate(${angle} ${140 + 100 * Math.cos((angle * Math.PI) / 180)} ${140 + 100 * Math.sin((angle * Math.PI) / 180)})`} fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.22)" strokeWidth="1" />)}
                <circle cx="140" cy="140" r="116" stroke="rgba(167,139,250,0.18)" strokeWidth="1" strokeDasharray="3 7" />
                <polygon className="yantra-hex" points="140,55 213,97.5 213,182.5 140,225 67,182.5 67,97.5" stroke="rgba(104,150,200,0.35)" strokeWidth="1.2" fill="rgba(104,150,200,0.03)" />
                <polygon className="yantra-tri" points="140,65 207,175 73,175" stroke="rgba(124,92,191,0.45)" strokeWidth="1.2" fill="rgba(124,92,191,0.04)" />
                <polygon points="140,215 73,105 207,105" stroke="rgba(167,139,250,0.35)" strokeWidth="1.2" fill="rgba(167,139,250,0.03)" />
                <circle cx="140" cy="140" r="52" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
                <g className="yantra-star">
                    <circle cx="140" cy="140" r="4" fill="rgba(167,139,250,0.8)" />
                    {[0, 60, 120, 180, 240, 300].map((a, i) => <line key={i} x1="140" y1="140" x2={140 + 44 * Math.cos((a * Math.PI) / 180)} y2={140 + 44 * Math.sin((a * Math.PI) / 180)} stroke="rgba(167,139,250,0.4)" strokeWidth="1" />)}
                </g>
                <circle cx="140" cy="140" r="6" fill="rgba(167,139,250,0.6)" />
                <circle cx="140" cy="140" r="3" fill="#a78bfa" />
                <circle cx="140" cy="140" r="22" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="0.8" strokeDasharray="1 4" />
            </svg>
            <div style={{ textAlign: 'center', maxWidth: '540px' }}>
                <div className="yantra-text" style={{ color: '#7c5cbf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ From Blueprint to Clarity</div>
                <h3 className="yantra-text" style={{ color: '#1e3a5f', fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.3, marginBottom: '0.85rem' }}>Every life has a geometry. These sciences help you see it.</h3>
                <p className="yantra-text" style={{ color: '#4a6080', fontSize: '0.93rem', lineHeight: 1.85 }}>Numerology maps your numbers. Vastu aligns your space. Jyotish reads your time. Together, they form a complete picture — precise, structured, and grounded in logic.</p>
            </div>
        </section>
    );
}

export default function Home() {
    const ctaRef = useRef(null);
    const orbRef = useRef(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const statsRef = useRef(null);
    const { scrollY } = useScroll();
    const subtitleRef = useRef(null);
    const servicesRef = useRef(null);
    const orbY = useTransform(scrollY, [0, 600], [0, -100]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    const scrollToServices = () => servicesRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, delay: 0.3 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
                .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.stat-item',
                { opacity: 0, y: 30 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal-up').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reset play reset' },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#1e3a5f', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <motion.section ref={heroRef} style={{ opacity: heroOpacity, position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                {/* <StarField /> */}<CelestialField />
                <motion.div ref={orbRef} style={{ position: 'absolute', top: '5%', left: '50%', translateX: '-50%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, rgba(216,180,254,0.06) 50%, transparent 70%)', pointerEvents: 'none', y: orbY }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(251,207,232,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '15%', left: '-8%', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '2rem' }}>✦ Numerology · Vastu · Jyotish</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }}>
                        <span style={{ background: 'linear-gradient(135deg, #1e3a5f 20%, #7c5cbf 60%, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Clarity through calculation.</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #6896c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Alignment through insight.</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.85, color: '#4a6080', maxWidth: '560px', margin: '0 auto 2.5rem', fontWeight: 400 }}>Logical, structured guidance through Numerology, Vastu & Jyotish — designed to help you solve real-life challenges and make aligned decisions with confidence.</p>
                    <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(124,92,191,0.35)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.2rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(124,92,191,0.25)', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Chat on WhatsApp
                        </motion.a>
                        <motion.button onClick={scrollToServices} whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.1)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 2.2rem', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(167,139,250,0.4)', borderRadius: '50px', color: '#7c5cbf', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.2s', backdropFilter: 'blur(8px)' }}>Explore Services</motion.button>
                    </div>
                </div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'rgba(124,92,191,0.45)', fontSize: '0.7rem', letterSpacing: '0.1em', pointerEvents: 'none' }}>
                    <span>SCROLL</span>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(167,139,250,0.5), transparent)' }} />
                </motion.div>
            </motion.section>
            <section ref={statsRef} style={{ borderTop: '1px solid rgba(167,139,250,0.15)', borderBottom: '1px solid rgba(167,139,250,0.15)', background: 'rgba(245,240,255,0.6)', padding: '3.5rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <p style={{ textAlign: 'center', color: '#7a94b0', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '2.5rem', textTransform: 'uppercase' }}>Trusted by 1000+ clients across India · USA · UK · Germany · France · Dubai & beyond</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                        {STATS.map((s) => (
                            <div key={s.label} className="stat-item">
                                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.value}</div>
                                <div style={{ color: '#7a94b0', fontSize: '0.825rem', fontWeight: 500, letterSpacing: '0.06em', marginTop: '0.4rem', textTransform: 'uppercase' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section ref={servicesRef} style={{ padding: '7rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <SectionLabel>What I Offer</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Structured Guidance, Real Results</h2>
                    <p style={{ color: '#4a6080', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>Each service is built around clarity and actionable insight — not vague predictions.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
                </div>
            </section>
            <OrrerySection />
            <section style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.7), transparent)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>The Process</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Simple. Personalised. Focused on Results.</h2>
                        <p style={{ color: '#7a94b0', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.75 }}>Here is exactly what happens from the moment you reach out.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.5rem' }}>
                        {HOW_IT_WORKS.map((step, i) => (
                            <motion.div key={step.step} className="reveal-up" whileHover={{ y: -6, borderColor: 'rgba(167,139,250,0.4)', boxShadow: '0 16px 40px rgba(124,92,191,0.1)' }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '20px', padding: '2rem 1.75rem', position: 'relative', willChange: 'transform', boxShadow: '0 4px 20px rgba(124,92,191,0.05)' }}>
                                <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(124,92,191,0.12))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '1.25rem' }}>{step.step}</div>
                                <div style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</div>
                                <p style={{ color: '#4a6080', fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(124,92,191,0.3)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 18px rgba(124,92,191,0.22)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Start Your Consultation
                        </motion.a>
                    </div>
                </div>
            </section>
            <SacredGeometryDivider />
            <section style={{ padding: '7rem 1.5rem', background: '#fdf9ff' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div className="reveal-up">
                        <SectionLabel>Why Work With Me</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #1e3a5f 40%, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Logic Meets Ancient Wisdom</h2>
                        <p style={{ color: '#4a6080', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>I don't believe in creating dependency through fear or vague predictions. My approach is structured, grounded in real-life application, and always focused on giving you clarity — not confusion.</p>
                        {WHY_ME.map((f) => (
                            <div key={f.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c5cbf', fontSize: '1rem' }}>{f.icon}</div>
                                <div>
                                    <div style={{ color: '#1e3a5f', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{f.title}</div>
                                    <div style={{ color: '#7a94b0', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '340px', height: '420px', borderRadius: '24px', background: 'linear-gradient(145deg, rgba(245,240,255,0.9), rgba(255,255,255,0.95))', border: '1.5px solid rgba(167,139,250,0.2)', boxShadow: '0 30px 80px rgba(124,92,191,0.1), 0 2px 20px rgba(167,139,250,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                            <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 16px rgba(167,139,250,0.35))' }}>𝕹</div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>My Promise to You</div>
                                <div style={{ color: '#4a6080', fontSize: '0.875rem', lineHeight: 1.75 }}>"My goal is not to tell you what will happen. It is to help you understand your patterns, make better decisions, and move forward with clarity."</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.25), transparent 70%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(186,230,253,0.3), transparent 70%)', pointerEvents: 'none' }} />
                        </motion.div>
                    </div>
                </div>
            </section>
            <NumerologyStrip />
            <section style={{ padding: '7rem 1.5rem', background: 'rgba(245,240,255,0.4)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Client Experiences</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Real People. Real Clarity.</h2>
                        <p style={{ color: '#7a94b0', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.75 }}>Clarity creates confidence. Here is what that looks like in real lives.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {TESTIMONIALS.map((t) => (
                            <motion.div key={t.name} className="reveal-up" variants={testimonialVariants} initial="rest" whileHover="hover" transition={{ duration: 0.3, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '20px', padding: '2rem', cursor: 'default', willChange: 'transform', boxShadow: '0 4px 24px rgba(124,92,191,0.06)' }}>
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>{Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: '#fbbf24', fontSize: '0.9rem' }}>★</span>)}</div>
                                <p style={{ color: '#4a6080', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>{t.avatar}</div>
                                    <div>
                                        <div style={{ color: '#1e3a5f', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                                        <div style={{ color: '#7a94b0', fontSize: '0.78rem' }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '5rem 1.5rem 7rem' }}>
                <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,92,191,0.18)' }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(135deg, rgba(245,240,255,0.95), rgba(255,248,255,0.98))', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,92,191,0.08)' }}>
                        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.3), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(186,230,253,0.25), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 12px rgba(167,139,250,0.4))' }}>✦</div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Still unsure? Start with a conversation.</h2>
                        <p style={{ color: '#4a6080', fontSize: '1rem', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 2.5rem' }}>You don't need to have everything figured out. Just reach out, share what's on your mind, and we'll take it from there.</p>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(124,92,191,0.4)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 22px rgba(124,92,191,0.3)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Chat on WhatsApp
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}