import "./globals.css";

export const metadata = {
  title: "Admin Panel - Blog Manager",
  description: "Manage your blog posts",
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
