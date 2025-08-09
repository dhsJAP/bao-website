/* eslint @typescript-eslint/no-explicit-any: "off" */
import type { Metadata } from 'next';
import Link from 'next/link';
import I18nProvider from '@/lib/i18n';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'JLPT Vocab',
  manifest: '/manifest.json'
};

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'ja' }];
}

export default async function LocaleLayout({ children, params }: any) {
  const locale = params?.locale ?? 'vi';
  const messages = (await import(`@/messages/${locale}.json`).catch(async () => ({ default: (await import('@/messages/vi.json')).default }))).default as Record<string, string>;

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <I18nProvider locale={locale} messages={messages}>
          <ServiceWorkerProvider />
          <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <Link href={`/${locale}`} className="font-semibold">JLPT Vocab</Link>
              <div className="flex items-center gap-3">
                <Link href={`/${locale}/quiz`} className="text-sm">Quiz</Link>
                <Link href={`/${locale}/profile`} className="text-sm">Profile</Link>
                <LocaleSwitcher currentLocale={locale} />
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}