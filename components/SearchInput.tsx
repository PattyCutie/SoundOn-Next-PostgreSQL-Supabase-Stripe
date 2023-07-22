"use client"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Input from "./Input"

const SearchInput = () => {
  const router = useRouter()
  const [val, setVal] = useState("")
  const debouncedValue = useDebounce(val, 500)

  useEffect(() => {
    let url = "search"

    const query = {
      title: debouncedValue,
    }

    const queryString = new URLSearchParams(query).toString()
    url = `search?${queryString}`

    router.push(url)
  }, [debouncedValue, router])

  return (
    <div>
      <Input
        placeholder="What do you want to listen to?"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
