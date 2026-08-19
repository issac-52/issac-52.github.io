export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  skills: Record<string, string[]>;
  contact: Record<string, string>;
}

// TODO: 연락처/링크는 실제 정보로 교체해주세요.
export const personalInfo: PersonalInfo = {
  name: '오이삭 (Issac Oh)',
  role: '프론트엔드 개발자 · 4년차',
  bio: 'PowerBuilder부터 Vue 3까지 — 오래된 사내 시스템을 실제 서비스로 리팩토링해온 프론트엔드 개발자입니다. FSD 아키텍처, 상태관리, 레거시 마이그레이션에 관심이 많습니다.',
  skills: {
    FRONTEND: ['React', 'Next.js', 'TypeScript', 'Vue 3', 'Pinia', 'TanStack Query'],
    BACKEND: ['Spring Boot', 'MyBatis'],
    'DATA / INFRA': ['Sybase ASE', 'Docker', 'GitLab CI/CD'],
  },
  contact: {
    이메일: 'you@example.com',
    GitHub: 'github.com/username',
    Velog: 'velog.io/@username',
    연락처: '요청 시 이력서로 전달',
  },
};
