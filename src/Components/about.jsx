import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────

const TEAM = [
    {
        name: 'Pandit Arvind Shastri',
        role: 'Chief Vedic Astrologer',
        exp: '28 Years Experience',
        speciality: 'Jyotish Shastra, Prashna & Muhurta',
        avatar: 'A',
        gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
        bio: `A gold medalist from Banaras Hindu University, Pandit Arvind has guided over 8,000 individuals across 30 countries through life's most pivotal moments.`,
    },
    {
        name: 'Dr. Meera Nambiar',
        role: 'Numerology & Tarot Expert',
        exp: '19 Years Experience',
        speciality: 'Pythagorean & Chaldean Numerology',
        avatar: 'M',
        gradient: 'linear-gradient(135deg, #db2777, #f472b6)',
        bio: 'Dr. Meera blends classical numerological traditions with psychological insight, offering deeply personal sessions that catalyze real-world transformation.',
    },
    {
        name: 'Vastu Acharya Suresh Pillai',
        role: 'Vastu Shastra Consultant',
        exp: '22 Years Experience',
        speciality: 'Residential & Commercial Vastu',
        avatar: 'S',
        gradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
        bio: 'Suresh has consulted for Fortune 500 offices, five-star resorts, and hundreds of homes across India, Southeast Asia, and the Middle East.',
    },
    {
        name: 'Rishika Anand',
        role: 'Kundli & Compatibility Analyst',
        exp: '14 Years Experience',
        speciality: 'Marriage Compatibility, Divisional Charts',
        avatar: 'R',
        gradient: 'linear-gradient(135deg, #d97706, #fcd34d)',
        bio: `Rishika's meticulous approach to Ashtakoot and Navamsa chart analysis has helped hundreds of families navigate matrimonial decisions with confidence.`,
    },
];

const MILESTONES = [
    { year: '2012', title: 'Founded in Varanasi', desc: 'Nakshatra was established by a collective of Vedic scholars committed to making ancient wisdom accessible.' },
    { year: '2015', title: 'First Digital Platform', desc: 'Launched online consultations, reaching clients across India, the UK, and North America within the first year.' },
    { year: '2018', title: '10,000 Readings Milestone', desc: 'Crossed ten thousand personalized readings — a testament to trust built through accuracy and compassion.' },
    { year: '2021', title: 'Global Expansion', desc: 'Opened dedicated service channels for Southeast Asia, the Middle East, and the United States.' },
    { year: '2024', title: 'AI-Assisted Chart Analysis', desc: 'Integrated precision computation tools to enhance chart accuracy while retaining the human depth of our consultations.' },
    { year: '2026', title: 'New Chapter', desc: 'Continuing to evolve — with new practitioners, expanded services, and a deeper commitment to transformative guidance.' },
];

const VALUES = [
    { icon: '✦', title: 'Integrity', desc: 'We deliver honest readings even when the truth is uncomfortable. Your trust is never compromised for comfort.' },
    { icon: '☽', title: 'Reverence', desc: 'We treat Vedic sciences with the deep respect they deserve — no shortcuts, no commercialization of sacred knowledge.' },
    { icon: '◈', title: 'Precision', desc: 'Every chart is computed and interpreted with meticulous care. Accuracy is the foundation of meaningful guidance.' },
    { icon: '♃', title: 'Compassion', desc: 'Every client arrives with unique fears and hopes. We listen, understand, and counsel with genuine human warmth.' },
];

// ─── Reusable ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: '30px',
            border: '1px solid rgba(192, 132, 252, 0.3)',
            background: 'rgba(124, 58, 237, 0.1)',
            color: '#c084fc', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
        }}>
            <span>✦</span> {children}
        </div>
    );
}

