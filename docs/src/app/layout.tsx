// apps/docs/app/layout.tsx
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


export const metadata = {
  title: "d3-ui Docs",
  description: "Beautiful D3 + React components styled with Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
