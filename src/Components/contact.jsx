import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, CelestialField } from './widgets';
import { SERVICES_OPTIONS, SOCIAL_LINKS, FAQS, CONTACT_METHODS, CONSULTATION_TYPES, GRADIENT_PRIMARY } from './values';

gsap.registerPlugin(ScrollTrigger);

const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID';

const CALENDLY_USERNAME = 'YOUR_CALENDLY_USERNAME';

const SESSION_PRICING = {
    'Jyotish (Birth Chart)': { price: 1500, label: 'Birth Chart Reading', duration: '60 min' },
    'Kundli Matching': { price: 2000, label: 'Kundli Matching', duration: '75 min' },
    'Numerology': { price: 1200, label: 'Numerology Session', duration: '45 min' },
    'Vastu': { price: 2500, label: 'Vastu Consultation', duration: '90 min' },
    'General': { price: 800, label: 'General Consultation', duration: '30 min' },
};

const DEFAULT_SESSION = { price: 1200, label: 'Consultation Session', duration: '60 min' };

function loadRazorpay() {
    return new Promise((resolve) => {
        if (window.Razorpay) { resolve(true); return; }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

function CalendlyWidget({ url, onEventScheduled }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!document.getElementById('calendly-css')) {
            const link = document.createElement('link');
            link.id = 'calendly-css';
            link.rel = 'stylesheet';
            link.href = 'https://assets.calendly.com/assets/external/widget.css';
            document.head.appendChild(link);
        }
        const loadScript = () => new Promise((resolve) => {
            if (window.Calendly) { resolve(); return; }
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.onload = resolve;
            document.body.appendChild(script);
        });
        loadScript().then(() => {
            if (ref.current && window.Calendly) {
                window.Calendly.initInlineWidget({
                    url,
                    parentElement: ref.current,
                    prefill: {},
                    utm: {},
                });
            }
        });
        const handler = (e) => {
            if (e.data?.event === 'calendly.event_scheduled') {
                onEventScheduled && onEventScheduled(e.data.payload);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [url, onEventScheduled]);

    return <div ref={ref} style={{ minWidth: '100%', height: '680px', borderRadius: '18px', overflow: 'hidden', border: '1.5px solid rgba(167,139,250,0.18)' }} />;
}

function BookSession() {
    const ref = useRef(null);
    const [step, setStep] = useState('select');
    const [selectedService, setService] = useState('');
    const [payStatus, setPayStatus] = useState('idle');
    const [scheduledEvent, setScheduled] = useState(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.book-title',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play reset play reset' }
                }
            );
            gsap.fromTo('.book-service-card',
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play reset play reset' }
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const session = SESSION_PRICING[selectedService] || DEFAULT_SESSION;

    const handleServiceSelect = (svc) => {
        setService(svc);
        setStep('calendar');
    };

    const handleEventScheduled = (payload) => {
        setScheduled(payload);
        setStep('payment');
    };

    const handlePayment = async () => {
        setPayStatus('loading');
        const loaded = await loadRazorpay();
        if (!loaded) {
            setPayStatus('failed');
            return;
        }
        const options = {
            image: '',
            currency: 'INR',
            key: RAZORPAY_KEY_ID,
            description: session.label,
            amount: session.price * 100,
            name: 'Jyotish Consultations',
            handler: function () {
                setPayStatus('success');
                setStep('done');
            },
            prefill: {
                name: '',
                email: '',
                contact: '',
            },
            notes: {
                calendly_event: scheduledEvent?.event?.uuid || '',
                service: selectedService,
            },
            theme: {
                color: '#7c5cbf',
            },
            modal: {
                ondismiss: () => {
                    setPayStatus('idle');
                },
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', () => setPayStatus('failed'));
        rzp.open();
        setPayStatus('idle');
    };

    const handleReset = () => {
        setStep('select');
        setService('');
        setScheduled(null);
        setPayStatus('idle');
    };

    const STEPS = [
        { id: 'select', label: 'Choose Service' },
        { id: 'calendar', label: 'Pick a Slot' },
        { id: 'payment', label: 'Pay & Confirm' },
        { id: 'done', label: 'Confirmed' },
    ];
    const stepIndex = STEPS.findIndex((s) => s.id === step);

    return (
        <section ref={ref} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, #faf9f7 0%, rgba(245,240,255,0.55) 50%, #fdf8ff 100%)', position: 'relative', overflow: 'hidden' }}>
            {[...Array(10)].map((_, i) => <div key={i} style={{ position: 'absolute', width: `${1.2 + (i % 2) * 0.8}px`, height: `${1.2 + (i % 2) * 0.8}px`, borderRadius: '50%', background: i % 2 === 0 ? 'rgba(167,139,250,0.5)' : 'rgba(104,150,200,0.4)', top: `${6 + (i * 21 % 88)}%`, left: `${3 + (i * 29 % 94)}%`, animation: `twinkleB ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`, pointerEvents: 'none' }} />)}
            <style>{`@keyframes twinkleB { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.5)} }`}</style>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="book-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <SectionLabel>Book a Session</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>Reserve Your Reading</h2>
                    <p style={{ color: '#4a6080', fontSize: '0.97rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.8 }}>Choose a service, pick a time that works for you, and secure your slot instantly.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '3.5rem', flexWrap: 'wrap' }}>
                    {STEPS.map((s, i) => {
                        const done = i < stepIndex;
                        const current = i === stepIndex;
                        return (
                            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? 'linear-gradient(135deg,#7c5cbf,#a78bfa)' : current ? 'rgba(167,139,250,0.18)' : 'rgba(167,139,250,0.07)', border: `1.5px solid ${done || current ? 'rgba(124,92,191,0.55)' : 'rgba(167,139,250,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#fff' : current ? '#7c5cbf' : '#b8a8cc', fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.35s ease' }}>
                                        {done ? '✓' : i + 1}
                                    </div>
                                    <span style={{ fontSize: '0.68rem', fontWeight: current ? 700 : 400, color: current ? '#7c5cbf' : done ? '#1e3a5f' : '#b8a8cc', letterSpacing: '0.04em', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>{s.label}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div style={{
                                        width: '60px', height: '1.5px', margin: '0 4px', marginBottom: '1.4rem', background: i < stepIndex
                                            ? 'linear-gradient(90deg,#7c5cbf,#a78bfa)'
                                            : 'rgba(167,139,250,0.2)', transition: 'background 0.4s ease',
                                    }} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <AnimatePresence mode="wait">
                    {step === 'select' && (
                        <motion.div key="select" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.1rem' }}>
                                {Object.entries(SESSION_PRICING).map(([svc, info]) => (
                                    <motion.button key={svc} className="book-service-card" onClick={() => handleServiceSelect(svc)} whileHover={{ y: -6, boxShadow: '0 18px 50px rgba(124,92,191,0.13)' }} whileTap={{ scale: 0.97 }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.2)', borderRadius: '20px', padding: '1.75rem 1.5rem', textAlign: 'left', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,92,191,0.05)', willChange: 'transform', position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #7c5cbf, #a78bfa)', opacity: 0, transition: 'opacity 0.25s' }} className="card-top-bar" />
                                        <div style={{ color: '#7c5cbf', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{info.duration}</div>
                                        <div style={{ color: '#1e3a5f', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', marginBottom: '0.9rem', lineHeight: 1.3 }}>{info.label}</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                                            <span style={{ color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 600 }}>₹</span>
                                            <span style={{ color: '#1e3a5f', fontSize: '1.4rem', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{info.price.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ marginTop: '1.1rem', color: '#a78bfa', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em' }}>Select & Book →</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {step === 'calendar' && (
                        <motion.div key="calendar" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.5rem', background: 'rgba(245,240,255,0.8)', border: '1.5px solid rgba(167,139,250,0.2)', borderRadius: '14px', marginBottom: '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }} />
                                    <span style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '0.9rem' }}>{session.label}</span>
                                    <span style={{ color: '#7a94b0', fontSize: '0.8rem' }}>· {session.duration}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#7c5cbf', fontWeight: 800, fontSize: '1rem', fontFamily: "'Cormorant Garamond', serif" }}>₹{session.price.toLocaleString('en-IN')}</span>
                                    <button onClick={() => setStep('select')} style={{ background: 'none', border: 'none', color: '#7a94b0', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Change</button>
                                </div>
                            </div>
                            <div style={{ borderRadius: '22px', overflow: 'hidden', boxShadow: '0 8px 48px rgba(124,92,191,0.08)', border: '1.5px solid rgba(167,139,250,0.15)' }}>
                                <CalendlyWidget url={`https://calendly.com/${CALENDLY_USERNAME}`} onEventScheduled={handleEventScheduled} />
                            </div>
                            <p style={{ textAlign: 'center', color: '#b8a8cc', fontSize: '0.78rem', marginTop: '1rem' }}>After picking a slot, you'll be taken to the payment step.</p>
                        </motion.div>
                    )}
                    {step === 'payment' && (
                        <motion.div key="payment" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ maxWidth: '520px', margin: '0 auto' }}>
                            <div style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.2)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 48px rgba(124,92,191,0.08)' }}>
                                <div style={{ padding: '1.75rem 2rem', background: 'linear-gradient(135deg, rgba(245,240,255,0.9), rgba(255,255,255,0.95))', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                                    <div style={{ color: '#7c5cbf', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Order Summary</div>
                                    <div style={{ color: '#1e3a5f', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}>{session.label}</div>
                                    <div style={{ color: '#7a94b0', fontSize: '0.82rem', marginTop: '0.25rem' }}>Duration: {session.duration}</div>
                                </div>
                                {scheduledEvent && (
                                    <div style={{ margin: '1.5rem 2rem 0', padding: '0.9rem 1.1rem', borderRadius: '12px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.22)', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                                        <div>
                                            <div style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>Slot Reserved on Calendly</div>
                                            <div style={{ color: '#4a6080', fontSize: '0.73rem', marginTop: '0.1rem' }}>Complete payment below to confirm your booking.</div>
                                        </div>
                                    </div>
                                )}
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(167,139,250,0.1)' }}>
                                        <span style={{ color: '#4a6080', fontSize: '0.85rem' }}>Session fee</span>
                                        <span style={{ color: '#1e3a5f', fontWeight: 600, fontSize: '0.85rem' }}>₹{session.price.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(167,139,250,0.1)' }}>
                                        <span style={{ color: '#4a6080', fontSize: '0.85rem' }}>Platform fee</span>
                                        <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>Free</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0 0' }}>
                                        <span style={{ color: '#1e3a5f', fontWeight: 700, fontSize: '0.95rem' }}>Total</span>
                                        <span style={{ color: '#7c5cbf', fontWeight: 800, fontSize: '1.2rem', fontFamily: "'Cormorant Garamond', serif" }}>₹{session.price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '0 2rem 2rem' }}>
                                    {payStatus === 'failed' && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', color: '#b91c1c', fontSize: '0.8rem' }}>Payment failed. Please try again or use a different method.</motion.div>}
                                    <motion.button onClick={handlePayment} disabled={payStatus === 'loading'} whileHover={payStatus !== 'loading' ? { scale: 1.02, boxShadow: '0 10px 32px rgba(124,92,191,0.38)' } : {}} whileTap={payStatus !== 'loading' ? { scale: 0.97 } : {}} style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: payStatus === 'loading'
                                            ? 'rgba(167,139,250,0.3)'
                                            : GRADIENT_PRIMARY,
                                        border: 'none',
                                        borderRadius: '14px',
                                        color: payStatus === 'loading' ? '#b8a8cc' : '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: 700,
                                        cursor: payStatus === 'loading' ? 'not-allowed' : 'pointer',
                                        letterSpacing: '0.04em',
                                        boxShadow: payStatus !== 'loading' ? '0 4px 22px rgba(124,92,191,0.28)' : 'none',
                                        transition: 'all 0.25s ease',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    }}>
                                        {payStatus === 'loading'
                                            ? <>
                                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>✦</motion.span> Opening payment…
                                            </>
                                            : <>Pay ₹{session.price.toLocaleString('en-IN')} & Confirm Booking</>
                                        }
                                    </motion.button>
                                    <button onClick={() => setStep('calendar')} style={{ width: '100%', marginTop: '0.75rem', background: 'none', border: 'none', color: '#7a94b0', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>← Go back and change slot</button>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                                        <span style={{ color: '#7c5cbf', fontSize: '0.75rem' }}>🔒</span>
                                        <span style={{ color: '#b8a8cc', fontSize: '0.73rem' }}>Secured by Razorpay · 256-bit SSL encryption</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {step === 'done' && (
                        <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'backOut' }} style={{ textAlign: 'center', padding: '3rem 2rem', maxWidth: '480px', margin: '0 auto' }}>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, duration: 0.5, ease: 'backOut' }} style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.06))',
                                border: '2px solid rgba(16,185,129,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(16,185,129,0.14)',
                            }}>✦</motion.div>
                            <h3 style={{ color: '#1e3a5f', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.75rem' }}>You're Booked!</h3>
                            <p style={{ color: '#4a6080', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '0.5rem' }}>Payment confirmed and your session is locked in. Check your email for the Calendly confirmation with the meeting link.</p>
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} style={{ color: '#a78bfa', fontSize: '1.5rem', letterSpacing: '0.4rem', margin: '1.5rem 0' }}>✦ ✦ ✦</motion.div>
                            <motion.button whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.12)' }} whileTap={{ scale: 0.97 }} onClick={handleReset} style={{ padding: '0.65rem 1.75rem', background: 'rgba(167,139,250,0.08)', border: '1.5px solid rgba(167,139,250,0.28)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>Book Another Session</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function AmbientOrbs() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.contact-orb-1', { x: 30, y: -20, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to('.contact-orb-2', { x: -25, y: 18, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
            gsap.to('.contact-orb-3', { x: 18, y: 24, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div className="contact-orb-1" style={{ position: 'absolute', top: '10%', left: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.13) 0%, transparent 70%)' }} />
            <div className="contact-orb-2" style={{ position: 'absolute', bottom: '12%', right: '6%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(104,150,200,0.1) 0%, transparent 70%)' }} />
            <div className="contact-orb-3" style={{ position: 'absolute', top: '45%', right: '20%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,181,253,0.1) 0%, transparent 70%)' }} />
        </div>
    );
}

function AstralPathSection() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.path-title',
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.fromTo('.path-step',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.65, stagger: 0.18, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.fromTo('.path-line',
                { strokeDashoffset: 300 },
                {
                    strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut',
                    scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.to('.path-node',
                { scale: 1.25, opacity: 0.65, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.4, transformOrigin: '50% 50%' }
            );
            gsap.to('.path-symbol',
                { y: -10, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const steps = [
        { icon: '✦', title: 'You Reach Out', desc: 'Fill the form or message on WhatsApp - share whatever is on your mind.', color: '#7c5cbf' },
        { icon: '☿', title: 'I Review & Respond', desc: 'You receive a personal response - no bots, no templates.', color: '#6896c8' },
        { icon: '𝕹', title: 'We Define the Session', desc: 'Together we decide the right service, format, and focus area for you.', color: '#a78bfa' },
        { icon: '◈', title: 'Clarity Begins', desc: 'Your session delivers structured, specific, and actionable insights.', color: '#7c5cbf' },
    ];

    return (
        <section ref={ref} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, #fdf8ff 0%, rgba(245,240,255,0.6) 60%, #faf9f7 100%)', position: 'relative', overflow: 'hidden' }}>
            {[...Array(14)].map((_, i) => (
                <div key={i} style={{ position: 'absolute', width: `${1.5 + (i % 2)}px`, height: `${1.5 + (i % 2)}px`, borderRadius: '50%', background: i % 2 === 0 ? 'rgba(167,139,250,0.55)' : 'rgba(104,150,200,0.45)', top: `${8 + (i * 19 % 84)}%`, left: `${4 + (i * 27 % 92)}%`, animation: `twinkleC ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.35}s`, pointerEvents: 'none' }} />
            ))}
            <style>{`@keyframes twinkleC { 0%,100%{opacity:0.25;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }`}</style>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="path-title" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <SectionLabel>Your Journey</SectionLabel>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>What Happens After You Write</h2>
                    <p style={{ color: '#4a6080', fontSize: '0.97rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8 }}>Every conversation follows a clear, personal path — no confusion, no guesswork.</p>
                </div>
                <div style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', top: '36px', left: '12.5%', width: '75%', height: '4px', overflow: 'visible', pointerEvents: 'none' }} viewBox="0 0 600 4" preserveAspectRatio="none">
                        <line x1="0" y1="2" x2="600" y2="2" className="path-line" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="300" strokeDashoffset="300" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c5cbf" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#6896c8" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}>
                        {steps.map((s, i) => (
                            <motion.div key={s.title} className="path-step" whileHover={{ y: -8, boxShadow: `0 20px 50px ${s.color}1a` }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.16)', borderRadius: '22px', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(124,92,191,0.05)', willChange: 'transform', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    <div className="path-node" style={{ width: '56px', height: '56px', borderRadius: '50%', background: `radial-gradient(ellipse, ${s.color}20 0%, ${s.color}08 70%)`, border: `1.5px solid ${s.color}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: s.color, boxShadow: `0 0 20px ${s.color}22` }}>{s.icon}</div>
                                </div>
                                <div style={{ color: '#1e3a5f', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', marginBottom: '0.5rem' }}>{s.title}</div>
                                <p style={{ color: '#4a6080', fontSize: '0.83rem', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                                <div style={{ position: 'absolute', top: '0.9rem', right: '1rem', color: `${s.color}40`, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', fontFamily: "'Cormorant Garamond', serif" }}>0{i + 1}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
                    <div className="path-symbol" style={{ fontSize: '2rem', color: 'rgba(167,139,250,0.45)', filter: 'drop-shadow(0 4px 14px rgba(167,139,250,0.3))' }}>✦</div>
                </div>
            </div>
        </section>
    );
}

function CosmicTrustStrip() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.to('.trust-ticker', { xPercent: -50, duration: 20, repeat: -1, ease: 'none' });
            gsap.fromTo('.trust-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play reset play reset' },
                }
            );
            gsap.to('.trust-lock', {
                filter: 'drop-shadow(0 0 14px rgba(167,139,250,0.7))',
                duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
        }, el);
        return () => ctx.revert();
    }, []);

    const tickerItems = ['✦ Confidential', '◈ No Fear-Based Predictions', '☿ Structured & Logical', '𝕹 1000+ Sessions', '✦ Personal Response', '◈ Ancient Precision', '☿ Real Clarity', '𝕹 Trusted Globally'];
    const ticker = [...tickerItems, ...tickerItems];

    const trustPoints = [
        { icon: '🔒', label: 'Strictly Confidential', desc: 'All birth data and personal details are kept private — always.', cls: 'trust-lock' },
        { icon: '✦', label: 'No Vague Answers', desc: 'Every session is structured, specific, and grounded in logic.' },
        { icon: '◈', label: 'Human & Personal', desc: 'You speak directly with me — no assistants, no automation.' },
        { icon: '☿', label: 'Judgment-Free Space', desc: 'Whatever you are dealing with, I am here to listen and guide.' },
    ];

    return (
        <section ref={ref} style={{ background: 'linear-gradient(135deg, #1a2d4a, #2d1f55)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ borderBottom: '1px solid rgba(167,139,250,0.18)', padding: '0.9rem 0', overflow: 'hidden' }}>
                <div className="trust-ticker" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {ticker.map((t, i) => <span key={i} style={{ color: i % 3 === 0 ? 'rgba(167,139,250,0.7)' : i % 3 === 1 ? 'rgba(104,150,200,0.6)' : 'rgba(255,255,255,0.25)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</span>)}
                </div>
            </div>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ color: 'rgba(167,139,250,0.7)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Before You Hesitate</div>
                    <h3 style={{ color: '#f0eeff', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.25 }}>This is a safe space for honest conversations.</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    {trustPoints.map((t) => (
                        <motion.div key={t.label} className="trust-card" whileHover={{ borderColor: 'rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.1)' }} transition={{ duration: 0.22 }} style={{ padding: '1.75rem', borderRadius: '18px', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.16)', transition: 'background 0.22s, border-color 0.22s' }}>
                            <div className={t.cls || ''} style={{ fontSize: '1.6rem', marginBottom: '0.85rem' }}>{t.icon}</div>
                            <div style={{ color: '#e8e0ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t.label}</div>
                            <div style={{ color: 'rgba(180,190,220,0.78)', fontSize: '0.82rem', lineHeight: 1.75 }}>{t.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(167,139,250,0.18)', padding: '0.9rem 0', overflow: 'hidden' }}>
                <div className="trust-ticker" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {[...ticker].reverse().map((t, i) => <span key={i} style={{ color: i % 3 === 0 ? 'rgba(104,150,200,0.55)' : i % 3 === 1 ? 'rgba(167,139,250,0.45)' : 'rgba(255,255,255,0.15)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</span>)}
                </div>
            </div>
        </section>
    );
}

function FloatingInput({ label, type = 'text', value, onChange, required = false, as = 'input', rows = 4, options = [] }) {
    const [focused, setFocused] = useState(false);
    const isFloating = focused || value.length > 0;

    const baseStyle = {
        width: '100%',
        background: focused ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
        border: `1.5px solid ${focused ? 'rgba(124,92,191,0.55)' : 'rgba(167,139,250,0.22)'}`,
        borderRadius: '12px',
        padding: as === 'textarea' ? '1.5rem 1rem 0.75rem' : '1.5rem 1rem 0.5rem',
        color: '#1e3a5f',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
        boxShadow: focused ? '0 0 0 3px rgba(124,92,191,0.1)' : 'none',
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
        top: isFloating ? '0.45rem' : (as === 'textarea' ? '1.4rem' : '50%'),
        transform: isFloating ? 'none' : (as === 'textarea' ? 'none' : 'translateY(-50%)'),
        fontSize: isFloating ? '0.68rem' : '0.875rem',
        color: focused ? '#7c5cbf' : '#7a94b0',
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
                            <option value="" disabled style={{ background: '#fff', color: '#7a94b0' }} />
                            {options.map((o) => <option key={o} value={o} style={{ background: '#fff', color: '#1e3a5f' }}>{o}</option>)}
                        </select>
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#7c5cbf', fontSize: '0.7rem' }}>▾</div>
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
                    scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play reset play reset' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} whileHover={{ y: -6, borderColor: method.accentColor + '44', boxShadow: `0 18px 50px ${method.glowColor}` }} transition={{ duration: 0.28, ease: 'easeOut' }} style={{ background: method.gradient, border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '20px', padding: '1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1.1rem', willChange: 'transform', cursor: 'default', boxShadow: '0 4px 20px rgba(124,92,191,0.05)' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '14px', flexShrink: 0, background: `${method.accentColor}12`, border: `1.5px solid ${method.accentColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: method.accentColor, filter: `drop-shadow(0 4px 8px ${method.glowColor})` }}>{method.icon}</div>
            <div>
                <div style={{ color: '#7a94b0', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{method.label}</div>
                <a href={method.link} style={{ color: '#1e3a5f', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem', textDecoration: 'none', display: 'block' }}>{method.value}</a>
                <div style={{ color: '#7a94b0', fontSize: '0.78rem' }}>{method.sub}</div>
            </div>
        </motion.div>
    );
}

function FAQItem({ faq }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div style={{ border: `1.5px solid ${open ? 'rgba(167,139,250,0.35)' : 'rgba(167,139,250,0.15)'}`, borderRadius: '14px', overflow: 'hidden', background: open ? 'rgba(245,240,255,0.7)' : '#ffffff', transition: 'background 0.25s, border-color 0.25s', boxShadow: open ? '0 4px 24px rgba(124,92,191,0.07)' : 'none' }}>
            <button onClick={() => setOpen((p) => !p)} style={{ width: '100%', padding: '1.1rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                <span style={{ color: '#1e3a5f', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} style={{ color: '#7c5cbf', fontSize: '1.35rem', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 1.4rem 1.25rem', color: '#4a6080', fontSize: '0.865rem', lineHeight: 1.8 }}>{faq.a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SuccessScreen({ name, onReset }) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'backOut' }} style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, duration: 0.5, ease: 'backOut' }} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.08))', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', boxShadow: '0 0 30px rgba(16,185,129,0.15)' }}>✦</motion.div>
            <div>
                <h3 style={{ color: '#1e3a5f', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", marginBottom: '0.5rem' }}>Got it, {name.split(' ')[0]}</h3>
                <p style={{ color: '#4a6080', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '340px', margin: '0 auto' }}>I've received your message and will get back to you personally within 24 hours.</p>
            </div>
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#a78bfa', fontSize: '1.5rem', letterSpacing: '0.4rem' }}>✦ ✦ ✦</motion.div>
            <motion.button whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.12)' }} whileTap={{ scale: 0.97 }} onClick={onReset} style={{ marginTop: '0.5rem', padding: '0.65rem 1.75rem', background: 'rgba(167,139,250,0.08)', border: '1.5px solid rgba(167,139,250,0.28)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.2s' }}>Send Another Message</motion.button>
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
    const handleConsultationType = (id) => setForm((p) => ({ ...p, consultationType: id }));
    const handleNextStep = (e) => { e.preventDefault(); if (step < TOTAL_STEPS) setStep((s) => s + 1); };

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
                    <span style={{ color: '#7a94b0', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>STEP {step} OF {TOTAL_STEPS}</span>
                    <span style={{ color: '#7c5cbf', fontSize: '0.75rem', fontWeight: 600 }}>{step === 1 ? 'Your Details' : 'Your Enquiry'}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(167,139,250,0.15)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: progressWidth }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #7c5cbf, #a78bfa)', borderRadius: '10px' }} />
                </div>
            </div>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.form key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: 'easeOut' }} onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <FloatingInput label="Full Name" value={form.name} onChange={set('name')} required />
                        <FloatingInput label="Email Address" type="email" value={form.email} onChange={set('email')} required />
                        <FloatingInput label="Phone Number (optional)" type="tel" value={form.phone} onChange={set('phone')} />
                        <FloatingInput label="Area of Interest" as="select" value={form.service} onChange={set('service')} required options={SERVICES_OPTIONS} />
                        <motion.button whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(124,92,191,0.35)' }} whileTap={{ scale: 0.97 }} type="submit" style={{ marginTop: '0.5rem', padding: '0.9rem', background: GRADIENT_PRIMARY, border: 'none', borderRadius: '12px', color: '#fff', fontSize: '0.93rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(124,92,191,0.25)' }}>Continue →</motion.button>
                    </motion.form>
                )}
                {step === 2 && (
                    <motion.form key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: 'easeOut' }} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <div style={{ color: '#7a94b0', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Preferred Format *</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                                {CONSULTATION_TYPES.map((ct) => {
                                    const isSel = form.consultationType === ct.id;
                                    return (
                                        <motion.button key={ct.id} type="button" onClick={() => handleConsultationType(ct.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 0.75rem', background: isSel ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.05)', border: `1.5px solid ${isSel ? 'rgba(167,139,250,0.45)' : 'rgba(167,139,250,0.18)'}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', boxShadow: isSel ? '0 4px 18px rgba(124,92,191,0.14)' : 'none', transition: 'all 0.2s ease' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                                <span style={{ color: isSel ? '#7c5cbf' : '#7a94b0', fontSize: '0.9rem' }}>{ct.icon}</span>
                                                <span style={{ color: isSel ? '#1e3a5f' : '#4a6080', fontSize: '0.85rem', fontWeight: 700 }}>{ct.label}</span>
                                            </div>
                                            <div style={{ color: '#7a94b0', fontSize: '0.72rem', paddingLeft: '1.4rem' }}>{ct.sub}</div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                        <AnimatePresence>
                            {(form.service === 'Jyotish (Birth Chart)' || form.service === 'Kundli Matching') && (
                                <motion.div key="birth-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                                        <span style={{ color: '#7c5cbf', fontSize: '0.85rem', marginTop: '0.05rem' }}>✦</span>
                                        <span style={{ color: '#4a6080', fontSize: '0.8rem', lineHeight: 1.65 }}>For {form.service}, an accurate birth time greatly helps — ideally within 15 minutes. Please share what you have.</span>
                                    </div>
                                    <FloatingInput label="Date of Birth" type="date" value={form.birthDate} onChange={set('birthDate')} required />
                                    <FloatingInput label="Birth City / Place" value={form.birthPlace} onChange={set('birthPlace')} required />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <FloatingInput label="Tell me what you're dealing with" as="textarea" rows={4} value={form.message} onChange={set('message')} required />
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                            <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ flex: '0 0 auto', padding: '0.9rem 1.4rem', background: 'rgba(167,139,250,0.07)', border: '1.5px solid rgba(167,139,250,0.22)', borderRadius: '12px', color: '#4a6080', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>← Back</motion.button>
                            <motion.button whileHover={{ scale: !submitting ? 1.02 : 1, boxShadow: !submitting ? '0 8px 28px rgba(124,92,191,0.35)' : 'none' }} whileTap={{ scale: !submitting ? 0.97 : 1 }} type="submit" disabled={submitting || !form.consultationType} style={{ flex: 1, padding: '0.9rem', background: submitting || !form.consultationType ? 'rgba(167,139,250,0.18)' : GRADIENT_PRIMARY, border: 'none', borderRadius: '12px', color: submitting || !form.consultationType ? '#7a94b0' : '#fff', fontSize: '0.93rem', fontWeight: 700, cursor: submitting || !form.consultationType ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', boxShadow: !submitting && form.consultationType ? '0 4px 20px rgba(124,92,191,0.25)' : 'none', transition: 'all 0.2s ease' }}>
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
            gsap.timeline({ defaults: { ease: 'power3.out' } }).fromTo(titleRef.current, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 }).fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.5');
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

    useEffect(() => {
        const el = faqRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-item',
                { opacity: 0, y: 25 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play reset play reset' },
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#1e3a5f', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '58vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                <CelestialField />
                <AmbientOrbs />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '850px', height: '480px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, right: '-8%', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '720px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ Get in Touch</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #1e3a5f 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Let's Start</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #6896c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>a Conversation</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.85, color: '#4a6080', maxWidth: '500px', margin: '0 auto', fontWeight: 400 }}>Whether you have a specific situation in mind or simply want to understand what's going on — I'm here to listen and help you figure out the right next step.</p>
                </div>
            </section>
            <section style={{ padding: '2rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }}>
                    {CONTACT_METHODS.map((m, i) => <ContactMethodCard key={m.label} method={m} index={i} />)}
                </div>
            </section>
            <BookSession />
            <AstralPathSection />
            <section style={{ padding: '0 1.5rem 7rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
                    <motion.div className="reveal-up" style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 8px 48px rgba(124,92,191,0.08)' }}>
                        <div style={{ padding: '2rem 2.5rem 1.75rem', borderBottom: '1px solid rgba(167,139,250,0.12)', background: 'linear-gradient(135deg, rgba(245,240,255,0.8), rgba(255,255,255,0.95))' }}>
                            <SectionLabel>Send a Message</SectionLabel>
                            <h2 style={{ color: '#1e3a5f', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2 }}>Tell Me What You're Dealing With</h2>
                        </div>
                        <div style={{ padding: '2rem 2.5rem 2.5rem' }}><ContactForm /></div>
                    </motion.div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <motion.div className="reveal-up" style={{ background: 'rgba(245,240,255,0.7)', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '22px', padding: '2rem' }}>
                            <div style={{ color: '#7c5cbf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ Availability</div>
                            {[
                                { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM IST' },
                                { day: 'Saturday', hours: '10:00 AM – 5:00 PM IST' },
                                { day: 'Sunday', hours: 'Closed (Urgent queries via WhatsApp)' },
                            ].map((row, i) => (
                                <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.7rem 0', borderBottom: i < 2 ? '1px solid rgba(167,139,250,0.1)' : 'none', gap: '1rem' }}>
                                    <span style={{ color: '#4a6080', fontSize: '0.85rem' }}>{row.day}</span>
                                    <span style={{ color: '#1e3a5f', fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>{row.hours}</span>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div className="reveal-up" whileHover={{ borderColor: 'rgba(16,185,129,0.35)', boxShadow: '0 10px 36px rgba(16,185,129,0.1)' }} transition={{ duration: 0.25 }} style={{ background: 'rgba(240,253,244,0.8)', border: '1.5px solid rgba(16,185,129,0.2)', borderRadius: '18px', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', flexShrink: 0, boxShadow: '0 0 10px rgba(16,185,129,0.5)' }} />
                            <div>
                                <div style={{ color: '#059669', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.15rem' }}>I typically respond within 6 hours</div>
                                <div style={{ color: '#4a6080', fontSize: '0.75rem' }}>During availability hours on business days</div>
                            </div>
                        </motion.div>
                        <motion.div className="reveal-up" style={{ background: 'rgba(245,240,255,0.6)', border: '1.5px solid rgba(167,139,250,0.16)', borderRadius: '22px', padding: '2rem' }}>
                            <div style={{ color: '#7c5cbf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ Find Me Online</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {SOCIAL_LINKS.map((s) => (
                                    <motion.a key={s.label} href={s.href} whileHover={{ x: 5, color: s.color }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: '#4a6080', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${s.color}12`, border: `1px solid ${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '0.9rem', flexShrink: 0 }}>{s.icon}</div>
                                        {s.label}
                                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#b8a8cc' }}>→</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div className="reveal-up" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.14)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <span style={{ color: '#7c5cbf', fontSize: '1rem', marginTop: '0.05rem', flexShrink: 0 }}>◈</span>
                            <p style={{ color: '#7a94b0', fontSize: '0.8rem', lineHeight: 1.75, margin: 0 }}>All personal details and birth data you share with me are kept strictly confidential and are never shared with any third party.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            <CosmicTrustStrip />
            <section ref={faqRef} style={{ padding: '6rem 1.5rem 8rem', borderTop: '1px solid rgba(167,139,250,0.12)', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.6), transparent)' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Before You Write</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #1e3a5f, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Common Questions</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {FAQS.map((faq, i) => <div key={i} className="faq-item"><FAQItem faq={faq} /></div>)}
                    </div>
                </div>
            </section>
        </div>
    );
}