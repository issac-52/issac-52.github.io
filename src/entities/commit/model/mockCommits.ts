import type { CommitLogEntry } from './types';

// 데모용 임의 데이터입니다. 실제 GitHub API 연동은
// src/entities/commit/api/fetchCommits.ts 를 사용해 이 자리를 대체하면 됩니다.
export const mockCommits: Record<string, CommitLogEntry[]> = {
  'exp-0': [
    { hash: 'a3f21c9', msg: 'fix: Sybase 트랜잭션 롤백 충돌 처리', time: '2일 전' },
    { hash: 'e88b0d1', msg: 'test: MockMvc 기반 컨트롤러 통합테스트 추가', time: '5일 전' },
    { hash: '7c410aa', msg: 'refactor: PowerBuilder 이벤트 로직 → Composition API 이관', time: '9일 전' },
  ],
  'exp-1': [
    { hash: 'f0c883e', msg: 'feat: 명품 인증·보증 관리자 UI 신규 개발', time: '4개월 전' },
    { hash: 'b1a9d02', msg: 'fix: 상품 링크 배치 처리 중 무한루프 수정', time: '5개월 전' },
    { hash: '2ef5671', msg: 'chore: PHP 레거시 라우팅 → Next.js 마이그레이션', time: '7개월 전' },
  ],
  'exp-2': [
    { hash: '9d41c3b', msg: 'feat: FSD 구조 기반 모노레포 초기 세팅', time: '3개월 전' },
    { hash: '6aa02f4', msg: 'perf: Zustand + Valkey 캐싱 레이어 도입', time: '2개월 전' },
    { hash: 'd7c5e91', msg: 'ci: Storybook GitLab CI/CD 자동 배포 구성', time: '1개월 전' },
  ],
  'exp-3': [
    { hash: 'c48b1aa', msg: 'feat: UXLOG 엑셀 업/다운로드 기능 추가', time: '6개월 전' },
    { hash: '11f9e3d', msg: 'feat: AI 상품 관리자 프롬프트 UI 개발', time: '4개월 전' },
  ],
  'proj-0': [
    { hash: 'd02fa61', msg: 'feat: Redis 캐시 레이어 붙인 Riot API 프록시 구현', time: '3일 전' },
    { hash: '889bcf0', msg: 'test: k6 부하테스트 시나리오 추가', time: '6일 전' },
    { hash: '44a10e7', msg: 'chore: Zod로 API 응답 런타임 검증 도입', time: '11일 전' },
  ],
  'proj-1': [
    { hash: 'b902c31', msg: 'refactor: FSD 아키텍처로 전면 리팩토링', time: '2주 전' },
    { hash: '0f83aa2', msg: 'feat: 역할별 이름 마스킹 서버사이드 처리', time: '3주 전' },
  ],
  'proj-2': [
    { hash: '55e01dc', msg: 'feat: SECURITY DEFINER 익명 리뷰 함수 작성', time: '2개월 전' },
    { hash: 'a771fbe', msg: 'chore: 폐쇄망 개발용 오프라인 mockDb 구성', time: '2개월 전' },
  ],
};
