import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CelestialField, SectionLabel } from './widgets';
import { READINGS, WHATSAPP_URL, CATEGORIES, FEATURED } from './values';

gsap.registerPlugin(ScrollTrigger);

function RuneDivider() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.rune-item',
                { opacity: 0, y: 30, scale: 0.85 },
                {
                    opacity: 1, y: 0, scale: 1,
                    stagger: 0.08, duration: 0.65, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.utils.toArray('.rune-item').forEach((rune, i) => {
                gsap.to(rune, {
                    y: -10 - (i % 3) * 4,
                    duration: 2.8 + i * 0.25,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.18,
                });
            });
            gsap.to('.rune-centre', {
                scale: 1.15,
                opacity: 0.75,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                transformOrigin: '50% 50%',
            });
            gsap.fromTo('.rune-line-l, .rune-line-r',
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 1.2, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const runes = [
        { sym: '𝕹', label: 'Numerology', color: '#7c5cbf' },
        { sym: '☽', label: 'Cycles', color: '#6896c8' },
        { sym: '△', label: 'Yantra', color: '#a78bfa' },
        { sym: '☿', label: 'Jyotish', color: '#7c5cbf' },
        { sym: '◈', label: 'Patterns', color: '#6896c8' },
        { sym: '⌂', label: 'Vastu', color: '#a78bfa' },
        { sym: '☉', label: 'Surya', color: '#7c5cbf' },
    ];

    return (
        <section ref={ref} style={{ padding: '5rem 1.5rem', background: 'linear-gradient(180deg, rgba(245,240,255,0.35) 0%, rgba(250,249,247,0.8) 100%)', borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="rune-line-l" style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4))', transformOrigin: 'left center' }} />
                    <div className="rune-centre" style={{ fontSize: '1.6rem', color: '#a78bfa', filter: 'drop-shadow(0 0 14px rgba(167,139,250,0.5))', flexShrink: 0 }}>✦</div>
                    <div className="rune-line-r" style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(167,139,250,0.4), transparent)', transformOrigin: 'right center' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                    {runes.map((r, i) => (
                        <div key={r.label} className="rune-item" style={{ textAlign: 'center', cursor: 'default' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: `${r.color}0e`, border: `1.5px solid ${r.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: r.color, filter: `drop-shadow(0 4px 12px ${r.color}33)`, margin: '0 auto 0.5rem', boxShadow: `0 4px 20px ${r.color}10` }}>{r.sym}</div>
                            <div style={{ color: '#7a94b0', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function KnowledgePillars() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.pillars-heading',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.utils.toArray('.pillar-bar').forEach((bar, i) => {
                const targetH = bar.dataset.height;
                gsap.fromTo(bar,
                    { height: '0px', opacity: 0 },
                    {
                        height: targetH, opacity: 1, duration: 1.2, ease: 'power3.out',
                        delay: i * 0.15,
                        scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play reset play reset' },
                    }
                );
            });
            gsap.fromTo('.pillar-label',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.utils.toArray('.pillar-bar').forEach((bar, i) => {
                gsap.to(bar, {
                    boxShadow: `0 0 30px 8px ${bar.dataset.glow}`,
                    duration: 2.5 + i * 0.4,
                    repeat: -1, yoyo: true, ease: 'sine.inOut',
                    delay: i * 0.3,
                });
            });
        }, el);
        return () => ctx.revert();
    }, []);

    const pillars = [
        { label: 'Numerology', articles: 42, height: '180px', color: '#7c5cbf', glow: 'rgba(124,92,191,0.15)', sym: '𝕹', desc: 'Numbers, name & life path' },
        { label: 'Vastu', articles: 28, height: '130px', color: '#6896c8', glow: 'rgba(104,150,200,0.15)', sym: '⌂', desc: 'Space, direction & energy' },
        { label: 'Jyotish', articles: 35, height: '158px', color: '#a78bfa', glow: 'rgba(167,139,250,0.15)', sym: '☿', desc: 'Planets, charts & cycles' },
        { label: 'Philosophy', articles: 18, height: '100px', color: '#4a6080', glow: 'rgba(74,96,128,0.15)', sym: '△', desc: 'Foundations & principles' },
    ];

    return (
        <section ref={ref} style={{ padding: '7rem 1.5rem', background: '#fdf9ff' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="pillars-heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <SectionLabel>Knowledge Base</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Every article is grounded in one of these four pillars.</h2>
                    <p style={{ color: '#4a6080', fontSize: '0.97rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85 }}>Not abstract theory — practical understanding you can apply to real decisions in your life.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', paddingBottom: '1rem', borderBottom: '1px solid rgba(167,139,250,0.15)' }}>
                    {pillars.map((p) => (
                        <div key={p.label} style={{ textAlign: 'center', width: '100px' }}>
                            <div className="pillar-label" style={{ color: p.color, fontSize: '1.4rem', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.5rem' }}>{p.articles}+</div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '190px' }}>
                                <div className="pillar-bar" data-height={p.height} data-glow={p.glow} style={{ width: '52px', height: '0px', borderRadius: '10px 10px 4px 4px', background: `linear-gradient(180deg, ${p.color}, ${p.color}55)`, border: `1px solid ${p.color}44`, position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>{p.sym}</div>
                                </div>
                            </div>
                            <div className="pillar-label" style={{ color: '#1e3a5f', fontSize: '0.82rem', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.2rem' }}>{p.label}</div>
                            <div className="pillar-label" style={{ color: '#7a94b0', fontSize: '0.7rem', lineHeight: 1.4 }}>{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedCard({ reading, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                    delay: index * 0.15,
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reset play reset' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.article ref={ref} whileHover={{ y: -8, boxShadow: `0 28px 70px ${reading.accentColor}22` }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '26px', overflow: 'hidden', cursor: 'pointer', willChange: 'transform', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(124,92,191,0.06)' }}>
            <div style={{ height: '4px', background: `linear-gradient(90deg, ${reading.accentColor}, ${reading.accentColor}44)` }} />
            <div style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0, background: `${reading.accentColor}12`, border: `1.5px solid ${reading.accentColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', filter: `drop-shadow(0 4px 8px ${reading.accentColor}44)` }}>{reading.icon}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                        <div style={{ display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '20px', background: `${reading.accentColor}12`, border: `1px solid ${reading.accentColor}28`, color: reading.accentColor, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{reading.category}</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.15rem 0.6rem', borderRadius: '20px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.22)', color: '#7c5cbf', fontSize: '0.68rem', fontWeight: 600 }}>✦ Featured</div>
                    </div>
                </div>
                <h3 style={{ color: '#1e3a5f', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 800, lineHeight: 1.35, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.85rem', letterSpacing: '0.01em' }}>{reading.title}</h3>
                <p style={{ color: '#4a6080', fontSize: '0.875rem', lineHeight: 1.8, flexGrow: 1, marginBottom: '1.5rem' }}>{reading.excerpt}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {reading.tags.map((tag) => <span key={tag} style={{ padding: '0.2rem 0.65rem', borderRadius: '20px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)', color: '#7a94b0', fontSize: '0.72rem', fontWeight: 500 }}>#{tag}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, background: reading.authorGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8rem', boxShadow: `0 2px 10px ${reading.accentColor}33` }}>{reading.authorInitial}</div>
                        <div>
                            <div style={{ color: '#1e3a5f', fontSize: '0.78rem', fontWeight: 600 }}>{reading.author}</div>
                            <div style={{ color: '#7a94b0', fontSize: '0.7rem' }}>{reading.date}</div>
                        </div>
                    </div>
                    <div style={{ color: '#7a94b0', fontSize: '0.75rem' }}>{reading.readTime}</div>
                </div>
            </div>
        </motion.article>
    );
}

const readingCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
};

function ReadingCard({ reading }) {
    return (
        <motion.article variants={readingCardVariants} layout whileHover={{ y: -6, borderColor: `${reading.accentColor}38`, boxShadow: `0 20px 55px ${reading.accentColor}14` }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.15)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', willChange: 'transform', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px rgba(124,92,191,0.05)' }}>
            <div style={{ height: '2px', background: `linear-gradient(90deg, ${reading.accentColor}77, transparent)` }} />
            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ padding: '0.18rem 0.65rem', borderRadius: '20px', background: `${reading.accentColor}10`, border: `1px solid ${reading.accentColor}25`, color: reading.accentColor, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{reading.category}</span>
                    <span style={{ fontSize: '1.4rem', filter: `drop-shadow(0 2px 6px ${reading.accentColor}44)` }}>{reading.icon}</span>
                </div>
                <h3 style={{ color: '#1e3a5f', fontSize: '1rem', fontWeight: 700, lineHeight: 1.45, marginBottom: '0.7rem', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.01em' }}>{reading.title}</h3>
                <p style={{ color: '#4a6080', fontSize: '0.835rem', lineHeight: 1.75, flexGrow: 1, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{reading.excerpt}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {reading.tags.slice(0, 2).map((tag) => <span key={tag} style={{ padding: '0.15rem 0.55rem', borderRadius: '20px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.15)', color: '#7a94b0', fontSize: '0.68rem' }}>#{tag}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(167,139,250,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: reading.authorGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.72rem' }}>{reading.authorInitial}</div>
                        <div style={{ color: '#7a94b0', fontSize: '0.72rem' }}>{reading.author.split(' ').slice(-1)[0]}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: '#7a94b0', fontSize: '0.7rem' }}>{reading.readTime}</span>
                        <motion.span whileHover={{ x: 3 }} style={{ color: reading.accentColor, fontSize: '0.85rem' }}>→</motion.span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.25 } },
};

function ArticleModal({ reading, onClose }) {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="exit" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(250,249,247,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '780px', background: '#ffffff', border: `1.5px solid ${reading.accentColor}33`, borderRadius: '28px', overflow: 'hidden', boxShadow: `0 40px 100px ${reading.accentColor}18, 0 0 0 1px rgba(167,139,250,0.1)`, marginTop: '4rem' }}>
                <div style={{ height: '4px', background: `linear-gradient(90deg, ${reading.accentColor}, ${reading.accentColor}33)` }} />
                <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                        <motion.button whileHover={{ scale: 1.1, background: 'rgba(167,139,250,0.12)' }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(167,139,250,0.07)', border: '1.5px solid rgba(167,139,250,0.22)', color: '#7c5cbf', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</motion.button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                        <span style={{ padding: '0.22rem 0.75rem', borderRadius: '20px', background: `${reading.accentColor}12`, border: `1px solid ${reading.accentColor}28`, color: reading.accentColor, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{reading.category}</span>
                        <span style={{ color: '#7a94b0', fontSize: '0.75rem' }}>·</span>
                        <span style={{ color: '#7a94b0', fontSize: '0.75rem' }}>{reading.readTime}</span>
                        <span style={{ color: '#7a94b0', fontSize: '0.75rem' }}>·</span>
                        <span style={{ color: '#7a94b0', fontSize: '0.75rem' }}>{reading.date}</span>
                    </div>
                    <h2 style={{ color: '#1e3a5f', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, lineHeight: 1.25, fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.5rem', letterSpacing: '0.01em' }}>{reading.title}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'rgba(245,240,255,0.7)', border: '1px solid rgba(167,139,250,0.15)', marginBottom: '2.5rem' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0, background: reading.authorGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1rem', boxShadow: `0 2px 12px ${reading.accentColor}33` }}>{reading.authorInitial}</div>
                        <div>
                            <div style={{ color: '#1e3a5f', fontWeight: 600, fontSize: '0.9rem' }}>{reading.author}</div>
                            <div style={{ color: '#7a94b0', fontSize: '0.75rem' }}>Practitioner · {reading.date}</div>
                        </div>
                    </div>
                    <div style={{ height: '1px', marginBottom: '2.5rem', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)' }} />
                    <div style={{ color: '#4a6080', fontSize: '1rem', lineHeight: 2, marginBottom: '2rem' }}>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', color: '#1e3a5f', fontWeight: 500 }}>{reading.excerpt}</p>
                        <p style={{ marginBottom: '1.5rem' }}>In the classical Vedic tradition, this phenomenon has been observed, documented, and applied across thousands of years of continuous practice. The ancient rishis were not merely stargazers — they were scientists of consciousness, mapping the relationship between numbers, spaces, and celestial events with extraordinary precision.</p>
                        <p style={{ marginBottom: '1.5rem' }}>My approach to every reading is the same: structured, logical, and grounded in real-life application. I don't believe in vague interpretations or creating dependency. The goal is always to help you understand what is happening and what to do next — with clarity and confidence.</p>
                        <div style={{ margin: '2.5rem 0', padding: '1.75rem 2rem', borderLeft: `4px solid ${reading.accentColor}`, background: `${reading.accentColor}08`, borderRadius: '0 16px 16px 0' }}>
                            <p style={{ color: '#1e3a5f', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.75, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>"My goal is not to tell you what will happen. It is to help you understand your patterns, make better decisions, and move forward with clarity and confidence."</p>
                            <div style={{ color: reading.accentColor, fontSize: '0.8rem', fontWeight: 600, marginTop: '0.75rem' }}>— {reading.author}</div>
                        </div>
                        <p>To explore how this applies specifically to your situation — whether through your numbers, your space, or your birth chart — the most effective next step is a personalised consultation. Every case is unique, and the nuances of your individual context will yield insights that no general article can fully provide.</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                        {reading.tags.map((tag) => <span key={tag} style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)', color: '#7a94b0', fontSize: '0.75rem' }}>#{tag}</span>)}
                    </div>
                    <div style={{ padding: '1.75rem 2rem', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(245,240,255,0.9), rgba(255,248,255,0.95))', border: '1.5px solid rgba(167,139,250,0.2)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                        <div>
                            <div style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>Want to explore this for yourself?</div>
                            <div style={{ color: '#7a94b0', fontSize: '0.83rem' }}>Start a conversation on WhatsApp — I'll guide you to the right session.</div>
                        </div>
                        <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${reading.accentColor}33` }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: `linear-gradient(135deg, ${reading.accentColor}, ${reading.accentColor}bb)`, borderRadius: '50px', color: '#fff', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Enquire on WhatsApp
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function NewsletterStrip() {
    const ref = useRef(null);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reset play reset' },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) setSubmitted(true);
    };

    return (
        <div ref={ref} style={{ background: 'linear-gradient(135deg, rgba(245,240,255,0.95), rgba(255,248,255,0.98))', border: '1.5px solid rgba(167,139,250,0.22)', borderRadius: '24px', padding: 'clamp(2rem, 4vw, 3rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 40px rgba(124,92,191,0.07)' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.25), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '420px' }}>
                <div style={{ color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Weekly Insights</div>
                <h3 style={{ color: '#1e3a5f', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.3, marginBottom: '0.5rem' }}>Clarity, Delivered Weekly</h3>
                <p style={{ color: '#4a6080', fontSize: '0.85rem', lineHeight: 1.7 }}>Practical insights on Numerology, Vastu, and Jyotish — written by me, delivered to your inbox. No fluff, no fear, just clarity.</p>
            </div>
            <AnimatePresence mode="wait">
                {submitted
                    ? <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', borderRadius: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.28)', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                        <span style={{ fontSize: '1.2rem' }}>✦</span> You're in. See you in your inbox.
                    </motion.div>
                    : <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={{ background: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '10px', padding: '0.7rem 1.1rem', color: '#1e3a5f', fontSize: '0.875rem', outline: 'none', minWidth: '220px', transition: 'border-color 0.2s' }} onFocus={(e) => (e.target.style.borderColor = 'rgba(124,92,191,0.55)')} onBlur={(e) => (e.target.style.borderColor = 'rgba(167,139,250,0.25)')} />
                        <motion.button whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(124,92,191,0.3)' }} whileTap={{ scale: 0.97 }} type="submit" style={{ padding: '0.7rem 1.5rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Subscribe ✦</motion.button>
                    </motion.form>
                }
            </AnimatePresence>
        </div>
    );
}

export default function Readings() {
    const gridRef = useRef(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [activeReading, setActiveReading] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredReadings = activeCategory === 'All'
        ? READINGS
        : READINGS.filter((r) => r.category === activeCategory);

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
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play reset play reset' },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#1e3a5f', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                {/*<StarField/>*/}<CelestialField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ Insights & Perspectives</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #1e3a5f 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Understand the Patterns.</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #6896c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Navigate with Clarity.</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', lineHeight: 1.85, color: '#4a6080', maxWidth: '540px', margin: '0 auto', fontWeight: 400 }}>Articles, guides, and perspectives on Numerology, Vastu, and Jyotish — written to help you understand, not overwhelm. No vague predictions. Just clarity.</p>
                </div>
            </section>
            <RuneDivider />
            <section style={{ padding: '5rem 1.5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="reveal-up" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <SectionLabel>Featured Reads</SectionLabel>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {FEATURED.map((r, i) => (
                        <div key={r.id} onClick={() => setActiveReading(r)} style={{ cursor: 'pointer' }}>
                            <FeaturedCard reading={r} index={i} />
                        </div>
                    ))}
                </div>
            </section>
            <KnowledgePillars />
            <section ref={gridRef} style={{ padding: '2rem 1.5rem 6rem', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
                <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem', paddingTop: '2rem' }}>
                    <div>
                        <SectionLabel>All Reads</SectionLabel>
                        <p style={{ color: '#7a94b0', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                            {filteredReadings.length} article{filteredReadings.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {CATEGORIES.map((cat) => (
                            <motion.button key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{
                                padding: '0.4rem 1rem', borderRadius: '30px',
                                background: activeCategory === cat
                                    ? 'linear-gradient(135deg, #7c5cbf, #a78bfa)'
                                    : 'rgba(167,139,250,0.07)',
                                border: activeCategory === cat ? 'none' : '1.5px solid rgba(167,139,250,0.2)',
                                color: activeCategory === cat ? '#fff' : '#4a6080',
                                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                                letterSpacing: '0.04em',
                                boxShadow: activeCategory === cat ? '0 4px 18px rgba(124,92,191,0.28)' : 'none',
                                transition: 'all 0.2s ease',
                            }}>{cat}</motion.button>
                        ))}
                    </div>
                </div>
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filteredReadings.map((r) => (
                            <div key={r.id} onClick={() => setActiveReading(r)} style={{ cursor: 'pointer' }}>
                                <ReadingCard reading={r} />
                            </div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                <AnimatePresence>
                    {filteredReadings.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '5rem 0', color: '#7a94b0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☽</div>
                            <div style={{ fontSize: '1rem' }}>No reads in this category yet.</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            {/*<section style={{ padding: '0 1.5rem 6rem', maxWidth: '1000px', margin: '0 auto' }}><NewsletterStrip /></section>*/}
            <AnimatePresence>{activeReading && <ArticleModal key={activeReading.id} reading={activeReading} onClose={() => setActiveReading(null)} />}</AnimatePresence>
        </div>
    );
}