function StarField({ count = 60 }) {
    const stars = useRef(
        Array.from({ length: count }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 4,
            duration: Math.random() * 3 + 2,
        }))
    ).current;

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {stars.map((s) => (
                <motion.div
                    key={s.id}
                    animate={{ opacity: [0.05, 0.6, 0.05] }}
                    transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', top: s.top, left: s.left,
                        width: `${s.size}px`, height: `${s.size}px`,
                        borderRadius: '50%', background: '#fff',
                    }}
                />
            ))}
        </div>
    );
}

// ─── Team Card ───────────────────────────────────────────────────────────

const teamCardVariants = {
    rest: { y: 0, borderColor: 'rgba(139, 92, 246, 0.2)' },
    hover: { y: -10, borderColor: 'rgba(192, 132, 252, 0.5)', transition: { duration: 0.3, ease: 'easeOut' } },
};

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
        <motion.div
            ref={ref}
            variants={teamCardVariants}
            initial="rest"
            whileHover="hover"
            style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.12), rgba(192,132,252,0.04))',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '24px', overflow: 'hidden',
                willChange: 'transform',
            }}
        >
            {/* Card Header */}
            <div style={{
                padding: '2rem 2rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(192,132,252,0.06))',
                borderBottom: '1px solid rgba(139,92,246,0.15)',
                display: 'flex', alignItems: 'center', gap: '1.25rem',
            }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0,
                    background: member.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '1.5rem',
                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                }}>{member.avatar}</div>
                <div>
                    <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{member.name}</div>
                    <div style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>{member.role}</div>
                    <div style={{
                        marginTop: '0.35rem', display: 'inline-block',
                        padding: '0.15rem 0.65rem', borderRadius: '20px',
                        background: 'rgba(124,58,237,0.15)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        color: 'rgba(200,185,230,0.65)', fontSize: '0.72rem', fontWeight: 500,
                    }}>{member.exp}</div>
                </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    marginBottom: '1rem',
                    color: 'rgba(192,132,252,0.7)', fontSize: '0.78rem',
                    fontWeight: 600, letterSpacing: '0.06em',
                }}>
                    <span style={{ fontSize: '0.7rem' }}>◈</span>
                    {member.speciality}
                </div>
                <p style={{ color: 'rgba(200,185,230,0.65)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                    {member.bio}
                </p>
                <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                        marginTop: '1.5rem', width: '100%',
                        padding: '0.65rem',
                        background: 'rgba(124,58,237,0.15)',
                        border: '1px solid rgba(139,92,246,0.3)',
                        borderRadius: '10px', color: '#c084fc',
                        fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                        letterSpacing: '0.04em',
                    }}
                >
                    Book a Session →
                </motion.button>
            </div>
        </motion.div>
    );
}

// ─── Timeline Item ────────────────────────────────────────────────────────

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
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1fr',
            gap: '0', alignItems: 'start',
            marginBottom: isLast ? 0 : '0',
        }}>
            {/* Left content */}
            <div style={{ padding: '0 2rem 3rem 0', textAlign: 'right' }}>
                {isEven ? (
                    <div ref={ref}>
                        <TimelineContent milestone={milestone} />
                    </div>
                ) : <div />}
            </div>

            {/* Center spine */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    whileHover={{ scale: 1.3, boxShadow: '0 0 24px rgba(192,132,252,0.7)' }}
                    style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #7c3aed, #c084fc)',
                        border: '3px solid #050212',
                        boxShadow: '0 0 14px rgba(192,132,252,0.5)',
                        zIndex: 1, marginTop: '0.35rem',
                    }}
                />
                {!isLast && (
                    <div ref={lineRef} style={{
                        width: '2px', flexGrow: 1, minHeight: '80px',
                        background: 'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.1))',
                    }} />
                )}
            </div>

            {/* Right content */}
            <div style={{ padding: '0 0 3rem 2rem', textAlign: 'left' }}>
                {!isEven ? (
                    <div ref={ref}>
                        <TimelineContent milestone={milestone} />
                    </div>
                ) : <div />}
            </div>
        </div>
    );
}

