import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CelestialField, SectionLabel } from './widgets';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VALUES, TEAM, MILESTONES, WHATSAPP_URL } from './values';

gsap.registerPlugin(ScrollTrigger);

function TeamCard({ member, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                { delay: index * 0.1, scrollTrigger: { trigger: el, start: 'top 88%' }, opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <motion.div ref={ref} whileHover={{ y: -10, borderColor: 'rgba(167,139,250,0.45)', boxShadow: '0 20px 56px rgba(124,92,191,0.12)', transition: { duration: 0.3, ease: 'easeOut' } }} style={{ background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '24px', overflow: 'hidden', willChange: 'transform', boxShadow: '0 4px 24px rgba(124,92,191,0.06)' }}>
            <div style={{ padding: '2rem 2rem 1.5rem', background: 'linear-gradient(135deg, rgba(245,240,255,0.9), rgba(255,255,255,0.95))', borderBottom: '1px solid rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '65px', height: '65px', borderRadius: '50%', flexShrink: 0, background: member.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.5rem', boxShadow: '0 4px 18px rgba(124,92,191,0.25)' }}>{member.avatar}</div>
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
                <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03, background: 'rgba(167,139,250,0.15)', boxShadow: '0 4px 20px rgba(124,92,191,0.18)' }} whileTap={{ scale: 0.97 }} style={{ marginTop: '1.5rem', width: '100%', padding: '0.65rem', background: 'rgba(167,139,250,0.08)', border: '1.5px solid rgba(167,139,250,0.25)', borderRadius: '10px', color: '#7c5cbf', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Book a Session on WhatsApp
                </motion.a>
            </div>
        </motion.div>
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
                { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
            );
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0, transformOrigin: 'top' },
                    { scaleY: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
                );
            }
        });
        return () => ctx.revert();
    }, [isEven]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', marginBottom: 0 }}>
            <div style={{ padding: '0 2rem 3rem 0', textAlign: 'right' }}>
                {isEven ? <div ref={ref}><TimelineContent milestone={milestone} /></div> : <div />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div whileHover={{ scale: 1.3, boxShadow: '0 0 20px rgba(167,139,250,0.5)' }} style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', border: '3px solid #faf9f7', boxShadow: '0 0 10px rgba(167,139,250,0.35)', zIndex: 1, marginTop: '0.35rem' }} />
                {!isLast && <div ref={lineRef} style={{ width: '2px', flexGrow: 1, minHeight: '80px', background: 'linear-gradient(180deg, rgba(167,139,250,0.4), rgba(167,139,250,0.08))' }} />}
            </div>
            <div style={{ padding: '0 0 3rem 2rem', textAlign: 'left' }}>
                {!isEven ? <div ref={ref}><TimelineContent milestone={milestone} /></div> : <div />}
            </div>
        </div>
    );
}

