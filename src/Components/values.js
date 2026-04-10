export const WHATSAPP_URL = process.env.REACT_APP_WHATSAPP_REDIRECT_URL;

export const CATEGORIES = ['All', 'Numerology', 'Vastu', 'Jyotish'];

export const GRADIENT_PRIMARY = 'linear-gradient(150deg, #1e3a5f, #7c5cbf)';

export const SERVICES = [
    {
        icon: '✦',
        title: 'Numerology',
        desc: 'Understand the patterns influencing your life and decisions. From personal readings to name alignment and mobile numerology, get clarity that is structured and actionable.',
        gradient: 'linear-gradient(135deg, rgba(219,39,119,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(219, 39, 119, 0.3)',
    },
    {
        icon: '⌂',
        title: 'Vastu',
        desc: 'Create balance in your living and working spaces without disruption. Special focus on practical remedies without demolition.',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(16, 185, 129, 0.3)',
    },
    {
        icon: '☿',
        title: 'Jyotish',
        desc: 'Deep insights into your life path, career direction, and relationships through your birth chart—explained with clarity and logic.',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(6, 182, 212, 0.3)',
    },
];

export const HOW_IT_WORKS = [
    { step: '01', title: 'Start on WhatsApp', desc: 'Reach out and briefly share your concern or area of focus.' },
    { step: '02', title: 'Initial Understanding', desc: 'I\'ll understand your requirement and suggest the right consultation for you.' },
    { step: '03', title: 'Confirmation & Payment', desc: 'Consultation details and payment via UPI / NEFT will be shared with you.' },
    { step: '04', title: 'Your Session', desc: 'A focused 60-minute session via Zoom or WhatsApp — structured and personalised.' },
];

export const WHY_ME = [
    { icon: '◈', title: 'Logical, Structured Approach', desc: 'No vague predictions. Every insight is reasoned, explained, and actionable.' },
    { icon: '✦', title: '5+ Years · 1000+ Clients', desc: 'Guided individuals across India, USA, UK, Germany, France, Dubai and beyond.' },
    { icon: '☽', title: 'Personalised to You', desc: 'No generic readings. Every consultation is built around your specific situation.' },
    { icon: '△', title: 'Practical, Real-World Solutions', desc: 'Guidance you can apply immediately — focused on what to understand and what to do next.' },
];

export const TESTIMONIALS = [
    {
        name: 'Priya Sharma',
        role: 'Entrepreneur, Delhi',
        text: 'The Vastu consultation transformed my office. Within months, I noticed a remarkable shift in energy and business growth.',
        avatar: 'P',
        stars: 5,
    },
    {
        name: 'Rahul Mehta',
        role: 'Software Engineer, Bengaluru',
        text: "My Vedic chart reading was incredibly precise. The guidance on career transitions proved accurate beyond what I'd expected.",
        avatar: 'R',
        stars: 5,
    },
    {
        name: 'Ananya Iyer',
        role: 'Teacher, Chennai',
        text: 'The numerology session gave me a completely new perspective on my life purpose. Deeply insightful and empowering.',
        avatar: 'A',
        stars: 5,
    },
];

