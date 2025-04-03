import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const font = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pi Security",
  description: "Jogo para informar sobre segurança virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${font.className} antialiased p-10`}>{children}</body>
    </html>
  );
}
