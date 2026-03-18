import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StarField, SectionLabel, ServiceCard } from './widgets';
import { SERVICES, STATS, TESTIMONIALS, testimonialVariants } from './values';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const ctaRef = useRef(null);
    const orbRef = useRef(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const statsRef = useRef(null);
    const subtitleRef = useRef(null);
    const { scrollY } = useScroll();
    const orbY = useTransform(scrollY, [0, 600], [0, -100]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, delay: 0.3 })
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
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
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
                        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 88%' },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#050212', minHeight: '100vh', color: '#e2d9f3', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <motion.section ref={heroRef} style={{ opacity: heroOpacity, position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <StarField />
                <motion.div ref={orbRef} style={{ position: 'absolute', top: '10%', left: '50%', translateX: '-50%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, rgba(192,132,252,0.06) 50%, transparent 70%)', pointerEvents: 'none', y: orbY }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(219,39,119,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 1.5rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(192,132,252,0.3)', background: 'rgba(124,58,237,0.12)', color: '#c084fc', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '2rem' }}> ✦ Ancient Wisdom · Modern Clarity
                    </motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }} >
                        <span style={{ background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Discover Your</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cosmic Blueprint</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.8, color: 'rgba(200,185,230,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', fontWeight: 400 }}>Unlock the profound wisdom of Vedic Astrology, Numerology & Vastu Shastra — crafted by master practitioners for your unique journey.</p>
                    <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.6)' }} whileTap={{ scale: 0.97 }} style={{
                            padding: '0.85rem 2.2rem',
                            background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                            border: 'none', borderRadius: '50px',
                            color: '#fff', fontSize: '1rem', fontWeight: 600,
                            cursor: 'pointer', letterSpacing: '0.04em',
                            boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                        }}>Begin Your Journey ✦
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(139,92,246,0.25)' }} whileTap={{ scale: 0.97 }} style={{
                            padding: '0.85rem 2.2rem',
                            background: 'transparent',
                            border: '1px solid rgba(139,92,246,0.4)',
                            borderRadius: '50px', color: 'rgba(200,185,230,0.8)',
                            fontSize: '1rem', fontWeight: 500, cursor: 'pointer',
                            letterSpacing: '0.04em',
                        }}>Explore Services
                        </motion.button>
                    </div>
                </div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'rgba(192,132,252,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', pointerEvents: 'none' }}>
                    <span>SCROLL</span>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(192,132,252,0.5), transparent)' }} />
                </motion.div>
            </motion.section>
            <section ref={statsRef} style={{ borderTop: '1px solid rgba(139,92,246,0.15)', borderBottom: '1px solid rgba(139,92,246,0.15)', background: 'rgba(124,58,237,0.05)', padding: '3.5rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {STATS.map((s) => (
                        <div key={s.label} className="stat-item">
                            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, background: 'linear-gradient(135deg, #c084fc, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.value}</div>
                            <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.825rem', fontWeight: 500, letterSpacing: '0.06em', marginTop: '0.4rem', textTransform: 'uppercase' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <SectionLabel>Our Services</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #fff, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Sacred Sciences, Modern Guidance</h2>
                    <p style={{ color: 'rgba(200,185,230,0.6)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>Each service is rooted in millennia of Vedic tradition, delivered with contemporary precision.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.06), transparent)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div className="reveal-up">
                        <SectionLabel>Why Nakshatra</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #fff 40%, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Where Stars Meet Science
                        </h2>
                        <p style={{ color: 'rgba(200,185,230,0.65)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>Our practitioners hold decades of experience in traditional Vedic sciences, combining classical scholarship with empathetic modern guidance to deliver readings that are both accurate and transformative.</p>
                        {[
                            { icon: '✦', title: 'Certified Practitioners', desc: 'All consultants hold formal Jyotish & Vastu certifications.' },
                            { icon: '☽', title: 'Personalized Reports', desc: 'No generic readings — every report is unique to your birth data.' },
                            { icon: '◈', title: 'Confidential & Secure', desc: 'Your personal data is fully encrypted and never shared.' },
                        ].map((f) => (
                            <div key={f.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                                    background: 'rgba(124,58,237,0.15)',
                                    border: '1px solid rgba(139,92,246,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#c084fc', fontSize: '1rem',
                                }}>{f.icon}</div>
                                <div>
                                    <div style={{ color: '#e2d9f3', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{f.title}</div>
                                    <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{
                            width: '340px', height: '420px', borderRadius: '24px',
                            background: 'linear-gradient(145deg, rgba(124,58,237,0.25), rgba(192,132,252,0.08))',
                            border: '1px solid rgba(139,92,246,0.3)',
                            boxShadow: '0 30px 80px rgba(124,58,237,0.2)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: '1rem',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 30px rgba(192,132,252,0.6))' }}>♃</div>
                            <div style={{ textAlign: 'center', padding: '0 2rem' }}>
                                <div style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Jupiter Transit 2025</div>
                                <div style={{ color: 'rgba(200,185,230,0.7)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                                    Major expansions await those born under Sagittarius & Pisces ascendants this cycle.
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.2), transparent 70%)', pointerEvents: 'none' }} />
                        </motion.div>
                    </div>
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Testimonials</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #fff, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Voices of Transformation</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {TESTIMONIALS.map((t) => (
                            <motion.div key={t.name} className="reveal-up" variants={testimonialVariants} initial="rest" whileHover="hover" transition={{ duration: 0.3, ease: 'easeOut' }} style={{
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(192,132,252,0.04))',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                borderRadius: '20px', padding: '2rem',
                                cursor: 'default', willChange: 'transform',
                            }}
                            >
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {Array.from({ length: t.stars }).map((_, j) => (
                                        <span key={j} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
                                    ))}
                                </div>
                                <p style={{
                                    color: 'rgba(200,185,230,0.8)', fontSize: '0.9rem',
                                    lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic',
                                }}>"{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #7c3aed, #c084fc)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontWeight: 700, fontSize: '1rem',
                                        flexShrink: 0,
                                    }}>{t.avatar}</div>
                                    <div>
                                        <div style={{ color: '#e2d9f3', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                                        <div style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.78rem' }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '5rem 1.5rem' }}>
                <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,58,237,0.35)' }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(192,132,252,0.12))', border: '1px solid rgba(139,92,246,0.35)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,58,237,0.2)' }}>
                        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.2), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(192,132,252,0.5))' }}>✦</div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #fff, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Your Stars Are Aligned</h2>
                        <p style={{ color: 'rgba(200,185,230,0.65)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>Take the first step toward clarity. Book a personalized session with one of our master Vedic practitioners today.</p>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.65)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 0 28px rgba(124,58,237,0.45)' }}>Book a Free Consultation</motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}