export const STATS = [
    { value: '15,000+', label: 'Readings Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '12+', label: 'Years of Practice' },
    { value: '40+', label: 'Countries Served' },
];

export const testimonialVariants = {
    rest: {
        y: 0,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    hover: {
        y: -6,
        borderColor: 'rgba(192, 132, 252, 0.45)',
    },
};

export const READINGS = [
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
        excerpt: 'Popular wisdom assigns the days of the week fixed auspicious qualities, but Muhurta science is far more nuanced. The Panchanga — a five-limbed Vedic almanac — evaluates Tithi, Vara, Purple Celestia, Yoga, and Karana simultaneously.',
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

export const FEATURED = READINGS.filter((r) => r.featured);

export const TEAM = [
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

export const MILESTONES = [
    { year: '2012', title: 'Founded in Gurugram', desc: 'Purple Celestia was established by a collective of Vedic scholars committed to making ancient wisdom accessible.' },
    { year: '2015', title: 'First Digital Platform', desc: 'Launched online consultations, reaching clients across India, the UK, and North America within the first year.' },
    { year: '2018', title: '10,000 Readings Milestone', desc: 'Crossed ten thousand personalized readings — a testament to trust built through accuracy and compassion.' },
    { year: '2021', title: 'Global Expansion', desc: 'Opened dedicated service channels for Southeast Asia, the Middle East, and the United States.' },
    { year: '2024', title: 'AI-Assisted Chart Analysis', desc: 'Integrated precision computation tools to enhance chart accuracy while retaining the human depth of our consultations.' },
    { year: '2026', title: 'New Chapter', desc: 'Continuing to evolve — with new practitioners, expanded services, and a deeper commitment to transformative guidance.' },
];

export const VALUES = [
    { icon: '✦', title: 'Integrity', desc: 'We deliver honest readings even when the truth is uncomfortable. Your trust is never compromised for comfort.' },
    { icon: '☽', title: 'Reverence', desc: 'We treat Vedic sciences with the deep respect they deserve — no shortcuts, no commercialization of sacred knowledge.' },
    { icon: '◈', title: 'Precision', desc: 'Every chart is computed and interpreted with meticulous care. Accuracy is the foundation of meaningful guidance.' },
    { icon: '♃', title: 'Compassion', desc: 'Every client arrives with unique fears and hopes. We listen, understand, and counsel with genuine human warmth.' },
];

export const CONTACT_METHODS = [
    {
        icon: '✉',
        label: 'Email Us',
        accentColor: '#c084fc',
        value: 'hello@thepurplelady.in',
        sub: 'We respond within 24 hours',
        glowColor: 'rgba(192,132,252,0.3)',
        link: 'mailto:hello@thepurplelady.in',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(192,132,252,0.05))',
    },
    {
        icon: '☏',
        label: 'Call Us',
        value: '+91 98765 43210',
        link: 'tel:+91 98765 43210',
        sub: 'Mon – Sat, 9 AM – 7 PM IST',
        accentColor: '#34d399',
        glowColor: 'rgba(16,185,129,0.3)',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.04))',
    },
    {
        icon: '◎',
        link: '/contact',
        label: 'Visit Us',
        value: 'Gurgram, Haryana',
        sub: 'By appointment only',
        accentColor: '#fbbf24',
        glowColor: 'rgba(245,158,11,0.3)',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(252,211,77,0.04))',
    },
    {
        icon: '⊕',
        label: 'WhatsApp',
        link: WHATSAPP_URL,
        value: '+91 98765 43210',
        sub: 'Quick queries & booking',
        accentColor: '#67e8f9',
        glowColor: 'rgba(6,182,212,0.3)',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(103,232,249,0.04))',
    },
];

export const SERVICES_OPTIONS = [
    'Vedic Astrology',
    'Numerology',
    'Vastu Shastra',
    'Tarot & Oracle',
    'Kundli Matching',
    'Muhurta',
    'General Enquiry',
];

export const CONSULTATION_TYPES = [
    { id: 'video', icon: '▶', label: 'Video Call', sub: 'Google Meet / Zoom' },
    { id: 'phone', icon: '☏', label: 'Phone Call', sub: 'Voice only' },
    { id: 'inperson', icon: '◎', label: 'In Person', sub: 'Gurugram office' },
    { id: 'written', icon: '✉', label: 'Written Report', sub: 'Email delivery' },
];

export const SOCIAL_LINKS = [
    { label: 'Instagram', icon: '◈', href: '#', color: '#f472b6' },
    { label: 'YouTube', icon: '▶', href: '#', color: '#f87171' },
    { label: 'Twitter / X', icon: '✦', href: '#', color: '#c084fc' },
    { label: 'Facebook', icon: '⊕', href: '#', color: '#67e8f9' },
];

export const FAQS = [
    {
        q: 'How soon can I get an appointment?',
        a: 'Most practitioners have slots available within 3–5 business days. For urgent queries, mention it in your message and we will do our best to accommodate you sooner.',
    },
    {
        q: 'What information should I have ready before contacting?',
        a: 'For astrology and Kundli services, please have your full date of birth, exact birth time (if known), and birth city ready. For Vastu, a floor plan of your space is helpful.',
    },
    {
        q: 'Do you offer consultations in languages other than English?',
        a: 'Yes. Our practitioners are fluent in Hindi, Tamil, Malayalam, and English. Please mention your preferred language in the message field.',
    },
    {
        q: 'Is there a consultation fee for the discovery call?',
        a: 'The initial 20-minute discovery call is completely free with no obligation. Full session fees are listed on the Services page.',
    },
];

