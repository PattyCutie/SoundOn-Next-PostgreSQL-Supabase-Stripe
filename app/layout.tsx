import "./globals.css";
import type { Metadata } from "next";

import { Lexend } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongByUserId from "@/action/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductWithPrice from "@/action/getActiveProductWithPrice";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOUND ON",
  description: `Let's the music loud with SOUND ON`,
  icons: {
    icon: "sound-on/public/images/sound-on-dark.png",
  },
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSong = await getSongByUserId();
  const products = await getActiveProductWithPrice();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSong}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
