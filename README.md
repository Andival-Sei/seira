# Seira

Веб-клиент личного ассистента. Проект стартует как закрытая SPA: без SSR по умолчанию, с авторизацией и серверными интеграциями через Supabase/Edge Functions или отдельный API.

## Стек

- React 19 + Vite 8
- TypeScript 6
- TanStack Router для типобезопасных file-based маршрутов
- TanStack Query для серверного состояния
- Supabase Auth/Postgres/Realtime как базовый backend
- Tailwind CSS 4 для UI
- Vitest + Testing Library для тестов
- ESLint + Prettier для качества кода

## Команды

```bash
pnpm install
pnpm dev
pnpm lint
pnpm test --run
pnpm build
```

## Переменные окружения

См. `.env.example`.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Секретные ключи моделей, service role ключ Supabase и доступы к внешним инструментам нельзя класть в `VITE_*`. Их нужно держать на серверной стороне.

## Документация

Основная документация лежит в [docs/README.md](./docs/README.md).
