// apps/docs/app/layout.tsx
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata = {
  title: "d3-ui - Beautiful D3 + React Components",
  description: "A modern collection of D3-powered React components styled with Tailwind. Build beautiful, composable, and data-driven interfaces — fast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col min-h-screen">
        <ThemeProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto p-6 lg:p-12">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
