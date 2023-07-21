import React from "react"
import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
  return (
    <div
      className="transition rounded-full flex items-center justify-center bg-sky-500/60 scale-90 p-4 drop-shadow-md
    group-hover:bg-sky-500 hover:scale-105 active:scale-95 duration-300">
      <FaPlay className="text-black" />
    </div>
  )
}

export default PlayButton
