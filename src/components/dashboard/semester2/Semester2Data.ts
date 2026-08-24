export interface Assignment {
  id: number;
  title: string;
  subject: string;
  questionLink: string;
}

export interface SubjectMeta {
  name: string;
  icon: string;
  color: string;
  bg: string;
  textCol: string;
  slug: string;
}

export interface ExamVaultSubject {
  name: string;
  questionLink?: string;
}

export interface ExamVaultBlock {
  id: 'in-sem-1' | 'in-sem-2' | 'in-sem-3' | 'end-sem';
  title: string;
  subtitle: string;
  subjects: string[];
}

export const SEM2_ASSIGNMENT_SUBJECTS = [
  'Advanced Excel',
  'C++',
  'DSA',
  'Maths for AI',
  'Engineering Workshop',
  'Professional Skills',
] as const;

export const SEM2_SUBJECT_METAS: Record<string, SubjectMeta> = {
  'Advanced Excel': {
    name: 'Advanced Excel',
    icon: 'Table',
    color: 'emerald-500',
    bg: 'bg-emerald-500/10',
    textCol: 'text-emerald-600 dark:text-emerald-400',
    slug: 'advanced-excel',
  },
  'C++': {
    name: 'C++',
    icon: 'Code2',
    color: 'blue-500',
    bg: 'bg-blue-500/10',
    textCol: 'text-blue-600 dark:text-blue-400',
    slug: 'c-plus-plus',
  },
  'DSA': {
    name: 'DSA',
    icon: 'Network',
    color: 'teal-500',
    bg: 'bg-teal-500/10',
    textCol: 'text-teal-600 dark:text-teal-400',
    slug: 'dsa',
  },
  'Maths for AI': {
    name: 'Maths for AI',
    icon: 'Calculator',
    color: 'purple-500',
    bg: 'bg-purple-500/10',
    textCol: 'text-purple-600 dark:text-purple-400',
    slug: 'maths-for-ai',
  },
  'Engineering Workshop': {
    name: 'Engineering Workshop',
    icon: 'Wrench',
    color: 'amber-500',
    bg: 'bg-amber-500/10',
    textCol: 'text-amber-600 dark:text-amber-400',
    slug: 'engineering-workshop',
  },
  'Professional Skills': {
    name: 'Professional Skills',
    icon: 'Briefcase',
    color: 'cyan-500',
    bg: 'bg-cyan-500/10',
    textCol: 'text-cyan-600 dark:text-cyan-400',
    slug: 'professional-skills',
  },
};

