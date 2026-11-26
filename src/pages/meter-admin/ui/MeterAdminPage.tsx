import { projects } from '@/entities/project/model/data';
import { Bullets, CaseStudy, Choices, Decisions, Diagram, Flow, Prose, Section, useT } from '@/widgets/case-study/ui/CaseStudy';

const source = 'https://github.com/issac-52/meter-admin';
const revision = `${source}/blob/04425a90bcf4f7d69107d6266fa18b9dbbcc4b8f`;
const videoUrl = projects.find(project => project.id === 'meter-admin')!.videoUrl!;

export function MeterAdminPage() {
  const t = useT();
  return <CaseStudy
    id="meter-admin"
    title={{ ko: '야장관리자', en: 'Field Survey Manager', ja: '現地調査管理システム' }}
    status={{ ko: '실서비스 운영 중 · 유지보수', en: 'Live in production · Maintained', ja: '本番運用中・保守' }}
    summary={{
      ko: '지방에서 직접 수도 조사를 하며 종이 야장(현장 기록지) 여러 장을 들고 다니던 업무를 옮겨 만든 관리 도구입니다. 계량기와 제수밸브·공기밸브·소화전 조사 대상을 Excel로 등록하면 현장에서 지침·사진·위치를 기록하고, 관리자가 진행 상황을 확인한 뒤 고객이 쓰던 Excel 양식 그대로 결과를 채워 제출합니다. 처음에는 혼자 쓰다가, 함께 일하는 업체가 공식 도구로 쓰고 있습니다.',
      en: 'A management tool I built while doing water surveys myself in the provinces, replacing the stack of paper field notes (yajang) I used to carry. Meter, valve and hydrant targets are imported from Excel, readings, photos and locations are recorded on site, and administrators review progress and export results into the customer’s own Excel template. I started as its only user; the partner company I work with now uses it as its official tool.',
      ja: '地方で自ら水道調査をしていた頃、紙の野帳（現場記録用紙）を何枚も持ち歩いていた業務を置き換えるために作った管理ツールです。メーターや仕切弁・空気弁・消火栓の調査対象をExcelで登録し、現場で指針・写真・位置を記録し、管理者が進捗を確認したうえで顧客のExcel様式のまま結果を書き込んで提出します。最初は自分一人で使っていましたが、現在は協力会社が公式ツールとして使っています。',
    }}
    role={{ ko: '외주 · 설계, 개발, 운영', en: 'Client work · Design, development and operation', ja: '受託・設計、開発、運用' }}
    stack={['Next.js 16', 'React 19', 'Supabase', 'Cloudflare R2', 'NAVER Maps', 'Claude Code']}
    links={[
      { href: source, label: { ko: 'GitHub', en: 'GitHub', ja: 'GitHub' } },
      { href: videoUrl, label: { ko: '시연 영상', en: 'Demo video', ja: 'デモ動画' } },
    ]}
  >
    <Section title={{ ko: '업무 흐름', en: 'Workflow', ja: '業務フロー' }}>
      <Flow steps={[
        { ko: 'Excel로 수용가·밸브 목록 등록, 업로드 전 미리보기', en: 'Import consumer and valve lists from Excel, with a preview before upload', ja: 'Excelで需要家・バルブ一覧を登録し、アップロード前にプレビュー' },
        { ko: '블록 또는 지도에서 조사 대상 찾기', en: 'Find survey targets by block or on the map', ja: 'ブロックまたは地図から調査対象を探す' },
        { ko: '현장에서 지침·봉인·위치와 사진 기록', en: 'Record readings, seals, locations and photos on site', ja: '現場で指針・封印・位置と写真を記録' },
        { ko: '관리자가 진행 상황과 미완료 항목 확인', en: 'Administrators review progress and incomplete items', ja: '管理者が進捗と未完了の項目を確認' },
        { ko: '원본 Excel 양식에 결과를 채워 제출', en: 'Fill results into the original Excel template for delivery', ja: '元のExcel様式に結果を書き込んで提出' },
      ]}/>
    </Section>

    <Section title={{ ko: '시스템 구성', en: 'Architecture', ja: 'システム構成' }}>
      <Diagram
        path={[
          { name: 'Browser', role: { ko: 'PC · 모바일', en: 'Desktop · mobile', ja: 'PC・モバイル' } },
          { name: 'Next.js', role: { ko: 'Server Actions · Route Handlers', en: 'Server Actions · Route Handlers', ja: 'Server Actions・Route Handlers' } },
          { name: 'Supabase', role: { ko: 'Auth · PostgreSQL', en: 'Auth · PostgreSQL', ja: 'Auth・PostgreSQL' } },
        ]}
        stores={[
          { ko: 'Cloudflare R2 · 조사 사진', en: 'Cloudflare R2 · photos', ja: 'Cloudflare R2・調査写真' },
          { ko: 'NAVER · 지도와 좌표 변환', en: 'NAVER · maps and geocoding', ja: 'NAVER・地図と座標変換' },
          { ko: 'JSZip · xlsx · Excel 처리', en: 'JSZip · xlsx · Excel processing', ja: 'JSZip・xlsx・Excel処理' },
        ]}
        caption={{ ko: '사진은 Presigned URL로 브라우저에서 R2에 직접 올립니다.', en: 'Photos upload directly from the browser to R2 through presigned URLs.', ja: '写真は署名付きURLでブラウザからR2へ直接アップロードします。' }}
      />
      <Prose>{{ ko: '인증·수용가 조사·밸브 조사·Excel 처리를 기능 단위로 나누고, Supabase·R2 클라이언트와 공통 메뉴만 shared에 두었습니다. 조사 종류마다 다른 파싱 방식과 갱신 규칙이 각 기능 안에 모여 있습니다.', en: 'Authentication, consumer surveys, valve surveys and Excel processing live in separate feature modules; only the Supabase/R2 clients and shared navigation sit in a common layer. Each survey type keeps its own parsing and update rules next to its workflow.', ja: '認証・需要家調査・バルブ調査・Excel処理を機能単位で分け、Supabase・R2のクライアントと共通メニューだけをsharedに置きました。調査の種類ごとに異なる解析方法と更新ルールは、それぞれの機能の中にまとめています。' }}</Prose>
    </Section>

    <Section title={{ ko: '왜 이렇게 선택했나', en: 'Why these choices', ja: 'なぜこの選択をしたか' }}>
      <Choices items={[
        {
          choice: { ko: 'Next.js + Supabase', en: 'Next.js + Supabase', ja: 'Next.js + Supabase' },
          over: { ko: '백엔드 서버를 따로 구축', en: 'building a separate backend server', ja: 'バックエンドサーバーを別途構築' },
          why: { ko: '현장 조사를 직접 하던 시기라 짧으면 하루, 길어도 이틀 안에 실제로 쓸 수 있어야 했습니다. Next.js는 이미 써 본 스택이라 화면을 빠르게 만들고 고칠 수 있었고, Supabase는 인증과 DB를 제공해 백엔드를 따로 만들지 않고 비용 없이 시작할 수 있었습니다.', en: 'I was doing the field surveys myself, so the tool had to be usable within a day or two. I already knew Next.js, so screens were quick to build and change, and Supabase provided auth and a database, so I could start with no separate backend and no cost.', ja: '自ら現場調査をしていた時期だったため、短ければ1日、長くても2日で実際に使える必要がありました。Next.jsは使い慣れたスタックで画面を素早く作って直せ、Supabaseは認証とDBを提供するので、バックエンドを別に作らず費用もかけずに始められました。' },
        },
        {
          choice: { ko: 'Cloudflare R2 (사진 저장소)', en: 'Cloudflare R2 for photos', ja: 'Cloudflare R2（写真ストレージ）' },
          over: { ko: 'Supabase Storage, S3, Google Drive', en: 'Supabase Storage, S3, Google Drive', ja: 'Supabase Storage、S3、Google Drive' },
          why: { ko: '혼자 쓸 때는 비용 위험이 없었지만, 함께 일하는 업체가 공식으로 쓰기로 하면서 사진 저장소를 다시 검토했습니다. 비용을 비교해 보니 R2가 Supabase Storage나 S3보다 훨씬 가볍고 쌌고, Google Drive보다 개발과 연동이 쉬웠습니다.', en: 'Cost was no risk while I was the only user, but when the partner company decided to adopt the tool I re-evaluated photo storage. Compared on cost, R2 was much lighter and cheaper than Supabase Storage or S3, and easier to develop against and integrate than Google Drive.', ja: '一人で使っていた頃は費用のリスクはありませんでしたが、協力会社が公式に使うことになり、写真ストレージを見直しました。費用を比較するとR2はSupabase StorageやS3よりはるかに軽くて安く、Google Driveより開発と連携が簡単でした。' },
        },
        {
          choice: { ko: 'NAVER 지도', en: 'NAVER Maps', ja: 'NAVER地図' },
          over: { ko: 'Google 지도', en: 'Google Maps', ja: 'Google マップ' },
          why: { ko: '집 주소로 계량기 위치를 찾아야 해서 국내 주소 검색이 정확한 지도가 필요했습니다. 개발 당시 국내에서는 Google 지도를 이 용도로 쓰기 어려웠고, 함께 일하는 사람들도 모두 NAVER 지도로 길을 찾고 있어 가장 익숙했습니다.', en: 'Meters are found from home addresses, so accurate Korean address search mattered. At the time Google Maps was hard to use for this in Korea, and everyone on the team already navigated with NAVER Maps.', ja: '自宅の住所からメーターの位置を探すため、国内の住所検索が正確な地図が必要でした。開発当時、韓国ではこの用途でGoogleマップを使うのは難しく、一緒に働く人たちも皆NAVER地図で道を調べていたため最も慣れていました。' },
        },
      ]}/>
    </Section>

    <Section title={{ ko: '설계에서 중요하게 본 것', en: 'Key design decisions', ja: '設計で重視したこと' }}>
      <Decisions items={[
        {
          title: { ko: '다시 업로드해도 현장 입력값은 지킨다', en: 'Re-imports never overwrite field work', ja: '再アップロードしても現場の入力値は守る' },
          body: { ko: '수용가 Excel은 블록과 도면번호로 기존 행과 대조해 이름·주소·구계량기번호·최종지침·블록만 갱신합니다. 조사값과 사진은 건드리지 않고, 파일에 없는 행도 지우지 않습니다. 밸브는 블록·밸브번호로 매칭하는 별도 규칙을 둡니다.', en: 'Consumer imports match existing rows by block and row number and update only name, address, old meter number, final reading and block. Survey values and photos are untouched, and rows missing from the file are kept. Valves use their own matching rule by block and valve number.', ja: '需要家のExcelはブロックと図面番号で既存の行と照合し、氏名・住所・旧メーター番号・最終指針・ブロックだけを更新します。調査値と写真には触れず、ファイルにない行も削除しません。バルブはブロックとバルブ番号で照合する別のルールを持ちます。' },
        },
        {
          title: { ko: '제출 양식은 원본 그대로', en: 'Deliver in the customer’s own template', ja: '提出様式は元のまま' },
          body: { ko: '통합문서를 새로 만들지 않고, 원본 파일의 시트 XML에 값만 채웁니다. 고객이 쓰던 서식과 레이아웃이 그대로 유지됩니다.', en: 'Instead of rebuilding the workbook, values are written into the original file’s sheet XML, so the customer’s formatting and layout stay intact.', ja: 'ブックを新しく作らず、元ファイルのシートXMLに値だけを書き込みます。顧客が使っていた書式とレイアウトがそのまま残ります。' },
        },
        {
          title: { ko: '업무 데이터와 사진 분리', en: 'Records and photos stored separately', ja: '業務データと写真を分離' },
          body: { ko: 'PostgreSQL에는 업무 데이터와 사진 참조만 두고, 이미지는 R2에 저장합니다. 수용가는 사진 4장, 밸브는 2장까지 관리합니다.', en: 'PostgreSQL holds business records and photo references; images live in R2. Consumers keep up to four photos and valves up to two.', ja: 'PostgreSQLには業務データと写真の参照だけを置き、画像はR2に保存します。需要家は写真4枚、バルブは2枚まで管理します。' },
        },
        {
          title: { ko: '현장과 사무실이 같은 데이터를 본다', en: 'One dataset for field and office', ja: '現場と事務所が同じデータを見る' },
          body: { ko: 'PC와 모바일에서 같은 조사 화면에 접근하고, 지도에서 위치를 바로 확인합니다.', en: 'Desktop and mobile reach the same survey screens, with locations visible on the map.', ja: 'PCとモバイルから同じ調査画面にアクセスし、地図で位置をすぐに確認できます。' },
        },
      ]}/>
    </Section>

    <Section title={{ ko: 'Claude Code로 개발한 방식', en: 'How I worked with Claude Code', ja: 'Claude Codeでの開発' }}>
      <Prose>{{ ko: '구현은 Claude Code와 함께 진행하고, 요구사항·데이터 보존 범위·완료 기준·운영 반영은 제가 결정했습니다.', en: 'Implementation was done with Claude Code; requirements, data-preservation scope, acceptance criteria and production releases were my decisions.', ja: '実装はClaude Codeと進め、要件・データの保持範囲・完了基準・本番反映は私が決めました。' }}</Prose>
      <Bullets items={[
        { ko: 'Excel 처리를 바꾸기 전에 보존할 값과 갱신할 값을 먼저 정리합니다.', en: 'Define what to preserve and what to update before changing Excel logic.', ja: 'Excel処理を変える前に、保持する値と更新する値を先に整理します。' },
        { ko: 'AI가 만든 변경은 기존 업무 규칙과 소스에 대조해 검토합니다.', en: 'Review AI-written changes against existing business rules and code.', ja: 'AIが書いた変更は、既存の業務ルールとソースに照らしてレビューします。' },
        { ko: '운영 반영 전 업로드·추출·권한·사진·지도를 실제 시나리오로 확인합니다.', en: 'Check imports, exports, roles, photos and maps with real scenarios before release.', ja: '本番反映の前に、取り込み・出力・権限・写真・地図を実際のシナリオで確認します。' },
      ]}/>
    </Section>

    <Section title={{ ko: '시연 영상', en: 'Demo', ja: 'デモ' }}>
      <video className="cs-video" src={videoUrl} controls playsInline preload="none" aria-label={t({ ko: '야장관리자 시연 영상', en: 'Field Survey Manager demo', ja: '現地調査管理システムのデモ動画' })}/>
    </Section>

    <Section title={{ ko: '소스', en: 'Source', ja: 'ソース' }}>
      <div className="cs-inline-links">{([
        [`${revision}/features/meter-survey/api/actions.ts`, { ko: '수용가 갱신 규칙', en: 'Import rules', ja: '需要家の更新ルール' }],
        [`${revision}/features/excel-manager/api/template-fill.ts`, { ko: '원본 양식 채우기', en: 'Template export', ja: '元の様式への書き込み' }],
        [`${revision}/ARCHITECTURE.md`, { ko: '아키텍처 문서', en: 'Architecture notes', ja: 'アーキテクチャ文書' }],
        [`${revision}/CLAUDE.md`, { ko: 'AI 협업 규칙', en: 'AI collaboration rules', ja: 'AI協業ルール' }],
      ] as const).map(([href, label]) => <a key={href} href={href} target="_blank" rel="noreferrer">{t(label)} ↗</a>)}</div>
    </Section>
  </CaseStudy>;
}
