# 야장관리자 사례 페이지

경로: `#/projects/meter-admin` — 홈의 야장관리자 카드에서 연결. 한국어/영문 제공.

## 작성 근거

[meter-admin 04425a90bcf4f7d69107d6266fa18b9dbbcc4b8f](https://github.com/issac-52/meter-admin/tree/04425a90bcf4f7d69107d6266fa18b9dbbcc4b8f)의 소스·README·ARCHITECTURE·CLAUDE 문서를 2026-11-10 대조했다.

- `features/meter-survey/api/actions.ts`: 수용가 블록+row_no 매칭, 기존 행 5개 기본 필드 갱신, 신규 INSERT. 조사값·사진 참조 보존은 이 경로에 한정한다.
- `features/valve-survey/api/actions.ts`: 밸브 블록+valve_no 매칭과 더 넓은 UPSERT. 수용가와 같은 보존을 보장하지 않는다.
- `features/excel-manager/api/template-fill.ts`: JSZip/XML로 원본 양식에 결과 입력.
- `shared/lib/r2-storage.ts`: 서버 업로드·삭제와 300초 Presigned URL. DB 변경과 객체 처리의 원자성을 주장하지 않는다.
- `ARCHITECTURE.md`: 사진 참조 수, 지도, 완료 조건과 추출 조건 차이, 미해결 인가 검토 항목.
- `CLAUDE.md`: Claude Code 중심 구현과 개발자 판단·검토·운영 승인 구분.

실서비스 운영·유지보수 상태와 영상은 기존 포트폴리오 설명을 유지했다. 이번 작업은 포트폴리오만 변경하며 고객 자료나 운영 시스템을 조회·변경하지 않는다. 별도 수도관리자(field-worker)의 구현과 성능 수치·Codex 사용을 혼합하지 않는다. 성능 측정 자료가 없으므로 수치를 새로 만들지 않았다.

## 변경 범위

홈 한·영 요약을 업무 흐름 중심으로 정리하고 GitHub 및 상세 경로를 연결했다. 기존 영상은 상세 페이지에서 제공한다. 기존 해시 라우터에 야장관리자 경로를 추가했으며 field-work의 세 경로는 유지한다. README에 실제 CI의 main 기반 Pages 배포와 별도 gh-pages 명령을 구분했다.

## 검증

- Node.js 20에서 `npm run build`의 TypeScript·Vite 빌드 통과.
- Chromium 390/1440px × 한국어/영문 4조합: 직접 접근·새로고침·언어 전환 시 해시 유지·키보드 본문 초점·홈 카드 진입·뒤로 가기·가로 넘침 없음·JavaScript 예외 없음.
- 같은 조합에서 기존 field-work 개요·성능·Codex 경로 렌더링 회귀 확인.
- 기존 영상 URL과 컨트롤을 유지하고 `preload="none"`으로 자동 다운로드를 피한다. 외부 영상 재생 및 실제 meter-admin 운영 기능은 이번 검증에 포함하지 않았다.
