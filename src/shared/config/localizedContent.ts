import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import type { Experience } from '@/entities/experience/model/types';
import type { Language } from '@/shared/model/useLanguageStore';

const englishExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG Credit Information · NCS Modernization TF',
    period: 'Jul 2026 – Present',
    role: 'Java API & Vue Application Development',
    desc: 'Joined a team migrating a PowerBuilder business system to a Java/Vue web application. Analyze existing source code and workflows, and translate requirements from the project manager and business users into APIs and screens.\n\nDevelop and integrate assigned Java APIs and Vue screens using the established project environment and existing database schema.',
  },
  'exp-1': {
    name: 'Connectwave · Danawa Division',
    period: '2022 – Mar 2026',
    role: 'Back-office Development · Unified Administration Platform TF',
    desc: 'Developed Java/Spring management APIs, database tables and PHP/Cron batch jobs for product and catalog operations. Extended an existing RabbitMQ consumer with failed-product lookup and compensation logic to address Elasticsearch–Altibase consistency errors.\n\nIn a four-person team, developed the Next.js frontend structure, GraphQL integration, permissions and menu interfaces, and reusable components for a unified Enuri–Danawa administration platform. Configured blue-green deployment for the New Office frontend using Docker Compose, shell scripts and Nginx. Also worked on application delivery integration with GitLab CI/CD, Harbor and ArgoCD, and a shared Storybook environment.',
  },
};
export const getExperiences = (language: Language) => language === 'en'
  ? experiences.map(item => ({ ...item, ...englishExperience[item.id] })) : experiences;

const englishProjects = {
  'meter-admin': {
    name: 'Field Survey Manager',
    period: 'Live in production · Maintenance',
    role: 'Side project · Client work',
    desc: 'A management tool for water-meter field surveys, including photos and location data. Designed and developed throughout with Claude Code as the primary AI coding tool. Development is complete, and I operate the live production service and handle ongoing maintenance.',
  },
  'field-work': {
    name: 'Water Operations Manager',
    period: 'MVP implemented · Deployment connected · Performance work',
    role: 'Side project · Client work',
    desc: 'A field operations system covering Excel imports, maps and geocoding, START/END readings, photos, settlement and HWPX exports for roughly 20,000 sites. Built and verified with Codex assistance, with EC2 and Cloudflare integration. Synthetic 20k-site benchmarks document query bottlenecks and before/after results.',
  },
};
export const getProjects = (language: Language) => language === 'en'
  ? projects.map(item => ({ ...item, ...englishProjects[item.id as keyof typeof englishProjects] })) : projects;
