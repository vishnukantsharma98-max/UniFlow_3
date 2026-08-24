export interface GameItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  gradient: string;
}

export const GAMES_DATA: GameItem[] = [
  {
    id: 'crazygames',
    name: 'CrazyGames',
    url: 'https://crazygames.com',
    category: 'Action & Web Games',
    description: 'Free browser gaming platform with thousands of multiplayer, racing, and action titles.',
    gradient: 'from-purple-600 via-indigo-600 to-pink-600',
  },
  {
    id: 'poki',
    name: 'Poki',
    url: 'https://poki.com',
    category: 'Casual & Puzzle',
    description: 'High-quality instant browser games across arcade, puzzle, sports, and casual adventure genres.',
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
  },
  {
    id: 'itch-io',
    name: 'itch.io',
    url: 'https://itch.io',
    category: 'Indie Games & Game Jams',
    description: 'Open marketplace for independent video game creators, experimental games, and interactive stories.',
    gradient: 'from-red-600 via-rose-600 to-amber-600',
  },
  {
    id: 'miniclip',
    name: 'Miniclip',
    url: 'https://miniclip.com',
    category: 'Classic Arcade & Sports',
    description: 'Legendary gaming portal known for 8 Ball Pool, Agar.io, and classic multiplayer action.',
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
  },
  {
    id: 'armor-games',
    name: 'Armor Games',
    url: 'https://armorgames.com',
    category: 'Strategy & RPG',
    description: 'Premier publisher of classic strategy games, tower defense, RPGs, and puzzle adventures.',
    gradient: 'from-amber-600 via-orange-600 to-red-700',
  },
  {
    id: 'coolmath-games',
    name: 'Coolmath Games',
    url: 'https://coolmathgames.com',
    category: 'Brain Training & Strategy',
    description: 'Brain-training strategy games, logic puzzles, physics sandbox games, and memory challenges.',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
  },
];
