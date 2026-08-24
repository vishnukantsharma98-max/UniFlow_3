import { EcosystemItem, CategoryCardData, FlowStage, PlatformFeature, StudentReview, SearchResultItem } from './types';
import { VISHNU_BASE64_PHOTO } from './assets/vishnuImage';

export const HERO_FLOATING_ITEMS: EcosystemItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    subtitle: 'Chat, Image, Code, Research',
    iconName: 'Bot',
    accentColor: 'magenta',
    tags: ['GPT-4o', 'DeepSeek', 'Gemini Flash', 'Code Assistant'],
    positionDesktop: { top: '8%', left: '8%' },
    delay: 0.2
  },
  {
    id: 'exam-vault',
    title: 'Exam Vault',
    subtitle: 'PYQs, Notes, Papers & Question Banks',
    iconName: 'ShieldAlert',
    accentColor: 'violet',
    tags: ['RTU Papers', 'JECRC Papers', 'Model Solutions', 'Formula Sheets'],
    positionDesktop: { top: '10%', right: '4%' },
    delay: 0.35
  },
  {
    id: 'study',
    title: 'Study',
    subtitle: 'Notes, PDFs, Assignments',
    iconName: 'BookOpen',
    accentColor: 'violet',
    tags: ['Handwritten Notes', 'Syllabus Tracker', 'Semester Roadmaps'],
    positionDesktop: { top: '38%', left: '2%' },
    delay: 0.5
  },
  {
    id: 'games',
    title: 'Games',
    subtitle: 'Play, Relax, Challenge',
    iconName: 'Gamepad2',
    accentColor: 'amber',
    tags: ['2048', 'Wordle', 'Chess AI', 'Speed Typer', 'Retro Arcade'],
    positionDesktop: { top: '36%', right: '2%' },
    delay: 0.65
  },
  {
    id: 'apps',
    title: 'Apps',
    subtitle: 'Productivity, Utilities, Tools',
    iconName: 'LayoutGrid',
    accentColor: 'magenta',
    tags: ['GPA Calculator', 'Resume Builder', 'Pomodoro Flow', 'PDF Tools'],
    positionDesktop: { top: '64%', right: '5%' },
    delay: 0.8
  },
  {
    id: 'books',
    title: 'Books',
    subtitle: 'E-Books, Comics, Audiobooks',
    iconName: 'Library',
    accentColor: 'violet',
    tags: ['Engineering Core', 'Manga & Comics', 'Audiobooks', 'Self-Help'],
    positionDesktop: { top: '78%', right: '14%' },
    delay: 0.95
  }
];

export const CATEGORIES_DATA: CategoryCardData[] = [
  {
    id: 'study',
    title: 'Study',
    tagline: 'Master Any Subject',
    description: 'Handwritten notes, syllabus roadmaps, verified assignments & PYQ vaults.',
    icon: 'BookOpen',
    accentColor: '#8b5cf6',
    gradientClass: 'glass-card-study',
    items: ['Subject Notes', 'Assignments', 'PYQs Vault', 'Question Banks'],
    badge: 'Popular',
    highlightText: '12+ Engineering branches'
  },
  {
    id: 'ai-hub',
    title: 'AI Hub',
    tagline: 'Supercharge Your Intellect',
    description: 'Code assistants, instant math solvers, summarizers & diagram generators.',
    icon: 'Sparkles',
    accentColor: '#ec4899',
    gradientClass: 'glass-card-ai',
    items: ['Code Assistant', 'Math Solver', 'Research AI'],
    badge: 'Intelligent',
    highlightText: '15+ Student AI Models'
  },
  {
    id: 'games',
    title: 'Games',
    tagline: 'Decompress & Re-energize',
    description: 'Zero-install brain-refresh games & quick esports to break study fatigue.',
    icon: 'Gamepad2',
    accentColor: '#f59e0b',
    gradientClass: 'glass-card-amber',
    items: ['Chess Blitz', 'Speed Typing', 'Focus Arcade'],
    badge: 'Relax',
    highlightText: 'Instant zero-install web play'
  },
  {
    id: 'books',
    title: 'Books',
    tagline: 'Your Infinite Library',
    description: 'Standard textbooks, reference guides, tech deep dives & audiobooks.',
    icon: 'Library',
    accentColor: '#a855f7',
    gradientClass: 'glass-card-study',
    items: ['Standard Textbooks', 'Reference Guides', 'Audiobooks'],
    highlightText: '5,000+ Free E-Books'
  },
  {
    id: 'apps',
    title: 'Apps',
    tagline: 'Productivity Utilities',
    description: 'SGPA/CGPA calculators, smart schedulers, ATS resumes & PDF toolkits.',
    icon: 'LayoutGrid',
    accentColor: '#ec4899',
    gradientClass: 'glass-card-ai',
    items: ['CGPA Calculator', 'Smart Timetable', 'ATS Resume'],
    badge: 'Utilities',
    highlightText: '100% Free student tools'
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    tagline: 'Curated Downtime',
    description: 'Lo-fi study radio, student anime picks, tech podcasts & chill feeds.',
    icon: 'PlayCircle',
    accentColor: '#d946ef',
    gradientClass: 'glass-card-ai',
    items: ['Lo-Fi Radio', 'Anime Picks', 'Tech Podcasts'],
    highlightText: 'Ad-free study tunes'
  },
  {
    id: 'resources',
    title: 'Resources',
    tagline: 'Zero to Mastery',
    description: 'DSA cheat sheets, GitHub starter kits & full-stack project roadmaps.',
    icon: 'FolderGit2',
    accentColor: '#f59e0b',
    gradientClass: 'glass-card-amber',
    items: ['DSA Sheets', 'Web Dev Roadmaps', 'Interview Vault'],
    badge: 'High Impact',
    highlightText: '30,000+ Curated Resources'
  }
];

