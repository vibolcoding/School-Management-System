import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/context/AppProviders";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "School Management System",
  description: "A comprehensive School Management System for staff and student administration, attendance tracking, and learning management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">
        <AppProviders>
          <MainLayout>
            {children}
          </MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
