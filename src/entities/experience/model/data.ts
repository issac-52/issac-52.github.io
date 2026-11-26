import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    name: 'MG신용정보 · NCS 업무 시스템 전환 TF',
    period: '2026.07 – 현재',
    ongoing: true,
    role: 'Java API · Vue 업무 화면 개발',
    desc: 'PowerBuilder 기반 상담사 시스템 3개를 Java/Vue 웹 환경으로 전환하는 TF에 합류해, 1개 전환을 마치고 1개를 전환 중입니다. 기존 소스와 화면 처리 순서를 분석하고, PM·현업 요구사항을 담당 기능의 API와 화면에 반영합니다.\n\nMySQL 5.7의 실행 계획에서 대용량 테이블 전체 스캔을 확인하고 인덱스와 조회 조건을 조정했습니다. 단일 SELECT 재측정에서 실행 시간이 55초에서 0.041초로 줄었습니다.\n\nMySQL과 Sybase를 함께 쓰는 환경에서 트랜잭션 롤백·전파와 Sybase 트랜잭션 모드를 검증하는 테스트를 작성했고, 폐쇄망 안에서 AI 코딩 도구가 테스트까지 직접 실행하도록 개발 환경을 구성했습니다.',
    tags: ['Java', 'Vue.js', 'SQL', 'PowerBuilder'],
  },
  {
    id: 'exp-1',
    name: '커넥트웨이브 · 다나와사업부 백오피스개발팀',
    period: '2022.08 – 2026.03',
    role: '백오피스 개발 · 통합 관리자 플랫폼 TF',
    desc: 'Java/Spring과 PHP로 카탈로그·상품 등을 관리하는 핵심 비즈니스 로직을 유지보수했습니다. 전체 상품 약 10억 건, 하루 3만~10만 건의 상품 링크를 처리하는 환경입니다. 운영 요청에 맞춰 관리 API와 DB 테이블, PHP·Cron 배치를 개발하고 개선했습니다.\n\n2025.01부터 2026.01까지는 4인 TF에서 Next.js 기반 에누리·다나와 통합 관리자 플랫폼의 프론트엔드 구조와 회원·권한·카테고리 화면, 공통 컴포넌트를 개발했습니다. GitLab CI/CD·Harbor·ArgoCD 배포 연동과 Blue-Green 배포 구성에도 참여했습니다.',
    tags: ['Java / Spring', 'Altibase (Oracle 쿼리 기반)', 'Elasticsearch', 'RabbitMQ', 'PHP / Cron', 'Next.js', 'GraphQL', 'GitLab CI/CD'],
  },
];
