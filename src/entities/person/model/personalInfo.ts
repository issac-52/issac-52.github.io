export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  skills: Record<string, string[]>;
  contact: Record<string, string>;
}
export const personalInfo: PersonalInfo = {
  name: '오이삭 (Issac Oh)',
  role: 'Backend-focused Full-stack Developer',
  bio: 'Java/Spring 기반 API와 React·Next.js·Vue 관리자 화면을 개발해온 약 4년 차 개발자입니다. 커머스 백오피스의 데이터 정합성 오류 개선, 반복 업무 자동화, 통합 관리자 플랫폼 개발을 경험했습니다. 현재 PowerBuilder 업무 시스템을 Java/Vue 웹 환경으로 전환하는 TF에서 일하고 있습니다.',
  skills: {
    BACKEND: ['Java', 'Spring', 'REST API', 'SQL', 'PHP', 'Cron', 'RabbitMQ'],
    FRONTEND: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'GraphQL', 'Apollo Client', 'Zustand'],
    DATA: ['Altibase', 'Elasticsearch', 'MySQL'],
    'APPLICATION DELIVERY': ['GitLab CI/CD', 'Docker', 'Harbor', 'Kubernetes', 'ArgoCD', 'Nginx', 'Storybook'],
  },
  contact: {
    이메일: 'issac1162@gmail.com',
    GitHub: 'https://github.com/issac-52',
  },
};
