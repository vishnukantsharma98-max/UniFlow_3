export interface Sem3Subject {
  id: string;
  name: string;
  subtitle: string;
  icon: 'Network' | 'Binary' | 'Cpu' | 'FlaskConical' | 'Terminal' | 'Code2' | 'Laptop';
  gradient: string;
  link?: string;
}

export const SEM3_SUBJECTS: Sem3Subject[] = [
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Network',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'discrete-mathematics',
    name: 'Discrete Mathematics',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Binary',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'operating-system',
    name: 'Operating System',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Cpu',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'computer-network-lab',
    name: 'Computer Network Lab',
    subtitle: 'Semester 3 Syllabus',
    icon: 'FlaskConical',
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'operating-system-lab',
    name: 'Operating System Lab',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Terminal',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'programming-with-python',
    name: 'Programming with Python',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Code2',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'programming-with-python-lab',
    name: 'Programming with Python Lab',
    subtitle: 'Semester 3 Syllabus',
    icon: 'Laptop',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
];
