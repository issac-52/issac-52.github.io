import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    name: 'MG신용정보 — 마이그레이션 TF',
    period: '2026.07 - 진행중',
    ongoing: true,
    role: '풀스택',
    desc: '폐쇄망 환경에서 PowerBuilder로 짜인 사내 관리자 시스템을 Java/Spring Boot + Vue 3 기반으로 점진 전환하는 TF에 참여하고 있습니다. 프론트엔드 뿐만 아니라 백엔드 영역까지 함께 다루며 마이그레이션 전반을 담당하고 있습니다.',
    tags: ['Vue 3', 'Java/Spring', 'Typescript', 'Sybase ASE', 'REST API'],
  },
  {
    id: 'exp-1',
    name: '다나와 레거시 현대화 & 백오피스 유지보수',
    period: '2024.01 - 2026.04',
    role: '(주)커넥트웨이브 다나와 사업부 · 백오피스개발팀 · 풀스택',
    desc: 'PHP·JSP·Java/Spring 기반 레거시 백오피스를 Next.js 플랫폼으로 점진 전환하면서, 기존 시스템 무중단 유지보수를 병행했습니다. 상품 등록·관리·링크 등 핵심 기능 유지보수와 기획자/운영자 QA 대응 및 신규 관리자 페이지 개발 및 설계를 담당했습니다.',
    tags: ['Next.js', 'PHP', 'Typescript', 'Java/Spring', 'Altibase', 'Elasticsearch', 'Redis', 'REST API'],
  },
  {
    id: 'exp-2',
    name: '에누리+다나와 통합 관리 툴 TF',
    period: '2025.01 - 2026.02',
    role: '4인 · 프론트엔드 개발 및 설계 전반',
    desc: '에누리와 다나와 두 플랫폼의 데이터를 단일 인터페이스에서 관리하는 내부 관리자 툴을 개발했습니다. 모노레포 + FSD(Feature-Sliced Design) 아키텍처로 프로젝트 구조를 설계하고, Zustand + Valkey로 비동기 데이터 패칭·캐싱 구조를 만들었습니다. GitLab CI/CD 파이프라인 구축과 Storybook 배포 자동화까지 담당했습니다.',
    tags: ['Next.js', 'Typescript', 'K8s', 'GraphQL', 'GitLab CI/CD'],
  },
];
