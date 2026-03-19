import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { SectionLabel, StarField } from './widgets';
import { OUR_SERVICES, PROCESS_STEPS } from './values';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
    rest: { y: 0, borderColor: 'rgba(139,92,246,0.2)' },
    hover: { y: -10, borderColor: 'rgba(192,132,252,0.45)', transition: { duration: 0.3, ease: 'easeOut' } },
};

function ServiceGridCard({ service, index, onSelect, isActive }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 55 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                    delay: index * 0.09,
                    scrollTrigger: { trigger: el, start: 'top 89%' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} variants={cardVariants} initial="rest" whileHover="hover" onClick={() => onSelect(service)} style={{
            background: service.gradient,
            border: `1px solid ${isActive ? service.borderHover : 'rgba(139,92,246,0.2)'}`,
            borderRadius: '22px', padding: '2rem',
            cursor: 'pointer', willChange: 'transform',
            position: 'relative', overflow: 'hidden',
            outline: isActive ? `1px solid ${service.accentColor}33` : 'none',
            boxShadow: isActive ? `0 0 40px ${service.glowColor}` : 'none',
            transition: 'box-shadow 0.3s, outline 0.3s',
        }}>
            {isActive && (
                <motion.div layoutId="active-dot" style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: '8px', height: '8px', borderRadius: '50%', background: service.accentColor, boxShadow: `0 0 10px ${service.accentColor}` }} />
            )}
            <div style={{ fontSize: '2.4rem', marginBottom: '1.1rem', filter: `drop-shadow(0 0 12px ${service.glowColor})` }}>{service.icon}</div>
            <h3 style={{ color: '#e2d9f3', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.02em' }}>{service.label}</h3>
            <p style={{ color: service.accentColor, fontSize: '0.78rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '0.85rem', opacity: 0.85 }}>{service.tagline}</p>
            <p style={{ color: 'rgba(200,185,230,0.6)', fontSize: '0.83rem', lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{service.desc}</p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: service.accentColor, fontSize: '0.82rem', fontWeight: 600 }}>View offerings <span style={{ fontSize: '0.9rem' }}>→</span>
            </div>
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
            border: `1px solid ${service.borderHover}`,
            borderRadius: '28px', padding: 'clamp(2rem, 4vw, 3.5rem)',
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 30px 80px ${service.glowColor}`,
            marginTop: '3rem',
        }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`, pointerEvents: 'none', opacity: 0.4 }} />
            <motion.button whileHover={{ scale: 1.1, background: 'rgba(139,92,246,0.25)' }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.25)',
                color: 'rgba(200,185,230,0.8)', fontSize: '1.1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
            }}
            >×
            </motion.button>
            <motion.div variants={panelChildVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.75rem' }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '18px', flexShrink: 0,
                    background: `linear-gradient(135deg, ${service.accentColor}33, ${service.accentColor}11)`,
                    border: `1px solid ${service.accentColor}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.2rem', filter: `drop-shadow(0 0 14px ${service.glowColor})`,
                }}>{service.icon}</div>
                <div>
                    <h3 style={{
                        color: '#e2d9f3', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        fontWeight: 800, fontFamily: "'Cormorant Garamond', serif",
                        marginBottom: '0.2rem',
                    }}>{service.label}</h3>
                    <p style={{ color: service.accentColor, fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.9 }}>{service.tagline}</p>
                </div>
            </motion.div>
            <motion.p variants={panelChildVariants} style={{
                color: 'rgba(200,185,230,0.72)', fontSize: '0.93rem',
                lineHeight: 1.9, marginBottom: '2.5rem',
            }}>{service.desc}
            </motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                <motion.div variants={panelChildVariants}>
                    <h4 style={{
                        color: service.accentColor, fontSize: '0.75rem', fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.1rem',
                    }}>Consultation Offerings</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {service.offerings.map((o) => (
                            <motion.div key={o.name} whileHover={{ x: 4, borderColor: `${service.accentColor}55` }} transition={{ duration: 0.2 }} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '0.85rem 1.1rem',
                                background: 'rgba(5,2,18,0.35)',
                                border: '1px solid rgba(139,92,246,0.18)',
                                borderRadius: '12px', gap: '1rem',
                                willChange: 'transform',
                            }}>
                                <div>
                                    <div style={{ color: '#e2d9f3', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.15rem' }}>{o.name}</div>
                                    <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>{o.duration}</div>
                                </div>
                                <div style={{
                                    color: service.accentColor, fontSize: '0.88rem', fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                    padding: '0.2rem 0.65rem', borderRadius: '20px',
                                    background: `${service.accentColor}15`,
                                    border: `1px solid ${service.accentColor}30`,
                                }}>{o.price}</div>
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
                                    <div style={{
                                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                        background: `${service.accentColor}20`,
                                        border: `1px solid ${service.accentColor}40`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: service.accentColor, fontSize: '0.6rem', marginTop: '0.1rem',
                                    }}>✦</div>
                                    <span style={{ color: 'rgba(200,185,230,0.72)', fontSize: '0.875rem', lineHeight: 1.7 }}>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '1.75rem', background: 'rgba(5,2,18,0.4)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '18px' }}>
                        <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>Ready to begin?</div>
                        <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>Book a session with one of our certified practitioners today.</div>
                        <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${service.glowColor}` }} whileTap={{ scale: 0.97 }} style={{
                            width: '100%', padding: '0.8rem',
                            background: `linear-gradient(135deg, ${service.accentColor}cc, ${service.accentColor}99)`,
                            border: 'none', borderRadius: '12px',
                            color: '#050212', fontSize: '0.9rem', fontWeight: 700,
                            cursor: 'pointer', letterSpacing: '0.04em',
                        }}
                        >Book This Service →
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const [activeService, setActiveService] = useState(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const processRef = useRef(null);

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
        <div style={{ background: '#050212', minHeight: '100vh', color: '#e2d9f3', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <StarField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(192,132,252,0.3)', background: 'rgba(124,58,237,0.12)', color: '#c084fc', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ What We Offer
                    </motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sacred Sciences</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Modern Lives</span>
                    </h1>
                    <p ref={subtitleRef} style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', lineHeight: 1.85,
                        color: 'rgba(200,185,230,0.65)', maxWidth: '540px',
                        margin: '0 auto', fontWeight: 400,
                    }}>Six ancient disciplines, practiced by certified masters — each one a precise lens through which your life's questions find clarity, direction, and meaning.
                    </p>
                </div>
            </section>
            <section style={{ padding: '4rem 1.5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {OUR_SERVICES.map((s, i) => <ServiceGridCard key={s.id} service={s} index={i} onSelect={handleSelectService} isActive={activeService?.id === s.id} />)}
                </div>
                <AnimatePresence mode="wait">
                    {activeService && <ServiceDetailPanel key={activeService.id} service={activeService} onClose={handleClose} />}
                </AnimatePresence>
            </section>
            <section ref={processRef} style={{
                padding: '7rem 1.5rem',
                background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.06), transparent)',
                borderTop: '1px solid rgba(139,92,246,0.1)',
            }}
            >
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <SectionLabel>The Process</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>How a Session Works</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1px',
                        background: 'rgba(139,92,246,0.12)',
                        borderRadius: '24px', overflow: 'hidden',
                        border: '1px solid rgba(139,92,246,0.18)',
                    }}>
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div key={step.num} className="process-step" whileHover={{ background: 'rgba(124,58,237,0.12)' }} transition={{ duration: 0.25 }} style={{
                                padding: '2.5rem 2rem',
                                background: 'rgba(5,2,18,0.6)',
                                position: 'relative',
                            }}
                            >
                                <div style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800,
                                    fontFamily: "'Cormorant Garamond', serif",
                                    background: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(139,92,246,0.08))',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    lineHeight: 1, marginBottom: '1rem',
                                    userSelect: 'none',
                                }}>{step.num}</div>
                                <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</div>
                                <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.85rem', lineHeight: 1.75 }}>{step.desc}</div>
                                {i < PROCESS_STEPS.length - 1 && (
                                    <div style={{ position: 'absolute', top: '50%', right: '-1px', transform: 'translateY(-50%)', width: '1px', height: '50%', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '2rem 1.5rem 7rem' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Common Questions</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Before You Book</h2>
                    </div>
                    <FAQAccordion />
                </div>
            </section>
            <section style={{ padding: '0 1.5rem 8rem' }}>
                <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,58,237,0.35)' }} transition={{ duration: 0.3 }} style={{
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.28), rgba(192,132,252,0.1))',
                        border: '1px solid rgba(139,92,246,0.35)',
                        borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)',
                        textAlign: 'center', position: 'relative', overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(124,58,237,0.18)',
                    }}
                    >
                        <div style={{
                            position: 'absolute', top: '-60px', right: '-60px',
                            width: '220px', height: '220px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(192,132,252,0.18), transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '2.8rem', marginBottom: '1rem', display: 'inline-block' }}>☿</motion.div>
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            marginBottom: '0.85rem',
                        }}>Not Sure Where to Start?</h2>
                        <p style={{ color: 'rgba(200,185,230,0.62)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 2.25rem' }}>
                            Book a free 20-minute discovery call. We'll understand your situation and recommend
                            the most relevant service for you — no obligation, no pressure.
                        </p>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.65)' }} whileTap={{ scale: 0.97 }} style={{
                            padding: '0.9rem 2.5rem',
                            background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                            border: 'none', borderRadius: '50px',
                            color: '#fff', fontSize: '0.97rem', fontWeight: 700,
                            cursor: 'pointer', letterSpacing: '0.04em',
                            boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                        }}
                        >
                            Book Free Discovery Call ✦
                        </motion.button>
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
                <motion.div key={i} className="reveal-up" style={{ border: `1px solid ${open === i ? 'rgba(192,132,252,0.35)' : 'rgba(139,92,246,0.18)'}`, borderRadius: '16px', overflow: 'hidden', background: open === i ? 'rgba(124,58,237,0.1)' : 'rgba(5,2,18,0.5)', transition: 'background 0.25s, border-color 0.25s' }}>
                    <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '1.2rem 1.5rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                        <span style={{ color: '#e2d9f3', fontSize: '0.93rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
                        <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: '#c084fc', fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                                <div style={{ padding: '0 1.5rem 1.4rem', color: 'rgba(200,185,230,0.65)', fontSize: '0.875rem', lineHeight: 1.8 }}>{faq.a}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}