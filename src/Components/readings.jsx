import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Astrology', 'Numerology', 'Vastu', 'Tarot', 'Muhurta'];

const READINGS = [
    {
        id: 1,
        category: 'Astrology',
        title: 'The Saturn Return: Why Your Late 20s Feel Like a Crisis',
        excerpt: 'Saturn takes approximately 29.5 years to complete one full orbit. When it returns to the exact position it occupied at your birth, the universe demands a reckoning — and most people feel it deeply.',
        readTime: '8 min read',
        date: 'March 14, 2026',
        author: 'Pandit Arvind Shastri',
        authorInitial: 'A',
        authorGradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
        tags: ['Saturn', 'Life Cycles', 'Karma'],
        featured: true,
        icon: '♄',
        accentColor: '#c084fc',
    },
    {
        id: 2,
        category: 'Numerology',
        title: 'Your Life Path Number: The Master Blueprint of Your Soul',
        excerpt: 'Derived from your full date of birth, the Life Path number is the most significant figure in Numerology — revealing your innate traits, core challenges, and the overarching theme of your incarnation.',
        readTime: '6 min read',
        date: 'March 10, 2026',
        author: 'Dr. Meera Nambiar',
        authorInitial: 'M',
        authorGradient: 'linear-gradient(135deg, #db2777, #f472b6)',
        tags: ['Life Path', 'Identity', 'Destiny'],
        featured: true,
        icon: '✦',
        accentColor: '#f472b6',
    },
    {
        id: 3,
        category: 'Vastu',
        title: 'The North-East Corner: Why It Is the Most Sacred Zone in Your Home',
        excerpt: 'In Vastu Shastra, the Ishanya (north-east) corner is governed by Jupiter and considered the seat of divine energy. Keeping this zone clear and clean can profoundly influence mental clarity and spiritual growth.',
        readTime: '5 min read',
        date: 'March 6, 2026',
        author: 'Vastu Acharya Suresh Pillai',
        authorInitial: 'S',
        authorGradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
        tags: ['Vastu Tips', 'Home Energy', 'Directions'],
        featured: false,
        icon: '⌂',
        accentColor: '#34d399',
    },
    {
        id: 4,
        category: 'Tarot',
        title: 'The Tower Card: Destruction as Liberation',
        excerpt: 'Few cards in the Major Arcana provoke as much anxiety as The Tower. Yet seasoned readers know it as one of the most liberating cards in the deck — a cosmic forced renovation of everything that no longer serves you.',
        readTime: '7 min read',
        date: 'March 3, 2026',
        author: 'Dr. Meera Nambiar',
        authorInitial: 'M',
        authorGradient: 'linear-gradient(135deg, #db2777, #f472b6)',
        tags: ['Major Arcana', 'Change', 'Transformation'],
        featured: false,
        icon: '☽',
        accentColor: '#fbbf24',
    },
    {
        id: 5,
        category: 'Astrology',
        title: 'Rahu and Ketu: The Shadow Planets That Shape Your Karma',
        excerpt: 'Unlike the other planets in Vedic astrology, Rahu and Ketu are mathematical points — the lunar nodes where eclipses occur. Their placement in your chart reveals the karmic axis of your soul\'s evolution across lifetimes.',
        readTime: '10 min read',
        date: 'Feb 27, 2026',
        author: 'Pandit Arvind Shastri',
        authorInitial: 'A',
        authorGradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
        tags: ['Rahu', 'Ketu', 'Karma', 'Lunar Nodes'],
        featured: false,
        icon: '☊',
        accentColor: '#c084fc',
    },
    {
        id: 6,
        category: 'Muhurta',
        title: 'Why Monday Is Not Always Good for Starting a Business',
        excerpt: 'Popular wisdom assigns the days of the week fixed auspicious qualities, but Muhurta science is far more nuanced. The Panchanga — a five-limbed Vedic almanac — evaluates Tithi, Vara, Nakshatra, Yoga, and Karana simultaneously.',
        readTime: '6 min read',
        date: 'Feb 22, 2026',
        author: 'Rishika Anand',
        authorInitial: 'R',
        authorGradient: 'linear-gradient(135deg, #d97706, #fcd34d)',
        tags: ['Panchanga', 'Timing', 'Business'],
        featured: false,
        icon: '☿',
        accentColor: '#67e8f9',
    },
    {
        id: 7,
        category: 'Numerology',
        title: 'Master Numbers 11, 22, 33: The Path of the Old Soul',
        excerpt: 'In classical Numerology, most life path numbers are reduced to a single digit. But 11, 22, and 33 are never reduced — they carry a double-digit vibration of exceptional intensity, opportunity, and spiritual responsibility.',
        readTime: '9 min read',
        date: 'Feb 18, 2026',
        author: 'Dr. Meera Nambiar',
        authorInitial: 'M',
        authorGradient: 'linear-gradient(135deg, #db2777, #f472b6)',
        tags: ['Master Numbers', 'Spiritual Path', 'Advanced'],
        featured: false,
        icon: '✦',
        accentColor: '#f472b6',
    },
    {
        id: 8,
        category: 'Astrology',
        title: 'Venus in the 7th House: Love, Contracts, and the Public Self',
        excerpt: 'The 7th house is the house of partnerships — marriage, business alliances, and all one-on-one relationships. When Venus graces this house in the natal chart, it bestows charm, a magnetic social presence, and a deep longing for union.',
        readTime: '7 min read',
        date: 'Feb 14, 2026',
        author: 'Rishika Anand',
        authorInitial: 'R',
        authorGradient: 'linear-gradient(135deg, #d97706, #fcd34d)',
        tags: ['Venus', 'Houses', 'Relationships'],
        featured: false,
        icon: '♀',
        accentColor: '#c084fc',
    },
    {
        id: 9,
        category: 'Vastu',
        title: 'Colour Psychology Meets Vastu: Painting Your Rooms Right',
        excerpt: 'Every colour carries a specific vibrational frequency that interacts with both the five elements and the directional energies of your space. Choosing the wrong colour for a room\'s Vastu zone can subtly but persistently drain the energy of its occupants.',
        readTime: '5 min read',
        date: 'Feb 10, 2026',
        author: 'Vastu Acharya Suresh Pillai',
        authorInitial: 'S',
        authorGradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
        tags: ['Colours', 'Interior', 'Elements'],
        featured: false,
        icon: '⌂',
        accentColor: '#34d399',
    },
];

