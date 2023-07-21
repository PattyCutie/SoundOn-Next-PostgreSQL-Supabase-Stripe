import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"
import React from "react"

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }

    //Turn on Player !
    return
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-lg">
      <div className="relative rounded-lg min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={imageUrl || "/images/music-placeholder.png"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-sm text-white truncate">{data.title}</p>
        <p className="text-sm font-light text-neutral-400 text-s truncate">
          By: {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
