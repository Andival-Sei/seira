import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle2,
  Command,
  FileText,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  Plus,
  Send,
  Settings,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/use-auth";
import { LanguageSelect } from "@/features/i18n/LanguageSelect";
import { useProfile } from "@/features/profile/use-profile";

export function AssistantHome() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isConfigured, isLoading, session, signOut, user } = useAuth();
  const profileQuery = useProfile(user?.id);
  const profile = profileQuery.data;

  const capabilities = [
    t("app.modules.memory"),
    t("app.modules.tools"),
    t("app.modules.history"),
    t("app.modules.rag"),
  ];

  const navItems = [
    { label: t("app.nav.chat"), icon: MessageSquareText, isActive: true },
    { label: t("app.nav.memory"), icon: Brain, isActive: false },
    { label: t("app.nav.documents"), icon: FileText, isActive: false },
    { label: t("app.nav.settings"), icon: Settings, isActive: false },
  ];

  useEffect(() => {
    if (!isLoading && !session) {
      void navigate({ to: "/", replace: true });
    }
  }, [isLoading, navigate, session]);

  async function handleSignOut() {
    await signOut();
    await navigate({ to: "/", replace: true });
  }

  if (isLoading || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-night text-ice">
        <div className="flex items-center gap-3 text-ice/60">
          <Sparkles
            className="animate-pulse text-mint"
            size={18}
            aria-hidden="true"
          />
          {t("loadingSession")}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-night text-ice">
      <div className="mx-auto grid min-h-screen w-full max-w-[1480px] grid-cols-1 lg:grid-cols-[288px_minmax(0,1fr)]">
        <aside className="border-white/8 bg-black/18 border-b px-4 py-4 backdrop-blur lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                <Sparkles size={19} aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-semibold">{t("brand")}</p>
                <p className="text-sm text-ice/45">{t("app.assistantLabel")}</p>
              </div>
            </div>
            <button
              aria-label={t("app.newChatAria")}
              className="flex size-9 items-center justify-center rounded-lg border border-white/9 bg-white/[0.045] text-ice/65 transition duration-300 hover:border-mint/35 hover:text-ice"
              type="button"
            >
              <Plus size={17} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 grid gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <button
                className={
                  item.isActive
                    ? "flex items-center gap-3 rounded-lg bg-white/[0.08] px-3 py-2.5 text-ice shadow-soft"
                    : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-ice/52 transition duration-300 hover:bg-white/[0.055] hover:text-ice"
                }
                key={item.label}
                type="button"
              >
                <item.icon size={17} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <LockKeyhole className="text-mint" size={16} aria-hidden="true" />
              {t("app.activeSession")}
            </div>
            <p className="truncate text-sm text-ice">
              {profile?.display_name ?? profile?.email ?? user?.email}
            </p>
            <p className="mt-1 truncate text-xs text-ice/40">
              {profileQuery.isLoading
                ? t("app.profileLoading")
                : profile
                  ? t("app.profileConnected")
                  : t("app.profileUnavailable")}
            </p>
            <button
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-medium text-ice/72 transition duration-300 hover:border-red-300/30 hover:bg-red-500/10 hover:text-red-100"
              onClick={handleSignOut}
              type="button"
            >
              <LogOut size={16} aria-hidden="true" />
              {t("app.signOut")}
            </button>
          </div>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/8 bg-night/84 px-5 py-4 backdrop-blur-xl">
            <div>
              <h1 className="text-xl font-semibold tracking-normal">
                {t("app.title")}
              </h1>
              <p className="text-sm text-ice/45">{t("app.subtitle")}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border border-white/9 bg-white/[0.045] px-3 py-2 text-sm text-ice/62 md:flex">
                <Command size={16} aria-hidden="true" />
                {isConfigured
                  ? t("app.supabaseAuth")
                  : t("app.envNotConfigured")}
              </div>
              <LanguageSelect />
            </div>
          </header>

          <div className="grid flex-1 grid-cols-1 gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_350px]">
            <section className="flex min-h-[min(680px,calc(100vh-120px))] flex-col rounded-2xl border border-white/9 bg-graphite/72 shadow-elevated">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06]">
                    <MessageSquareText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{t("app.newDialog")}</h2>
                    <p className="text-sm text-ice/45">
                      {t("app.dialogSubtitle")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center px-5">
                <div className="max-w-2xl text-center">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-mint/18 bg-mint/10 text-mint">
                    <Brain size={28} aria-hidden="true" />
                  </div>
                  <p className="text-3xl font-semibold tracking-normal text-balance md:text-4xl">
                    {t("app.nextStep")}
                  </p>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ice/56">
                    {t("app.securityNote")}
                  </p>
                </div>
              </div>

              <form className="flex gap-3 border-t border-white/8 p-3 sm:p-4">
                <input
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-ice outline-none transition duration-300 placeholder:text-ice/30 focus:border-mint/50 focus:bg-white/[0.065]"
                  placeholder={t("app.promptPlaceholder")}
                  type="text"
                />
                <button
                  className="inline-flex items-center gap-2 rounded-xl bg-ice px-4 py-3 font-semibold text-night transition duration-300 hover:scale-[1.01] hover:bg-white"
                  type="button"
                >
                  <Send size={18} aria-hidden="true" />
                  <span className="hidden sm:inline">{t("app.send")}</span>
                </button>
              </form>
            </section>

            <aside className="grid content-start gap-5">
              <section className="rounded-2xl border border-white/9 bg-graphite/72 p-5 shadow-elevated">
                <h2 className="font-semibold">{t("app.selectedAuth")}</h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ice/45">{t("app.provider")}</dt>
                    <dd className="font-medium">Supabase Auth</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ice/45">{t("app.dataProtection")}</dt>
                    <dd className="font-medium">Postgres RLS</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ice/45">MFA</dt>
                    <dd className="font-medium">TOTP</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ice/45">{t("app.flow")}</dt>
                    <dd className="font-medium">Email + password</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ice/45">{t("app.profile")}</dt>
                    <dd className="font-medium">
                      {profile ? "public.profiles" : t("app.profilePending")}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-white/9 bg-graphite/72 p-5 shadow-elevated">
                <h2 className="font-semibold">{t("app.nextModules")}</h2>
                <ul className="mt-4 grid gap-3">
                  {capabilities.map((item) => (
                    <li
                      className="flex items-start gap-3 text-sm text-ice/62"
                      key={item}
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-mint"
                        size={17}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
