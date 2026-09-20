import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";
import "./lab.css";

export const metadata: Metadata = {
  title: "Steven — AI × Silicon",
  description: "Steven is an Informatics student exploring intelligence from software and edge AI to computer architecture and silicon.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
