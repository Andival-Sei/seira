# Структура проекта

```text
src/
  app/                 # корневые layout-компоненты
  features/
    auth/              # login/register/session
    assistant/         # внутренний интерфейс ассистента
  lib/                 # общие клиенты и утилиты
  routes/              # TanStack Router file-based routes
  test/                # setup тестовой среды
```

## Правила

- Новая продуктовая область создается в `src/features/<name>`.
- Общий код без доменной логики кладется в `src/lib`.
- Маршрут должен быть тонким и подключать feature-компонент.
- Генерируемый `src/routeTree.gen.ts` не редактируется вручную.
