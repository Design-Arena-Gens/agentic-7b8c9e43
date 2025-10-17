import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Dark Mode Toggle",
  description: "Simple dark mode toggle button",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
