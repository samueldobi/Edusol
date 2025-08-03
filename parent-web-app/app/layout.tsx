import type { Metadata } from 'next';
import { poppins } from '@/app/ui/fonts';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';


export const metadata: Metadata = {
  title: 'Educesol - Smart School Management',
  description: 'Educesol is a powerful platform that simplifies school management, enabling administrators, teachers, and parents to collaborate efficiently.',
  icons: {
    icon: '/Images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
          {/* <EnvironmentCheck /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
