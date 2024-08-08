import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-100 text-gray-700`}>
        <main className="items-center justify-between p-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
