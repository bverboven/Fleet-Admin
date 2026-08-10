# Fleet Admin (front end)

Vue 3 + Vite SPA for administering Fleet Manager clients (tenants) — the admin counterpart of the [Fleet Manager front end](https://github.com/Regira/RegiraFleet-Website), running against the [RegiraFleet-Backend](https://github.com/Regira/RegiraFleet-Backend) admin API, built with the [Regira packages](https://github.com/Regira/Regira-Packages).

**Live demo:** [fleet-demo.regira.com/admin/](https://fleet-demo.regira.com/admin/) — a demo login is provided on the sign-in dialog.

## Stack

- Vue 3, Vite, TypeScript
- `regira_modules` (npm dependency) — Regira's front-end utility modules and Vue components
- Runtime i18n (EN/FR/NL) via `public/data/translations.json`
- Deployed under `/admin/` (see `vite.config.ts` `base`); `public/Web.Config` provides the IIS history-mode rewrite

## Development

```sh
npm install
npm run dev        # dev server
npm run build      # type-check + production build to dist/
npm run test:unit  # Vitest
npm run lint       # ESLint
```

The API base URL per environment is configured in `public/config.json`.

## Deployment

Manual: `npm run build`, then copy `dist/` to the IIS `admin` application folder.
