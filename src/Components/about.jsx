import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StarField, SectionLabel } from './widgets';
import { VALUES, TEAM, MILESTONES } from './values';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);


function TeamCard({ member, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
                    delay: index * 0.1,
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} initial="rest" whileHover={{ y: -10, borderColor: 'rgba(167,139,250,0.45)', boxShadow: '0 20px 56px rgba(124,92,191,0.12)', transition: { duration: 0.3, ease: 'easeOut' } }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '24px', overflow: 'hidden', willChange: 'transform', boxShadow: '0 4px 24px rgba(124,92,191,0.06)' }}>
            <div style={{ padding: '2rem 2rem 1.5rem', background: 'linear-gradient(135deg, rgba(245,240,255,0.9), rgba(255,255,255,0.95))', borderBottom: '1px solid rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0, background: member.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.5rem', boxShadow: '0 4px 18px rgba(124,92,191,0.25)' }}>{member.avatar}</div>
                <div>
                    <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{member.name}</div>
                    <div style={{ color: '#7c5cbf', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>{member.role}</div>
                    <div style={{ marginTop: '0.35rem', display: 'inline-block', padding: '0.15rem 0.65rem', borderRadius: '20px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#9585b0', fontSize: '0.72rem', fontWeight: 500 }}>{member.exp}</div>
                </div>
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                    <span style={{ fontSize: '0.7rem' }}>◈</span> {member.speciality}
                </div>
                <p style={{ color: '#6b5c8a', fontSize: '0.875rem', lineHeight: 1.8 }}>{member.bio}</p>
                <motion.button whileHover={{ scale: 1.03, background: 'rgba(167,139,250,0.15)', boxShadow: '0 4px 20px rgba(124,92,191,0.18)' }} whileTap={{ scale: 0.97 }} style={{ marginTop: '1.5rem', width: '100%', padding: '0.65rem', background: 'rgba(167,139,250,0.08)', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '10px', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.2s' }}>Book a Session →</motion.button>
            </div>
        </motion.div>
    );
}

function TimelineItem({ milestone, index, isLast }) {
    const ref = useRef(null);
    const lineRef = useRef(null);
    const isEven = index % 2 === 0;
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, x: isEven ? -50 : 50 },
                {
                    opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                }
            );
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0, transformOrigin: 'top' },
                    {
                        scaleY: 1, duration: 0.6, ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    }
                );
            }
        });
        return () => ctx.revert();
    }, [isEven]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', marginBottom: 0 }}>
            <div style={{ padding: '0 2rem 3rem 0', textAlign: 'right' }}>
                {isEven
                    ? <div ref={ref}><TimelineContent milestone={milestone} /></div>
                    : <div></div>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div whileHover={{ scale: 1.3, boxShadow: '0 0 20px rgba(167,139,250,0.5)' }} style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: '3px solid #faf9f7', boxShadow: '0 0 10px rgba(167,139,250,0.35)', zIndex: 1, marginTop: '0.35rem' }} />
                {!isLast && <div ref={lineRef} style={{ width: '2px', flexGrow: 1, minHeight: '80px', background: 'linear-gradient(180deg, rgba(167,139,250,0.4), rgba(167,139,250,0.08))' }} />}
            </div>
            <div style={{ padding: '0 0 3rem 2rem', textAlign: 'left' }}>
                {!isEven
                    ? <div ref={ref}><TimelineContent milestone={milestone} /></div>
                    : <div />
                }
            </div>
        </div>
    );
}

