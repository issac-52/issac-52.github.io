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

미진행 프로젝트와 임의 커밋 데이터는 표시하지 않습니다.
야장관리자는 개발 완료·실서비스 운영·유지보수 상태이며 기존 시연 영상을 제공합니다. 수도관리자는 별도의 신규 외주 프로젝트로 설계 중입니다.

## 배포

```sh
npm run deploy
```

GitHub Pages의 `gh-pages` 브랜치로 빌드 결과를 배포합니다.

## 콘텐츠 기준

2026-10-22 제공된 커리어 정리본과 사용자의 프로젝트 상태 정정을 기준으로 작성했습니다.
커넥트웨이브 시작월은 증명서 대조 전이므로 연도만 표시합니다. 프로젝트별 미확인 참여 기간과 성과 수치는 표시하지 않습니다.
