export const SERVICES = [
    {
        icon: '♈',
        title: 'Vedic Astrology',
        desc: 'Uncover planetary influences on your destiny through ancient Jyotish science, personalized to your birth chart.',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(192,132,252,0.05))',
        borderHover: '1px solid rgba(192,132,252,0.4)',
        glow: 'rgba(124, 58, 237, 0.35)',
    },
    {
        icon: '✦',
        title: 'Numerology',
        desc: 'Decode the vibrational power of numbers embedded in your name and birth date to chart your life path.',
        gradient: 'linear-gradient(135deg, rgba(219,39,119,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(219, 39, 119, 0.3)',
    },
    {
        icon: '⌂',
        title: 'Vastu Shastra',
        desc: 'Harmonize your living and work spaces with cosmic energy flows for prosperity, health, and peace.',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(16, 185, 129, 0.3)',
    },
    {
        icon: '☽',
        title: 'Tarot & Oracle',
        desc: 'Illuminating guidance through the sacred art of tarot, offering clarity on love, career, and spiritual growth.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(245, 158, 11, 0.3)',
    },
    {
        icon: '◈',
        title: 'Kundli Matching',
        desc: 'Evaluate compatibility and auspiciousness of union through Ashtakoot matching and divisional charts.',
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(239, 68, 68, 0.3)',
    },
    {
        icon: '☿',
        title: 'Muhurta',
        desc: 'Choose the most auspicious timings for marriage, business launches, travel, and major life decisions.',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(192,132,252,0.05))',
        glow: 'rgba(6, 182, 212, 0.3)',
    },
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
    { year: '2012', title: 'Founded in Varanasi', desc: 'Nakshatra was established by a collective of Vedic scholars committed to making ancient wisdom accessible.' },
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
        value: 'hello@nakshatra.in',
        sub: 'We respond within 24 hours',
        accentColor: '#c084fc',
        glowColor: 'rgba(192,132,252,0.3)',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(192,132,252,0.05))',
    },
    {
        icon: '☏',
        label: 'Call Us',
        value: '+91 98765 43210',
        sub: 'Mon – Sat, 9 AM – 7 PM IST',
        accentColor: '#34d399',
        glowColor: 'rgba(16,185,129,0.3)',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.04))',
    },
    {
        icon: '◎',
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
    { id: 'inperson', icon: '◎', label: 'In Person', sub: 'Varanasi office' },
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
    {
        id: 'astrology',
        icon: '♈',
        label: 'Vedic Astrology',
        tagline: 'Read the sky, understand your soul',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(192,132,252,0.06))',
        accentColor: '#c084fc',
        glowColor: 'rgba(124,58,237,0.4)',
        borderHover: 'rgba(192,132,252,0.5)',
        desc: `Vedic Astrology — or Jyotish Shastra — is the oldest living astrological tradition on Earth,
    with roots stretching back over 5,000 years into the Vedic civilization of ancient India. Unlike
    Western astrology, it uses the sidereal zodiac, which tracks the actual positions of constellations
    in the sky, giving it a precision unmatched in any other tradition.`,
        offerings: [
            { name: 'Birth Chart (Kundli) Analysis', duration: '90 min', price: '₹2,500' },
            { name: 'Annual Forecast (Varshaphal)', duration: '60 min', price: '₹1,800' },
            { name: 'Career & Finance Reading', duration: '60 min', price: '₹1,800' },
            { name: 'Prashna (Horary) Astrology', duration: '45 min', price: '₹1,200' },
            { name: 'Planetary Transit Report', duration: 'Written', price: '₹999' },
        ],
        benefits: [
            'Understand your dharma and life purpose',
            'Navigate career crossroads with planetary clarity',
            'Identify auspicious periods for major decisions',
            'Heal karmic patterns embedded in your chart',
        ],
    },
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
    {
        id: 'tarot',
        icon: '☽',
        label: 'Tarot & Oracle',
        tagline: 'The cards reflect what the heart already knows',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(252,211,77,0.05))',
        accentColor: '#fbbf24',
        glowColor: 'rgba(245,158,11,0.4)',
        borderHover: 'rgba(252,211,77,0.5)',
        desc: `Tarot is not fortune-telling — it is a mirror. Our practitioners use the 78-card Rider-Waite
    and Thoth decks alongside Vedic oracle systems to illuminate the energies currently active in your
    life, helping you make aligned decisions from a place of awareness rather than anxiety. Every reading
    is an empowering, forward-looking dialogue between your intuition and the universal archetypes.`,
        offerings: [
            { name: 'General Life Reading (10-card)', duration: '60 min', price: '₹1,200' },
            { name: 'Love & Relationship Spread', duration: '45 min', price: '₹999' },
            { name: 'Career & Purpose Reading', duration: '45 min', price: '₹999' },
            { name: 'Monthly Oracle Forecast', duration: 'Written', price: '₹599' },
            { name: 'Celtic Cross Deep Dive', duration: '75 min', price: '₹1,500' },
        ],
        benefits: [
            'Gain clarity on confusing or stuck life situations',
            'Understand hidden dynamics in relationships',
            'Receive guidance before major decisions',
            'Connect with your own intuitive wisdom',
        ],
    },
    {
        id: 'kundli',
        icon: '◈',
        label: 'Kundli Matching',
        tagline: 'Celestial compatibility for lifelong union',
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.18), rgba(252,165,165,0.05))',
        accentColor: '#f87171',
        glowColor: 'rgba(239,68,68,0.35)',
        borderHover: 'rgba(252,165,165,0.5)',
        desc: `Kundli Matching — or Guna Milan — is the Vedic method of evaluating matrimonial compatibility
    through a multi-layered analysis of two birth charts. Beyond the popular 36-point Ashtakoot system,
    our practitioners examine Navamsa charts, Mangal Dosha, Dasha compatibility, and longevity indicators
    to provide a comprehensive, nuanced picture of the union's potential.`,
        offerings: [
            { name: 'Ashtakoot Guna Milan', duration: 'Written', price: '₹999' },
            { name: 'Comprehensive Compatibility Report', duration: '75 min', price: '₹2,500' },
            { name: 'Mangal Dosha Analysis', duration: '45 min', price: '₹1,200' },
            { name: 'Post-Marriage Guidance Session', duration: '60 min', price: '₹1,500' },
            { name: 'Auspicious Wedding Date (Muhurta)', duration: '60 min', price: '₹1,800' },
        ],
        benefits: [
            'Assess long-term emotional and physical compatibility',
            'Identify and remedy doshas before marriage',
            "Understand each partner's karmic strengths",
            'Choose the most auspicious date for your wedding',
        ],
    },
    {
        id: 'muhurta',
        icon: '☿',
        label: 'Muhurta',
        tagline: 'Time is the most powerful tool you own',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(103,232,249,0.05))',
        accentColor: '#67e8f9',
        glowColor: 'rgba(6,182,212,0.4)',
        borderHover: 'rgba(103,232,249,0.5)',
        desc: `Muhurta is the Vedic science of electional astrology — selecting the most auspicious moment
    to initiate any significant action. The ancient rishis understood that the quality of time itself
    varies, and beginning an endeavour under a favourable celestial configuration greatly increases its
    chances of success, longevity, and harmony.`,
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