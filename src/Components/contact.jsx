import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { SectionLabel, StarField } from './widgets';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_OPTIONS, SOCIAL_LINKS, FAQS, CONTACT_METHODS, CONSULTATION_TYPES } from './values';

gsap.registerPlugin(ScrollTrigger);

function FloatingInput({ label, type = 'text', value, onChange, required = false, as = 'input', rows = 4, options = [] }) {
    const [focused, setFocused] = useState(false);
    const isFloating = focused || value.length > 0;
    const baseStyle = {
        width: '100%', background: 'rgba(139,92,246,0.07)',
        border: `1px solid ${focused ? 'rgba(192,132,252,0.6)' : 'rgba(139,92,246,0.22)'}`,
        borderRadius: '12px', padding: as === 'textarea' ? '1.5rem 1rem 0.75rem' : '1.5rem 1rem 0.5rem',
        color: '#e2d9f3', fontSize: '0.9rem', outline: 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.15)' : 'none',
        fontFamily: "'Inter', sans-serif",
        resize: as === 'textarea' ? 'vertical' : undefined,
        minHeight: as === 'textarea' ? `${rows * 1.6}rem` : undefined,
        boxSizing: 'border-box',
        appearance: as === 'select' ? 'none' : undefined,
        WebkitAppearance: as === 'select' ? 'none' : undefined,
        cursor: as === 'select' ? 'pointer' : undefined,
    };

    const labelStyle = {
        position: 'absolute', left: '1rem',
        top: isFloating ? '0.45rem' : '50%',
        transform: as === 'textarea'
            ? isFloating ? 'none' : 'translateY(-50%)'
            : isFloating ? 'none' : 'translateY(-50%)',
        fontSize: isFloating ? '0.68rem' : '0.875rem',
        color: focused ? 'rgba(192,132,252,0.85)' : 'rgba(200,185,230,0.45)',
        pointerEvents: 'none',
        transition: 'all 0.2s ease',
        letterSpacing: isFloating ? '0.08em' : '0',
        fontWeight: isFloating ? 600 : 400,
        zIndex: 1,
    };

    return (
        <div style={{ position: 'relative' }}>
            <label style={labelStyle}>{label}{required && ' *'}</label>
            {as === 'textarea'
                ? <textarea value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} rows={rows} style={baseStyle} />
                : as === 'select'
                    ? <>
                        <select value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={baseStyle}>
                            <option value="" disabled style={{ background: '#0d0824' }} />
                            {options.map((o) => <option key={o} value={o} style={{ background: '#0d0824', color: '#e2d9f3' }}>{o}</option>)}
                        </select>
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(192,132,252,0.6)', fontSize: '0.7rem' }}>▾</div>
                    </>
                    : <input type={type} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={baseStyle} />
            }
        </div>
    );
}

