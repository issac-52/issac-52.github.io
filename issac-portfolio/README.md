# Issac Portfolio — React + FSD

레거시 인트라넷 화면에서 "마이그레이션 시작"을 누르면, 버튼 위치에서 원형으로 화면이 열리며
오이삭을 중심으로 한 인터랙티브 마인드맵 포트폴리오로 전환되는 1인용 포트폴리오 사이트입니다.

## 스택

- React 18 + TypeScript + Vite
- Tailwind CSS (유틸리티 기반 스타일링)
- Zustand (마이그레이션 상태 / 모달 상태 전역관리)
- **FSD(Feature-Sliced Design)** 아키텍처 — `app / pages / widgets / features / entities / shared`

## 폴더 구조

```
src/
  app/                진입점, 전역 스타일, 전역 프로바이더
  pages/home/         페이지 조립 (레이어 최상단)
  widgets/            legacy-page, modern-page, mindmap, migration-console, particle-field
  features/           migration(마이그레이션 상태), node-detail(상세 모달), scroll-progress(스크롤 훅)
  entities/           person, experience, project, commit — 순수 데이터/타입
  shared/             ui(Modal, Tag, Eyebrow), config, lib(hooks)
```

각 레이어는 상위 레이어(app/pages)에서만 하위 레이어(widgets/features/entities/shared)를 참조하고,
같은 레이어끼리나 역방향 참조는 하지 않는 FSD 규칙을 따랐습니다.

## 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. `vite.config.ts`의 `base`를 실제 레포 이름에 맞게 수정하세요.
   - `username.github.io` 루트 레포라면 `base: '/'`
   - `username.github.io/repo-name` 라면 `base: '/repo-name/'`
2. 배포:

```bash
npm run deploy
```

`gh-pages` 패키지가 `dist`를 `gh-pages` 브랜치로 푸시합니다. 저장소 Settings → Pages에서
소스를 `gh-pages` 브랜치로 지정해주세요.

## 데이터 수정하기

- 경력/개인 프로젝트 내용: `src/entities/experience/model/data.ts`, `src/entities/project/model/data.ts`
- 자기소개/연락처: `src/entities/person/model/personalInfo.ts` — **`you@example.com` 등 placeholder를 실제 정보로 바꿔주세요.**
- 링크(GitHub/이력서): `src/shared/config/site.ts`

## 실제 GitHub 커밋 로그 연동하기 (현재는 임의 데이터)

지금은 `src/entities/commit/model/mockCommits.ts`의 가짜 데이터가 상세 모달에 표시됩니다.
실제 레포 커밋으로 교체하려면:

1. `src/entities/project/model/data.ts`의 각 프로젝트에 `repo: { owner, name }`을 채웁니다.
2. `src/features/node-detail/ui/DetailModal.tsx`에서 `mockCommits[id]` 조회 부분을
   `src/entities/commit/api/fetchCommits.ts`의 `fetchCommits(owner, name)` 호출(+ `useEffect`/로딩 상태)로 교체합니다.

공개 레포 기준으로는 별도 인증 없이 동작하지만, 비인증 요청은 시간당 60회 제한이 있습니다.

## 커스터마이징 포인트

- 파티클 배경 밀도/색상: `src/widgets/particle-field/ui/ParticleField.tsx`
- 마인드맵 노드 좌표/연결 구조: `src/widgets/mindmap/ui/DesktopMindmap.tsx`
- 마이그레이션 콘솔 로그 문구: `src/widgets/migration-console/ui/MigrationConsole.tsx`
- 색상 토큰: `tailwind.config.ts`
