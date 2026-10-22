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
    period: 'In design',
    role: 'Side project · Client work',
    desc: 'A separate new project for field meter-reading and work management. Designing mobile workflows for location lookup, data entry, photo records and task completion. Currently in design and not yet in production.',
  },
};
export const getProjects = (language: Language) => language === 'en'
  ? projects.map(item => ({ ...item, ...englishProjects[item.id as keyof typeof englishProjects] })) : projects;
