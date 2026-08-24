// Full Semester 1 Data matching the HTML reference file exactly

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  questionLink: string;
  answerLink?: string;
}

export interface SubjectMeta {
  name: string;
  icon: string;
  color: string;
  bg: string;
  textCol: string;
}

export interface TestPaper {
  name: string;
  questionLink: string;
  answerLink: string;
}

export interface TestBlock {
  title: string;
  subjects: TestPaper[];
}

export const SUBJECT_METAS: Record<string, SubjectMeta> = {
  'EM-I': { name: 'EM-I', icon: 'Calculator', color: 'indigo-500', bg: 'bg-indigo-100', textCol: 'text-indigo-600' },
  'Mathematics': { name: 'EM-I', icon: 'Calculator', color: 'indigo-500', bg: 'bg-indigo-100', textCol: 'text-indigo-600' },
  'Applied Physics': { name: 'Applied Physics', icon: 'Atom', color: 'pink-500', bg: 'bg-pink-100', textCol: 'text-pink-600' },
  'Applied Physics Lab': { name: 'Applied Physics Lab', icon: 'FlaskConical', color: 'rose-500', bg: 'bg-rose-100', textCol: 'text-rose-600' },
  'CPLT': { name: 'CPLT', icon: 'Terminal', color: 'amber-500', bg: 'bg-amber-100', textCol: 'text-amber-600' },
  'CPLT Lab': { name: 'CPLT Lab', icon: 'Laptop', color: 'cyan-500', bg: 'bg-cyan-100', textCol: 'text-cyan-600' },
  'AI': { name: 'AI', icon: 'Brain', color: 'emerald-500', bg: 'bg-emerald-100', textCol: 'text-emerald-600' },
  'Artificial Intelligence': { name: 'Artificial Intelligence', icon: 'Brain', color: 'emerald-500', bg: 'bg-emerald-100', textCol: 'text-emerald-600' },
  'Communication Skills': { name: 'Communication Skills', icon: 'MessageSquare', color: 'fuchsia-500', bg: 'bg-fuchsia-100', textCol: 'text-fuchsia-600' },
  'Communication Skills Lab': { name: 'Communication Skills Lab', icon: 'Presentation', color: 'purple-500', bg: 'bg-purple-100', textCol: 'text-purple-600' },
  'EVS': { name: 'EVS', icon: 'Leaf', color: 'emerald-500', bg: 'bg-emerald-100', textCol: 'text-emerald-600' },
  'Engineering Chemistry': { name: 'Engineering Chemistry', icon: 'FlaskConical', color: 'teal-500', bg: 'bg-teal-100', textCol: 'text-teal-600' },
};

export const SEM1_SUBJECTS = [
  'EM-I',
  'Applied Physics',
  'Applied Physics Lab',
  'CPLT',
  'CPLT Lab',
  'AI',
  'Communication Skills',
  'Communication Skills Lab',
];

