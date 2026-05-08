import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/features/auth/use-auth";
import { cn } from "@/lib/utils";

type AuthMode = "sign-in" | "sign-up";

const trustItems = [
  "Закрытый доступ по умолчанию",
  "Сессии Supabase Auth",
  "Готово к MFA и RLS",
];

export function AuthPage() {
  const navigate = useNavigate();
  const {
    isConfigured,
    isLoading,
    session,
    signInWithPassword,
    signUpWithPassword,
  } = useAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === "sign-up";

  const title = useMemo(
    () => (isSignUp ? "Создать пространство Seira" : "Войти в Seira"),
    [isSignUp],
  );

  useEffect(() => {
    if (session) {
      void navigate({ to: "/app", replace: true });
    }
  }, [navigate, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isConfigured) {
      setError(
        "Добавь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в .env.local.",
      );
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов.");
      return;
    }

    setIsSubmitting(true);
    const result = isSignUp
      ? await signUpWithPassword(email, password)
      : await signInWithPassword(email, password);
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (isSignUp) {
      setMessage(
        "Аккаунт создан. Если в Supabase включено подтверждение email, проверь почту.",
      );
      return;
    }

    await navigate({ to: "/app", replace: true });
  }

  return (
    <main className="auth-grid min-h-screen overflow-hidden bg-night text-ice">
      <section className="relative flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(77,208,199,0.22),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(154,123,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-soft">
                <Sparkles size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-semibold">Seira</p>
                <p className="text-sm text-ice/56">персональная AI-система</p>
              </div>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-6xl lg:text-7xl">
              Твой ассистент открывается только после входа.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ice/62 sm:text-lg">
              Стартуем с надежной авторизации, темной интерфейсной системой и
              архитектурой, рассчитанной на большой продукт: память,
              инструменты, файлы, агенты и рабочие пространства.
            </p>

            <div className="mt-9 grid gap-3 sm:max-w-xl sm:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  className="rounded-lg border border-white/9 bg-white/[0.045] px-4 py-3 text-sm text-ice/72 backdrop-blur transition duration-300 hover:border-mint/35 hover:bg-white/[0.07]"
                  key={item}
                >
                  <Check
                    className="mb-3 text-mint"
                    size={17}
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-white/10 bg-graphite/74 p-2 shadow-elevated backdrop-blur-xl">
            <div className="rounded-xl border border-white/[0.07] bg-black/24 p-5 sm:p-6">
              <div className="mb-6 flex rounded-lg bg-white/[0.055] p-1">
                <button
                  className={cn(
                    "flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-ice/58 transition duration-300",
                    mode === "sign-in" &&
                      "bg-white/[0.11] text-ice shadow-soft",
                  )}
                  onClick={() => {
                    setMode("sign-in");
                    setError(null);
                    setMessage(null);
                  }}
                  type="button"
                >
                  Вход
                </button>
                <button
                  className={cn(
                    "flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-ice/58 transition duration-300",
                    mode === "sign-up" &&
                      "bg-white/[0.11] text-ice shadow-soft",
                  )}
                  onClick={() => {
                    setMode("sign-up");
                    setError(null);
                    setMessage(null);
                  }}
                  type="button"
                >
                  Регистрация
                </button>
              </div>

              <div className="mb-7">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-mint/20 bg-mint/10 text-mint">
                  <LockKeyhole size={22} aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-semibold tracking-normal">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ice/56">
                  {isSignUp
                    ? "Создай аккаунт. После подтверждения почты вход откроет приложение."
                    : "Войди, чтобы перейти во внутренний интерфейс ассистента."}
                </p>
              </div>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-ice/72">Email</span>
                  <span className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 transition duration-300 focus-within:border-mint/55 focus-within:bg-white/[0.07]">
                    <Mail
                      className="text-ice/42"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      autoComplete="email"
                      className="h-12 min-w-0 flex-1 bg-transparent text-base text-ice outline-none placeholder:text-ice/30"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      type="email"
                      value={email}
                    />
                  </span>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-ice/72">
                    Пароль
                  </span>
                  <span className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 transition duration-300 focus-within:border-mint/55 focus-within:bg-white/[0.07]">
                    <Fingerprint
                      className="text-ice/42"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      autoComplete={
                        isSignUp ? "new-password" : "current-password"
                      }
                      className="h-12 min-w-0 flex-1 bg-transparent text-base text-ice outline-none placeholder:text-ice/30"
                      minLength={8}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Минимум 8 символов"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={
                        showPassword ? "Скрыть пароль" : "Показать пароль"
                      }
                      className="rounded-md p-1.5 text-ice/48 transition duration-300 hover:bg-white/10 hover:text-ice"
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-100">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="rounded-lg border border-mint/20 bg-mint/10 px-3 py-2.5 text-sm text-mint">
                    {message}
                  </p>
                )}

                <button
                  className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ice px-5 font-semibold text-night transition duration-300 hover:scale-[1.01] hover:bg-white disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting || isLoading}
                  type="submit"
                >
                  {isSubmitting ? (
                    <Loader2
                      className="animate-spin"
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                  {isSignUp ? "Создать аккаунт" : "Войти"}
                </button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] p-3 text-sm leading-6 text-ice/55">
                <ShieldCheck
                  className="mt-1 shrink-0 text-mint"
                  size={17}
                  aria-hidden="true"
                />
                <p>
                  В 2026 базовый выбор для этого проекта: Supabase Auth + RLS.
                  Далее добавим OAuth, magic link и MFA поверх этой же модели.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
