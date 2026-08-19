import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    name: 'MG신용정보 — 마이그레이션 TF',
    period: '2026.04 - 진행중',
    ongoing: true,
    role: '팀원 · 프론트엔드/백엔드 겸임',
    desc: '폐쇄망 환경에서 PowerBuilder로 짜인 사내 기간계 시스템을 Java/Spring Boot + Vue 3 기반으로 점진 전환하는 TF에 참여하고 있습니다. 프론트엔드뿐 아니라 Spring Boot 컨트롤러·서비스 테스트(MockMvc, Mockito), Sybase ASE 트랜잭션 모드 이슈 대응 등 백엔드 영역까지 함께 다루며 마이그레이션 전반을 담당하고 있습니다.',
    tags: ['Vue 3', 'Spring Boot', 'MyBatis', 'Sybase ASE'],
  },
  {
    id: 'exp-1',
    name: '다나와 레거시 현대화 & 백오피스 유지보수',
    period: '2023.01 - 2025.07',
    role: '(주)커넥트웨이브 다나와 사업부 · 팀원 · 풀스택/프론트엔드',
    desc: 'PHP·JSP·Java/Spring 기반 레거시 백오피스를 Next.js 플랫폼으로 점진 전환하면서, 기존 시스템 무중단 유지보수를 병행했습니다. 상품 등록·관리·링크 등 핵심 기능 유지보수와 기획자/운영자 QA 대응, 명품 인증·보증 기능 신규 개발, 공공데이터 API(공휴일) 연동 휴일·업무현황 관리자 UI 개발을 담당했습니다.',
    tags: ['Next.js', 'Java/Spring', 'Altibase', 'Elasticsearch', 'Redis'],
  },
  {
    id: 'exp-2',
    name: '에누리+다나와 통합 관리 툴 TF',
    period: '2025.01 - 2026.01',
    role: '4인 · 팀원 · 프론트엔드 개발',
    desc: '에누리와 다나와 두 플랫폼의 데이터를 단일 인터페이스에서 관리하는 내부 툴을 개발했습니다. 모노레포 + FSD(Feature-Sliced Design) 아키텍처로 프로젝트 구조를 설계하고, Zustand + Valkey로 비동기 데이터 패칭·캐싱 구조를 만들었습니다. GitLab CI/CD 파이프라인 구축과 Storybook 배포 자동화까지 담당했습니다.',
    tags: ['Next.js', 'Apollo Client', 'Zustand', 'GitLab CI/CD'],
  },
  {
    id: 'exp-3',
    name: '데이터 분석 및 AI 관련 툴 UI 개발',
    period: '2025.08 - 2026.03',
    role: '팀원 · 프론트엔드 개발 (단독)',
    desc: '빅데이터/AI팀에서 제공하는 API를 프론트엔드에서 연동하는 관리자 인터페이스를 단독으로 개발했습니다. 사용자 행동 로그 분석 툴 UXLOG(엑셀 다운로드/업로드 포함), 대화형 AI 운영자 프롬프트 관리 UI, AI 상품·속성 관리자 UI를 각각 기획부터 개발까지 진행했습니다.',
    tags: ['Next.js', 'Zustand', 'antd'],
  },
];
