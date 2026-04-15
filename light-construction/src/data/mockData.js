export const projects = [
  { id: 1, name: "Riverside Apartments", budget: 850000, spent: 620000, status: "active", startDate: "2025-01-10", endDate: "2025-12-30", description: "12-unit residential complex on the riverside." },
  { id: 2, name: "Downtown Office Tower", budget: 2400000, spent: 2100000, status: "active", startDate: "2024-06-01", endDate: "2026-03-01", description: "20-floor commercial office building in the city center." },
  { id: 3, name: "Green Valley Villas", budget: 1200000, spent: 1200000, status: "completed", startDate: "2023-03-15", endDate: "2024-11-20", description: "Luxury villa complex with 8 units." },
  { id: 4, name: "Harbor Bridge Repair", budget: 320000, spent: 45000, status: "planning", startDate: "2026-02-01", endDate: "2026-08-01", description: "Structural repair and reinforcement of harbor bridge." },
];

export const expenses = [
  { id: 1, date: "2025-03-01", category: "Materials", amount: 45000, project: "Riverside Apartments", attachment: "invoice_001.pdf" },
  { id: 2, date: "2025-03-05", category: "Labor", amount: 28000, project: "Riverside Apartments", attachment: "" },
  { id: 3, date: "2025-03-10", category: "Equipment", amount: 12000, project: "Downtown Office Tower", attachment: "receipt_002.pdf" },
  { id: 4, date: "2025-03-15", category: "Materials", amount: 67000, project: "Downtown Office Tower", attachment: "" },
  { id: 5, date: "2025-03-20", category: "Labor", amount: 34000, project: "Green Valley Villas", attachment: "invoice_003.pdf" },
  { id: 6, date: "2025-04-01", category: "Permits", amount: 5500, project: "Harbor Bridge Repair", attachment: "" },
];

export const tasks = {
  todo: [
    { id: "t1", title: "Foundation Inspection", description: "Inspect and approve foundation work", priority: "high", dueDate: "2025-04-20", project: "Riverside Apartments" },
    { id: "t2", title: "Order Steel Beams", description: "Place order for structural steel", priority: "medium", dueDate: "2025-04-25", project: "Downtown Office Tower" },
    { id: "t3", title: "Site Survey", description: "Complete topographic survey", priority: "low", dueDate: "2026-02-10", project: "Harbor Bridge Repair" },
  ],
  inProgress: [
    { id: "t4", title: "Concrete Pouring - Floor 3", description: "Pour and cure concrete for 3rd floor slab", priority: "high", dueDate: "2025-04-18", project: "Downtown Office Tower" },
    { id: "t5", title: "Electrical Wiring - Block A", description: "Install electrical conduits in Block A", priority: "medium", dueDate: "2025-04-22", project: "Riverside Apartments" },
  ],
  completed: [
    { id: "t6", title: "Excavation Work", description: "Complete site excavation", priority: "high", dueDate: "2025-02-28", project: "Riverside Apartments" },
    { id: "t7", title: "Permit Approval", description: "Obtain all required building permits", priority: "medium", dueDate: "2025-01-15", project: "Riverside Apartments" },
  ],
};