function ContactMethodCard({ method, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
                    delay: index * 0.1,
                    scrollTrigger: { trigger: el, start: 'top 89%' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} whileHover={{ y: -6, borderColor: method.accentColor + '55', boxShadow: `0 18px 50px ${method.glowColor}` }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: method.gradient, border: '1px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1.1rem', willChange: 'transform', cursor: 'default' }}>
            <div style={{
                width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0,
                background: `${method.accentColor}18`,
                border: `1px solid ${method.accentColor}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', color: method.accentColor,
                filter: `drop-shadow(0 0 8px ${method.glowColor})`,
            }}>{method.icon}</div>
            <div>
                <div style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{method.label}</div>
                <div style={{ color: '#e2d9f3', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{method.value}</div>
                <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.78rem' }}>{method.sub}</div>
            </div>
        </motion.div>
    );
}

function FAQItem({ faq, index }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div style={{ border: `1px solid ${open ? 'rgba(192,132,252,0.3)' : 'rgba(139,92,246,0.18)'}`, borderRadius: '14px', overflow: 'hidden', background: open ? 'rgba(124,58,237,0.09)' : 'rgba(5,2,18,0.5)', transition: 'background 0.25s, border-color 0.25s' }}>
            <button onClick={() => setOpen((p) => !p)} style={{ width: '100%', padding: '1.1rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                <span style={{ color: '#e2d9f3', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} style={{ color: '#c084fc', fontSize: '1.35rem', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 1.4rem 1.25rem', color: 'rgba(200,185,230,0.62)', fontSize: '0.865rem', lineHeight: 1.8 }}>{faq.a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SuccessScreen({ name, onReset }) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'backOut' }} style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, duration: 0.5, ease: 'backOut' }} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(52,211,153,0.1))', border: '2px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', boxShadow: '0 0 40px rgba(16,185,129,0.3)' }}>✦</motion.div>
            <div>
                <h3 style={{ color: '#e2d9f3', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.5rem' }}>Message Received, {name.split(' ')[0]}</h3>
                <p style={{ color: 'rgba(200,185,230,0.6)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '340px', margin: '0 auto' }}>One of our practitioners will review your query and reach out within 24 hours.</p>
            </div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#c084fc', fontSize: '1.5rem', letterSpacing: '0.4rem' }}>✦ ✦ ✦</motion.div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onReset} style={{ marginTop: '0.5rem', padding: '0.65rem 1.75rem', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '50px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>Send Another Message
            </motion.button>
        </motion.div>
    );
}

function ContactForm() {
    const TOTAL_STEPS = 2;
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        service: '', consultationType: '',
        message: '', birthDate: '', birthPlace: '',
    });

    const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleConsultationType = (id) => {
        setForm((p) => ({ ...p, consultationType: id }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (step < TOTAL_STEPS) setStep((s) => s + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await new Promise((res) => setTimeout(res, 1400));
        setSubmitting(false);
        setSubmitted(true);
    };

    const handleReset = () => {
        setForm({ name: '', email: '', phone: '', service: '', consultationType: '', message: '', birthDate: '', birthPlace: '' });
        setStep(1);
        setSubmitted(false);
    };

    const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

    if (submitted) return <SuccessScreen name={form.name || 'Friend'} onReset={handleReset} />;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>STEP {step} OF {TOTAL_STEPS}</span>
                    <span style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 600 }}>{step === 1 ? 'Your Details' : 'Consultation Details'}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(139,92,246,0.15)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: progressWidth }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #7c3aed, #c084fc)',
                        borderRadius: '10px',
                    }} />
                </div>
            </div>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.form key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: 'easeOut' }} onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <FloatingInput label="Full Name" value={form.name} onChange={set('name')} required />
                        <FloatingInput label="Email Address" type="email" value={form.email} onChange={set('email')} required />
                        <FloatingInput label="Phone Number (optional)" type="tel" value={form.phone} onChange={set('phone')} />
                        <FloatingInput label="Service of Interest" as="select" value={form.service} onChange={set('service')} required options={SERVICES_OPTIONS} />
                        <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }} whileTap={{ scale: 0.97 }} type="submit" style={{ marginTop: '0.5rem', padding: '0.9rem', background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '0.93rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 0 22px rgba(124,58,237,0.35)' }}>Continue →
                        </motion.button>
                    </motion.form>
                )}
                {step === 2 && (
                    <motion.form key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: 'easeOut' }} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <div style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Preferred Consultation Format *</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                                {CONSULTATION_TYPES.map((ct) => {
                                    const isSelected = form.consultationType === ct.id;
                                    return (
                                        <motion.button key={ct.id} type="button" onClick={() => handleConsultationType(ct.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 0.75rem', background: isSelected ? 'rgba(124,58,237,0.25)' : 'rgba(139,92,246,0.07)', border: `1px solid ${isSelected ? 'rgba(192,132,252,0.5)' : 'rgba(139,92,246,0.2)'}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', boxShadow: isSelected ? '0 0 18px rgba(124,58,237,0.25)' : 'none', transition: 'all 0.2s ease' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                                <span style={{ color: isSelected ? '#c084fc' : 'rgba(200,185,230,0.5)', fontSize: '0.9rem' }}>{ct.icon}</span>
                                                <span style={{ color: isSelected ? '#e2d9f3' : 'rgba(200,185,230,0.7)', fontSize: '0.85rem', fontWeight: 700 }}>{ct.label}</span>
                                            </div>
                                            <div style={{ color: 'rgba(200,185,230,0.4)', fontSize: '0.72rem', paddingLeft: '1.4rem' }}>{ct.sub}</div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                        <AnimatePresence>
                            {(form.service === 'Vedic Astrology' || form.service === 'Kundli Matching') && (
                                <motion.div key="birth-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                                        <span style={{ color: '#c084fc', fontSize: '0.85rem', marginTop: '0.05rem' }}>✦</span>
                                        <span style={{ color: 'rgba(200,185,230,0.6)', fontSize: '0.8rem', lineHeight: 1.65 }}>For {form.service}, please share your birth details below for a more precise reading.</span>
                                    </div>
                                    <FloatingInput label="Date of Birth" type="date" value={form.birthDate} onChange={set('birthDate')} required />
                                    <FloatingInput label="Birth City / Place" value={form.birthPlace} onChange={set('birthPlace')} required />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <FloatingInput label="Your Message" as="textarea" rows={4} value={form.message} onChange={set('message')} required />
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                            <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ flex: '0 0 auto', padding: '0.9rem 1.4rem', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '12px', color: 'rgba(200,185,230,0.7)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>← Back</motion.button>
                            <motion.button whileHover={{ scale: !submitting ? 1.02 : 1, boxShadow: !submitting ? '0 0 30px rgba(124,58,237,0.5)' : 'none' }} whileTap={{ scale: !submitting ? 0.97 : 1 }} type="submit" disabled={submitting || !form.consultationType} style={{
                                flex: 1, padding: '0.9rem', background: submitting || !form.consultationType
                                    ? 'rgba(124,58,237,0.3)'
                                    : 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                                border: 'none', borderRadius: '12px',
                                color: submitting || !form.consultationType ? 'rgba(255,255,255,0.5)' : '#fff',
                                fontSize: '0.93rem', fontWeight: 700,
                                cursor: submitting || !form.consultationType ? 'not-allowed' : 'pointer',
                                letterSpacing: '0.04em',
                                boxShadow: !submitting && form.consultationType ? '0 0 22px rgba(124,58,237,0.35)' : 'none',
                                transition: 'all 0.2s ease',
                            }}>
                                {submitting
                                    ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>✦</motion.span> Sending…
                                    </span>
                                    : 'Send Message ✦'
                                }
                            </motion.button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Contact() {
    const faqRef = useRef(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
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
                        scrollTrigger: { trigger: el, start: 'top 89%' },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const el = faqRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-item',
                { opacity: 0, y: 25 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 86%' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#050212', minHeight: '100vh', color: '#e2d9f3', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{
                position: 'relative', minHeight: '58vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
            }}>
                <StarField count={50} />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '850px', height: '480px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '720px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(192,132,252,0.3)', background: 'rgba(124,58,237,0.12)', color: '#c084fc', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ Get in Touch</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Begin Your</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conversation</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.85, color: 'rgba(200,185,230,0.65)', maxWidth: '500px', margin: '0 auto', fontWeight: 400 }}>Whether you have a specific question or simply feel the pull of the stars, we are here to listen, guide, and illuminate.</p>
                </div>
            </section>
            <section style={{ padding: '2rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }}>
                    {CONTACT_METHODS.map((m, i) => <ContactMethodCard key={m.label} method={m} index={i} />)}
                </div>
            </section>
            <section style={{ padding: '0 1.5rem 7rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
                    <motion.div className="reveal-up" style={{ background: 'linear-gradient(160deg, rgba(13,8,36,0.95), rgba(8,5,26,0.98))', border: '1px solid rgba(139,92,246,0.22)', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(124,58,237,0.12)' }}>
                        <div style={{ padding: '2rem 2.5rem 1.75rem', borderBottom: '1px solid rgba(139,92,246,0.12)', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(192,132,252,0.04))' }}>
                            <SectionLabel>Send a Message</SectionLabel>
                            <h2 style={{ color: '#e2d9f3', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2 }}>Tell Us What You Seek</h2>
                        </div>
                        <div style={{ padding: '2rem 2.5rem 2.5rem' }}><ContactForm /></div>
                    </motion.div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <motion.div className="reveal-up" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(192,132,252,0.04))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '22px', padding: '2rem' }}>
                            <div style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ Office Hours</div>
                            {[
                                { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM IST' },
                                { day: 'Saturday', hours: '10:00 AM – 5:00 PM IST' },
                                { day: 'Sunday', hours: 'Closed (Emergency by WhatsApp)' },
                            ].map((row, i) => (
                                <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.7rem 0', borderBottom: i < 2 ? '1px solid rgba(139,92,246,0.1)' : 'none', gap: '1rem' }}>
                                    <span style={{ color: 'rgba(200,185,230,0.65)', fontSize: '0.85rem' }}>{row.day}</span>
                                    <span style={{ color: '#e2d9f3', fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>{row.hours}</span>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div className="reveal-up" whileHover={{ borderColor: 'rgba(52,211,153,0.4)', boxShadow: '0 10px 40px rgba(16,185,129,0.15)' }} transition={{ duration: 0.25 }} style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.04))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '18px', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', flexShrink: 0, boxShadow: '0 0 12px rgba(52,211,153,0.7)' }} />
                            <div>
                                <div style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.15rem' }}>Average Response: &lt; 6 Hours</div>
                                <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>During office hours on business days</div>
                            </div>
                        </motion.div>
                        <motion.div className="reveal-up" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(192,132,252,0.03))', border: '1px solid rgba(139,92,246,0.18)', borderRadius: '22px', padding: '2rem' }}>
                            <div style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ Follow Our Journey</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {SOCIAL_LINKS.map((s) => (
                                    <motion.a key={s.label} href={s.href} whileHover={{ x: 5, color: s.color }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'rgba(200,185,230,0.6)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 0', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '0.9rem', flexShrink: 0 }}>{s.icon}</div>
                                        {s.label} <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.4 }}>→</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div className="reveal-up" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <span style={{ color: '#c084fc', fontSize: '1rem', marginTop: '0.05rem', flexShrink: 0 }}>◈</span>
                            <p style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.8rem', lineHeight: 1.75, margin: 0 }}>All personal details and birth data shared with us are encrypted and treated with complete confidentiality. We never share your information with third parties.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section ref={faqRef} style={{ padding: '4rem 1.5rem 8rem', borderTop: '1px solid rgba(139,92,246,0.1)', background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent)' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Before You Write</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #fff, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Common Questions</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {FAQS.map((faq, i) => <div key={i} className="faq-item"><FAQItem faq={faq} index={i} /></div>)}
                    </div>
                </div>
            </section>
        </div>
    );
}