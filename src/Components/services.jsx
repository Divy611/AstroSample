import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { OUR_SERVICES, PROCESS_STEPS } from './values';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, CelestialField } from './widgets';

gsap.registerPlugin(ScrollTrigger);

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
                    scrollTrigger: { trigger: el, start: 'top 89%' },
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} onClick={() => onSelect(service)} whileHover={{ y: -10, borderColor: 'rgba(167,139,250,0.45)', boxShadow: `0 20px 56px ${service.glowColor}`, transition: { duration: 0.3, ease: 'easeOut' } }} style={{
            background: service.gradient,
            border: `1.5px solid ${isActive ? service.borderHover : 'rgba(167,139,250,0.18)'}`,
            borderRadius: '22px', padding: '2rem',
            cursor: 'pointer', willChange: 'transform',
            position: 'relative', overflow: 'hidden',
            boxShadow: isActive
                ? `0 8px 40px ${service.glowColor}, 0 0 0 1.5px ${service.accentColor}22`
                : '0 4px 24px rgba(124,92,191,0.06)',
            transition: 'box-shadow 0.3s, border-color 0.3s',
        }}>
            {isActive && <motion.div layoutId="active-dot" style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: '8px', height: '8px', borderRadius: '50%', background: service.accentColor, boxShadow: `0 0 8px ${service.accentColor}` }} />}
            <div style={{ fontSize: '2.4rem', marginBottom: '1.1rem', filter: `drop-shadow(0 4px 10px ${service.glowColor})` }}>{service.icon}</div>
            <h3 style={{ color: '#2d2438', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.02em' }}>{service.label}</h3>
            <p style={{ color: service.accentColor, fontSize: '0.78rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '0.85rem', opacity: 0.85 }}>{service.tagline}</p>
            <p style={{ color: '#6b5c8a', fontSize: '0.83rem', lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{service.desc}</p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: service.accentColor, fontSize: '0.82rem', fontWeight: 600 }}>View offerings <span style={{ fontSize: '0.9rem' }}>→</span></div>
        </motion.div>
    );
}

const panelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.07, delayChildren: 0.1 } },
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
        <motion.div ref={panelRef} key={service.id} variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{
            background: service.gradient,
            border: `1.5px solid ${service.borderHover}`,
            borderRadius: '28px', padding: 'clamp(2rem, 4vw, 3.5rem)',
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 24px 64px ${service.glowColor}`,
            marginTop: '3rem',
        }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`, pointerEvents: 'none', opacity: 0.35 }} />
            <motion.button whileHover={{ scale: 1.1, background: 'rgba(167,139,250,0.15)' }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(167,139,250,0.08)',
                border: '1.5px solid rgba(167,139,250,0.22)',
                color: '#7c5cbf', fontSize: '1.1rem',
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
            }}>×</motion.button>
            <motion.div variants={panelChildVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.75rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', flexShrink: 0, background: `linear-gradient(135deg, ${service.accentColor}22, ${service.accentColor}0a)`, border: `1.5px solid ${service.accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', filter: `drop-shadow(0 4px 12px ${service.glowColor})` }}>{service.icon}</div>
                <div>
                    <h3 style={{ color: '#2d2438', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.2rem' }}>{service.label}</h3>
                    <p style={{ color: service.accentColor, fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.9 }}>{service.tagline}</p>
                </div>
            </motion.div>
            <motion.p variants={panelChildVariants} style={{ color: '#6b5c8a', fontSize: '0.93rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>{service.desc}</motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                <motion.div variants={panelChildVariants}>
                    <h4 style={{ color: service.accentColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>Consultation Offerings</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {service.offerings.map((o) => (
                            <motion.div key={o.name} whileHover={{ x: 4, borderColor: `${service.accentColor}44` }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.1rem', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(167,139,250,0.15)', borderRadius: '12px', gap: '1rem', willChange: 'transform', backdropFilter: 'blur(6px)' }}>
                                <div>
                                    <div style={{ color: '#2d2438', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.15rem' }}>{o.name}</div>
                                    <div style={{ color: '#9585b0', fontSize: '0.75rem' }}>{o.duration}</div>
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
                                    <span style={{ color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.7 }}>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '18px', backdropFilter: 'blur(8px)' }}>
                        <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>Ready to begin?</div>
                        <div style={{ color: '#9585b0', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>Book a session with one of our certified practitioners today.</div>
                        <motion.button whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${service.glowColor}` }} whileTap={{ scale: 0.97 }} style={{ width: '100%', padding: '0.8rem', background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}bb)`, border: 'none', borderRadius: '12px', color: '#fff', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>Book This Service →</motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const processRef = useRef(null);
    const subtitleRef = useRef(null);
    const [activeService, setActiveService] = useState(null);

    const handleSelectService = (service) => {
        setActiveService((prev) => (prev?.id === service.id ? null : service));
    };

    const handleClose = () => setActiveService(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, delay: 0.25 })
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
                        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 88%' },
                    }
                );
            });
        });
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
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#2d2438', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                {/* <StarField /> */}<CelestialField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(251,207,232,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ What We Offer</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #3d2b6b 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sacred Sciences</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Modern Lives</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', lineHeight: 1.85, color: '#6b5c8a', maxWidth: '540px', margin: '0 auto', fontWeight: 400 }}>Six ancient disciplines, practiced by certified masters — each one a precise lens through which your life's questions find clarity, direction, and meaning.</p>
                </div>
            </section>
            <section style={{ padding: '4rem 1.5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {OUR_SERVICES.map((s, i) => <ServiceGridCard key={s.id} service={s} index={i} onSelect={handleSelectService} isActive={activeService?.id === s.id} />)}
                </div>
                <AnimatePresence mode="wait">{activeService && <ServiceDetailPanel key={activeService.id} service={activeService} onClose={handleClose} />}</AnimatePresence>
            </section>
            <section ref={processRef} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.7), transparent)', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <SectionLabel>The Process</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>How a Session Works</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(167,139,250,0.15)', borderRadius: '24px', overflow: 'hidden', border: '1.5px solid rgba(167,139,250,0.18)' }}>
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div key={step.num} className="process-step" whileHover={{ background: 'rgba(245,240,255,0.95)' }} transition={{ duration: 0.25 }} style={{ padding: '2.5rem 2rem', background: '#ffffff', position: 'relative' }}>
                                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(196,181,253,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '1rem', userSelect: 'none' }}>{step.num}</div>
                                <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</div>
                                <div style={{ color: '#6b5c8a', fontSize: '0.85rem', lineHeight: 1.75 }}>{step.desc}</div>
                                {i < PROCESS_STEPS.length - 1 && <div style={{ position: 'absolute', top: '50%', right: '-1px', transform: 'translateY(-50%)', width: '1px', height: '50%', background: 'linear-gradient(180deg, transparent, rgba(167,139,250,0.3), transparent)' }} />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '2rem 1.5rem 7rem' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Common Questions</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Before You Book</h2>
                    </div>
                    <FAQAccordion />
                </div>
            </section>
            <section style={{ padding: '0 1.5rem 8rem' }}>
                <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,92,191,0.15)' }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(135deg, rgba(245,240,255,0.95), rgba(255,248,255,0.98))', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,92,191,0.07)' }}>
                        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.28), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,207,232,0.28), transparent 70%)', pointerEvents: 'none' }} />
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '2.8rem', marginBottom: '1rem', display: 'inline-block', filter: 'drop-shadow(0 4px 10px rgba(167,139,250,0.35))' }}>☿</motion.div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.85rem' }}>Not Sure Where to Start?</h2>
                        <p style={{ color: '#6b5c8a', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 2.25rem' }}>Book a free 20-minute discovery call. We'll understand your situation and recommend the most relevant service for you — no obligation, no pressure.</p>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(124,92,191,0.4)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '0.97rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 4px 22px rgba(124,92,191,0.3)' }}>Book Free Discovery Call ✦</motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