export const FLOW_STAGES: FlowStage[] = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'Find past papers, roadmaps, textbooks and verified notes in seconds.',
    icon: 'Compass',
    color: '#a855f7'
  },
  {
    step: '02',
    title: 'STUDY',
    description: 'Master core concepts with structured notes, syllabus guides and PYQ vaults.',
    icon: 'BookOpen',
    color: '#c084fc'
  },
  {
    step: '03',
    title: 'CREATE',
    description: 'Generate polished assignments, debug code, and format high-impact resumes.',
    icon: 'Sparkles',
    color: '#ec4899'
  },
  {
    step: '04',
    title: 'ORGANIZE',
    description: 'Calculate GPA, manage semester timetables and track deadlines in one hub.',
    icon: 'Share2',
    color: '#fb923c'
  },
  {
    step: '05',
    title: 'PLAY',
    description: 'Decompress between intense sessions with Vishnu Drift and focus games.',
    icon: 'Gamepad2',
    color: '#f43f5e'
  },
  {
    step: '06',
    title: 'GROW',
    description: 'Level up your skills with DSA cheat sheets, full-stack tracks and tech tools.',
    icon: 'TrendingUp',
    color: '#f59e0b'
  }
];

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    icon: 'Gauge',
    title: 'Smart Dashboard',
    description: 'Track ongoing course progress, upcoming exam deadlines, and daily streaks in one cohesive view.',
    status: 'AVAILABLE',
    glowColor: '#a855f7'
  },
  {
    icon: 'Cloud',
    title: 'Cloud Sync',
    description: 'Seamless real-time synchronization between your phone, laptop, and tablet with zero data loss.',
    status: 'AVAILABLE',
    glowColor: '#ec4899'
  },
  {
    icon: 'UserCheck',
    title: 'Personalized Feed',
    description: 'AI-tailored subject recommendations that match your specific university branch and semester goals.',
    status: 'AVAILABLE',
    glowColor: '#8b5cf6'
  },
  {
    icon: 'Lock',
    title: 'Secure & Private',
    description: 'End-to-end encrypted notes and bookmarks with strict zero-third-party tracker policies.',
    status: 'AVAILABLE',
    glowColor: '#f59e0b'
  },
  {
    icon: 'Zap',
    title: 'Lightning Fast',
    description: 'Engineered for sub-100ms load speeds, offline cached viewing, and instantaneous search indexing.',
    status: 'AVAILABLE',
    glowColor: '#d946ef'
  },
  {
    icon: 'KeyRound',
    title: 'Secure Google Login',
    description: 'Single-click frictionless authentication using your verified university or personal Google credentials.',
    status: 'AVAILABLE',
    glowColor: '#f59e0b'
  }
];

