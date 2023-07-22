"use client"

import { useState } from "react"
import { IconBase } from "react-icons"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface LinkButtonProps {
  songId: string
}
const LikedButton: React.FC<LinkButtonProps> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = () => {}


  return (
    <button
      className="cursor-pointer hover:opacity-75 transition duration-300 active:scale-150"
      onClick={handleLike}>
      <Icon
        color={isLiked ? "rgb(7, 89, 133)" : "#FFFFFF"}
        size={24}
      />
    </button>
  )
}

export default LikedButton
