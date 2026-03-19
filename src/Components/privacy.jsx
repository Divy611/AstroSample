import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom/cjs/react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        id: 'collect',
        icon: '◈',
        title: 'Information We Collect',
        accentColor: '#c084fc',
        content: [
            {
                subtitle: 'Personal Information',
                body: 'When you book a consultation or contact us, we collect your full name, email address, phone number, and birth details (date, time, and place of birth) where relevant to the service requested.',
            },
            {
                subtitle: 'Usage Data',
                body: 'We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This data is collected via cookies and similar tracking technologies.',
            },
            {
                subtitle: 'Communication Records',
                body: 'We retain records of your correspondence with us — including emails, WhatsApp messages, and form submissions — to maintain continuity of service and for quality assurance purposes.',
            },
        ],
    },
    {
        id: 'use',
        icon: '✦',
        title: 'How We Use Your Information',
        accentColor: '#67e8f9',
        content: [
            {
                subtitle: 'Service Delivery',
                body: 'Your personal and birth data is used exclusively to prepare and deliver the consultation or written report you have requested. This information is accessed only by the assigned practitioner.',
            },
            {
                subtitle: 'Communication',
                body: 'We use your contact details to confirm bookings, send appointment reminders, deliver written reports, and respond to your enquiries. We do not send unsolicited marketing communications without your explicit consent.',
            },
            {
                subtitle: 'Website Improvement',
                body: 'Aggregated, anonymised usage data helps us understand how visitors interact with our site, enabling us to improve performance, content, and user experience.',
            },
        ],
    },
    {
        id: 'share',
        icon: '☽',
        title: 'Information Sharing & Disclosure',
        accentColor: '#f472b6',
        content: [
            {
                subtitle: 'No Third-Party Sale',
                body: 'We never sell, rent, or trade your personal information to any third party for commercial purposes. Your data is not a product.',
            },
            {
                subtitle: 'Service Providers',
                body: 'We may share limited data with trusted service providers (such as payment processors and email delivery services) strictly to facilitate our services. These providers are contractually obligated to protect your data and may not use it for any other purpose.',
            },
            {
                subtitle: 'Legal Obligations',
                body: 'We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect our rights or the safety of others.',
            },
        ],
    },
    {
        id: 'security',
        icon: '♄',
        title: 'Data Security',
        accentColor: '#34d399',
        content: [
            {
                subtitle: 'Encryption & Storage',
                body: 'All personal data transmitted to our servers is encrypted using TLS (Transport Layer Security). Stored data is protected by industry-standard encryption protocols and access controls.',
            },
            {
                subtitle: 'Access Controls',
                body: 'Access to your personal data is restricted to practitioners and staff members who require it to deliver your requested service. All staff are bound by confidentiality agreements.',
            },
            {
                subtitle: 'Breach Notification',
                body: 'In the unlikely event of a data breach that affects your personal information, we will notify you within 72 hours of becoming aware of the incident, in accordance with applicable data protection law.',
            },
        ],
    },
    {
        id: 'rights',
        icon: '♀',
        title: 'Your Rights',
        accentColor: '#fbbf24',
        content: [
            {
                subtitle: 'Access & Portability',
                body: 'You have the right to request a copy of all personal data we hold about you, in a structured, machine-readable format.',
            },
            {
                subtitle: 'Correction & Deletion',
                body: 'You may request correction of inaccurate data or complete deletion of your personal information at any time by contacting us at privacy@purplecelestia.in. We will process your request within 30 days.',
            },
            {
                subtitle: 'Withdrawal of Consent',
                body: 'Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of processing carried out prior to withdrawal.',
            },
        ],
    },
    {
        id: 'cookies',
        icon: '☿',
        title: 'Cookies',
        accentColor: '#c084fc',
        content: [
            {
                subtitle: 'What We Use',
                body: 'We use essential cookies (required for the site to function), analytical cookies (to understand usage patterns), and preference cookies (to remember your settings). We do not use advertising or tracking cookies.',
            },
            {
                subtitle: 'Your Control',
                body: 'You may disable cookies through your browser settings at any time. Note that disabling essential cookies may affect the functionality of certain features on our site.',
            },
        ],
    },
];

function PolicySection({ section, index }) {
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
            {/* Section header */}
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

            {/* Content blocks */}
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

export default function PrivacyPolicy() {
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
                >Privacy Policy</h1>

                <p
                    ref={subtitleRef}
                    style={{
                        color: 'rgba(200,185,230,0.55)', fontSize: '0.9rem',
                        maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.8,
                    }}
                >
                    Your trust is sacred to us. This policy explains what we collect,
                    why we collect it, and how we protect it.
                </p>

                <p style={{ color: 'rgba(200,185,230,0.3)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>
                    Last updated: March 2026
                </p>
            </section>

            {/* ── Content ── */}
            <section style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem 8rem' }}>

                {/* Quick-nav TOC */}
                <div style={{
                    background: 'rgba(124,58,237,0.07)',
                    border: '1px solid rgba(139,92,246,0.18)',
                    borderRadius: '18px', padding: '1.5rem 2rem',
                    marginBottom: '3.5rem',
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
                        <PolicySection section={section} index={i} />
                        {i < SECTIONS.length - 1 && (
                            <div style={{
                                height: '1px', margin: '0 0 3rem',
                                background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)',
                            }} />
                        )}
                    </div>
                ))}

                {/* Contact block */}
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
                            Questions about this policy?
                        </div>
                        <div style={{ color: 'rgba(200,185,230,0.5)', fontSize: '0.85rem' }}>
                            Write to us at{' '}
                            <a href="mailto:privacy@purplecelestia.in" style={{ color: '#c084fc', textDecoration: 'none' }}>
                                privacy@purplecelestia.in
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