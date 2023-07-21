"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"
import PlayButton from "./PlayButton"

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data)

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-lg overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full overflow-hidden rounded-lg">
        <Image
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          fill
          alt="Image"
          src={imagePath || "/images/music-placeholder.png"}
        />
        <div className="absolute bottom-2 right-2">
          <PlayButton />
        </div>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p>By: {data.author}</p>
      </div>
    </div>
  )
}

export default SongItem
