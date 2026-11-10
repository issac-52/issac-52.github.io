# Issac Portfolio

React + TypeScript + Vite 기반 Java 백엔드 중심 풀스택 개발자 포트폴리오입니다.
경력, 대표 실무 사례, 사이드 프로젝트, 기술 스택과 연락처를 소개합니다.

## 실행 및 빌드

```sh
npm ci
npm run dev
npm run build
```

## 한국어 / English

상단의 한국어 / EN 버튼으로 전체 페이지와 경력 상세의 언어를 변경합니다.
선택은 브라우저에 저장되며 `?lang=en` 또는 `?lang=ko` 주소로 직접 공유할 수 있습니다.

## 콘텐츠 수정

- 경력: `src/entities/experience/model/data.ts`
- 사이드 프로젝트: `src/entities/project/model/data.ts`
- 대표 실무 사례(한국어/영어): `src/entities/work/model/data.ts`
- 기술 스택: `src/entities/person/model/personalInfo.ts`
- 영문 경력 및 프로젝트: `src/shared/config/localizedContent.ts`
- GitHub 및 이메일: `src/shared/config/site.ts`
- 페이지 문구: `src/widgets/modern-page/ui/ModernPage.tsx`
- 야장관리자 상세: `src/pages/meter-admin/ui/MeterAdminPage.tsx`

미진행 프로젝트와 임의 커밋 데이터는 표시하지 않습니다.
야장관리자는 개발 완료·실서비스 운영·유지보수 상태이며 기존 시연 영상을 제공합니다. 수도관리자는 별도 신규 외주 프로젝트로 MVP 구현과 EC2/Cloudflare 연결을 완료하고 개선 중입니다. Codex 활용 개발 방식, 가상 2만 건 조회 성능 개선 및 실행 근거를 상세 페이지로 제공합니다.

## 배포

`main`에 병합하면 `.github/workflows/deploy.yml`에서 빌드·GitHub Pages 배포를 실행합니다.
아래 명령은 별도의 `gh-pages` 브랜치 배포 방식입니다.

```sh
npm run deploy
```

GitHub Pages의 `gh-pages` 브랜치로 빌드 결과를 배포합니다.

## 콘텐츠 기준

2026-10-22 제공된 커리어 정리본과 사용자의 프로젝트 상태 정정을 기준으로 작성했습니다.
커넥트웨이브 시작월은 증명서 대조 전이므로 연도만 표시합니다. 프로젝트별 미확인 참여 기간과 성과 수치는 표시하지 않습니다.

## 수도관리자 상세 기록 (2026-11-10)

GitHub Pages의 직접 새로고침에도 동작하는 해시 경로를 사용합니다.

- `#/projects/field-work` — 프로젝트 개요·아키텍처·업무 규칙
- `#/projects/field-work/performance` — SQL/지연 개선 전후 그래프·표·측정 조건·PDF·원시 JSON
- `#/projects/field-work/codex` — Codex 기반 개발에서 사람의 판단과 AI 지원, 실패 재현·실행 검증 방식

모든 상세 페이지는 한국어/영문을 지원하며 기존 프로젝트 카드에서 연결됩니다. `public/fieldwork`의 자료는 가상 데이터만 사용한 개발 환경 측정입니다. 운영 HTTP/R2 성능이나 모든 경로의 성능 개선을 의미하지 않습니다. 야장관리자의 Claude Code 활용과 수도관리자의 Codex 활용을 구분합니다.

측정 수치는 `src/pages/fieldwork/model/performance.json`, 그래프/보고서는 `public/fieldwork`에서 관리합니다. 원본은 field-worker 저장소의 `docs/performance/2026-11-10-list-optimization/`입니다. 최신화 시 그래프와 수치를 함께 동기화하고 측정 조건·커밋을 보존합니다.

## 야장관리자 상세 기록 (2026-11-10)

`#/projects/meter-admin`에서 업무 흐름, 구성도, 수용가 재업로드의 조사값 보존, 원본 Excel 양식 채우기, 사진·지도, Claude Code 협업 방식과 기존 시연 영상을 제공합니다. 한국어/영문, 직접 접근과 새로고침을 지원합니다.

구현 근거는 meter-admin `04425a90bcf4f7d69107d6266fa18b9dbbcc4b8f`에 고정합니다. 수용가와 밸브의 갱신 정책을 구분하고, 운영 성능 수치나 미해결 인가·일관성 문제의 해결을 주장하지 않습니다. 상세 근거는 [문서](docs/meter-admin-case-study.md)를 참고합니다.
