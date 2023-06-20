import "./globals.css";
import type { Metadata } from "next";

import { Lexend } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "SOUND ON",
  description: `Let's the music loud with SOUND ON`,
  icons: {
    icon: '/sound-on-dark.png',    
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
