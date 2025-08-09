"use client";
import React, { createContext, useContext } from 'react';

export type Messages = Record<string, string>;

interface I18nValue {
  locale: string;
  messages: Messages;
}

const I18nContext = createContext<I18nValue | null>(null);

export default function I18nProvider({ locale, messages, children }: { locale: string; messages: Messages; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { t: (key: string) => key, locale: 'vi' };
  }
  const t = (key: string) => ctx.messages[key] ?? key;
  return { t, locale: ctx.locale };
}