export const teamMembers = [
  { name: "Abebe Girma", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Over 20 years of experience leading major construction projects across Ethiopia and East Africa." },
  { name: "Tigist Haile", role: "Project Manager", img: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Certified PMP with expertise in residential and commercial project delivery." },
  { name: "Dawit Bekele", role: "Lead Engineer", img: "https://randomuser.me/api/portraits/men/65.jpg", bio: "Structural engineer specializing in high-rise and infrastructure projects." },
  { name: "Selamawit Tadesse", role: "Site Supervisor", img: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Ensures on-site safety, quality control, and daily operations run smoothly." },
];

export const testimonials = [
  { name: "Yohannes Tesfaye", company: "Tesfaye Real Estate", text: "Light Construction delivered our office complex on time and under budget. Exceptional quality and professionalism.", img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Mekdes Alemu", company: "Alemu Developments", text: "Their team managed every detail perfectly. We couldn't be happier with the results.", img: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "Biruk Mengistu", company: "Mengistu Group", text: "From planning to completion, the process was smooth and transparent. Highly recommended.", img: "https://randomuser.me/api/portraits/men/77.jpg" },
];

export const services = [
  {
    id: 1,
    icon: "Building2",
    title: "Commercial Construction",
    desc: "Office towers, retail spaces, and commercial complexes built to the highest standards.",
    fullDesc: "We specialize in delivering large-scale commercial construction projects including office towers, shopping malls, retail parks, and mixed-use developments. Our team handles everything from initial design consultation to final handover, ensuring every project meets international quality standards and local building codes.",
    features: ["Office Towers & High-rises", "Retail & Shopping Centers", "Mixed-Use Developments", "Industrial Warehouses", "Hotel & Hospitality Buildings"],
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    duration: "6–24 months",
    projects: 45,
  },
  {
    id: 2,
    icon: "Home",
    title: "Residential Projects",
    desc: "Custom homes, apartments, and villa complexes designed for modern living.",
    fullDesc: "From single-family homes to large apartment complexes and luxury villa communities, we bring residential visions to life. Our architects and engineers collaborate closely with clients to create spaces that are functional, beautiful, and built to last.",
    features: ["Custom Luxury Homes", "Apartment Complexes", "Villa Communities", "Affordable Housing", "Gated Residential Estates"],
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    duration: "3–18 months",
    projects: 62,
  },
  {
    id: 3,
    icon: "Wrench",
    title: "Renovation & Repair",
    desc: "Structural repairs, renovations, and upgrades for existing buildings.",
    fullDesc: "Breathing new life into existing structures is one of our core strengths. Whether it's a full interior renovation, structural reinforcement, facade upgrade, or MEP systems overhaul, our renovation team delivers results that exceed expectations with minimal disruption.",
    features: ["Interior Renovations", "Structural Reinforcement", "Facade & Exterior Upgrades", "MEP Systems Overhaul", "Historic Building Restoration"],
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    duration: "1–12 months",
    projects: 38,
  },
  {
    id: 4,
    icon: "HardHat",
    title: "Project Management",
    desc: "End-to-end project oversight ensuring timelines and budgets are met.",
    fullDesc: "Our certified project managers provide comprehensive oversight for construction projects of any scale. We implement proven methodologies to control costs, manage schedules, coordinate subcontractors, and ensure quality at every stage — from groundbreaking to ribbon-cutting.",
    features: ["Budget & Cost Control", "Schedule Management", "Subcontractor Coordination", "Risk Management", "Quality Assurance & Reporting"],
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    duration: "Ongoing",
    projects: 80,
  },
  {
    id: 5,
    icon: "Ruler",
    title: "Design & Planning",
    desc: "Architectural design and detailed construction planning services.",
    fullDesc: "Our in-house design team works with clients to develop architectural concepts, detailed engineering drawings, and comprehensive construction plans. We use the latest BIM technology to visualize projects before a single brick is laid, reducing errors and improving outcomes.",
    features: ["Architectural Design", "Structural Engineering", "BIM Modeling", "Site Planning & Surveys", "Permit & Regulatory Approvals"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    duration: "1–6 months",
    projects: 55,
  },
  {
    id: 6,
    icon: "Shield",
    title: "Safety Compliance",
    desc: "Full compliance with local building codes and safety regulations.",
    fullDesc: "Safety is non-negotiable at Light Construction. Our dedicated safety team ensures every project site meets and exceeds local and international safety standards. We conduct regular audits, provide safety training, and implement robust protocols to protect workers, clients, and the public.",
    features: ["Site Safety Audits", "Worker Safety Training", "Regulatory Compliance", "Environmental Impact Management", "Emergency Response Planning"],
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    duration: "Ongoing",
    projects: 100,
  },
];

export const portfolioProjects = [
  {
    id: 1,
    title: "Riverside Apartments",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    year: 2024,
    location: "Addis Ababa, Ethiopia",
    client: "Tesfaye Real Estate",
    value: "$850,000",
    duration: "18 months",
    desc: "A modern 12-unit residential complex featuring contemporary design, green spaces, and premium amenities along the riverside.",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    ],
  },
  {
    id: 2,
    title: "Downtown Office Tower",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    year: 2025,
    location: "Addis Ababa, Ethiopia",
    client: "Mengistu Group",
    value: "$2,400,000",
    duration: "24 months",
    desc: "A 20-floor commercial office tower in the heart of the city, featuring smart building technology and LEED-certified design.",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    ],
  },
  {
    id: 3,
    title: "Green Valley Villas",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    year: 2024,
    location: "Bishoftu, Ethiopia",
    client: "Alemu Developments",
    value: "$1,200,000",
    duration: "20 months",
    desc: "An exclusive community of 8 luxury villas surrounded by lush greenery, each with private pools and landscaped gardens.",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    ],
  },
  {
    id: 4,
    title: "Harbor Bridge",
    category: "Infrastructure",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    year: 2023,
    location: "Dire Dawa, Ethiopia",
    client: "City Municipality",
    value: "$320,000",
    duration: "8 months",
    desc: "Structural repair and reinforcement of a critical harbor bridge, restoring full load capacity and extending service life by 30 years.",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },
  {
    id: 5,
    title: "City Mall Complex",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    year: 2023,
    location: "Hawassa, Ethiopia",
    client: "Girma Holdings",
    value: "$3,100,000",
    duration: "30 months",
    desc: "A landmark retail and entertainment complex featuring 120 shops, a food court, cinema, and underground parking for 500 vehicles.",
    gallery: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&q=80",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80",
    ],
  },
  {
    id: 6,
    title: "Lakeside Resort",
    category: "Hospitality",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    year: 2022,
    location: "Ziway, Ethiopia",
    client: "Bekele Tourism Group",
    value: "$1,800,000",
    duration: "22 months",
    desc: "A 5-star lakeside resort with 60 rooms, conference facilities, spa, and multiple dining venues overlooking Lake Ziway.",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    ],
  },
];