const FAQS = [
    { q: 'Do I need to know my exact birth time for a reading?', a: 'For Vedic Astrology and Kundli matching, an accurate birth time greatly enhances precision — ideally within 15 minutes. For Numerology, Tarot, and Vastu, birth time is not required.' },
    { q: 'Are sessions available online?', a: 'Yes. All consultations are available via Google Meet or Zoom. Written reports are delivered via email within 24 hours of the session.' },
    { q: 'How long does a typical session last?', a: 'Session durations vary by service — from 30 minutes for Muhurta queries to 3–4 hours for commercial Vastu consultations. Each offering\'s duration is listed clearly above.' },
    { q: 'Is my personal information kept confidential?', a: 'Absolutely. All birth details, personal disclosures, and chart data are encrypted and never shared with third parties under any circumstances.' },
    { q: 'Can I reschedule a booking?', a: 'Yes. Rescheduling is free if done at least 24 hours before your session. Cancellations within 24 hours are eligible for a 50% credit toward a future session.' },
];

function FAQAccordion() {
    const [open, setOpen] = useState(null);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, i) => (
                <motion.div key={i} className="reveal-up" style={{ border: `1.5px solid ${open === i ? 'rgba(167,139,250,0.35)' : 'rgba(167,139,250,0.15)'}`, borderRadius: '16px', overflow: 'hidden', background: open === i ? 'rgba(245,240,255,0.7)' : '#ffffff', transition: 'background 0.25s, border-color 0.25s', boxShadow: open === i ? '0 4px 24px rgba(124,92,191,0.08)' : 'none' }}>
                    <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '1.2rem 1.5rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                        <span style={{ color: '#2d2438', fontSize: '0.93rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
                        <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: '#7c5cbf', fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                                <div style={{ padding: '0 1.5rem 1.4rem', color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.8 }}>{faq.a}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}