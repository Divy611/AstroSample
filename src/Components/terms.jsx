import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TERMS_SECTIONS } from './values';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom/cjs/react-router-dom';

gsap.registerPlugin(ScrollTrigger);

function TermsSection({ section }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 35 },
                {
                    opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0, background: `${section.accentColor}10`, border: `1.5px solid ${section.accentColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: section.accentColor, filter: `drop-shadow(0 4px 8px ${section.accentColor}33)` }}>{section.icon}</div>
                <h2 style={{ color: '#2d2438', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.01em', margin: 0 }}>{section.title}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingLeft: '3.25rem' }}>
                {section.content.map((block, i) => (
                    <div key={i}>
                        <div style={{ color: section.accentColor, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{block.subtitle}</div>
                        <p style={{ color: '#6b5c8a', fontSize: '0.9rem', lineHeight: 1.85, margin: 0 }}>{block.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TermsAndConditions() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' } }).fromTo(titleRef.current, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }).fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#2d2438', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section style={{ position: 'relative', padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 45%, #fff8f5 100%)' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1.1rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>✦ Legal</motion.div>
                <h1 ref={titleRef} style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem', background: 'linear-gradient(135deg, #3d2b6b 30%, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Terms of Use</h1>
                <p ref={subtitleRef} style={{ color: '#6b5c8a', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.8 }}>Please read these terms carefully before using our services. By proceeding, you agree to be bound by them.</p>
                <p style={{ color: '#b8a8cc', fontSize: '0.78rem', letterSpacing: '0.06em' }}>Last updated: March 2026</p>
            </section>
            <section style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem 8rem' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(245,158,11,0.07)', border: '1.5px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '3rem' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>⚠</span>
                    <p style={{ color: '#6b5c8a', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>
                        <strong style={{ color: '#d97706' }}>Important: </strong>Our services are for entertainment and personal guidance only and do not constitute professional medical, legal, or financial advice. Please read Section 2 carefully.
                    </p>
                </div>
                <div style={{ background: 'rgba(245,240,255,0.7)', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '18px', padding: '1.5rem 2rem', marginBottom: '3.5rem', boxShadow: '0 4px 24px rgba(124,92,191,0.06)' }}>
                    <div style={{ color: '#7c5cbf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contents</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {TERMS_SECTIONS.map((s, i) => (
                            <a key={s.id} href={`#${s.id}`} style={{ textDecoration: 'none' }}>
                                <motion.span whileHover={{ color: '#7c5cbf', borderColor: 'rgba(167,139,250,0.4)' }} style={{ color: '#9585b0', fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.15)', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', display: 'inline-block' }}>{i + 1}. {s.title}</motion.span>
                            </a>
                        ))}
                    </div>
                </div>
                {TERMS_SECTIONS.map((section, i) => (
                    <div key={section.id} id={section.id}>
                        <TermsSection section={section} />
                        {i < TERMS_SECTIONS.length - 1 && <div style={{ height: '1px', margin: '0 0 3rem', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }} />}
                    </div>
                ))}
                <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(245,240,255,0.9), rgba(255,248,255,0.95))', border: '1.5px solid rgba(167,139,250,0.2)', borderRadius: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', boxShadow: '0 4px 28px rgba(124,92,191,0.07)' }}>
                    <div>
                        <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>Questions about these terms?</div>
                        <div style={{ color: '#9585b0', fontSize: '0.85rem' }}>Write to us at{' '}
                            <a href="mailto:legal@purplecelestia.in" style={{ color: '#7c5cbf', textDecoration: 'none', fontWeight: 600 }}>legal@purplecelestia.in</a>
                        </div>
                    </div>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(124,92,191,0.28)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.7rem 1.6rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>Contact Us →</motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}