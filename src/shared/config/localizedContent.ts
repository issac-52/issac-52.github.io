import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import type { Experience } from '@/entities/experience/model/types';
import type { Language } from '@/shared/model/useLanguageStore';

const englishExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG Credit Information · NCS Modernization TF',
    period: 'Jul 2026 – Present',
    role: 'Java API & Vue Application Development',
    desc: 'Joined a team migrating a PowerBuilder business system to a Java/Vue web application. Analyze existing source code and workflows, and translate requirements from the project manager and business users into APIs and screens.\n\nUsed MySQL 5.7 execution plans to identify full table scans and adjusted indexes and predicates. A single SELECT went from 55 seconds to 0.041 seconds on retest.\n\nIn an environment using both MySQL and Sybase, I wrote tests that verify transaction rollback and propagation and Sybase transaction modes, and set up an air-gapped development environment where an AI coding assistant can run the tests itself.',
  },
  'exp-1': {
    name: 'Connectwave · Danawa Division, Back-office Development Team',
    period: 'Aug 2022 – Mar 2026',
    role: 'Back-office Development · Unified Admin Platform TF',
    desc: 'Maintained core business logic for managing catalogs and products, in Java/Spring and PHP. Built and improved management APIs, database tables and PHP/Cron batch jobs for operations requests.\n\nFrom Jan 2025 to Jan 2026, in a four-person team, developed the frontend structure, member, permission and category screens, and shared components of a Next.js-based unified Enuri–Danawa admin platform. Also worked on GitLab CI/CD, Harbor and ArgoCD delivery and a blue-green deployment setup.',
  },
};
const japaneseExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG信用情報 · 業務システム刷新TF',
    period: '2026年7月 – 現在',
    role: 'Java API・Vue業務画面開発',
    desc: 'PowerBuilderベースの業務システムをJava / VueのWebアプリケーションへ移行するプロジェクトに参画しています。既存ソースコードと業務フローを分析し、担当APIと画面の開発を行っています。\n\nMySQL 5.7のEXPLAINで並列実行される3本の類似SQLに共通するボトルネックを調査しました。既存複合インデックスの活用と追加インデックスを検討し、単一クエリの実行時間を約55秒から再測定値約0.041秒へ改善しました。3本の合計応答時間とは異なります。\n\nMySQLとSybaseを併用する環境で、トランザクションのロールバック・伝播とSybaseのトランザクションモードを検証するテストを書き、閉域網の中でAIコーディングツールがテストまで自ら実行できる開発環境を構築しました。',
  },
  'exp-1': {
    name: 'Connectwave · Danawa事業部 バックオフィス開発チーム',
    period: '2022年8月 – 2026年3月',
    role: 'バックオフィス開発・統合管理プラットフォームTF',
    desc: 'Java/SpringとPHPで、カタログや商品を管理する中核ビジネスロジックの保守を担当しました。運用要望に合わせて管理API、DBテーブル、PHP/Cronバッチを開発・改善しました。\n\n2025年1月〜2026年1月は4人のTFで、Next.jsベースのエヌリ・ダナワ統合管理プラットフォームのフロントエンド構成、会員・権限・カテゴリ画面、共通コンポーネントを開発しました。GitLab CI/CD・Harbor・ArgoCDのデプロイ連携とBlue-Greenデプロイ構成にも携わりました。',
  },
};
export const getExperiences = (language: Language) => language === 'ja'
  ? experiences.map(item => ({ ...item, ...japaneseExperience[item.id] })) : language === 'en'
  ? experiences.map(item => ({ ...item, ...englishExperience[item.id] })) : experiences;

const englishProjects = {
  'meter-admin': {
    name: 'Field Survey Manager',
    period: 'Live in production · Maintenance',
    role: 'Side project · Client work',
    desc: 'Built to replace the paper field notes I carried while doing water surveys myself. It connects Excel imports, field entry, photos, maps and exports for meter and valve surveys, keeps field values on re-import, and fills results into the original Excel template. The partner company I work with now uses it as its official tool.',
  },
  'weekly-blog': {
    name: 'Browinfo · Weekly Magazine',
    period: 'Live at browinfo.com',
    role: 'Side project',
    desc: 'A weekly magazine that checks the sources of articles written in ChatGPT automatically and publishes the ones that pass. Live at browinfo.com; I replaced approve-every-article with auto-publishing based on how it ran in practice, and built retry de-duplication and source management.',
  },
  'field-work': {
    name: 'Water Operations Manager',
    period: 'Live in production · about 30 active users',
    role: 'Side project · Client work',
    desc: 'A field operations system connecting Excel imports, maps and geocoding, START/END readings, photos, settlement and HWPX exports for about 20,000 sites. It runs in production with about 30 people using it daily. Built with Codex; cut SQL calls for one list page from 62 to 4.',
  },
};
const japaneseProjects = {
  'meter-admin': {
    name: '現地調査管理システム', period: '本番運用中・保守', role: '個人開発・受託',
    desc: '自ら水道調査をしていた頃に持ち歩いていた紙の野帳を置き換えるために作った管理ツールです。需要家・バルブ調査のExcel登録から現場入力・写真・地図・結果出力までをつなぎ、再アップロードしても現場の調査値を守り、元のExcel様式に結果を書き込みます。現在は協力会社が公式ツールとして使っています。',
  },
  'field-work': {
    name: '水道現場業務管理システム', period: '本番運用中・利用者約30名', role: '個人開発・受託',
    desc: '約2万件の需要家を対象に、Excel登録、地図・位置情報、検針、写真、精算、HWPX出力をつなぐ現場業務システムです。本番運用中で、約30名が日々の業務で利用しています。Codexと開発し、一覧1ページのSQL実行回数を62回から4回に減らしました。',
  },
  'weekly-blog': {
    name: 'Browinfo · 週刊マガジン', period: '公開運用中・browinfo.com', role: '個人開発',
    desc: 'ChatGPTで書いた週刊記事の出典を自動で検査し、通過した記事をすぐに公開するマガジンです。browinfo.comで公開運用中で、すべての記事を承認していた流れを運用経験に合わせて自動公開に変え、再送時の重複防止と出典管理を実装しました。',
  },
};
export const getProjects = (language: Language) => language === 'ja'
  ? projects.map(item => ({ ...item, ...japaneseProjects[item.id as keyof typeof japaneseProjects] })) : language === 'en'
  ? projects.map(item => ({ ...item, ...englishProjects[item.id as keyof typeof englishProjects] })) : projects;