export const INITIAL_STUDENT_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Arjun Verma',
    college: 'JECRC University',
    year: '3rd Year AIDS',
    quote: 'UniFlow has everything I need for my semester exams and coding practice. Having PYQs right alongside the AI code assistant is a total game changer!',
    rating: 5,
    avatarSeed: 'Arjun',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    name: 'Riya Sharma',
    college: 'JECRC University',
    year: '2nd Year CSE',
    quote: 'The AI tools and question banks helped me score an 8.9 SGPA last sem. Plus the dark cosmic aesthetic is so soothing during late night cramming sessions.',
    rating: 5,
    avatarSeed: 'Riya',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    name: 'Karan Singh',
    college: 'JECRC University',
    year: '4th Year ECE',
    quote: 'From lab manuals and DSA roadmaps to quick games between lectures, UniFlow really lives up to the promise: all student essentials in one unified flow.',
    rating: 5,
    avatarSeed: 'Karan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
  }
];

export const SEARCH_INDEX: SearchResultItem[] = [
  { id: '1', title: 'Data Structures & Algorithms in C++', category: 'Resources', type: 'Curriculum & Notes', link: '#resources', badge: 'Must Have' },
  { id: '2', title: 'Operating Systems Previous Year Papers (2020-2025)', category: 'Exam Vault', type: 'Solved PDF Vault', link: '#study', badge: 'High Yield' },
  { id: '3', title: 'AI Code & Math Solver Assistant', category: 'AI Hub', type: 'Interactive Tool', link: '#ai-hub', badge: 'Live AI' },
  { id: 'sem1-1', title: 'EM-I Engineering Mathematics I Assignments & Solutions', category: 'Study', type: 'Semester 1 Vault', link: '#study', badge: 'Semester 1' },
  { id: 'sem1-2', title: 'Exam Vault Semester 1 (2025 In-Sem 1 & In-Sem 2 Papers)', category: 'Exam Vault', type: 'Solved PDF Vault', link: '#study', badge: 'Semester 1' },
  { id: 'sem1-3', title: 'EVS Swayam Environmental Studies Chapters 1-12 Notes & Playlist', category: 'Study', type: 'Swayam MOOC', link: '#study', badge: 'Semester 1' },
  { id: '4', title: 'Engineering Mathematics III Handwritten Notes', category: 'Study', type: 'Handwritten PDF', link: '#study' },
  { id: '5', title: 'Database Management Systems Lab Manual & Viva Prep', category: 'Study', type: 'Lab Guide', link: '#study' },
  { id: '6', title: 'Engineering CGPA & SGPA Simulator', category: 'Apps', type: 'Interactive Utility', link: '#apps' },
  { id: '7', title: 'Full Stack Web Development Roadmap (MERN / Next.js)', category: 'Resources', type: 'Career Pack', link: '#resources' },
  { id: '8', title: 'Multiplayer Speed Chess & 2048 Arcade', category: 'Games', type: 'Mini Game', link: '#games' },
  { id: '9', title: 'Clean Code & System Design E-Books', category: 'Books', type: 'Digital Library', link: '#books' },
  { id: '10', title: 'Lo-Fi Chill & Focus Radio Live Stream', category: 'Entertainment', type: 'Audio Stream', link: '#entertainment' }
];

export const SOCIAL_PROOF_STUDENTS = [
  {
    name: 'Aarav',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Riya',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Karan',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Pooja',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Dev',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  }
];

export const FOUNDER_INFO = {
  name: 'Vishnu Kant Sharma',
  role: 'Founder & Architect',
  department: 'AI & Data Science (AIDS)',
  college: 'Student at JECRC University',
  university: 'JECRC University',
  tagline: 'An AI & DS student building the ultimate student ecosystem.',
  vision: 'UniFlow is my vision to make student life simpler, smarter and more productive. Instead of juggling 15 disjointed apps and websites, everything lives in one frictionless flow.',
  quote: 'More than an app, it is your student command center.',
  photoUrl: VISHNU_BASE64_PHOTO,
  remotePhotoUrl: VISHNU_BASE64_PHOTO,
  fallbackPhotoUrl: 'https://i.postimg.cc/PJcsPg5M/4tui.jpg',
  instagramHandle: '@writer.arjun.07',
  linkedinHandle: 'vishnu-kant-sharma-student',
  links: {
    instagram: 'https://www.instagram.com/writer.arjun.07/?hl=en',
    linkedin: 'https://www.linkedin.com/in/vishnu-kant-sharma-student',
    email: 'mailto:vishnukantsharma98@gmail.com'
  }
};