export const galleryItems = [
  { id: 1, type: "photo", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", title: "Foundation Work - Riverside", category: "Construction" },
  { id: 2, type: "photo", src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80", title: "Steel Framework - Office Tower", category: "Construction" },
  { id: 3, type: "photo", src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", title: "Design Planning Session", category: "Planning" },
  { id: 4, type: "photo", src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", title: "Completed Office Tower", category: "Completed" },
  { id: 5, type: "photo", src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", title: "Riverside Apartments Final", category: "Completed" },
  { id: 6, type: "photo", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", title: "Green Valley Villas", category: "Completed" },
  { id: 7, type: "photo", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", title: "Harbor Bridge Repair", category: "Infrastructure" },
  { id: 8, type: "photo", src: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80", title: "City Mall Complex", category: "Commercial" },
];

export const founderData = {
  name: "Abebe Girma",
  title: "Founder & CEO, Light Construction",
  tagline: "Building Ethiopia's Future, One Structure at a Time",
  img: "https://randomuser.me/api/portraits/men/32.jpg",
  coverImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
  bio: [
    "Abebe Girma is a visionary construction entrepreneur with over 20 years of experience transforming the built environment across Ethiopia and East Africa. Born and raised in Addis Ababa, he developed a passion for architecture and engineering from an early age, going on to earn his degree in Civil Engineering from Addis Ababa University.",
    "After working with international construction firms in Dubai and Nairobi, Abebe returned to Ethiopia in 2010 with a clear mission: to build a world-class construction company that combines global standards with deep local knowledge. He founded Light Construction with just a small team and a big vision.",
    "Today, under his leadership, Light Construction has grown into one of Ethiopia's most respected construction firms, having delivered over 150 projects worth more than $50 million across residential, commercial, and infrastructure sectors.",
  ],
  stats: [
    { label: "Years Experience", value: "20+" },
    { label: "Projects Delivered", value: "150+" },
    { label: "Total Project Value", value: "$50M+" },
    { label: "Team Members Led", value: "200+" },
  ],
  education: [
    { degree: "BSc Civil Engineering", school: "Addis Ababa University", year: "2001" },
    { degree: "MSc Construction Management", school: "University of Nairobi", year: "2005" },
    { degree: "PMP Certification", school: "Project Management Institute", year: "2007" },
  ],
  awards: [
    { title: "Ethiopian Construction Excellence Award", org: "Ministry of Urban Development", year: "2022" },
    { title: "East Africa Business Leader of the Year", org: "EA Business Council", year: "2021" },
    { title: "Best Residential Developer", org: "Addis Real Estate Forum", year: "2019" },
  ],
  milestones: [
    { year: "2001", event: "Graduated with BSc Civil Engineering, AAU" },
    { year: "2005", event: "Completed MSc in Construction Management, Nairobi" },
    { year: "2007", event: "Joined Al-Futtaim Engineering, Dubai as Senior Engineer" },
    { year: "2010", event: "Founded Light Construction in Addis Ababa" },
    { year: "2015", event: "Expanded operations to 3 regional cities" },
    { year: "2020", event: "Delivered 100th project milestone" },
    { year: "2024", event: "Launched digital project management platform" },
  ],
  featuredProjects: [
    { title: "Downtown Office Tower", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", value: "$2.4M", year: 2025 },
    { title: "City Mall Complex", img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&q=80", value: "$3.1M", year: 2023 },
    { title: "Lakeside Resort", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", value: "$1.8M", year: 2022 },
  ],
};
