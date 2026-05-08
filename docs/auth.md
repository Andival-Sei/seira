# Авторизация

## Выбор на 2026

Для Seira выбран Supabase Auth.

Причины:

- тесная интеграция с Postgres и Row Level Security;
- готовые email/password, magic link, OAuth, OTP и SSO-сценарии;
- JWT сессии автоматически используются Supabase SDK;
- MFA поддерживается через TOTP/phone;
- хорошо подходит для SPA без Next.js.

## Текущий flow

1. Пользователь открывает `/`.
2. Всегда видит страницу входа/регистрации.
3. После успешного входа приложение переводит его на `/app`.
4. `/app` проверяет сессию и возвращает на `/`, если пользователь не авторизован.

## Что включить в Supabase

- Email provider.
- Email confirmations для production.
- Redirect URL: `http://127.0.0.1:5173/app` для локальной разработки.
- Production redirect URL после появления домена.
- RLS для всех пользовательских таблиц.

## Следующие auth-этапы

1. OAuth: Google и GitHub.
2. Magic link как быстрый вход без пароля.
3. TOTP MFA для аккаунтов с чувствительными данными.
4. Организационные роли и workspaces.
5. Passkeys/WebAuthn через отдельный слой, когда будет выбран стабильный провайдер или Supabase добавит нужный production-ready путь.