export const SEM2_ASSIGNMENTS: Assignment[] = [
  // ADVANCED EXCEL
  {
    id: 201,
    subject: 'Advanced Excel',
    title: 'Assignment 1 to 10 (Question)',
    questionLink: 'https://drive.google.com/file/d/1_qm6h5aMXIkt7hBJOoaleAmPnHDiHXG6/view?usp=drive_link',
  },

  // C++
  {
    id: 202,
    subject: 'C++',
    title: 'Assignment 1 (Question)',
    questionLink: 'https://drive.google.com/file/d/1mJB3LBFJJYuYR83wb0gmKPZCdSm8oxIZ/view?usp=drive_link',
  },

  // PROFESSIONAL SKILLS
  {
    id: 203,
    subject: 'Professional Skills',
    title: 'Assignment 1 (Question)',
    questionLink: 'https://drive.google.com/file/d/1cdTGCvuZWrYuFNvCLmdnNjIgI6M2i7-U/view?usp=drive_link',
  },

  // ENGINEERING WORKSHOP
  {
    id: 204,
    subject: 'Engineering Workshop',
    title: 'Assignment 1 (Question)',
    questionLink: 'https://drive.google.com/file/d/1G3ECCOCk4iHJRB4830fWGrqcOgPkywls/view?usp=drive_link',
  },
  {
    id: 205,
    subject: 'Engineering Workshop',
    title: 'Assignment 2 (Question)',
    questionLink: 'https://drive.google.com/file/d/11nFu7v-ohVan3CpdwkBmM50CdbVIF_j6/view?usp=drive_link',
  },
  {
    id: 206,
    subject: 'Engineering Workshop',
    title: 'Assignment 3 (Question)',
    questionLink: 'https://drive.google.com/file/d/1Xe6ZpI1SI_dhKuW-kt5EiO-r6P6ZUOPO/view?usp=drive_link',
  },
  {
    id: 207,
    subject: 'Engineering Workshop',
    title: 'Assignment 4 (Question)',
    questionLink: 'https://drive.google.com/file/d/1f-qPVgX3iFOAIDJmo77TfZz-Ciom46ud/view?usp=drive_link',
  },
  {
    id: 208,
    subject: 'Engineering Workshop',
    title: 'Assignment 5 (Question)',
    questionLink: 'https://drive.google.com/file/d/1cGuuMzJc0YagbVl8uFjhcXSGQwOKXkht/view?usp=drive_link',
  },
  {
    id: 209,
    subject: 'Engineering Workshop',
    title: 'Assignment 6 (Question)',
    questionLink: 'https://drive.google.com/file/d/1N9LsYPUEw0LivfVza5zLSueiTr2nM4Iz/view?usp=drive_link',
  },
  {
    id: 210,
    subject: 'Engineering Workshop',
    title: 'Assignment 7 (Question)',
    questionLink: 'https://drive.google.com/file/d/1axOZ7fsBrqX_pllOemdscyfW9dzQs7Kx/view?usp=drive_link',
  },
  {
    id: 211,
    subject: 'Engineering Workshop',
    title: 'Assignment 8 (Question)',
    questionLink: 'https://drive.google.com/file/d/1SKuf_RRQyTWJlvla4q8h9L1Or3yhTXW7/view?usp=drive_link',
  },
  {
    id: 212,
    subject: 'Engineering Workshop',
    title: 'Assignment 9 (Question)',
    questionLink: 'https://drive.google.com/file/d/18a4cHTUgNHx1QSV12LGvqHpgp1MJKmSl/view?usp=drive_link',
  },
  {
    id: 213,
    subject: 'Engineering Workshop',
    title: 'Assignment 10 (Question)',
    questionLink: 'https://drive.google.com/file/d/10mxFRv8Uo9q51Ozw9QZlsv6ChEC9qCBf/view?usp=drive_link',
  },
  {
    id: 214,
    subject: 'Engineering Workshop',
    title: 'Assignment 11 (Question)',
    questionLink: 'https://drive.google.com/file/d/1NbZNrC9f8OL4sxL1MIsnaAj3CduJ1e2Q/view?usp=drive_link',
  },
  {
    id: 215,
    subject: 'Engineering Workshop',
    title: 'Assignment 12 (Question)',
    questionLink: 'https://drive.google.com/file/d/1G3ECCOCk4iHJRB4830fWGrqcOgPkywls/view?usp=drive_link',
  },

  // DSA
  {
    id: 216,
    subject: 'DSA',
    title: 'Assignment 1 (Question)',
    questionLink: 'https://drive.google.com/file/d/12GXPqO-SEz-6l5EAeEmv2THlmM-HUfnV/view?usp=drive_link',
  },
  {
    id: 217,
    subject: 'DSA',
    title: 'Assignment 2 (Question)',
    questionLink: 'https://drive.google.com/file/d/135J-k0Fwg1XRAV2SSGVekq8yITVPDZd6/view?usp=drive_link',
  },

  // MATHS FOR AI
  {
    id: 218,
    subject: 'Maths for AI',
    title: 'Assignment 1 (Question)',
    questionLink: 'https://drive.google.com/file/d/17hBP5cREpw5oBNhdq_BxT0B4X0zmeDZ4/view?usp=drive_link',
  },
  {
    id: 219,
    subject: 'Maths for AI',
    title: 'Assignment 2 (Question)',
    questionLink: 'https://drive.google.com/file/d/1BTGaybFwQ5-Qgq-3mB8rE8HCwiCZ-VQt/view?usp=drive_link',
  },
  {
    id: 220,
    subject: 'Maths for AI',
    title: 'Assignment 3 (Question)',
    questionLink: 'https://drive.google.com/file/d/1VLsAmBmWkF7kybBQ2NjAPnTk80h-DY7z/view?usp=drive_link',
  },
];

