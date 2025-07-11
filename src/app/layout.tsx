import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components";

export const metadata: Metadata = {
  title: "Sentry",
  description: "Simple Community Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
