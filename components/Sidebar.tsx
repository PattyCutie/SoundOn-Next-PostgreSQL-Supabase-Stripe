"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
// react icons
import { HiHome, HiOutlineSearch } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  //add songs after create middleware and getSongByUserId action
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "search",
        href: "/",
      },
      {
        icon: HiOutlineSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2 pr-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
