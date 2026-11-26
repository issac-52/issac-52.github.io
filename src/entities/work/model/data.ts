import type { Language } from '@/shared/model/useLanguageStore';

type Text = { ko: string; en: string };
interface Work {
  id: string;
  experienceId: 'exp-0' | 'exp-1';
  title: Text;
  context: Text;
  actions: Text[];
  result: Text;
  tags: string[];
}
const companies = {
  'exp-0': { ko: 'MG신용정보', en: 'MG Credit Information', ja: 'MG信用情報' },
  'exp-1': { ko: '다나와사업부', en: 'Danawa Division', ja: 'ダナワ事業部' },
};
const works: Work[] = [
  {
    id: 'mg-modernization', experienceId: 'exp-0',
    title: { ko: 'PowerBuilder 업무 화면을 Java·Vue로 전환', en: 'Migrating PowerBuilder workflows to Java and Vue' },
    context: { ko: '상담사 시스템 3개를 PowerBuilder에서 Java·Vue로 옮기는 전환 TF입니다. 조회·입력 규칙이 PowerBuilder 이벤트와 DataWindow에 나뉘어 있었고, PowerBuilder 쪽에는 개발 서버가 없어 기존 동작을 소스로 정확히 파악한 뒤 옮겨야 했습니다.', en: 'A migration team moving three counselor systems from PowerBuilder to Java and Vue. Business rules were spread across PowerBuilder events and DataWindows, and with no PowerBuilder development server, legacy behaviour had to be understood precisely from source before it could be moved.' },
    actions: [{ ko: '기존 화면의 처리 순서와 SQL을 분석해 Java API와 Vue 화면에 반영했습니다.', en: 'Traced event sequences and SQL, then implemented the flows in Java APIs and Vue screens.' },{ ko: '담당 API의 요청·응답을 Swagger에 문서화했습니다.', en: 'Documented request and response formats in Swagger.' },{ ko: '상담사 관리 화면을 옮기면서 기존 비밀번호 변경 처리와 로그인에 적용된 규칙이 다른 점을 발견해, PM과 현행 기준을 확인한 뒤 새 화면에 반영했습니다.', en: 'While migrating the counselor management screen, found that the legacy password-change flow and the login check applied different rules; confirmed the current standard with the PM and applied it to the new screen.' },{ ko: '전환한 화면은 테스트 서버에서 실제 업무 흐름을 처음부터 끝까지 실행해 기존 동작과 같은지 검증했습니다.', en: 'Verified each migrated screen end to end on the test server against the legacy behaviour.' }],
    result: { ko: '상담사 시스템 1개 전환을 마쳤고 1개를 전환 중입니다. 개발 전반에 참여하며 화면 10개 이상과 API 20개 이상을 담당했습니다.', en: 'One counselor system is fully migrated and a second is in progress. I work across development and own at least 10 screens and 20 APIs.' },
    tags: ['Java', 'MyBatis', 'Vue', 'PowerBuilder', 'Swagger'],
  },
  {
    id: 'mg-query', experienceId: 'exp-0',
    title: { ko: '레거시 조회 SQL의 전체 스캔 개선', en: 'Reducing full scans in a legacy query' },
    context: { ko: '유사한 조회 세 개가 병렬로 실행됐고, 그중 한 SELECT는 단독 실행에 55초가 걸렸습니다.', en: 'Three similar queries ran in parallel. One SELECT took 55 seconds in isolation.' },
    actions: [{ ko: 'MySQL 5.7 실행 계획에서 전체 스캔을 확인하고, 기존 복합 인덱스의 선두 컬럼 조건을 보완했습니다.', en: 'Identified full scans with EXPLAIN and added a predicate on the leading column of an existing composite index.' },{ ko: '다른 테이블에는 날짜 범위 조회용 인덱스를 추가했습니다.', en: 'Added an index on the date used for range lookups in a second table.' }],
    result: { ko: '해당 SELECT를 단독으로 다시 실행해 0.041초를 측정했습니다.', en: 'The same SELECT measured 0.041 seconds on an isolated retest.' },
    tags: ['MySQL 5.7', 'EXPLAIN', 'SQL'],
  },
  {
    id: 'mg-transactions', experienceId: 'exp-0',
    title: { ko: 'Spring 트랜잭션과 Sybase 트랜잭션 모드 검증 테스트', en: 'Tests for Spring transactions on Sybase' },
    context: { ko: 'MySQL과 Sybase를 함께 쓰는 환경에서, 전환한 컨트롤러·서비스가 롤백과 데이터 정리까지 의도대로 동작하는지 테스트로 확인해야 했습니다.', en: 'In an environment that uses both MySQL and Sybase, the migrated controllers and services had to be proven, through tests, to roll back and clean up as intended.' },
    actions: [
      { ko: '컨트롤러와 서비스 계층 테스트를 작성해 @Transactional 롤백이 실제로 일어나는지 검증했습니다.', en: 'Wrote controller and service-layer tests that verify @Transactional rollback actually happens.' },
      { ko: '테스트 데이터 정리는 REQUIRES_NEW로 별도 트랜잭션에서 실행해, 본 트랜잭션의 롤백과 섞이지 않게 했습니다.', en: 'Ran test-data teardown in a separate REQUIRES_NEW transaction so it never mixes with the main transaction’s rollback.' },
      { ko: 'Sybase의 chained·unchained 트랜잭션 모드가 Spring 트랜잭션과 충돌하는 지점을 확인하고 테스트에 반영했습니다.', en: 'Identified where Sybase chained and unchained transaction modes conflict with Spring transactions and reflected that in the tests.' },
      { ko: '같은 메서드가 여러 곳에서 호출되는 경우 Mockito verify로 호출 지점을 구분해 검증했습니다.', en: 'Used Mockito verify to tell apart calls to the same method from multiple call sites.' },
    ],
    result: { ko: '롤백, 전파, 트랜잭션 모드가 의도대로 동작하는지 코드 변경 때마다 테스트로 확인할 수 있게 했습니다.', en: 'Rollback, propagation and transaction-mode behaviour can now be checked by tests on every change.' },
    tags: ['Spring', '@Transactional', 'Sybase', 'JUnit', 'Mockito'],
  },
  {
    id: 'mg-ai-env', experienceId: 'exp-0',
    title: { ko: '폐쇄망에서 AI 코딩 도구와 개발 환경 구성', en: 'AI coding tools and dev environment on an air-gapped network' },
    context: { ko: '회사 개발망은 외부 인터넷이 차단된 폐쇄망이라, 외부 서비스형 AI 도구와 일반적인 패키지 설치를 그대로 쓸 수 없었습니다.', en: 'The company development network is air-gapped, so hosted AI tools and ordinary package installs were not available.' },
    actions: [
      { ko: 'Qwen Code CLI에 QWEN.md로 프로젝트 규칙과 맥락을 주입했습니다.', en: 'Configured Qwen Code CLI with a QWEN.md that injects project rules and context.' },
      { ko: '반복 작업을 위한 커스텀 슬래시 커맨드 4개를 만들었습니다.', en: 'Built four custom slash commands for recurring tasks.' },
      { ko: 'Gradle 테스트를 실행하는 로컬 MCP 서버를 만들어, AI가 테스트를 직접 돌리고 결과를 확인하게 했습니다.', en: 'Wrote a local MCP server that runs Gradle tests, so the assistant can run tests and read the results itself.' },
      { ko: '폐쇄망에서 쓸 수 있는 오프라인 React·shadcn/ui 개발 환경을 구성했습니다.', en: 'Set up an offline React and shadcn/ui development environment for the air-gapped network.' },
    ],
    result: { ko: '외부 연결 없이도 AI 도구가 프로젝트 규칙을 읽고, 코드를 고친 뒤 테스트로 확인하는 흐름을 만들었습니다.', en: 'Without any external connection, the assistant reads project rules, edits code and verifies it with tests.' },
    tags: ['Qwen Code', 'MCP', 'Gradle', 'React', 'shadcn/ui'],
  },
  {
    id: 'consistency',
    experienceId: 'exp-1',
    title: { ko: '상품 링크·미링크 데이터 정합성 복구', en: 'Recovering product data consistency' },
    context: { ko: '약 6개 API 노드와 배치가 상품 링크·미링크를 처리하는 환경(전체 상품 약 10억 건, 하루 링크 3만~10만 건)에서 Elasticsearch와 Altibase 간 생성·삭제의 부분 실패와 중복 데이터가 반복됐고, 관련 오류 로그가 하루 100건 안팎 쌓였습니다.', en: 'About six API nodes and batch jobs handled product linking and unlinking (around 1 billion products, 30,000–100,000 links a day). Partial writes, failed deletions and duplicates kept appearing between Elasticsearch and Altibase, with roughly 100 related error logs a day.' },
    actions: [
      { ko: '운영 오류 로그와 호출 흐름을 분석하고, 두 저장소의 저장·삭제 순서를 조정했습니다.', en: 'Analyzed production error logs and request flows, then adjusted the write and deletion order across both stores.' },
      { ko: '기존 RabbitMQ Consumer에 실패 상품을 재조회하는 보상·복구 로직을 추가했습니다.', en: 'Added compensation and recovery logic to an existing RabbitMQ consumer to re-query failed products.' },
      { ko: '중복 데이터의 update_d 갱신 시각을 비교해 최신 데이터를 남기고 오래된 데이터를 정리하도록 분기했습니다.', en: 'Compared update_d timestamps when duplicate data remained, retaining newer records and removing stale ones.' },
    ],
    result: { ko: '하루 100건 안팎 발생하던 링크·미링크 정합성 오류 로그가 사라졌습니다.', en: 'The roughly 100 consistency error logs a day for linking and unlinking stopped.' },
    tags: ['Java', 'RabbitMQ', 'Elasticsearch', 'Altibase', 'SQL'],
  },
  {
    id: 'catalog',
    experienceId: 'exp-1',
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
    experienceId: 'exp-1',
    title: { ko: '입점업체 Excel 대조 업무 자동화', en: 'Automating merchant spreadsheet reconciliation' },
    context: { ko: '입점업체 Excel 대조 요청이 매주 왔고, 약 6종의 결과 파일을 만들기 위해 개발자가 스크립트를 주 5~6회 직접 실행했습니다. 한 번에 30분~1시간이 걸렸습니다.', en: 'Merchant spreadsheet reconciliation was requested every week. Producing about six kinds of output meant a developer ran scripts by hand five or six times a week, 30 minutes to an hour each.' },
    actions: [
      { ko: '업체별 원본을 Office 서버에 저장하는 관리자 업로드 기능을 구현했습니다.', en: 'Implemented an administration interface for uploading merchant source files to an Office server.' },
      { ko: '금요일 처리라는 업무 기준에 맞춰 Cron·PHP 예약 배치와 업체별 DB 비교·가공 로직을 개발했습니다.', en: 'Developed scheduled PHP/Cron jobs for Friday processing, with merchant-specific database comparison and transformation logic.' },
      { ko: 'CSV/XLS 결과 파일을 생성하고 관리자가 직접 다운로드하는 흐름을 구성했습니다.', en: 'Generated CSV/XLS output and enabled administrators to download results directly.' },
    ],
    result: { ko: '관리자가 원본을 올리고 결과를 직접 내려받게 되면서, 주 5~6회(회당 30분~1시간) 하던 개발자의 수작업이 없어졌습니다.', en: 'Administrators now upload sources and download results themselves, removing five to six manual developer runs a week (30–60 minutes each).' },
    tags: ['PHP', 'Cron', 'SQL', 'CSV / XLS'],
  },
  {
    id: 'platform',
    experienceId: 'exp-1',
    title: { ko: '에누리·다나와 통합 관리자 플랫폼', en: 'Unified Enuri–Danawa administration platform' },
    context: { ko: '2025.01–2026.01, 별도로 운영되던 두 서비스의 백오피스 기능을 통합할 신규 관리자 플랫폼을 4인 TF에서 개발했습니다. 기존 JSP 화면의 동작을 분석해 새 화면으로 옮겼습니다.', en: 'From Jan 2025 to Jan 2026, worked in a four-person team on a new administration platform to bring together back-office functions from two independently operated services, analyzing the behavior of the existing JSP screens.' },
    actions: [
      { ko: 'Next.js·모노레포·FSD 기반 디렉터리와 기능 모듈 구조를 구성했습니다.', en: 'Organized frontend directories and feature modules using Next.js, a monorepo and Feature-Sliced Design.' },
      { ko: '회원·권한 UI, 사용자 역할·메뉴 권한 조회를 GraphQL·Apollo Client와 연동했습니다.', en: 'Integrated member and permission interfaces, role lookups and menu permissions with GraphQL and Apollo Client.' },
      { ko: '계층형 카테고리 선택·적용 전 미리보기를 구현하고, 검색·트리·테이블 등 공통 컴포넌트 10종 이상을 분리했습니다.', en: 'Built hierarchical category selection with a pre-apply preview, and extracted 10+ shared components including search, tree and table.' },
    ],
    result: { ko: '점진 전환을 위한 신규 UI 기반과 공통 관리 기능을 마련했습니다. 담당 범위는 프론트엔드 구조·기능과 기존 권한 API 연동입니다.', en: 'Delivered shared administration functions and a new UI foundation for incremental migration. My scope covered frontend structure, feature development and integration with existing permission APIs.' },
    tags: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Apollo Client', 'Zustand', 'FSD'],
  },
  {
    id: 'blue-green',
    experienceId: 'exp-1',
    title: { ko: '뉴오피스 프론트엔드 Blue-Green 배포 개선', en: 'Blue-green deployment for the New Office frontend' },
    context: { ko: '뉴오피스 프론트엔드(Next.js·React)는 Docker 컨테이너를 재시작하는 방식으로 배포해, 배포 때마다 화면이 5~10초 끊겼습니다.', en: 'The New Office frontend (Next.js/React) was deployed by restarting its Docker container, so every deployment took the site down for 5–10 seconds.' },
    actions: [
      { ko: 'Docker Compose로 Blue·Green 환경을 구성해 기존 운영 버전과 신규 버전을 별도 컨테이너로 실행하도록 구성했습니다.', en: 'Configured blue and green environments with Docker Compose so the live and new versions could run in separate containers.' },
      { ko: '신규 버전 컨테이너를 배포하는 Shell Script를 직접 작성했습니다.', en: 'Wrote shell scripts to deploy the new-version container.' },
      { ko: 'Nginx 리버스 프록시 설정을 변경해 Blue·Green 환경 간 트래픽 전환을 구현했습니다.', en: 'Implemented traffic switching between blue and green environments by updating the Nginx reverse proxy configuration.' },
    ],
    result: { ko: '새 버전 컨테이너가 뜬 뒤 트래픽을 넘기는 방식으로 바꿔, 배포마다 생기던 5~10초 중단 없이 기존 서비스를 유지하며 배포합니다. 버전은 날짜 태그와 릴리즈로 관리해 몇 차례 롤백도 문제없이 진행했습니다.', en: 'Traffic now switches only after the new container is up, so deployments no longer cause the 5–10 second outage. Versions are tracked with date tags and releases, which kept several rollbacks straightforward.' },
    tags: ['Next.js', 'React', 'Docker', 'Docker Compose', 'Shell Script', 'Nginx'],
  },
  {
    id: 'delivery',
    experienceId: 'exp-1',
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
    experienceId: 'exp-1',
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
const japaneseWork: Record<string, { title: string; context: string }> = {
  'mg-modernization': { title: 'PowerBuilder業務画面のJava・Vue移行', context: '相談員システム3つをPowerBuilderからJava・Vueへ移行するTFです。照会・入力のルールがPowerBuilderのイベントとDataWindowに分散しており、PowerBuilder側には開発サーバーがないため、既存の動作をソースから正確に把握してから移す必要がありました。' },
  'mg-transactions': { title: 'SpringトランザクションとSybaseのトランザクションモードの検証テスト', context: 'MySQLとSybaseを併用する環境で、移行したコントローラー・サービスがロールバックやデータの後片付けまで意図どおりに動くかをテストで確認する必要がありました。' },
  'mg-ai-env': { title: '閉域網でのAIコーディングツールと開発環境の構築', context: '会社の開発網は外部インターネットから遮断された閉域網のため、外部のAIサービスや通常のパッケージインストールをそのまま使えませんでした。' },
  'mg-query': { title: 'レガシーSQLのフルスキャン改善', context: '類似する照会SQLが3本並列で実行され、そのうち1本のSELECTは単独実行で約55秒かかっていました。' },
  'consistency': { title: '商品データの整合性回復', context: '約6台のAPIノードとバッチが商品のリンク・リンク解除を処理する環境（全商品約10億件、1日のリンク3万〜10万件）で、ElasticsearchとAltibase間の部分的な書き込み失敗や重複が繰り返され、関連するエラーログが1日100件前後発生していました。' },
  'catalog': { title: '認証・保証情報と変更履歴の管理', context: '商品の連携状態によって認証・保証情報の保存先と取得方法が異なり、未連携商品にも対応する必要がありました。' },
  'automation': { title: '取引先Excel照合業務の自動化', context: '取引先Excelの照合依頼が毎週あり、約6種類の結果ファイルを作るために開発者がスクリプトを週5〜6回手動で実行していました。1回あたり30分〜1時間かかっていました。' },
  'platform': { title: 'エヌリ・ダナワ統合管理プラットフォーム', context: '2025年1月〜2026年1月、別々に運用されていた2つのサービスの管理機能を統合する新プラットフォームを4人のTFで開発しました。既存JSP画面の動作を分析して移行しました。' },
  'blue-green': { title: 'New OfficeフロントエンドのBlue-Greenデプロイ', context: 'New Officeのフロントエンド（Next.js・React）はDockerコンテナを再起動する方式でデプロイしており、デプロイのたびに画面が5〜10秒止まっていました。' },
  'delivery': { title: 'GitLab・Harbor・ArgoCDによるデプロイ連携', context: '社内で提供されていたKubernetes・Harbor・ArgoCD基盤に、新しいアプリケーションのビルドとデプロイの流れをつなぐ必要がありました。' },
  'storybook': { title: 'Storybook共有環境と静的ファイル配信の改善', context: 'チームと企画担当者が共通UIを確認できる社内Storybook環境と、ビルド成果物の管理が必要でした。' },
};
export function getWorks(language: Language) {
  return works.map(work => ({
    id: work.id,
    experienceId: work.experienceId,
    company: companies[work.experienceId][language],
    title: language === 'ja' ? japaneseWork[work.id]?.title ?? work.title.en : work.title[language],
    context: language === 'ja' ? japaneseWork[work.id]?.context ?? work.context.en : work.context[language],
    actions: work.actions.map(action => action[language === 'ja' ? 'en' : language]),
    result: work.result[language === 'ja' ? 'en' : language],
    tags: work.tags,
  }));
}
