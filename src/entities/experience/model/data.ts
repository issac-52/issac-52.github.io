import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    name: 'MG신용정보 · NCS 업무 시스템 전환 TF',
    period: '2026.07 – 현재',
    ongoing: true,
    role: 'Java API · Vue 업무 화면 개발',
    desc: 'PowerBuilder 기반 업무 시스템을 Java/Vue 웹 환경으로 전환하는 TF에 합류했습니다. 기존 소스와 화면 처리 순서를 분석하고, PM·현업 요구사항을 담당 기능의 API와 화면에 반영합니다.\n\nMySQL 5.7의 실행 계획에서 대용량 테이블 전체 스캔을 확인하고 인덱스와 조회 조건을 조정했습니다. 단일 SELECT 재측정에서 실행 시간이 55초에서 0.041초로 줄었습니다.',
    tags: ['Java', 'Vue.js', 'SQL', 'PowerBuilder'],
  },
  {
    id: 'exp-1',
    name: '커넥트웨이브 · 다나와사업부 백오피스개발팀',
    period: '2022.08 – 2026.03',
    role: '백오피스 개발 · 통합 관리자 플랫폼 TF',
    desc: 'Java/Spring과 PHP로 카탈로그·상품 등을 관리하는 핵심 비즈니스 로직을 유지보수했습니다. 운영 요청에 맞춰 관리 API와 DB 테이블, PHP·Cron 배치를 개발하고 개선했습니다.\n\n2025.01부터 2026.01까지는 4인 TF에서 Next.js 기반 에누리·다나와 통합 관리자 플랫폼의 프론트엔드 구조와 회원·권한·카테고리 화면, 공통 컴포넌트를 개발했습니다. GitLab CI/CD·Harbor·ArgoCD 배포 연동과 Blue-Green 배포 구성에도 참여했습니다.',
    tags: ['Java / Spring', 'Altibase', 'Elasticsearch', 'RabbitMQ', 'PHP / Cron', 'Next.js', 'GraphQL', 'GitLab CI/CD'],
  },
];
