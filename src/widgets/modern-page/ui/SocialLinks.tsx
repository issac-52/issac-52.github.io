import { siteConfig } from '@/shared/config/site';

export function SocialLinks() {
  return <div className="io-social">
    <a href={siteConfig.githubUrl} aria-label="GitHub" title="GitHub">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.43-2.21 1.14-2.99-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.14 1.77 1.14 2.99 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
    </a>
    <a href="https://www.linkedin.com/in/yisak-oh-21356326b/" aria-label="LinkedIn" title="LinkedIn"><b aria-hidden="true">in</b></a>
    <a href={'mailto:'+siteConfig.email} aria-label="Email" title="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></a>
  </div>;
}