export const OUR_SERVICES = [
    //{
    //    id: 'astrology',
    //    icon: '♈',
    //    label: 'Vedic Astrology',
    //    tagline: 'Read the sky, understand your soul',
    //    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(192,132,252,0.06))',
    //    accentColor: '#c084fc',
    //    glowColor: 'rgba(124,58,237,0.4)',
    //    borderHover: 'rgba(192,132,252,0.5)',
    //    desc: `Vedic Astrology — or Jyotish Shastra — is the oldest living astrological tradition on Earth,
    //with roots stretching back over 5,000 years into the Vedic civilization of ancient India. Unlike
    //Western astrology, it uses the sidereal zodiac, which tracks the actual positions of constellations
    //in the sky, giving it a precision unmatched in any other tradition.`,
    //    offerings: [
    //        { name: 'Birth Chart (Kundli) Analysis', duration: '90 min', price: '₹2,500' },
    //        { name: 'Annual Forecast (Varshaphal)', duration: '60 min', price: '₹1,800' },
    //        { name: 'Career & Finance Reading', duration: '60 min', price: '₹1,800' },
    //        { name: 'Prashna (Horary) Astrology', duration: '45 min', price: '₹1,200' },
    //        { name: 'Planetary Transit Report', duration: 'Written', price: '₹999' },
    //    ],
    //    benefits: [
    //        'Understand your dharma and life purpose',
    //        'Navigate career crossroads with planetary clarity',
    //        'Identify auspicious periods for major decisions',
    //        'Heal karmic patterns embedded in your chart',
    //    ],
    //},
    {
        id: 'numerology',
        icon: '✦',
        label: 'Numerology',
        tagline: 'Every number tells your story',
        gradient: 'linear-gradient(135deg, rgba(219,39,119,0.18), rgba(244,114,182,0.05))',
        accentColor: '#f472b6',
        glowColor: 'rgba(219,39,119,0.4)',
        borderHover: 'rgba(244,114,182,0.5)',
        desc: `Numerology is the sacred science of numbers — revealing how the vibrational frequencies
    encoded in your name and birth date shape your personality, relationships, career trajectory, and
    destiny. We practice both the classical Chaldean system (originating from ancient Babylon) and the
    Pythagorean method, selecting the most appropriate framework for each client's unique inquiry.`,
        offerings: [
            { name: 'Life Path & Destiny Reading', duration: '60 min', price: '₹1,500' },
            { name: 'Name Correction Consultation', duration: '75 min', price: '₹2,000' },
            { name: 'Business Name Analysis', duration: '45 min', price: '₹1,500' },
            { name: 'Personal Year Forecast', duration: 'Written', price: '₹799' },
            { name: 'Relationship Compatibility', duration: '60 min', price: '₹1,800' },
        ],
        benefits: [
            'Discover your core life path number and its meaning',
            "Align your name's vibration with your destiny",
            'Choose business names that attract abundance',
            'Understand recurring patterns in your relationships',
        ],
    },
    {
        id: 'vastu',
        icon: '⌂',
        label: 'Vastu Shastra',
        tagline: 'Spaces that breathe with purpose',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.05))',
        accentColor: '#34d399',
        glowColor: 'rgba(16,185,129,0.4)',
        borderHover: 'rgba(52,211,153,0.5)',
        desc: `Vastu Shastra is the ancient Indian science of spatial arrangement — a sophisticated system
    that aligns your built environment with the five elements (Panchabhutas) and the directional energies
    of the cosmos. A correctly Vastu-aligned space doesn't just feel better; it actively supports health,
    wealth, relationships, and mental clarity for all who inhabit it.`,
        offerings: [
            { name: 'Home Vastu Consultation', duration: '2–3 hrs', price: '₹5,000' },
            { name: 'Office / Commercial Vastu', duration: '3–4 hrs', price: '₹8,000' },
            { name: 'Plot & Construction Guidance', duration: '90 min', price: '₹3,500' },
            { name: 'Vastu Remedies Report', duration: 'Written', price: '₹1,500' },
            { name: 'Factory / Industrial Vastu', duration: 'Custom', price: 'On Request' },
        ],
        benefits: [
            'Eliminate energy blockages in your home or office',
            'Attract prosperity through directional alignment',
            'Improve sleep, health, and family harmony',
            'Identify and neutralize Vastu doshas without demolition',
        ],
    },
    //{
    //    id: 'tarot',
    //    icon: '☽',
    //    label: 'Tarot & Oracle',
    //    tagline: 'The cards reflect what the heart already knows',
    //    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(252,211,77,0.05))',
    //    accentColor: '#fbbf24',
    //    glowColor: 'rgba(245,158,11,0.4)',
    //    borderHover: 'rgba(252,211,77,0.5)',
    //    desc: `Tarot is not fortune-telling — it is a mirror. Our practitioners use the 78-card Rider-Waite
    //and Thoth decks alongside Vedic oracle systems to illuminate the energies currently active in your
    //life, helping you make aligned decisions from a place of awareness rather than anxiety. Every reading
    //is an empowering, forward-looking dialogue between your intuition and the universal archetypes.`,
    //    offerings: [
    //        { name: 'General Life Reading (10-card)', duration: '60 min', price: '₹1,200' },
    //        { name: 'Love & Relationship Spread', duration: '45 min', price: '₹999' },
    //        { name: 'Career & Purpose Reading', duration: '45 min', price: '₹999' },
    //        { name: 'Monthly Oracle Forecast', duration: 'Written', price: '₹599' },
    //        { name: 'Celtic Cross Deep Dive', duration: '75 min', price: '₹1,500' },
    //    ],
    //    benefits: [
    //        'Gain clarity on confusing or stuck life situations',
    //        'Understand hidden dynamics in relationships',
    //        'Receive guidance before major decisions',
    //        'Connect with your own intuitive wisdom',
    //    ],
    //},
    //{
    //    id: 'kundli',
    //    icon: '◈',
    //    label: 'Kundli Matching',
    //    tagline: 'Celestial compatibility for lifelong union',
    //    gradient: 'linear-gradient(135deg, rgba(239,68,68,0.18), rgba(252,165,165,0.05))',
    //    accentColor: '#f87171',
    //    glowColor: 'rgba(239,68,68,0.35)',
    //    borderHover: 'rgba(252,165,165,0.5)',
    //    desc: `Kundli Matching — or Guna Milan — is the Vedic method of evaluating matrimonial compatibility
    //through a multi-layered analysis of two birth charts. Beyond the popular 36-point Ashtakoot system,
    //our practitioners examine Navamsa charts, Mangal Dosha, Dasha compatibility, and longevity indicators
    //to provide a comprehensive, nuanced picture of the union's potential.`,
    //    offerings: [
    //        { name: 'Ashtakoot Guna Milan', duration: 'Written', price: '₹999' },
    //        { name: 'Comprehensive Compatibility Report', duration: '75 min', price: '₹2,500' },
    //        { name: 'Mangal Dosha Analysis', duration: '45 min', price: '₹1,200' },
    //        { name: 'Post-Marriage Guidance Session', duration: '60 min', price: '₹1,500' },
    //        { name: 'Auspicious Wedding Date (Muhurta)', duration: '60 min', price: '₹1,800' },
    //    ],
    //    benefits: [
    //        'Assess long-term emotional and physical compatibility',
    //        'Identify and remedy doshas before marriage',
    //        "Understand each partner's karmic strengths",
    //        'Choose the most auspicious date for your wedding',
    //    ],
    //},
    {
        id: 'jyotish',
        icon: '☿',
        label: 'Jyotish',
        tagline: 'Time is the most powerful tool you own',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(103,232,249,0.05))',
        accentColor: '#67e8f9',
        glowColor: 'rgba(6,182,212,0.4)',
        borderHover: 'rgba(103,232,249,0.5)',
        desc: `Deep insights into your life path, career direction, and relationships through your birth chart—explained with clarity and logic.`,
        offerings: [
            { name: 'Business Launch Muhurta', duration: '45 min', price: '₹1,500' },
            { name: 'Property Purchase Timing', duration: '45 min', price: '₹1,200' },
            { name: 'Travel & Relocation Muhurta', duration: '30 min', price: '₹799' },
            { name: 'Surgery / Medical Procedure Timing', duration: '30 min', price: '₹999' },
            { name: 'Griha Pravesh (Housewarming)', duration: '45 min', price: '₹1,200' },
        ],
        benefits: [
            'Launch ventures under planetary protection',
            'Avoid inauspicious timings for major commitments',
            'Align key life events with cosmic support',
            'Increase the longevity and success of new beginnings',
        ],
    },
];