export const SEM2_EXAM_VAULT: ExamVaultBlock[] = [
  {
    id: 'in-sem-1',
    title: 'In-Sem 1',
    subtitle: 'First Mid-Term Question Papers',
    subjects: [
      'Applied Physics',
      'EM-2',
      'Professional Skills',
      'BEEE',
      'C++',
      'IHVPE',
    ],
  },
  {
    id: 'in-sem-2',
    title: 'In-Sem 2',
    subtitle: 'Second Mid-Term Question Papers',
    subjects: [
      'Applied Physics',
      'EM-2',
      'BEEE',
      'C++',
      'Professional Skills',
    ],
  },
  {
    id: 'in-sem-3',
    title: 'In-Sem 3',
    subtitle: 'Third Mid-Term Question Papers',
    subjects: [
      'EM-2',
      'IHVPE',
    ],
  },
  {
    id: 'end-sem',
    title: 'End Sem',
    subtitle: 'Final Examination Question Papers',
    subjects: [
      'EM-2',
      'Applied Physics',
      'Professional Skills',
    ],
  },
];

export const IHVPE_RESOURCE = {
  title: 'IHVPE',
  subtitle: 'Universal Human Values & Professional Ethics',
  password: 'vishnu',
  completeBook: {
    title: 'Complete Book',
    desc: 'Full study material for IHVPE.',
    link: 'https://drive.google.com/file/d/1deTt5vxGbQbRb71l7-xll8X_FHZhwW7L/view?usp=sharing',
  },
  unitNotes: [
    { unit: 'Unit 1', link: 'https://drive.google.com/file/d/1xq65o0oZKbRqGdpRezTMH1a1TZneFllI/view?usp=drive_link' },
    { unit: 'Unit 2', link: 'https://drive.google.com/file/d/1iZNR86HNPH2MKc15B0zBQobs2mdA0PyE/view?usp=drive_link' },
    { unit: 'Unit 3', link: 'https://drive.google.com/file/d/1vP4-kL1LXhP1bHs-H0XN_W2s0wlIsfMU/view?usp=drive_link' },
    { unit: 'Unit 4', link: 'https://drive.google.com/file/d/19r9MqLB_uQ2nwFfNF2XEgafMdk4BY-90/view?usp=drive_link' },
    { unit: 'Unit 5', link: 'https://drive.google.com/file/d/1dU53_Iy7dM2bN8bWk66W05Z1uLSt5Pbu/view?usp=sharing' },
  ],
  assignments: {
    title: 'Assignments 1 to 5',
    desc: 'Comprehensive assignment pack.',
    link: 'https://drive.google.com/file/d/1kBJZRpSIs4FL9BHZzjKmTHBMpeyckWn-/view?usp=sharing',
  },
};

export const CONSTITUTION_RESOURCE = {
  title: 'Indian Constitution',
  subtitle: 'Study Material & QB',
  password: 'vishnu',
  studyMaterial: {
    title: 'Study Material',
    desc: 'Complete reading resources and notes.',
    link: 'https://drive.google.com/file/d/1HawKwnyMLrPpq4dF_8_gXkV0D67vf7FA/view?usp=sharing',
  },
  questionBank: {
    title: 'Question Bank',
    desc: 'Important questions for exam prep.',
    link: 'https://drive.google.com/file/d/1-z-SniOql5f6_lU3r_glzlss25ZsP6dN/view?usp=sharing',
  },
};
