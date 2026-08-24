export interface StudentAppItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  isDirectAccess?: boolean; // LinkedIn is direct open without password
  gradient: string;
}

export const STUDENT_APPS_DATA: StudentAppItem[] = [
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://notion.so',
    category: 'Productivity & Notes',
    description: 'All-in-one workspace for notes, tasks, wikis, and project databases.',
    gradient: 'from-slate-700 via-gray-800 to-zinc-900',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    url: 'https://drive.google.com',
    category: 'Cloud Storage',
    description: 'Secure cloud storage and file backup for documents, slides, and media.',
    gradient: 'from-blue-600 via-amber-500 to-emerald-600',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    url: 'https://calendar.google.com',
    category: 'Time Management',
    description: 'Smart scheduling, class reminders, exam planning, and event tracking.',
    gradient: 'from-blue-500 via-indigo-600 to-cyan-500',
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    url: 'https://notebooklm.google.com',
    category: 'AI Research Assistant',
    description: 'Personalized AI research collaborator grounded in your source notes and PDFs.',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    category: 'Code & Collaboration',
    description: 'World-leading developer platform for code hosting, version control, and student pack perks.',
    gradient: 'from-gray-900 via-slate-800 to-zinc-950',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    url: 'https://code.visualstudio.com',
    category: 'Code Editor',
    description: 'Feature-rich code editor with deep extension ecosystem and integrated terminal.',
    gradient: 'from-blue-600 via-sky-600 to-indigo-700',
  },
  {
    id: 'canva',
    name: 'Canva',
    url: 'https://canva.com',
    category: 'Design & Graphics',
    description: 'Graphic design tool for creating student presentations, posters, and resumes.',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
  },
  {
    id: 'todoist',
    name: 'Todoist',
    url: 'https://todoist.com',
    category: 'Task Management',
    description: 'Organize your daily study routines, track project milestones, and maintain streaks.',
    gradient: 'from-red-600 via-rose-600 to-amber-600',
  },
  {
    id: 'forest',
    name: 'Forest',
    url: 'https://forestapp.cc',
    category: 'Focus & Study Timer',
    description: 'Gamified pomodoro timer that helps students stay focused and put down distractions.',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
  },
  {
    id: 'digilocker',
    name: 'DigiLocker',
    url: 'https://digilocker.gov.in',
    category: 'Digital Documents',
    description: 'Official Indian digital wallet for degrees, marksheets, certificates, and ID cards.',
    gradient: 'from-blue-700 via-indigo-800 to-slate-900',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    category: 'Professional Network',
    description: 'Professional networking platform for college students, internships, and career connections.',
    isDirectAccess: true, // Personal link exception: opens directly
    gradient: 'from-blue-700 via-blue-600 to-sky-600',
  },
  {
    id: 'internshala',
    name: 'Internshala',
    url: 'https://internshala.com',
    category: 'Internships & Jobs',
    description: 'Premier internship portal for Indian college students across tech and business domains.',
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    url: 'https://grammarly.com',
    category: 'Writing Assistant',
    description: 'AI writing assistance for grammar checking, essay editing, and tone polish.',
    gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
  },
  {
    id: 'adobe-acrobat',
    name: 'Adobe Acrobat',
    url: 'https://adobe.com/acrobat',
    category: 'PDF & Document Tools',
    description: 'Standard PDF viewer, annotator, compressor, and digital signature suite.',
    gradient: 'from-red-600 via-rose-700 to-red-800',
  },
];
