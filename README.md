# ShoFirm Foods Website

This repository contains the ShoFirm Foods marketing website built with Vite, React, Tailwind CSS, and TanStack React Start.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Code quality

- `npm run lint` runs ESLint across the project.
- `npm run format` runs Prettier and formats the code.

## Deployment readiness

- Production build succeeds (`npm run build`).
- GitHub Actions CI workflow added at `.github/workflows/ci.yml`.
- Contact details and WhatsApp links were updated across the UI.
- Backend/server runtime support exists in `src/server.ts` and `src/start.ts`.

## Notes

- GitHub remote repository: `https://github.com/okech-michael/shofirm-premium-bites`
- The project is configured for static and SSR-friendly Vite deployment.
