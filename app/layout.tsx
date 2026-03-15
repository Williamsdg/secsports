import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MyTeamsProvider } from "@/providers/MyTeamsProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEC Sports - Southeastern Conference Athletics",
  description: "Live scores, news, standings, and highlights for SEC athletics. Follow your favorite SEC teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <MyTeamsProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </MyTeamsProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