function TimelineContent({ milestone }) {
    return (
        <div>
            <div style={{
                display: 'inline-block',
                padding: '0.2rem 0.75rem', borderRadius: '20px',
                background: 'rgba(124,58,237,0.2)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#c084fc', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.08em', marginBottom: '0.6rem',
            }}>{milestone.year}</div>
            <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{milestone.title}</div>
            <div style={{
                color: 'rgba(200,185,230,0.6)', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '260px',
                marginLeft: 'auto',
            }}>{milestone.desc}</div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────

export default function About() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);
    const heroY = useTransform(scrollY, [0, 350], [0, 60]);

    // Hero entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // Generic reveal-up
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
        <div style={{
            background: '#050212', minHeight: '100vh',
            color: '#e2d9f3', fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden',
        }}>

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                style={{
                    position: 'relative', minHeight: '70vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <StarField count={50} />

                {/* Ambient glow */}
                <div style={{
                    position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
                    width: '800px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(192,132,252,0.05) 50%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'backOut' }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.4rem 1.2rem', borderRadius: '30px',
                            border: '1px solid rgba(192,132,252,0.3)',
                            background: 'rgba(124,58,237,0.12)',
                            color: '#c084fc', fontSize: '0.78rem', fontWeight: 600,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            marginBottom: '1.75rem',
                        }}
                    >
                        ✦ Our Story
                    </motion.div>

                    <h1
                        ref={titleRef}
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
                            lineHeight: 1.1, letterSpacing: '-0.02em',
                            fontFamily: "'Cormorant Garamond', serif",
                            marginBottom: '1.25rem',
                        }}
                    >
                        <span style={{
                            background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            Rooted in Tradition,
                        </span>
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            Guided by the Stars
                        </span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.85,
                            color: 'rgba(200,185,230,0.65)', maxWidth: '580px',
                            margin: '0 auto', fontWeight: 400,
                        }}
                    >
                        Nakshatra was born from a shared belief — that the ancient sciences of India hold
                        answers to the most modern of struggles. We exist to bridge that timeless wisdom
                        with your everyday life.
                    </p>
                </motion.div>
            </section>

            {/* ── MISSION ──────────────────────────────────────────── */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    {/* Decorative orb card */}
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                            {/* Rotating outer ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                    border: '1px dashed rgba(192,132,252,0.25)',
                                }}
                            />
                            {/* Slower counter-rotating ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: '20px', borderRadius: '50%',
                                    border: '1px dashed rgba(139,92,246,0.2)',
                                }}
                            />
                            {/* Center glow orb */}
                            <div style={{
                                position: 'absolute', inset: '40px', borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(192,132,252,0.12) 60%, transparent 80%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <motion.div
                                    animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 24px rgba(192,132,252,0.7))' }}
                                >
                                    ☯
                                </motion.div>
                            </div>
                            {/* Orbiting dot */}
                            {[0, 120, 240].map((deg) => (
                                <motion.div
                                    key={deg}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: deg / 360 * 12 }}
                                    style={{
                                        position: 'absolute', inset: '0', borderRadius: '50%',
                                        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                                        rotate: `${deg}deg`,
                                    }}
                                >
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px',
                                        background: '#c084fc', boxShadow: '0 0 10px rgba(192,132,252,0.8)',
                                    }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Text */}
                    <div className="reveal-up">
                        <SectionLabel>Our Mission</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2,
                            marginBottom: '1.25rem',
                            background: 'linear-gradient(135deg, #fff 40%, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            Illuminating Every Path, One Chart at a Time
                        </h2>
                        <p style={{ color: 'rgba(200,185,230,0.65)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                            Nakshatra's mission is to make authentic Vedic guidance accessible — free from superstition,
                            free from fear, and grounded in genuine scholarship. We believe every person deserves
                            a clear, compassionate reading of their cosmic story.
                        </p>
                        <p style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.9rem', lineHeight: 1.9 }}>
                            We do not predict doom. We illuminate possibility. Every consultation is a collaboration
                            between ancient celestial wisdom and your own agency as the author of your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── VALUES ───────────────────────────────────────────── */}
            <section style={{
                padding: '6rem 1.5rem',
                background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.06), transparent)',
                borderTop: '1px solid rgba(139,92,246,0.1)',
                borderBottom: '1px solid rgba(139,92,246,0.1)',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Our Values</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>The Principles That Guide Us</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
                        {VALUES.map((v, i) => (
                            <motion.div
                                key={v.title}
                                className="reveal-up"
                                whileHover={{ y: -8, borderColor: 'rgba(192,132,252,0.45)', boxShadow: '0 20px 50px rgba(124,58,237,0.25)' }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(192,132,252,0.03))',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    borderRadius: '20px', padding: '2rem',
                                    textAlign: 'center', willChange: 'transform',
                                }}
                            >
                                <motion.div
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                                    style={{
                                        fontSize: '2rem', marginBottom: '1rem',
                                        filter: 'drop-shadow(0 0 12px rgba(192,132,252,0.6))',
                                    }}
                                >{v.icon}</motion.div>
                                <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{v.title}</div>
                                <p style={{ color: 'rgba(200,185,230,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TIMELINE ─────────────────────────────────────────── */}
            <section style={{ padding: '7rem 1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <SectionLabel>Our Journey</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>A Decade of Cosmic Guidance</h2>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="reveal-up" style={{ display: 'block' }}>
                        {MILESTONES.map((m, i) => (
                            <TimelineItem key={m.year} milestone={m} index={i} isLast={i === MILESTONES.length - 1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ─────────────────────────────────────────────── */}
            <section style={{
                padding: '7rem 1.5rem',
                background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.05), transparent)',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>Meet the Practitioners</SectionLabel>
                        <h2 style={{
                            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            marginBottom: '0.75rem',
                        }}>The Minds Behind the Wisdom</h2>
                        <p style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
                            Each practitioner brings decades of rigorous study and thousands of real consultations to your session.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section style={{ padding: '5rem 1.5rem 8rem' }}>
                <div className="reveal-up" style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <motion.div
                        whileHover={{ boxShadow: '0 30px 80px rgba(124,58,237,0.35)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.28), rgba(192,132,252,0.1))',
                            border: '1px solid rgba(139,92,246,0.35)',
                            borderRadius: '28px', padding: 'clamp(2.5rem, 5vw, 4rem)',
                            textAlign: 'center', position: 'relative', overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(124,58,237,0.18)',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: '-80px', right: '-60px',
                            width: '240px', height: '240px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(192,132,252,0.18), transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-60px', left: '-40px',
                            width: '200px', height: '200px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
                            pointerEvents: 'none',
                        }} />

                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ fontSize: '3rem', marginBottom: '1rem', display: 'inline-block' }}
                        >✦</motion.div>

                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800,
                            fontFamily: "'Cormorant Garamond', serif",
                            background: 'linear-gradient(135deg, #fff, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem',
                        }}>Ready to Know Your Chart?</h2>
                        <p style={{
                            color: 'rgba(200,185,230,0.62)', fontSize: '1rem',
                            lineHeight: 1.8, maxWidth: '420px', margin: '0 auto 2.5rem',
                        }}>
                            Connect with one of our practitioners and receive a reading crafted exclusively for your birth data, aspirations, and questions.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.65)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '0.85rem 2.2rem',
                                    background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                                    border: 'none', borderRadius: '50px',
                                    color: '#fff', fontSize: '0.95rem', fontWeight: 700,
                                    cursor: 'pointer', letterSpacing: '0.04em',
                                    boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                                }}
                            >
                                Book a Free Consultation
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(139,92,246,0.25)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '0.85rem 2.2rem',
                                    background: 'transparent',
                                    border: '1px solid rgba(139,92,246,0.4)',
                                    borderRadius: '50px', color: 'rgba(200,185,230,0.8)',
                                    fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                View Services
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
