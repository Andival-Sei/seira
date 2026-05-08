import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/use-auth";
import { LanguageSelect } from "@/features/i18n/LanguageSelect";
import { cn } from "@/lib/utils";

type AuthMode = "sign-in" | "sign-up";

export function AuthPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    () => (isSignUp ? t("auth.signUpTitle") : t("auth.signInTitle")),
    [isSignUp, t],
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
      setError(t("auth.envMissing"));
      return;
    }

    if (password.length < 8) {
      setError(t("auth.passwordTooShort"));
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
      setMessage(t("auth.signUpSuccess"));
      return;
    }

    await navigate({ to: "/app", replace: true });
  }

  return (
    <main className="min-h-screen bg-night text-ice">
      <section className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px]">
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-normal">
                  {t("brand")}
                </h1>
                <p className="mt-2 text-sm leading-6 text-ice/52">
                  {t("auth.continueHint")}
                </p>
              </div>
              <LanguageSelect />
            </div>
          </header>

          <section className="rounded-2xl border border-white/10 bg-graphite/72 p-5 shadow-panel sm:p-6">
            <div className="mb-6 flex rounded-lg bg-white/[0.045] p-1">
              <button
                className={cn(
                  "flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-ice/50 transition duration-300",
                  mode === "sign-in" && "bg-white/[0.095] text-ice shadow-soft",
                )}
                onClick={() => {
                  setMode("sign-in");
                  setError(null);
                  setMessage(null);
                }}
                type="button"
              >
                {t("auth.signInTab")}
              </button>
              <button
                className={cn(
                  "flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-ice/50 transition duration-300",
                  mode === "sign-up" && "bg-white/[0.095] text-ice shadow-soft",
                )}
                onClick={() => {
                  setMode("sign-up");
                  setError(null);
                  setMessage(null);
                }}
                type="button"
              >
                {t("auth.signUpTab")}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-normal">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ice/50">
                {isSignUp
                  ? t("auth.signUpDescription")
                  : t("auth.signInDescription")}
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-ice/72">
                  {t("auth.email")}
                </span>
                <span className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 transition duration-300 focus-within:border-mint/55 focus-within:bg-white/[0.07]">
                  <Mail className="text-ice/42" size={18} aria-hidden="true" />
                  <input
                    autoComplete="email"
                    className="h-12 min-w-0 flex-1 bg-transparent text-base text-ice outline-none placeholder:text-ice/30"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t("auth.emailPlaceholder")}
                    required
                    type="email"
                    value={email}
                  />
                </span>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-ice/72">
                  {t("auth.password")}
                </span>
                <span className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 transition duration-300 focus-within:border-mint/55 focus-within:bg-white/[0.07]">
                  <input
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    className="h-12 min-w-0 flex-1 bg-transparent text-base text-ice outline-none placeholder:text-ice/30"
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={
                      showPassword
                        ? t("auth.hidePassword")
                        : t("auth.showPassword")
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
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ice px-5 font-semibold text-night transition duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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
                {isSignUp ? t("auth.signUpSubmit") : t("auth.signInSubmit")}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
