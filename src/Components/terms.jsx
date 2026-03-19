import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom/cjs/react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        id: 'acceptance',
        icon: '✦',
        title: 'Acceptance of Terms',
        accentColor: '#c084fc',
        content: [
            {
                subtitle: 'Agreement to Terms',
                body: 'By accessing or using the Purple Celestia website and any of its services, you confirm that you are at least 18 years of age and agree to be bound by these Terms of Use. If you do not agree to any part of these terms, please discontinue use of our services immediately.',
            },
            {
                subtitle: 'Modifications',
                body: 'We reserve the right to update these Terms of Use at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services after any changes constitutes your acceptance of the new terms.',
            },
        ],
    },
    {
        id: 'services',
        icon: '♈',
        title: 'Nature of Our Services',
        accentColor: '#f472b6',
        content: [
            {
                subtitle: 'Entertainment & Guidance Only',
                body: 'All astrology, numerology, Vastu, tarot, and related services provided by Purple Celestia are intended for entertainment, personal reflection, and general guidance purposes only. They do not constitute professional advice of any kind — including but not limited to medical, legal, financial, or psychological advice.',
            },
            {
                subtitle: 'No Guarantees',
                body: 'We make no warranties, expressed or implied, that any reading, prediction, or recommendation will prove accurate, complete, or applicable to your specific circumstances. Outcomes cannot be guaranteed, and results will vary between individuals.',
            },
            {
                subtitle: 'Personal Responsibility',
                body: 'You acknowledge that all decisions made based on information received through our services are made at your own discretion and risk. Purple Celestia shall not be held liable for any decisions or actions taken as a result of a consultation.',
            },
        ],
    },
    {
        id: 'conduct',
        icon: '☽',
        title: 'User Conduct',
        accentColor: '#34d399',
        content: [
            {
                subtitle: 'Prohibited Activities',
                body: 'You agree not to use our services to harass, abuse, or harm others; to impersonate any person or entity; to transmit false or misleading information; to attempt to gain unauthorised access to our systems; or to use our content for commercial purposes without our written consent.',
            },
            {
                subtitle: 'Accurate Information',
                body: 'You agree to provide accurate, current, and complete information when booking consultations or submitting forms. Inaccurate birth data or personal information may significantly affect the quality of your reading, and no refund will be issued on this basis.',
            },
        ],
    },
    {
        id: 'ip',
        icon: '◈',
        title: 'Intellectual Property',
        accentColor: '#fbbf24',
        content: [
            {
                subtitle: 'Our Content',
                body: 'All content on this website — including text, graphics, logos, icons, audio clips, and software — is the property of Purple Celestia or its content suppliers and is protected by applicable copyright and intellectual property laws.',
            },
            {
                subtitle: 'Your Reports',
                body: 'Written reports and readings prepared specifically for you are for your personal, non-commercial use only. You may not reproduce, distribute, republish, or create derivative works from any consultation content without our prior written consent.',
            },
            {
                subtitle: 'Feedback',
                body: 'Any feedback, suggestions, or ideas you share with us may be used by Purple Celestia freely and without obligation or compensation to you.',
            },
        ],
    },
    {
        id: 'payments',
        icon: '♀',
        title: 'Payments & Refunds',
        accentColor: '#67e8f9',
        content: [
            {
                subtitle: 'Payment Terms',
                body: 'All consultation fees are payable in advance of the session unless otherwise agreed. Prices are listed in Indian Rupees (INR) and are subject to change without prior notice. Payment confirms your acceptance of these terms.',
            },
            {
                subtitle: 'Cancellations',
                body: 'Cancellations made more than 24 hours before a scheduled session are eligible for a full refund or rescheduling at no additional cost. Cancellations within 24 hours of the session may incur a 50% cancellation fee.',
            },
            {
                subtitle: 'No-Shows',
                body: 'If you fail to attend a scheduled session without prior notice, the full session fee will be forfeited. We will attempt to contact you once to reschedule; a second no-show will result in termination of booking privileges.',
            },
        ],
    },
    {
        id: 'liability',
        icon: '♄',
        title: 'Limitation of Liability',
        accentColor: '#f87171',
        content: [
            {
                subtitle: 'Maximum Liability',
                body: "To the fullest extent permitted by applicable law, Purple Celestia's total liability to you for any claims arising from or related to these Terms or our services shall not exceed the amount you paid for the specific service giving rise to the claim.",
            },
            {
                subtitle: 'Exclusion of Damages',
                body: 'Purple Celestia shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, loss of data, loss of goodwill, or emotional distress — arising from your use of or inability to use our services.',
            },
            {
                subtitle: 'Indemnification',
                body: 'You agree to indemnify and hold harmless Purple Celestia, its practitioners, employees, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from your violation of these Terms or your misuse of our services.',
            },
        ],
    },
    {
        id: 'governing',
        icon: '☿',
        title: 'Governing Law',
        accentColor: '#c084fc',
        content: [
            {
                subtitle: 'Jurisdiction',
                body: 'These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Gurugram, Uttar Pradesh.',
            },
            {
                subtitle: 'Dispute Resolution',
                body: 'Before initiating any legal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at legal@Purple Celestia.in. We will endeavour to resolve any complaint or dispute within 30 days of receipt.',
            },
        ],
    },
];

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
                <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: `${section.accentColor}18`,
                    border: `1px solid ${section.accentColor}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', color: section.accentColor,
                    filter: `drop-shadow(0 0 8px ${section.accentColor}55)`,
                }}>{section.icon}</div>
                <h2 style={{
                    color: '#e2d9f3', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                    fontWeight: 800, fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.01em',
                }}>{section.title}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingLeft: '3.25rem' }}>
                {section.content.map((block, i) => (
                    <div key={i}>
                        <div style={{
                            color: section.accentColor, fontSize: '0.8rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
                        }}>{block.subtitle}</div>
                        <p style={{
                            color: 'rgba(200,185,230,0.65)', fontSize: '0.9rem', lineHeight: 1.85, margin: 0,
                        }}>{block.body}</p>
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
            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .fromTo(titleRef.current, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 })
                .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{
            background: '#050212', minHeight: '100vh',
            color: '#e2d9f3', fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden',
        }}>

            {/* ── Hero ── */}
            <section style={{
                position: 'relative', padding: '10rem 1.5rem 5rem',
                textAlign: 'center', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '700px', height: '400px', borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'backOut' }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.35rem 1.1rem', borderRadius: '30px',
                        border: '1px solid rgba(192,132,252,0.3)',
                        background: 'rgba(124,58,237,0.1)',
                        color: '#c084fc', fontSize: '0.75rem', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        marginBottom: '1.5rem',
                    }}
                >✦ Legal</motion.div>

                <h1
                    ref={titleRef}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800,
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #ffffff 30%, #c084fc)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}
                >Terms of Use</h1>

                <p
                    ref={subtitleRef}
                    style={{
                        color: 'rgba(200,185,230,0.55)', fontSize: '0.9rem',
                        maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.8,
                    }}
                >
                    Please read these terms carefully before using our services.
                    By proceeding, you agree to be bound by them.
                </p>

                <p style={{ color: 'rgba(200,185,230,0.3)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>
                    Last updated: March 2026
                </p>
            </section>

            {/* ── Content ── */}
            <section style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem 8rem' }}>

                {/* Disclaimer banner */}
                <div style={{
                    padding: '1.25rem 1.5rem', borderRadius: '14px',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                    marginBottom: '3rem',
                }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>⚠</span>
                    <p style={{ color: 'rgba(200,185,230,0.65)', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>
                        <strong style={{ color: '#fbbf24' }}>Important: </strong>
                        Our services are for entertainment and personal guidance only and do not constitute
                        professional medical, legal, or financial advice. Please read Section 2 carefully.
                    </p>
                </div>

                {/* TOC */}
                <div style={{
                    background: 'rgba(124,58,237,0.07)',
                    border: '1px solid rgba(139,92,246,0.18)',
                    borderRadius: '18px', padding: '1.5rem 2rem', marginBottom: '3.5rem',
                }}>
                    <div style={{
                        color: '#c084fc', fontSize: '0.72rem', fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem',
                    }}>Contents</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {SECTIONS.map((s, i) => (
                            <a key={s.id} href={`#${s.id}`} style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#c084fc' }}
                                    style={{
                                        color: 'rgba(200,185,230,0.5)', fontSize: '0.8rem',
                                        padding: '0.25rem 0.75rem', borderRadius: '20px',
                                        background: 'rgba(139,92,246,0.08)',
                                        border: '1px solid rgba(139,92,246,0.15)',
                                        cursor: 'pointer', transition: 'color 0.2s',
                                        display: 'inline-block',
                                    }}
                                >{i + 1}. {s.title}</motion.span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Sections */}
                {SECTIONS.map((section, i) => (
                    <div key={section.id} id={section.id}>
                        <TermsSection section={section} />
                        {i < SECTIONS.length - 1 && (
                            <div style={{
                                height: '1px', margin: '0 0 3rem',
                                background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)',
                            }} />
                        )}
                    </div>
                ))}

                {/* Bottom CTA */}
                <div style={{
                    marginTop: '2rem', padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(192,132,252,0.04))',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: '20px',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'space-between', gap: '1.5rem',
                }}>
                    <div>
                        <div style={{ color: '#e2d9f3', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                            Questions about these terms?
                        </div>
                        <div style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.85rem' }}>
                            Write to us at{' '}
                            <a href="mailto:legal@Purple Celestia.in" style={{ color: '#c084fc', textDecoration: 'none' }}>
                                legal@Purple Celestia.in
                            </a>
                        </div>
                    </div>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(124,58,237,0.45)' }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '0.7rem 1.6rem',
                                background: 'linear-gradient(135deg, #7c3aed, #9f5cf5)',
                                border: 'none', borderRadius: '50px',
                                color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                                cursor: 'pointer', letterSpacing: '0.04em',
                            }}
                        >Contact Us →</motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