export const SEM1_ASSIGNMENTS: Assignment[] = [
  { id: 1, title: 'Maths Assignment 1', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1sitj3Oz2_H7q8II13i_QEo3sStI-2LuM/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1KkGOxB9iu-QS2wPD8QUimqCdv2KC7dob/view?usp=sharing' },
  { id: 2, title: 'Maths Assignment 2', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1sD0lqjHTFrebNbWpKT7fPsrpLJ4ziu7j/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1Ou3aGS-DxXYckuySiWsLwRuzkIuQq5Iz/view?usp=sharing' },
  { id: 3, title: 'Maths Assignment 3', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1cERR8pslAOnD2F4p3dHsAeY-16tyfaH-/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/120XDSjxANjJiUIhwGC2Ob12IgCxK_pPM/view?usp=sharing' },
  { id: 4, title: 'Maths Assignment 4', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1sbzoehuXsbG6oxoSixfwEzFKagvKs7Yc/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1mLPaUfNXOC0UaeyoH7r5_B1nyla7FJ-K/view?usp=sharing' },
  { id: 5, title: 'Maths Assignment 5', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1rIgtYavywXwZOeEgpdQL_43dCgwOsJBL/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1s1eqE7o_UVcWjhmpDdtHa6NfzuSw3ucW/view?usp=sharing' },
  { id: 6, title: 'Maths Assignment 6', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/15sgps8DMutBeM72FTTfTWevD-GBH4XRS/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/19ldpt93qFVy6Qg35kjoDRlmWB5UVXev0/view?usp=sharing' },
  { id: 7, title: 'Maths Assignment 7', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1TsZDkhoO-pCSnm6cCWoLrMNqzEqVkInZ/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/15M2Zseg95qrNgfFWXoh4dg3XJWXxkDwV/view?usp=sharing' },
  { id: 8, title: 'Maths Assignment 8', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1pmQE8FF3_v4V0WJL3n7lcTpO3-aOJ81-/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1PbgNbKkwdDWxl5U0JMcXgL50Zdj6-U3l/view?usp=sharing' },
  { id: 9, title: 'Maths Assignment 9', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1XYBPQheeKwQtKCDOxAf8oUoWdp3hslS4/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1pB-_MyBCMguA25RZ_2FUQBHcvjBRX3ts/view?usp=sharing' },
  { id: 30, title: 'Maths Assignment 10', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/10GBpfcA4-PUtBj1_JH6t-6CZJhMYQwG_/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/14xBnq5iR38OlYW6e60ESlSk9RYgPJg4P/view?usp=sharing' },
  { id: 31, title: 'Maths Assignment 11', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/11PJgTAsGV5E1vqteQqM_aBVln-lDMzGQ/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1TPNBaBb4E6Athx7oDmbwRZVJLfHILN8u/view?usp=sharing' },
  { id: 32, title: 'Maths Assignment 12', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/16dT2fnLitZU15YMy4jMmbj1l26pJ9Y3T/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1RmboX2BdsPhtwFrSR8rU2KF-JQiio_Lk/view?usp=sharing' },
  { id: 37, title: 'Maths Assignment 13', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1FKBVSbfPg--Nxg6xhvb27U5CLVZs8jfq/view?usp=sharing', answerLink: '' },
  { id: 38, title: 'Maths Assignment 14', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1w6yIdP4aDont9rtLxpxWlF1bt73_djA3/view?usp=sharing', answerLink: '' },
  { id: 39, title: 'Maths Assignment 15', subject: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1ieb6yl5PkvErY2kGsaatnX3mbfHWAy24/view?usp=sharing', answerLink: '' },
  
  { id: 12, title: 'Applied Physics Assignment 1', subject: 'Applied Physics', questionLink: 'https://drive.google.com/file/d/17qtT2_GdlW5R3BRHwPZUwyK53GNYhyaT/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1makuMu9z7utfNoaMGBlxaqfKRwtk-c1D/view?usp=sharing' },
  { id: 13, title: 'Applied Physics Assignment 2', subject: 'Applied Physics', questionLink: 'https://docs.google.com/document/d/1Kp3-MHP1oOf0OOtsLbxxYYIoMBKuLRUU/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1ab6IJYm2BFqhZYoB5pRYEUrt9bbdOO7A/view?usp=sharing' },
  { id: 14, title: 'Applied Physics Assignment 3', subject: 'Applied Physics', questionLink: 'https://docs.google.com/document/d/1shBlb9dc4k4MG7L-5ByTIwJHC2htzZP8/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1XuJ1237Bh9_OaX1rXFzOfwftLP6RiCBB/view?usp=sharing' },
  { id: 15, title: 'Applied Physics Assignment 4', subject: 'Applied Physics', questionLink: 'https://docs.google.com/document/d/1asxHbcgOcuhm1vq4L8U6arPbzwY2yLZj/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1ePgFnjH-bnUG4ifAvuWPxeUW0JffirEk/view?usp=sharing' },
  { id: 40, title: 'Applied Physics Assignment 5', subject: 'Applied Physics', questionLink: 'https://docs.google.com/document/d/1Gc5xKLGYtOM9crmbwTfs6tL1yEAa7sqL/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: '' },
  
  { id: 22, title: 'all applied physics experiment', subject: 'Applied Physics Lab', questionLink: '', answerLink: 'https://drive.google.com/file/d/1QsEaL_0vNuqAY563_E8_2jiBMhGtNq1R/view?usp=sharing' },
  
  { id: 33, title: 'CPLT Lab File Work', subject: 'CPLT Lab', questionLink: '', answerLink: 'https://drive.google.com/file/d/1aMYKcDbz3IrjsqZ6BLWsK8iLz_iNhHd7/view?usp=sharing' },
  
  { id: 10, title: 'AI Assignment 2', subject: 'AI', questionLink: 'https://drive.google.com/file/d/1uGJQM7mE9Na5HbVSbOCucHKvCe9vImSl/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1UOrzy_98lFl3j9lT2QQLdtdQfcFh4HjO/view?usp=sharing' },
  { id: 11, title: 'AI Assignment 3', subject: 'AI', questionLink: 'https://drive.google.com/file/d/1Vp41rMB6pDyFz7NBLgesOUNrxyfqvXbn/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1gCjgVk78OhQ7dG6R3FGrtuuM9XiZmawT/view?usp=sharing' },
  { id: 26, title: 'AI Assignment 4', subject: 'AI', questionLink: 'https://drive.google.com/file/d/15l6QvXkXAshmNP23TOeOzZ4apI0M3Evl/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/15NKD_Xo9NSul7H9nceAH6PznizM3QQCB/view?usp=sharing' },
  { id: 35, title: 'AI Assignment 5', subject: 'AI', questionLink: 'https://drive.google.com/file/d/1OqFymBrn1cLxme1vjbwpFiAAXRCw5B6x/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1BYhmUnexzeFYHZo8Wf_rsT-vqyNNQTqS/view?usp=sharing' },
  
  { id: 16, title: 'Comm Skill Assignment 1', subject: 'Communication Skills', questionLink: '', answerLink: 'https://drive.google.com/file/d/1XHWxp5IeRTXVUoDoQ4myG6ylCDaE4JF-/view?usp=sharing' },
  { id: 17, title: 'Comm Skill Assignment 2', subject: 'Communication Skills', questionLink: '', answerLink: 'https://drive.google.com/file/d/1rm_tyk4S9OMpDo1agQuI3n5aaH6103Fr/view?usp=sharing' },
  { id: 18, title: 'Comm Skill Assignment 3', subject: 'Communication Skills', questionLink: 'https://docs.google.com/document/d/1m0i-2EGbJw01RRHgmFTeIUp8x5pK1paz/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1EwzT3F9XK0GgWEIwgsP8SL8f5EF593uA/view?usp=sharing' },
  { id: 19, title: 'Comm Skill Assignment 4', subject: 'Communication Skills', questionLink: 'https://docs.google.com/document/d/1Zs4fvhWtvBiAE1LTvcwRpS94ta9IBOFd/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1_NX1ifH0BPbgMOyXWGaq7sWejRKhSiEi/view?usp=sharing' },
  { id: 27, title: 'Comm Skill Assignment 5', subject: 'Communication Skills', questionLink: 'https://docs.google.com/document/d/13EzHCADznYYtsYh4e9QQaiD2pnYjFt6J/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1JpUIEBL5BNgPxFFJRJwqeeU-EtN1jnxO/view?usp=sharing' },
  
  { id: 20, title: 'CPLT Assignment 1', subject: 'CPLT', questionLink: '', answerLink: 'https://drive.google.com/file/d/1-9CCaH7FTizr8xq0amu67a2rXp-BsVp7/view?usp=sharing' },
  { id: 21, title: 'CPLT Assignment 2', subject: 'CPLT', questionLink: 'https://docs.google.com/document/d/1aKV1p0eJyvy46fi5xJ6TQNybqI9ASRgx/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1pAamb4nf16ICv70odkY-p_vP1CdhOAbo/view?usp=sharing' },
  { id: 28, title: 'CPLT Assignment 3', subject: 'CPLT', questionLink: 'https://docs.google.com/document/d/1xZel7EtETQ60exZB3bn4qRhOeOZAO7qt/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1hM31IWc1ZKbhz73x92xADY3L316efPOK/view?usp=sharing' },
  { id: 29, title: 'CPLT Assignment 4', subject: 'CPLT', questionLink: 'https://docs.google.com/document/d/15xLDHLM4CAdyHunQm80lfB5hu1JFwP-S/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/12ewuNCX-K0NTShBW6uLbcLMZcfi8887r/view?usp=sharing' },
  { id: 36, title: 'CPLT Assignment 5', subject: 'CPLT', questionLink: 'https://docs.google.com/document/d/1PuZM5idUvcrzYT_DuONlqdtmhW88P6sd/edit?usp=sharing&ouid=118372080053096015377&rtpof=true&sd=true', answerLink: 'https://drive.google.com/file/d/1bnq6WgTblxNx8CMbiwPmUgNAwp5zzCpy/view?usp=sharing' },
  
  { id: 34, title: 'Communication Skills CompleteLab File Work', subject: 'Communication Skills Lab', questionLink: '', answerLink: 'https://drive.google.com/file/d/11ro4A5cIionpkJwNrsHYp0OrLRpx9Wlq/view?usp=sharing' },
];

export const SEM1_TEST_DATA: Record<string, Record<string, TestBlock[]>> = {
  '2025': {
    'Semester - I': [
      {
        title: 'In-Sem 1',
        subjects: [
          { name: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1Vxo1Gdg4FBgInkc8of0lpbCJSZkutj-M/view?usp=sharing', answerLink: '' },
          { name: 'Applied Physics', questionLink: 'https://drive.google.com/file/d/1ObmnxQ_1zvvOq0Qwjx6-vYTaOtUNUzO2/view?usp=sharing', answerLink: '' },
          { name: 'CPLT', questionLink: 'https://drive.google.com/file/d/1peIAtmTh2orolYhr_CnCtTUR-4ZW9Nkb/view?usp=sharing', answerLink: '' },
          { name: 'AI', questionLink: 'https://drive.google.com/file/d/15ie6MLn_64RObZ0Fd7p2MvyAqoU5bCBY/view?usp=sharing', answerLink: '' },
          { name: 'Communication Skills', questionLink: 'https://drive.google.com/file/d/17EUmgGdf6MAIJxyr3-SgnA8MkzZGZVzH/view?usp=sharing', answerLink: '' },
        ],
      },
      {
        title: 'In-Sem 2',
        subjects: [
          { name: 'Artificial Intelligence', questionLink: 'https://drive.google.com/file/d/17bMx3hSoA1pr4q5M3cDc3mvBtHngRN1S/view?usp=sharing', answerLink: 'https://drive.google.com/file/d/1EHLbHTfqcrbX4oVOGv0fEoeOg9q4JmOw/view?usp=sharing' },
          { name: 'Applied Physics', questionLink: 'https://drive.google.com/file/d/125Ne7EKwnzDIDpNWs9kFSxgpr-9Y5x1D/view?usp=sharing', answerLink: '' },
          { name: 'Mathematics', questionLink: 'https://drive.google.com/file/d/1Tkf6571P-Csz571sDjwNnau1fIwOmarp/view?usp=sharing', answerLink: '' },
          { name: 'CPLT', questionLink: 'https://drive.google.com/file/d/1Axr8VHQkqqi6cWkoPveq9EkKUaxQT5U-/view?usp=sharing', answerLink: '' },
          { name: 'Communication Skills', questionLink: 'https://drive.google.com/file/d/1w2NY59UzZ3ICZdUlHQ1RJgRNx32CDt5K/view?usp=sharing', answerLink: '' },
        ],
      },
      {
        title: 'End Sem',
        subjects: [
          { name: 'Communication Skills', questionLink: '', answerLink: '' },
          { name: 'CPLT', questionLink: '', answerLink: '' },
          { name: 'EVS', questionLink: '', answerLink: '' },
          { name: 'Engineering Chemistry', questionLink: '', answerLink: '' },
        ],
      },
    ],
  },
};

export const SEM1_SYLLABUS_DATA: Record<string, Record<string, { name: string; link: string }[]>> = {
  '2025': {
    '1st Semester': [
      { name: 'Mathematics', link: 'https://drive.google.com/file/d/1gU2xUY3ZjW6XsYZjTuaXcrtuDS60jMg3/view?usp=sharing' },
      { name: 'Artificial Intelligence', link: 'https://drive.google.com/file/d/1-L4h_ppPnmgNAX5hJU1dfxmSBf4_FMio/view?usp=sharing' },
      { name: 'Applied Physics', link: 'https://drive.google.com/file/d/1IpAwzP-03r6eFUPmc2XPmcvOEJyQpCoC/view?usp=sharing' },
      { name: 'Communication Skills', link: 'https://drive.google.com/file/d/12G21Cb9FvaWH4O9bj_bNU3S7gHIfvIE9/view?usp=sharing' },
      { name: 'CPLT', link: 'https://drive.google.com/file/d/1NwNt8LhLMXS_jGYiGC1x1Wn6vsKtOZ2J/view?usp=sharing' },
    ],
  },
};

export const EVS_RESOURCE = {
  title: 'Environmental Studies',
  subtitle: 'Comprehensive resources for Swayam EVS',
  chapter: 'Chapters 1 - 12',
  desc: 'Full notes and video lectures',
  notesLink: 'https://drive.google.com/file/d/1qZwDc7LsThtHScpQFbCBYbAFFsWP6fz3/view?usp=sharing',
  playlistLink: 'https://www.youtube.com/playlist?list=PLyzEneN8Cd_HDr7LyTSaDn4LVejELY6NI',
  password: 'vishnu',
};
