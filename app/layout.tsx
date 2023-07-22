import "./globals.css"
import type { Metadata } from "next"

import { Lexend } from "next/font/google"
import Sidebar from "@/components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import getSongByUserId from "@/action/getSongsByUserId"

const font = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOUND ON",
  description: `Let's the music loud with SOUND ON`,
  icons: {
    icon: "sound-on/public/images/sound-on-dark.png",
  },
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSong = await getSongByUserId()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSong}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
