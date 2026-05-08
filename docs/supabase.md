# Supabase

## Проект

- Project ref: `sxyvsgzqmvwyrhcbthlq`
- API URL: `https://sxyvsgzqmvwyrhcbthlq.supabase.co`
- Frontend key: publishable key в `.env.local`

## Локальная настройка

CLI инициализирован через:

```bash
supabase init
supabase link --project-ref sxyvsgzqmvwyrhcbthlq
```

`supabase/config.toml` хранится в git и не содержит секретов. `.env.local`, `.temp` и локальные env-файлы Supabase игнорируются.

## Типы

Типы БД лежат в `src/lib/database.types.ts`. После изменения схемы их нужно обновлять:

```bash
supabase gen types --linked --schema public > src/lib/database.types.ts
```

## Текущее состояние

Remote schema `public` пока пустая. Следующий шаг - миграции для профилей, workspaces, диалогов и RLS.