export default function About() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 350], [0, 60]);
    const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' } }).fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 }).fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal-up').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 45 },
                    { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div style={{ background: '#faf9f7', minHeight: '100vh', color: '#2d2438', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <section ref={heroRef} style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #fdf8ff 0%, #f5f0ff 40%, #fff8f5 100%)' }}>
                {/*<StarField/> */}<CelestialField />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, rgba(216,180,254,0.05) 50%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(251,207,232,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '15%', left: '-6%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(186,230,253,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 2, textAlign: 'center', padding: '9rem 1.5rem 4rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'backOut' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(167,139,250,0.08)', color: '#7c5cbf', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>✦ My Story</motion.div>
                    <h1 ref={titleRef} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif", marginBottom: '1.25rem' }}>
                        <span style={{ background: 'linear-gradient(135deg, #3d2b6b 30%, #7c5cbf 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Logic meets intuition.</span>
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Science meets the stars.</span>
                    </h1>
                    <p ref={subtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.85, color: '#6b5c8a', maxWidth: '560px', margin: '0 auto', fontWeight: 400 }}>Hi, I'm <strong style={{ color: '#3d2b6b' }}>The [Name]</strong>. My work lies at the intersection of logic and intuition — where occult sciences are not just believed, but understood, applied, and experienced.</p>
                </motion.div>
            </section>
            <section style={{ padding: '6rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px dashed rgba(124,92,191,0.38)' }} />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '1px dashed rgba(124,92,191,0.24)' }} />
                            <div style={{ position: 'absolute', inset: '40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.26) 0%, rgba(196,181,253,0.14) 55%, transparent 80%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.78, 1, 0.78] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 16px rgba(124,92,191,0.32))' }}>☯</motion.div>
                            </div>
                            {[0, 120, 240].map((deg) => (
                                <motion.div key={deg} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: (deg / 360) * 12 }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', rotate: `${deg}deg` }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', background: '#9270d3', boxShadow: '0 0 8px rgba(124,92,191,0.38)' }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal-up">
                        <SectionLabel>My Approach</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #3d2b6b 40%, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Structured. Logical. Rooted in Real Life.</h2>
                        <p style={{ color: '#6b5c8a', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>I don't believe in creating dependency through vague predictions. Whether it's Numerology, Vastu, or Jyotish — the goal is always the same: help you understand what's happening and what to do next.</p>
                        {[
                            { icon: '◈', text: 'Structured and logical — every insight has a reason behind it' },
                            { icon: '△', text: 'Rooted in real-life application, not textbook theory' },
                            { icon: '✦', text: 'Focused on clarity and direction, not confusion or fear' },
                        ].map((p) => (
                            <div key={p.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c5cbf', fontSize: '0.85rem', marginTop: '0.1rem' }}>{p.icon}</div>
                                <p style={{ color: '#6b5c8a', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid rgba(167,139,250,0.12)', borderBottom: '1px solid rgba(167,139,250,0.12)', background: 'rgba(245,240,255,0.5)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <SectionLabel>Experience & Reach</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trusted Across the World</h2>
                    </div>
                    <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {[
                            { value: '5+', label: 'Years of Practice' },
                            { value: '1000+', label: 'Clients Guided' },
                            { value: '10+', label: 'Countries Reached' },
                        ].map((s) => (
                            <div key={s.label} style={{ textAlign: 'center', padding: '2rem', background: '#ffffff', border: '1.5px solid rgba(167,139,250,0.18)', borderRadius: '18px', boxShadow: '0 4px 18px rgba(124,92,191,0.05)' }}>
                                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.value}</div>
                                <div style={{ color: '#9585b0', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.06em', marginTop: '0.4rem', textTransform: 'uppercase' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="reveal-up" style={{ textAlign: 'center' }}>
                        <div style={{ color: '#9585b0', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Clients from</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                            {['India', 'USA', 'UK', 'Croatia', 'Germany', 'France', 'Mongolia', 'Dubai'].map((country) => <span key={country} style={{ padding: '0.3rem 0.9rem', borderRadius: '20px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: '#7c5cbf', fontSize: '0.82rem', fontWeight: 500 }}>{country}</span>)}
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.5), transparent)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>My Philosophy</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>What Every Session Is Built On</h2>
                        <p style={{ color: '#9585b0', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>My goal is not to tell you what will happen. It is to help you understand your patterns, make better decisions, and move forward with clarity and confidence.</p>
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
                        <SectionLabel>My Journey</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A Decade of Learning & Practice</h2>
                    </div>
                    <div className="reveal-up">
                        {MILESTONES.map((m, i) => <TimelineItem key={m.year} milestone={m} index={i} isLast={i === MILESTONES.length - 1} />)}
                    </div>
                </div>
            </section>
            <section style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(245,240,255,0.6), transparent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <SectionLabel>My Practitioners</SectionLabel>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.75rem' }}>The People I Practice With</h2>
                        <p style={{ color: '#9585b0', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>Each practitioner was chosen for one reason above all others — the depth of care they bring to every person who sits across from them.</p>
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
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", background: 'linear-gradient(135deg, #3d2b6b, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Ready to Get Clarity?</h2>
                        <p style={{ color: '#6b5c8a', fontSize: '1rem', lineHeight: 1.8, maxWidth: '420px', margin: '0 auto 2.5rem' }}>Start with a conversation. Share what's on your mind and I'll guide you toward the right consultation — no pressure, no vague promises.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(124,92,191,0.4)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.2rem', background: 'linear-gradient(135deg, #7c5cbf, #a78bfa)', borderRadius: '50px', color: '#fff', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(124,92,191,0.28)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Chat on WhatsApp to Book
                            </motion.a>
                            <motion.a href="/services" whileHover={{ scale: 1.04, background: 'rgba(167,139,250,0.1)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.85rem 2.2rem', background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(167,139,250,0.35)', borderRadius: '50px', color: '#7c5cbf', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}>View Services</motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}