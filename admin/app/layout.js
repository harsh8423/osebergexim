import "./globals.css";

export const metadata = {
  title: {
    default: "Admin Panel - Oseberg Exim",
    template: "%s | Oseberg Exim Admin"
  },
  description: "Oseberg Exim Admin Panel - Manage blogs, catalogs, and AI knowledge base. Content management system for Oseberg Exim export-import business.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#F7F8FA] via-white to-[#F7F8FA] antialiased">
        {children}
      </body>
    </html>
  );
}