const FEATURED = READINGS.filter((r) => r.featured);

// ─── Reusable ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: '30px',
            border: '1px solid rgba(192,132,252,0.3)',
            background: 'rgba(124,58,237,0.1)',
            color: '#c084fc', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '1rem',
        }}>
            <span>✦</span> {children}
        </div>
    );
}

function StarField({ count = 50 }) {
    const stars = useRef(
        Array.from({ length: count }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }))
    ).current;

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {stars.map((s) => (
                <motion.div
                    key={s.id}
                    animate={{ opacity: [0.05, 0.55, 0.05] }}
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

// ─── Featured Card ─────────────────────────────────────────────────────────

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
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.article
            ref={ref}
            whileHover={{ y: -8, boxShadow: `0 28px 70px ${reading.accentColor}33` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.15), rgba(192,132,252,0.04))',
                border: '1px solid rgba(139,92,246,0.22)',
                borderRadius: '26px', overflow: 'hidden',
                cursor: 'pointer', willChange: 'transform',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {/* Top accent bar */}
            <div style={{
                height: '4px',
                background: `linear-gradient(90deg, ${reading.accentColor}, ${reading.accentColor}44)`,
            }} />

            <div style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Icon + Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
                    <div style={{
                        width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0,
                        background: `${reading.accentColor}18`,
                        border: `1px solid ${reading.accentColor}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem',
                        filter: `drop-shadow(0 0 10px ${reading.accentColor}66)`,
                    }}>{reading.icon}</div>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.7rem', borderRadius: '20px',
                            background: `${reading.accentColor}18`,
                            border: `1px solid ${reading.accentColor}33`,
                            color: reading.accentColor,
                            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}>{reading.category}</div>
                        <div style={{
                            marginTop: '0.25rem',
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            marginLeft: '0.5rem',
                            padding: '0.15rem 0.6rem', borderRadius: '20px',
                            background: 'rgba(124,58,237,0.12)',
                            border: '1px solid rgba(139,92,246,0.2)',
                            color: '#c084fc', fontSize: '0.68rem', fontWeight: 600,
                        }}>⭐ Featured</div>
                    </div>
                </div>

                {/* Title */}
                <h3 style={{
                    color: '#e2d9f3', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                    fontWeight: 800, lineHeight: 1.35,
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: '0.85rem', letterSpacing: '0.01em',
                }}>{reading.title}</h3>

                {/* Excerpt */}
                <p style={{
                    color: 'rgba(200,185,230,0.62)', fontSize: '0.875rem',
                    lineHeight: 1.8, flexGrow: 1, marginBottom: '1.5rem',
                }}>{reading.excerpt}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {reading.tags.map((tag) => (
                        <span key={tag} style={{
                            padding: '0.2rem 0.65rem', borderRadius: '20px',
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.2)',
                            color: 'rgba(200,185,230,0.6)', fontSize: '0.72rem', fontWeight: 500,
                        }}>#{tag}</span>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(139,92,246,0.15)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                            background: reading.authorGradient,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: '0.8rem',
                            boxShadow: `0 0 12px ${reading.accentColor}44`,
                        }}>{reading.authorInitial}</div>
                        <div>
                            <div style={{ color: '#e2d9f3', fontSize: '0.78rem', fontWeight: 600 }}>{reading.author}</div>
                            <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.7rem' }}>{reading.date}</div>
                        </div>
                    </div>
                    <div style={{ color: 'rgba(200,185,230,0.4)', fontSize: '0.75rem' }}>{reading.readTime}</div>
                </div>
            </div>
        </motion.article>
    );
}

// ─── Reading Card ──────────────────────────────────────────────────────────

const readingCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
};

function ReadingCard({ reading, index }) {
    return (
        <motion.article
            variants={readingCardVariants}
            layout
            whileHover={{ y: -6, borderColor: `${reading.accentColor}44`, boxShadow: `0 20px 55px ${reading.accentColor}22` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
                background: 'rgba(5,2,18,0.6)',
                border: '1px solid rgba(139,92,246,0.18)',
                borderRadius: '20px', overflow: 'hidden',
                cursor: 'pointer', willChange: 'transform',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {/* Accent top line */}
            <div style={{
                height: '2px',
                background: `linear-gradient(90deg, ${reading.accentColor}88, transparent)`,
            }} />

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Category row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{
                        padding: '0.18rem 0.65rem', borderRadius: '20px',
                        background: `${reading.accentColor}15`,
                        border: `1px solid ${reading.accentColor}30`,
                        color: reading.accentColor,
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em',
                        textTransform: 'uppercase',
                    }}>{reading.category}</span>
                    <span style={{
                        fontSize: '1.4rem',
                        filter: `drop-shadow(0 0 8px ${reading.accentColor}66)`,
                    }}>{reading.icon}</span>
                </div>

                {/* Title */}
                <h3 style={{
                    color: '#e2d9f3', fontSize: '1rem', fontWeight: 700,
                    lineHeight: 1.45, marginBottom: '0.7rem',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.01em',
                }}>{reading.title}</h3>

                {/* Excerpt */}
                <p style={{
                    color: 'rgba(200,185,230,0.55)', fontSize: '0.835rem',
                    lineHeight: 1.75, flexGrow: 1, marginBottom: '1.25rem',
                    display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{reading.excerpt}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {reading.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{
                            padding: '0.15rem 0.55rem', borderRadius: '20px',
                            background: 'rgba(139,92,246,0.08)',
                            border: '1px solid rgba(139,92,246,0.18)',
                            color: 'rgba(200,185,230,0.5)', fontSize: '0.68rem',
                        }}>#{tag}</span>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem', borderTop: '1px solid rgba(139,92,246,0.12)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                            background: reading.authorGradient,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: '0.72rem',
                        }}>{reading.authorInitial}</div>
                        <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.72rem' }}>{reading.author.split(' ').slice(-1)[0]}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: 'rgba(200,185,230,0.35)', fontSize: '0.7rem' }}>{reading.readTime}</span>
                        <motion.span
                            whileHover={{ x: 3 }}
                            style={{ color: reading.accentColor, fontSize: '0.85rem' }}
                        >→</motion.span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ─── Article Modal ─────────────────────────────────────────────────────────

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
    // Lock body scroll while modal is open
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 2000,
                background: 'rgba(5,2,18,0.88)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                padding: '2rem 1rem', overflowY: 'auto',
            }}
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: '780px',
                    background: 'linear-gradient(160deg, #0d0824, #08051a)',
                    border: `1px solid ${reading.accentColor}44`,
                    borderRadius: '28px', overflow: 'hidden',
                    boxShadow: `0 40px 100px ${reading.accentColor}33, 0 0 0 1px rgba(139,92,246,0.1)`,
                    marginTop: '4rem',
                }}
            >
                {/* Accent bar */}
                <div style={{
                    height: '4px',
                    background: `linear-gradient(90deg, ${reading.accentColor}, ${reading.accentColor}33)`,
                }} />

                <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    {/* Close */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                        <motion.button
                            whileHover={{ scale: 1.1, background: 'rgba(139,92,246,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: 'rgba(139,92,246,0.1)',
                                border: '1px solid rgba(139,92,246,0.25)',
                                color: 'rgba(200,185,230,0.8)', fontSize: '1.2rem',
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                            }}
                        >×</motion.button>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                        <span style={{
                            padding: '0.22rem 0.75rem', borderRadius: '20px',
                            background: `${reading.accentColor}18`,
                            border: `1px solid ${reading.accentColor}33`,
                            color: reading.accentColor,
                            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}>{reading.category}</span>
                        <span style={{ color: 'rgba(200,185,230,0.35)', fontSize: '0.75rem' }}>·</span>
                        <span style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>{reading.readTime}</span>
                        <span style={{ color: 'rgba(200,185,230,0.35)', fontSize: '0.75rem' }}>·</span>
                        <span style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>{reading.date}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                        color: '#e2d9f3', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                        fontWeight: 800, lineHeight: 1.25,
                        fontFamily: "'Cormorant Garamond', serif",
                        marginBottom: '1.5rem', letterSpacing: '0.01em',
                    }}>{reading.title}</h2>

                    {/* Author */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        padding: '1rem 1.25rem', borderRadius: '14px',
                        background: 'rgba(124,58,237,0.08)',
                        border: '1px solid rgba(139,92,246,0.15)',
                        marginBottom: '2.5rem',
                    }}>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                            background: reading.authorGradient,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: '1rem',
                            boxShadow: `0 0 14px ${reading.accentColor}44`,
                        }}>{reading.authorInitial}</div>
                        <div>
                            <div style={{ color: '#e2d9f3', fontWeight: 600, fontSize: '0.9rem' }}>{reading.author}</div>
                            <div style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.75rem' }}>Nakshatra Practitioner · {reading.date}</div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{
                        height: '1px', marginBottom: '2.5rem',
                        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
                    }} />

                    {/* Body — full excerpt as a stand-in for article content */}
                    <div style={{ color: 'rgba(200,185,230,0.75)', fontSize: '1rem', lineHeight: 2, marginBottom: '2rem' }}>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', color: 'rgba(226,217,243,0.85)' }}>
                            {reading.excerpt}
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            In the classical Vedic tradition, this phenomenon has been observed, documented, and counselled across
                            thousands of years of continuous practice. The ancient rishis were not merely stargazers — they were
                            scientists of consciousness, mapping the relationship between celestial events and human experience
                            with extraordinary precision.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Modern practitioners bring this same rigour to every reading, combining traditional textual sources —
                            the Brihat Parashara Hora Shastra, the Jataka Parijata, the Saravali — with contemporary psychological
                            insight to offer guidance that is both cosmically grounded and practically actionable.
                        </p>

                        {/* Pull quote */}
                        <div style={{
                            margin: '2.5rem 0', padding: '1.75rem 2rem',
                            borderLeft: `4px solid ${reading.accentColor}`,
                            background: `${reading.accentColor}0d`,
                            borderRadius: '0 16px 16px 0',
                        }}>
                            <p style={{
                                color: '#e2d9f3', fontSize: '1.1rem', fontStyle: 'italic',
                                lineHeight: 1.75, fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 600,
                            }}>
                                "The cosmos does not impose fate — it illuminates tendency. The aware soul
                                uses this light to navigate, not to surrender."
                            </p>
                            <div style={{ color: reading.accentColor, fontSize: '0.8rem', fontWeight: 600, marginTop: '0.75rem' }}>
                                — {reading.author}
                            </div>
                        </div>

                        <p>
                            To explore how this principle applies specifically to your birth chart, we encourage you to book a
                            personalised consultation with one of our certified practitioners. Every chart is unique, and the
                            nuances of house placement, aspectual influence, and Dasha periods will yield insights that no
                            general article can provide.
                        </p>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                        {reading.tags.map((tag) => (
                            <span key={tag} style={{
                                padding: '0.25rem 0.75rem', borderRadius: '20px',
                                background: 'rgba(139,92,246,0.1)',
                                border: '1px solid rgba(139,92,246,0.2)',
                                color: 'rgba(200,185,230,0.6)', fontSize: '0.75rem',
                            }}>#{tag}</span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{
                        padding: '1.75rem 2rem', borderRadius: '18px',
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(192,132,252,0.06))',
                        border: '1px solid rgba(139,92,246,0.22)',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                        justifyContent: 'space-between', gap: '1.5rem',
                    }}>
                        <div>
                            <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                                Curious about your own chart?
                            </div>
                            <div style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.83rem' }}>
                                Book a personalised {reading.category} reading today.
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${reading.accentColor}55` }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '0.75rem 1.75rem',
                                background: `linear-gradient(135deg, ${reading.accentColor}cc, ${reading.accentColor}88)`,
                                border: 'none', borderRadius: '50px',
                                color: '#050212', fontSize: '0.88rem', fontWeight: 700,
                                cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap',
                            }}
                        >
                            Book a Reading →
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Newsletter Strip ──────────────────────────────────────────────────────

function NewsletterStrip() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
            );
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) setSubmitted(true);
    };

    return (
        <div ref={ref} style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(192,132,252,0.06))',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: '24px', padding: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '2rem',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: '-60px', right: '-60px',
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(192,132,252,0.15), transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{ maxWidth: '420px' }}>
                <div style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    ✦ Cosmic Dispatch
                </div>
                <h3 style={{
                    color: '#e2d9f3', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    fontWeight: 800, fontFamily: "'Cormorant Garamond', serif",
                    lineHeight: 1.3, marginBottom: '0.5rem',
                }}>
                    Receive Weekly Insights
                </h3>
                <p style={{ color: 'rgba(200,185,230,0.55)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    Planetary transits, lunar forecasts, and new readings — delivered to your inbox every Sunday.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '1rem 1.5rem', borderRadius: '14px',
                            background: 'rgba(16,185,129,0.12)',
                            border: '1px solid rgba(16,185,129,0.3)',
                            color: '#34d399', fontSize: '0.9rem', fontWeight: 600,
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>✦</span> You're aligned. Welcome aboard.
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            style={{
                                background: 'rgba(139,92,246,0.08)',
                                border: '1px solid rgba(139,92,246,0.25)',
                                borderRadius: '10px', padding: '0.7rem 1.1rem',
                                color: '#e2d9f3', fontSize: '0.875rem', outline: 'none',
                                minWidth: '220px', transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = 'rgba(192,132,252,0.6)')}
                            onBlur={(e) => (e.target.style.borderColor = 'rgba(139,92,246,0.25)')}
                        />
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(124,58,237,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            style={{
                                padding: '0.7rem 1.5rem',
                                background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                                border: 'none', borderRadius: '10px',
                                color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                                cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap',
                            }}
                        >
                            Subscribe ✦
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function Readings() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeReading, setActiveReading] = useState(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const gridRef = useRef(null);

    const filteredReadings = activeCategory === 'All'
        ? READINGS
        : READINGS.filter((r) => r.category === activeCategory);

    // Hero entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(titleRef.current, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, delay: 0.25 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.5');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // Generic reveal-up
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
                    position: 'relative', minHeight: '62vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <StarField count={55} />
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '900px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto' }}>
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
                        ✦ The Nakshatra Compendium
                    </motion.div>

                    <h1
                        ref={titleRef}
                        style={{
                            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800,
                            lineHeight: 1.1, letterSpacing: '-0.02em',
                            fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem',
                        }}
                    >
                        <span style={{
                            background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Wisdom Written</span>
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>in the Stars</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        style={{
                            fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', lineHeight: 1.85,
                            color: 'rgba(200,185,230,0.65)', maxWidth: '540px',
                            margin: '0 auto', fontWeight: 400,
                        }}
                    >
                        Deep-dive articles, practical guides, and cosmic perspectives from our master
                        practitioners — written to illuminate, not overwhelm.
                    </p>
                </div>
            </section>

            {/* ── FEATURED ─────────────────────────────────────────── */}
            <section style={{ padding: '3rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="reveal-up" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <SectionLabel>Editor's Picks</SectionLabel>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {FEATURED.map((r, i) => (
                        <div key={r.id} onClick={() => setActiveReading(r)} style={{ cursor: 'pointer' }}>
                            <FeaturedCard reading={r} index={i} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ALL READINGS ─────────────────────────────────────── */}
            <section
                ref={gridRef}
                style={{
                    padding: '2rem 1.5rem 6rem', maxWidth: '1200px', margin: '0 auto',
                    borderTop: '1px solid rgba(139,92,246,0.12)',
                }}
            >
                {/* Filter Bar */}
                <div className="reveal-up" style={{
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'space-between', gap: '1rem',
                    marginBottom: '3rem', paddingTop: '2rem',
                }}>
                    <div>
                        <SectionLabel>All Readings</SectionLabel>
                        <p style={{ color: 'rgba(200,185,230,0.45)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                            {filteredReadings.length} article{filteredReadings.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    {/* Category pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    padding: '0.4rem 1rem', borderRadius: '30px',
                                    background: activeCategory === cat
                                        ? 'linear-gradient(135deg, #7c3aed, #9f5cf5)'
                                        : 'rgba(139,92,246,0.08)',
                                    border: activeCategory === cat
                                        ? 'none'
                                        : '1px solid rgba(139,92,246,0.22)',
                                    color: activeCategory === cat ? '#fff' : 'rgba(200,185,230,0.65)',
                                    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                                    letterSpacing: '0.04em',
                                    boxShadow: activeCategory === cat ? '0 0 18px rgba(124,58,237,0.4)' : 'none',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Cards grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredReadings.map((r) => (
                            <div key={r.id} onClick={() => setActiveReading(r)} style={{ cursor: 'pointer' }}>
                                <ReadingCard reading={r} />
                            </div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                <AnimatePresence>
                    {filteredReadings.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(200,185,230,0.4)' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☽</div>
                            <div style={{ fontSize: '1rem' }}>No readings in this category yet.</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ── NEWSLETTER ───────────────────────────────────────── */}
            <section style={{ padding: '0 1.5rem 6rem', maxWidth: '1000px', margin: '0 auto' }}>
                <NewsletterStrip />
            </section>

            {/* ── ARTICLE MODAL ────────────────────────────────────── */}
            <AnimatePresence>
                {activeReading && (
                    <ArticleModal
                        key={activeReading.id}
                        reading={activeReading}
                        onClose={() => setActiveReading(null)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
