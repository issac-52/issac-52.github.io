import type { Language } from '@/shared/model/useLanguageStore';

type Text = { ko: string; en: string };
interface Work {
  id: string;
  title: Text;
  context: Text;
  actions: Text[];
  result: Text;
  tags: string[];
}
const works: Work[] = [
  {
    id: 'consistency',
    title: { ko: '상품 링크·미링크 데이터 정합성 복구', en: 'Recovering product data consistency' },
    context: { ko: '멀티 노드 API와 배치가 상품 링크·미링크를 처리하는 환경에서 Elasticsearch와 Altibase 간 생성·삭제의 부분 실패와 중복 데이터가 반복됐습니다.', en: 'In a multi-node API and batch environment, product linking and unlinking caused recurring partial writes, failed deletions and duplicate data across Elasticsearch and Altibase.' },
    actions: [
      { ko: '운영 오류 로그와 호출 흐름을 분석하고, 두 저장소의 저장·삭제 순서를 조정했습니다.', en: 'Analyzed production error logs and request flows, then adjusted the write and deletion order across both stores.' },
      { ko: '기존 RabbitMQ Consumer에 실패 상품을 재조회하는 보상·복구 로직을 추가했습니다.', en: 'Added compensation and recovery logic to an existing RabbitMQ consumer to re-query failed products.' },
      { ko: '중복 데이터의 update_d 갱신 시각을 비교해 최신 데이터를 남기고 오래된 데이터를 정리하도록 분기했습니다.', en: 'Compared update_d timestamps when duplicate data remained, retaining newer records and removing stale ones.' },
    ],
    result: { ko: '프로덕션에서 반복 관찰되던 링크·미링크 정합성 관련 오류 로그를 해소했습니다. 기존 Consumer의 실패 처리 흐름을 보완한 경험입니다.', en: 'Resolved the recurring consistency errors observed in production logs. My contribution focused on extending failure handling in the existing consumer.' },
    tags: ['Java', 'RabbitMQ', 'Elasticsearch', 'Altibase', 'SQL'],
  },
  {
    id: 'catalog',
    title: { ko: '인증·보증 데이터와 변경 이력 관리', en: 'Certification, warranty & change history' },
    context: { ko: '상품 링크 여부에 따라 인증·보증 정보의 저장소와 조회 방식이 달라, 미링크 상품까지 관리 범위를 확장해야 했습니다.', en: 'Certification and warranty data used different storage and retrieval paths depending on product linking status. Management needed to support unlinked products as well.' },
    actions: [
      { ko: 'Catalog 연관 데이터 테이블과 카탈로그 삭제 시 종속 데이터 처리를 구성했습니다.', en: 'Created catalog-related data tables and handling for dependent records when catalogs were deleted.' },
      { ko: '변경 이력 로그를 추가하고 미링크 상품 관리를 위한 Elasticsearch 필드를 확장했습니다.', en: 'Added change-history logging and extended Elasticsearch fields to support unlinked products.' },
      { ko: '링크·미링크 상태 전환 시 ES와 Altibase 간 데이터를 변환·반영하는 연계 로직을 개발했습니다.', en: 'Implemented data conversion and synchronization between Elasticsearch and Altibase during linking-state transitions.' },
    ],
    result: { ko: '링크 상태에 따라 저장소가 달라지는 인증·보증 정보의 관리 범위를 확장했습니다.', en: 'Extended certification and warranty management across both linked and unlinked products.' },
    tags: ['Java / Spring', 'Altibase', 'Elasticsearch', 'SQL'],
  },
  {
    id: 'automation',
    title: { ko: '입점업체 Excel 대조 업무 자동화', en: 'Automating merchant spreadsheet reconciliation' },
    context: { ko: '입점업체가 전달한 Excel 파일을 담당자가 DB와 수동 대조·가공하고 개발자를 통해 결과를 전달하던 반복 업무가 있었습니다.', en: 'Operations staff manually compared merchant Excel files with database records, processed the results and relied on developers to deliver output files.' },
    actions: [
      { ko: '업체별 원본을 Office 서버에 저장하는 관리자 업로드 기능을 구현했습니다.', en: 'Implemented an administration interface for uploading merchant source files to an Office server.' },
      { ko: '금요일 처리라는 업무 기준에 맞춰 Cron·PHP 예약 배치와 업체별 DB 비교·가공 로직을 개발했습니다.', en: 'Developed scheduled PHP/Cron jobs for Friday processing, with merchant-specific database comparison and transformation logic.' },
      { ko: 'CSV/XLS 결과 파일을 생성하고 관리자가 직접 다운로드하는 흐름을 구성했습니다.', en: 'Generated CSV/XLS output and enabled administrators to download results directly.' },
    ],
    result: { ko: '반복 수작업과 개발자 의존 파일 전달 절차를 관리자 자가 처리 방식으로 전환했습니다.', en: 'Replaced repetitive manual work and developer-dependent file delivery with an administrator self-service workflow.' },
    tags: ['PHP', 'Cron', 'SQL', 'CSV / XLS'],
  },
  {
    id: 'platform',
    title: { ko: '에누리·다나와 통합 관리자 플랫폼', en: 'Unified Enuri–Danawa administration platform' },
    context: { ko: '별도로 운영되던 두 서비스의 백오피스 기능을 통합할 신규 관리자 플랫폼을 4인 TF에서 개발했습니다.', en: 'Worked in a four-person team on a new administration platform to bring together back-office functions from two independently operated services.' },
    actions: [
      { ko: 'Next.js·모노레포·FSD 기반 디렉터리와 기능 모듈 구조를 구성했습니다.', en: 'Organized frontend directories and feature modules using Next.js, a monorepo and Feature-Sliced Design.' },
      { ko: '회원·권한 UI, 사용자 역할·메뉴 권한 조회를 GraphQL·Apollo Client와 연동했습니다.', en: 'Integrated member and permission interfaces, role lookups and menu permissions with GraphQL and Apollo Client.' },
      { ko: '계층형 카테고리 선택·미리보기, 검색·트리·테이블 공통 컴포넌트를 개발했습니다.', en: 'Developed reusable hierarchical category selection, previews, search, tree and table components.' },
    ],
    result: { ko: '점진 전환을 위한 신규 UI 기반과 공통 관리 기능을 마련했습니다. 담당 범위는 프론트엔드 구조·기능과 기존 권한 API 연동입니다.', en: 'Delivered shared administration functions and a new UI foundation for incremental migration. My scope covered frontend structure, feature development and integration with existing permission APIs.' },
    tags: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Apollo Client', 'Zustand', 'FSD'],
  },
  {
    id: 'blue-green',
    title: { ko: '뉴오피스 프론트엔드 Blue-Green 배포 개선', en: 'Blue-green deployment for the New Office frontend' },
    context: { ko: '기존 Next.js·React 기반 뉴오피스 프론트엔드는 Docker 컨테이너 재시작 방식으로 배포해 서비스 중단 가능성이 있었습니다. 기존 버전과 신규 버전을 분리해 실행하는 배포 구조가 필요했습니다.', en: 'The Next.js/React New Office frontend was deployed by restarting its Docker container, creating a risk of service interruption. The deployment process needed to run existing and new versions separately.' },
    actions: [
      { ko: 'Docker Compose로 Blue·Green 환경을 구성해 기존 운영 버전과 신규 버전을 별도 컨테이너로 실행하도록 구성했습니다.', en: 'Configured blue and green environments with Docker Compose so the live and new versions could run in separate containers.' },
      { ko: '신규 버전 컨테이너를 배포하는 Shell Script를 직접 작성했습니다.', en: 'Wrote shell scripts to deploy the new-version container.' },
      { ko: 'Nginx 리버스 프록시 설정을 변경해 Blue·Green 환경 간 트래픽 전환을 구현했습니다.', en: 'Implemented traffic switching between blue and green environments by updating the Nginx reverse proxy configuration.' },
    ],
    result: { ko: 'Docker 재시작 중심의 배포를 Blue-Green 방식으로 전환했습니다. 신규 버전을 별도로 실행한 뒤 트래픽을 전환해, 전환 전까지 기존 서비스를 유지할 수 있는 구조를 마련했습니다.', en: 'Replaced restart-based deployment with a blue-green approach. The new version runs separately before traffic is switched, allowing the existing service to remain available until cutover.' },
    tags: ['Next.js', 'React', 'Docker', 'Docker Compose', 'Shell Script', 'Nginx'],
  },
  {
    id: 'delivery',
    title: { ko: 'GitLab–Harbor–ArgoCD 애플리케이션 배포 연동', en: 'Connecting application delivery with GitLab, Harbor & ArgoCD' },
    context: { ko: '사내에서 제공된 Kubernetes·Harbor·ArgoCD 기반에 신규 애플리케이션의 빌드와 배포 흐름을 연결해야 했습니다.', en: 'The new application needed a repeatable build and delivery flow connected to the existing Kubernetes, Harbor and ArgoCD infrastructure.' },
    actions: [
      { ko: 'GitLab CI에 의존성 설치, 앱 빌드, Docker 이미지 생성·Harbor Push 단계를 구성했습니다.', en: 'Configured GitLab CI stages for dependency installation, application builds, Docker image creation and Harbor pushes.' },
      { ko: '매니페스트 저장소의 이미지 태그 갱신을 ArgoCD 반영 흐름에 연결했습니다.', en: 'Connected image-tag updates in the manifest repository to the ArgoCD delivery flow.' },
      { ko: '브랜치별 환경 구분과 Nginx 서비스 경로 등 애플리케이션 접근 설정을 다뤘습니다.', en: 'Worked on branch-specific environments and application access settings, including Nginx service paths.' },
    ],
    result: { ko: '소스 변경부터 컨테이너 이미지 배포까지 이어지는 앱 CI/CD 연동을 수행했습니다. 기존에 제공된 인프라 위에서 애플리케이션 배포 흐름을 구성했습니다.', en: 'Integrated application delivery from source changes through container image deployment. The delivery flow ran on infrastructure already provided by the organization.' },
    tags: ['GitLab CI/CD', 'Docker', 'Harbor', 'Kubernetes', 'ArgoCD', 'Nginx'],
  },
  {
    id: 'storybook',
    title: { ko: 'Storybook 공유 환경과 정적 파일 배포 개선', en: 'Shared Storybook & static delivery improvements' },
    context: { ko: '팀과 기획자가 공통 UI를 확인할 내부 Storybook 공유 환경과 배포 산출물 관리가 필요했습니다.', en: 'The team and product stakeholders needed an internal Storybook environment for reviewing shared UI components and managing build artifacts.' },
    actions: [
      { ko: 'Storybook 정적 빌드와 전용 CI/CD, Nginx 기반 Docker 이미지 공유 배포를 구성했습니다.', en: 'Configured Storybook static builds, dedicated CI/CD stages and shared delivery through an Nginx Docker image.' },
      { ko: 'Harbor·ArgoCD 배포 흐름을 연동하고, 이후 PVC를 통한 브랜치별 정적 파일 제공 구조 개선에 참여했습니다.', en: 'Integrated Harbor and ArgoCD delivery, then participated in improving branch-specific static-file delivery using a PVC.' },
      { ko: 'CI 실행 위치와 서비스 클러스터 사이의 PVC 접근·마운트 조건을 확인해 구성을 조정했습니다.', en: 'Checked PVC access and mounting constraints between CI execution and the service cluster, and adjusted the configuration.' },
    ],
    result: { ko: 'UI 컴포넌트 공유 환경을 제공하고 정적 파일 배포 구조 개선에 참여했습니다. PVC 방식은 접근·마운트 조건 검토와 배포 구성 개선에 참여한 범위입니다.', en: 'Provided a shared UI component environment and contributed to static delivery improvements. My PVC work covered access and mounting checks and deployment configuration improvements.' },
    tags: ['Storybook', 'GitLab CI/CD', 'Docker', 'Nginx', 'Kubernetes PVC'],
  },
];
export function getWorks(language: Language) {
  return works.map(work => ({
    id: work.id,
    title: work.title[language],
    context: work.context[language],
    actions: work.actions.map(action => action[language]),
    result: work.result[language],
    tags: work.tags,
  }));
}
