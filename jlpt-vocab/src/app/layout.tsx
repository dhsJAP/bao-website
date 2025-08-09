import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JLPT Vocab",
  description: "JLPT vocabulary learning app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
