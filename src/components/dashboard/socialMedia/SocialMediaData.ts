export interface SocialMediaItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  isDirectAccess?: boolean; // WhatsApp, Instagram are direct open
  gradient: string;
}

export const SOCIAL_MEDIA_DATA: SocialMediaItem[] = [
  {
    id: 'discord',
    name: 'Discord',
    url: 'https://discord.com',
    category: 'Community & Voice',
    description: 'Real-time student servers, coding channels, study lounges, and voice hangouts.',
    gradient: 'from-indigo-600 via-indigo-500 to-purple-600',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: 'https://reddit.com',
    category: 'Discussions & Forums',
    description: 'Vibrant student discussions across r/developersIndia, r/learnprogramming, and tech communities.',
    gradient: 'from-orange-600 via-rose-600 to-amber-600',
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    url: 'https://x.com',
    category: 'Tech News & Trends',
    description: 'Follow open-source maintainers, AI researchers, and tech industry announcements in real time.',
    gradient: 'from-zinc-900 via-neutral-900 to-black',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://telegram.org',
    category: 'Messaging & Channels',
    description: 'High-speed messaging channels, study groups, coding bot groups, and book channels.',
    gradient: 'from-sky-500 via-blue-500 to-cyan-600',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://whatsapp.com',
    category: 'Direct Messaging',
    description: 'Stay connected with college batch groups, class updates, and study peers.',
    isDirectAccess: true, // Personal link exemption
    gradient: 'from-emerald-600 via-green-500 to-teal-600',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com',
    category: 'Video Learning & Media',
    description: 'Global repository of tech conferences, university lectures, tutorials, and tech reviews.',
    gradient: 'from-red-600 via-rose-600 to-red-700',
  },
  {
    id: 'slack',
    name: 'Slack',
    url: 'https://slack.com',
    category: 'Team Collaboration',
    description: 'Enterprise and student hackathon workspace communication with channels and integrations.',
    gradient: 'from-purple-700 via-pink-600 to-amber-500',
  },
  {
    id: 'quora',
    name: 'Quora',
    url: 'https://quora.com',
    category: 'Q&A Community',
    description: 'Knowledge-sharing platform for college advice, exam preparation insights, and domain expertise.',
    gradient: 'from-red-700 via-rose-700 to-amber-700',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com',
    category: 'Social & Campus Life',
    description: 'Campus events, student reels, tech creators, and design inspiration.',
    isDirectAccess: true, // Personal link exemption
    gradient: 'from-purple-600 via-pink-600 to-amber-500',
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    url: 'https://geeksforgeeks.org',
    category: 'Developer Community',
    description: 'Coding articles, interview experiences, problem solving, and computer science forums.',
    gradient: 'from-emerald-700 via-green-600 to-teal-800',
  },
];
