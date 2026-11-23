# Portfolio V2 — Editorial Engineering Portfolio

## Goal
Rework the portfolio into a clean, readable engineering-focused website inspired by the information architecture of https://imaikosuke.com/, without copying its branding or assets.

## Current state (2026-11-19)
- React 18, TypeScript, Vite, Tailwind 3, Zustand, GitHub Pages
- Existing homepage: src/widgets/modern-page/ui/ModernPage.tsx
- Existing design: dark dashboard style with detailed modal cases
- Maintained data: experiences, 8 engineering case studies, 3 projects
- Korean and English locale; Japanese locale planned
- Project detail routes for field-work, meter-admin, weekly-blog must keep working
- main branch must remain deployable. No direct main writes.

## V2 Information Architecture
1. Hero — Backend-focused Full-stack Engineer; role, focus and contact
2. About — brief engineering philosophy and relevant capabilities
3. Experience — chronological company and role entries with expandable detail
4. Engineering Case Studies — problem, reasoning, implementation and outcome
5. Projects — substantial external / side projects and live evidence
6. Toolkit — practical skills grouped by purpose
7. Contact — email, GitHub, resume
8. Locale support — KR / EN, then JP with reviewed translations

## Key content updates required
- Update the SQL-tuning case after verifying the newest post-improvement benchmark of 0.041 seconds: previously 55 seconds for a single query, not all 3 combined. Validate same environment / conditions; never describe throughput speedup without evidence.
- Keep actual ownership and shared-team scope accurate.
- Separate production service results from synthetic load-test metrics.
- Avoid invented metrics, employment eligibility, degree claims, screenshots or certifications.
- Japanese career document / 職務経歴書 link only after an actual reviewed document exists.

## Visual direction
- Light editorial theme by default, optional dark mode
- Warm off-white backdrop, deep neutral ink, muted forest-green accent
- Typography-forward headline, slim rule separators, expressive project covers
- Responsive grid, distinct mobile navigation, reduced-motion support
- Preserve detailed existing project routes and proof files

## Implementation checklist
- [ ] Redesign home layout and responsive visual tokens
- [ ] Add light/dark theme switch with persistence
- [ ] Keep KR/EN functional, build reviewed JP translation
- [ ] Highlight the most relevant engineering case studies, retain all eight
- [ ] Ensure project detail navigation and existing modals work
- [ ] Update measured SQL case and source data with provenance
- [ ] Validate npm ci, npm run build, navigation, contrast, mobile, accessibility
- [ ] Open draft PR for review. Never auto-merge.

## Build
```bash
npm ci
npm run build
```
