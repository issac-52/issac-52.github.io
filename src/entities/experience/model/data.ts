import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    name: 'MG신용정보 · NCS 업무 시스템 전환 TF',
    period: '2026.07 – 현재',
    ongoing: true,
    role: 'Java API · Vue 업무 화면 개발',
    desc: 'PowerBuilder 기반 업무 시스템을 Java/Vue 웹 환경으로 전환하는 TF에 합류했습니다. 기존 소스와 화면 처리 순서를 분석하고, PM·현업 요구사항을 담당 기능의 API와 화면에 반영합니다.\n\n선행 구축된 프로젝트 환경과 기존 DB 스키마를 활용해 Java API와 Vue 업무 화면을 개발·연계하고 있습니다.',
    tags: ['Java', 'Vue.js', 'SQL', 'PowerBuilder'],
  },
  {
    id: 'exp-1',
    name: '커넥트웨이브 · 다나와사업부',
    period: '2022 – 2026.03',
    role: '백오피스 개발 · 신규 통합 관리자 플랫폼 TF',
    desc: 'Java/Spring 관리 API와 DB 테이블, PHP·Cron 배치를 개발하며 상품·카탈로그 운영 업무를 다뤘습니다. 기존 RabbitMQ Consumer에 실패 상품의 재조회·보상 로직을 추가해 Elasticsearch–Altibase 데이터 정합성 오류를 개선했습니다.\n\n이후 4인 TF에서 Next.js 기반 에누리·다나와 통합 관리자 플랫폼의 프론트엔드 구조, GraphQL 연동, 권한·메뉴 UI와 공통 컴포넌트를 개발했습니다. GitLab CI/CD·Harbor·ArgoCD 애플리케이션 배포 연동과 Storybook 공유 환경 구성에도 참여했습니다.',
    tags: ['Java / Spring', 'Altibase', 'Elasticsearch', 'RabbitMQ', 'PHP / Cron', 'Next.js', 'GraphQL', 'GitLab CI/CD'],
  },
];