function TimelineContent({ milestone }) {
    return (
        <div>
            <div style={{ display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '20px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{milestone.year}</div>
            <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{milestone.title}</div>
            <div style={{ color: '#6b5c8a', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '260px', marginLeft: 'auto' }}>{milestone.desc}</div>
        </div>
    );
}

export default function About() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const { scrollY } = useScroll();
    const subtitleRef = useRef(null);
    const heroY = useTransform(scrollY, [0, 350], [0, 60]);
    const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
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

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#2d2438', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                <StarField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, rgba(216,180,254,0.05) 50%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(251,207,232,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '15%', left: '-6%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ Our Story</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #3d2b6b 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rooted in Tradition,</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Guided by the Stars</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.85, color: '#6b5c8a', maxWidth: '580px', margin: '0 auto', fontWeight: 400 }}>Purple Celestia was born from a shared belief — that the ancient sciences of India hold answers to the most modern of struggles. We exist to bridge that timeless wisdom with your everyday life.</p>
                </motion.div>
            </section>
            <section style={{ padding: '6rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(167,139,250,0.3)' }} />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '1px dashed rgba(196,181,253,0.22)' }} />
                            <div style={{ position: 'absolute', inset: '40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.22) 0%, rgba(245,240,255,0.6) 60%, transparent 80%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 16px rgba(167,139,250,0.4))' }}>☯</motion.div>
                            </div>
                            {[0, 120, 240].map((deg) => (
                                <motion.div key={deg} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: deg / 360 * 12 }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', rotate: `${deg}deg` }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', background: '#a78bfa', boxShadow: '0 0 8px rgba(167,139,250,0.6)' }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal-up">
                        <SectionLabel>Our Mission</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #3d2b6b 40%, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Illuminating Every Path, One Chart at a Time</h2>
                        <p style={{ color: '#6b5c8a', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.2rem' }}>Purple Celestia's mission is to make authentic Vedic guidance accessible — free from superstition, free from fear, and grounded in genuine scholarship. We believe every person deserves a clear, compassionate reading of their story.</p>
                        <p style={{ color: '#9585b0', fontSize: '0.9rem', lineHeight: 1.9 }}>We do not predict doom. We illuminate possibility. Every consultation is a collaboration between ancient celestial wisdom and your own agency as the author of your life.</p>
                    </div>
                </div>
            </section>
            <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.7), transparent)', borderTop: '1px solid rgba(167,139,250,0.12)', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Our Values</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Principles That Guide Us</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
                        {VALUES.map((v, i) => (
                            <motion.div key={v.title} className="reveal-up" whileHover={{ y: -8, borderColor: 'rgba(167,139,250,0.4)', boxShadow: '0 20px 50px rgba(124,92,191,0.1)' }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '20px', padding: '2rem', textAlign: 'center', willChange: 'transform', boxShadow: '0 4px 20px rgba(124,92,191,0.05)' }}>
                                <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }} style={{ fontSize: '2rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 8px rgba(167,139,250,0.3))' }}>{v.icon}</motion.div>
                                <div style={{ color: '#2d2438', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{v.title}</div>
                                <p style={{ color: '#6b5c8a', fontSize: '0.85rem', lineHeight: 1.8 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <SectionLabel>Our Journey</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A Decade of Cosmic Guidance</h2>
                    </div>
                    <div className="reveal-up">
                        {MILESTONES.map((m, i) => <TimelineItem key={m.year} milestone={m} index={i} isLast={i === MILESTONES.length - 1} />)}
                    </div>
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.6), transparent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Meet the Practitioners</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>The Minds Behind the Wisdom</h2>
                        <p style={{ color: '#9585b0', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>Each practitioner brings decades of rigorous study and thousands of real consultations to your session.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
                    </div>
                </div>
            </section>
            <section style={{ padding: '5rem 1.5rem 8rem' }}>
                <div className="reveal-up" style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div whileHover={{ boxShadow: '0 30px 80px rgba(124,92,191,0.15)' }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(135deg, rgba(245,240,255,0.95), rgba(255,248,255,0.98))', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,92,191,0.07)' }}>
                        <div style={{ position: 'absolute', top: '-70px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.28), transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-55px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,207,232,0.28), transparent 70%)', pointerEvents: 'none' }} />
                        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '3rem', marginBottom: '1rem', display: 'inline-block', filter: 'drop-shadow(0 4px 10px rgba(167,139,250,0.35))' }}>✦</motion.div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Ready to Know Your Chart?</h2>
                        <p style={{ color: '#6b5c8a', fontSize: '1rem', lineHeight: 1.8, maxWidth: '420px', margin: '0 auto 2.5rem' }}>Connect with one of our practitioners and receive a reading crafted exclusively for your birth data, aspirations, and questions.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.button whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(124,92,191,0.4)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 2.2rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(124,92,191,0.28)' }}>Book a Free Consultation</motion.button>
                            <motion.button whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.1)' }} whileTap={{ scale: 0.97 }} style={{ padding: '0.85rem 2.2rem', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(167,139,250,0.35)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.04em', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}>View Services</motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}