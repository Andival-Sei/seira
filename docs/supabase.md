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

## Профили пользователей

Миграция `20260508215923_create_profiles.sql` создает:

- `public.profiles` с `id`, `email`, `display_name`, `avatar_url`, `locale`, `timezone`, timestamps;
- RLS политики: пользователь читает, создает и обновляет только свой профиль;
- trigger `auth.on_auth_user_created`, который автоматически создает профиль при регистрации;
- приватные trigger-функции в схеме `private`, чтобы не держать `security definer` функции в exposed `public`.

После регистрации пользователь получает запись в `public.profiles` и может заходить в приложение с этой же Supabase-сессией.

## Следующий шаг

Следующие миграции: workspaces, memberships, conversations, messages и RLS для совместной работы.
