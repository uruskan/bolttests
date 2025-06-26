import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SayNDone - Restaurant Dashboard',
  description: 'Professional restaurant management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="sayndone-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}