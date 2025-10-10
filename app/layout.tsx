import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Montserrat400 = Montserrat({
  subsets: ['latin'],
  weight: '400',
});
const Montserrat700 = Montserrat({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = {
  title: '川島作品集',
  description: '職業訓練作品をまとめたページ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={Montserrat400.className}>{children}</body>
    </html>
  );
}