export const PROCESS_STEPS = [
    { num: '01', title: 'Choose Your Service', desc: 'Browse our offerings and select the consultation type that best matches your current need or question.' },
    { num: '02', title: 'Book & Share Details', desc: 'Pick a date and time, then provide your birth details (date, time, place) so we can prepare in advance.' },
    { num: '03', title: 'Your Consultation', desc: 'Meet your practitioner via video call or in-person. Receive your reading with complete confidentiality.' },
    { num: '04', title: 'Receive Your Report', desc: 'Get a written summary of key insights and remedies within 24 hours of your session.' },
];

export const SECTIONS = [
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

export const TERMS_SECTIONS = [
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

export const PASTEL_COLORS = [
    'rgba(167,139,250,0.45)',
    'rgba(251,207,232,0.55)',
    'rgba(186,230,253,0.5)',
    'rgba(196,181,253,0.5)',
    'rgba(254,215,170,0.45)',
    'rgba(167,243,208,0.4)',
];

export const GLYPHS = ['ॐ', '✦', '☽', '◈', '✧', '△', '▽', '⊕', '⬡', '꩜'];

export const GLYPH_COLORS = [
    'rgba(124,92,191,{a})',
    'rgba(109,40,217,{a})',
    'rgba(167,139,250,{a})',
    'rgba(217,119,6,{a})',
    'rgba(190,24,93,{a})',
    'rgba(99,102,241,{a})',
    'rgba(192,132,252,{a})',
];

export const GRAHAS = [
    { symbol: '☉', name: 'Surya', ruler: 'Sun', color: '#e0a020' },
    { symbol: '☽', name: 'Chandra', ruler: 'Moon', color: '#8aaed4' },
    { symbol: '♂', name: 'Mangal', ruler: 'Mars', color: '#c94040' },
    { symbol: '☿', name: 'Budha', ruler: 'Mercury', color: '#4a9e6a' },
    { symbol: '♃', name: 'Guru', ruler: 'Jupiter', color: '#c8a840' },
    { symbol: '♀', name: 'Shukra', ruler: 'Venus', color: '#c46090' },
    { symbol: '♄', name: 'Shani', ruler: 'Saturn', color: '#6070a0' },
    { symbol: '☊', name: 'Rahu', ruler: "North Node", color: '#8060b0' },
    { symbol: '☋', name: 'Ketu', ruler: 'South Node', color: '#a07850' },
];

export const DIRECTIONS = [
    { label: 'N', deg: 0, element: 'Water', color: '#4a7ab0', energy: 'Career & Path' },
    { label: 'NE', deg: 45, element: 'Earth', color: '#7c5cbf', energy: 'Wisdom' },
    { label: 'E', deg: 90, element: 'Wood', color: '#4a9e6a', energy: 'Growth' },
    { label: 'SE', deg: 135, element: 'Fire', color: '#c94040', energy: 'Wealth' },
    { label: 'S', deg: 180, element: 'Fire', color: '#c07030', energy: 'Fame' },
    { label: 'SW', deg: 225, element: 'Earth', color: '#a06030', energy: 'Relationships' },
    { label: 'W', deg: 270, element: 'Metal', color: '#708090', energy: 'Creativity' },
    { label: 'NW', deg: 315, element: 'Metal', color: '#5080a0', energy: 'Helpful People' },
];

export const CHAKRAS = [
    { name: 'Sahasrara', sanskrit: 'Crown', color: '#9b59b6', symbol: '✦', number: '7' },
    { name: 'Ajna', sanskrit: 'Third Eye', color: '#5a6abf', symbol: '◈', number: '6' },
    { name: 'Vishuddha', sanskrit: 'Throat', color: '#3498db', symbol: '△', number: '5' },
    { name: 'Anahata', sanskrit: 'Heart', color: '#27ae60', symbol: '✦', number: '4' },
    { name: 'Manipura', sanskrit: 'Solar Plexus', color: '#f39c12', symbol: '◈', number: '3' },
    { name: 'Svadhishthana', sanskrit: 'Sacral', color: '#e67e22', symbol: '△', number: '2' },
    { name: 'Muladhara', sanskrit: 'Root', color: '#c0392b', symbol: '✦', number: '1' },
];