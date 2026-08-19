export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  skills: Record<string, string[]>;
  contact: Record<string, string>;
}

export const personalInfo: PersonalInfo = {
  name: '오이삭 (Issac Oh)',
  role: 'Web Engineer',
  bio: 'PowerBuilder -> Vue3 Java Spring, PHP -> NextJs React Java Spring 까지 — 오래된 사내 시스템을 최신 기술스택으로 리팩토링해온 웹 엔지니어입니다. 레거시 마이그레이션, CI/CD등 다양한 관심이 많습니다.',
  skills: {
    FRONTEND: ['React', 'Next.js', 'Vue 3'],
    BACKEND: ['Spring Boot', 'Java', 'PHP'],
    'DATA / INFRA': ['Supabase', 'Sybase ASE', 'Oracle', 'Docker', 'K8s', 'GitLab CI/CD'],
  },
  contact: {
    이메일: 'issac1162@gmail.com',
    GitHub: 'https://github.com/Back4Sac2',
    Velog: 'https://velog.io/@issac1162/posts',
    연락처: '010-2988-1162',
  },
};
