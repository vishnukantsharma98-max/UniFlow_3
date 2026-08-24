export interface BookCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  gradient: string;
  accentColor: string;
}

export interface BookResource {
  id: string;
  title: string;
  url: string;
  category: string;
  categoryLabel: string;
  description: string;
}

export const BOOK_CATEGORIES: BookCategory[] = [
  {
    id: 'fiction',
    name: 'Fiction',
    description: 'Classic literature, speculative fiction, world stories, and imaginative epics.',
    iconName: 'BookMarked',
    gradient: 'from-blue-600 via-indigo-600 to-violet-700',
    accentColor: '#6366F1',
  },
  {
    id: 'self-help',
    name: 'Self-Help',
    description: 'Personal development, productivity frameworks, mindfulness, and habits.',
    iconName: 'Sparkles',
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    accentColor: '#F59E0B',
  },
  {
    id: 'non-fiction',
    name: 'Non-Fiction',
    description: 'Open access academic textbooks, histories, biographies, and scientific literature.',
    iconName: 'Library',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    accentColor: '#10B981',
  },
  {
    id: 'business-finance',
    name: 'Business & Finance',
    description: 'Economics, personal finance, investing classics, and business leadership.',
    iconName: 'TrendingUp',
    gradient: 'from-emerald-700 via-green-600 to-teal-800',
    accentColor: '#059669',
  },
  {
    id: 'mystery-thriller',
    name: 'Mystery & Thriller',
    description: 'Detective mysteries, suspense novels, psychological thrillers, and crime classics.',
    iconName: 'Search',
    gradient: 'from-purple-700 via-violet-800 to-indigo-900',
    accentColor: '#8B5CF6',
  },
  {
    id: 'novels',
    name: 'Novels',
    description: 'Full-length prose narratives, literary classics, and beautifully formatted ebooks.',
    iconName: 'BookOpen',
    gradient: 'from-rose-600 via-pink-600 to-purple-700',
    accentColor: '#EC4899',
  },
];

export const BOOK_RESOURCES_DATA: BookResource[] = [
  // 1. Fiction
  {
    id: 'fiction-gutenberg',
    title: 'Project Gutenberg',
    url: 'https://gutenberg.org',
    category: 'fiction',
    categoryLabel: 'Fiction',
    description: 'Library of over 70,000 free classic literature eBooks.',
  },
  {
    id: 'fiction-standardebooks',
    title: 'Standard Ebooks',
    url: 'https://standardebooks.org',
    category: 'fiction',
    categoryLabel: 'Fiction',
    description: 'Free and liberated public domain ebooks carefully typeset and edited.',
  },
  {
    id: 'fiction-royalroad',
    title: 'Royal Road',
    url: 'https://royalroad.com',
    category: 'fiction',
    categoryLabel: 'Fiction',
    description: 'Leading platform for serialized web novels, fantasy, and sci-fi fiction.',
  },

  // 2. Self-Help
  {
    id: 'selfhelp-openlibrary',
    title: 'Open Library',
    url: 'https://openlibrary.org',
    category: 'self-help',
    categoryLabel: 'Self-Help',
    description: 'Open, editable library catalog building a web page for every book ever published.',
  },
  {
    id: 'selfhelp-archive',
    title: 'Internet Archive',
    url: 'https://archive.org',
    category: 'self-help',
    categoryLabel: 'Self-Help',
    description: 'Non-profit digital library of millions of free books, movies, software, and music.',
  },

  // 3. Non-Fiction
  {
    id: 'nonfiction-doab',
    title: 'Directory of Open Access Books',
    url: 'https://doabooks.org',
    category: 'non-fiction',
    categoryLabel: 'Non-Fiction',
    description: 'Community-driven discovery service that indexes peer-reviewed open access books.',
  },
  {
    id: 'nonfiction-archive',
    title: 'Internet Archive',
    url: 'https://archive.org',
    category: 'non-fiction',
    categoryLabel: 'Non-Fiction',
    description: 'Massive open catalog containing non-fiction historical documents and reference books.',
  },
  {
    id: 'nonfiction-opentextbook',
    title: 'Open Textbook Library',
    url: 'https://open.umn.edu/opentextbooks',
    category: 'non-fiction',
    categoryLabel: 'Non-Fiction',
    description: 'Open textbooks licensed by authors and publishers to be freely used and adapted.',
  },

  // 4. Business & Finance
  {
    id: 'business-econlib',
    title: 'Library of Economics and Liberty',
    url: 'https://econlib.org',
    category: 'business-finance',
    categoryLabel: 'Business & Finance',
    description: 'Dedicated to advancing the study of economics, markets, and liberty.',
  },
  {
    id: 'business-opentextbook',
    title: 'Open Textbook Library',
    url: 'https://open.umn.edu/opentextbooks',
    category: 'business-finance',
    categoryLabel: 'Business & Finance',
    description: 'Peer-reviewed college-level textbooks on accounting, finance, and management.',
  },

  // 5. Mystery & Thriller
  {
    id: 'mystery-globalgrey',
    title: 'Global Grey',
    url: 'https://globalgreyebooks.com',
    category: 'mystery-thriller',
    categoryLabel: 'Mystery & Thriller',
    description: 'Curated collection of high-quality mystery, horror, and classic suspense ebooks.',
  },
  {
    id: 'mystery-loyalbooks',
    title: 'Loyal Books',
    url: 'https://loyalbooks.com',
    category: 'mystery-thriller',
    categoryLabel: 'Mystery & Thriller',
    description: 'Free public domain audiobooks and eBook downloads for mystery thrillers.',
  },

  // 6. Novels
  {
    id: 'novels-gutenberg',
    title: 'Project Gutenberg',
    url: 'https://gutenberg.org',
    category: 'novels',
    categoryLabel: 'Novels',
    description: 'Extensive repository of famous world novels ready for instant reading.',
  },
  {
    id: 'novels-standardebooks',
    title: 'Standard Ebooks',
    url: 'https://standardebooks.org',
    category: 'novels',
    categoryLabel: 'Novels',
    description: 'Modern, elegantly formatted public domain novels formatted for modern e-readers.',
  },
];
