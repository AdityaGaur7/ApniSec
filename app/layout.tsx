import { Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "ApniSec - Secure Your Digital Future",
  description: "Advanced cybersecurity solutions for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
